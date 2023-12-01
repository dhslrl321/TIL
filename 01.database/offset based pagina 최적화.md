이 글은 offset based pagination 을 빌미로 데이터베이스의 내부 동작과 여러 개념들을 알아보는 글 입니다.

2개의 글로 구성되어 있고, 각각의 글에서 얻을 수 있는 insight 가 다르니 함께 읽으면 더욱 유익합니다.

1. [오프셋 페이징이 느린 진짜 이유](https://wonit.tistory.com/664)
2. [오프셋 페이징, 단계별로 최적화하기](https://wonit.tistory.com/665) <- 현재 글

---

지난 시간, 우리는 [오프셋 페이징이 느린 진짜 이유](https://wonit.tistory.com/664) 에 대해서 알아보았다.

offset based pagination 을 보고 누군가는 이런 이야기를 한다.

**"꼭 offset based paging 을 해야하나요? cursor based paging 을 하면 안돼요?"**

맞는 말이다. 페이스북에서도 가능한 **항상** cursor based pagination 이 사용되어야 한다고 강조한다.

[##_Image|kage@byr8z8/btsAxHLXjBg/RkZ3IptmakJUCW5r6YPJc0/img.png|CDM|1.3|{"originWidth":1704,"originHeight":882,"style":"alignCenter","width":584,"height":302}_##]

하지만 어떠한 비즈니스 요구사항에서는 다를 수 있다.

offset based paging 을 사용하지 않는것이 좋으나 **항상 그럴수 없다**.

**어떤 상황에서는 no offset 을 사용할 수 없을 수 있다**

- 비즈니스 요구사항이 no offset 을 사용할 수 없는 경우
- WHERE 조건이 중복되어 cursor 를 사용할 수 없는 경우

#### 그래서 우리는 offset based pagaing 을 잘 쓰는 법도 알아야하는데, 이에 대해서 여러 데이터베이스의 개념들과 함께 이해해보도록 하자

이번 글을 통해 여러분들은 아래 키워드에 대해서 알아갈 수 있을 것이다.

- deferred join
- composite index, concaternate index
- using filesort vs using index sort
- covering index

# TL;DR

[##_Image|kage@bgstCd/btsz9YUwUnE/ZOROFxZObWppzwGuWpcEO0/img.png|CDM|1.3|{"originWidth":1326,"originHeight":464,"style":"alignCenter","width":700,"height":245}_##]

이번 글의 핵심을 요약하면 다음과 같다.

- **offset based pagination 최적화**
  - deferred join
  - covering index

---

# offset based pagination 최적화 하기

최적화에 앞서, 지난 시간 offset based pagination 이 **느린 이유**에 대해서 다시 한 번 상기해보자

- **느린 이유 1.** ORDER BY 구문에 의해 streaming 방식에서 buffering 방식으로 변경됨
  - 그에 따라 LIMIT 쿼리가 존재하더라도 전체 데이터를 조회하게 됨
- **느린 이유 2.** 정렬을 위해 필요한 데이터들을 가져오기 위해 offset 만큼 Disk I/O 가 발생
  - 특정 케이스에서 위의 I/O 는 index 를 사용할 수 없기 때문에 비싼 Random I/O 유발
- **느린 이유 3.** filesort 가 사용됨
  - 정렬을 위한 sort buffer 할당
  - 데이터들을 특정 단위로 나누고 정렬을 수행 후 결과를 디스크에 임시 저장
  - 정렬된 임시 파일들을 병합(mutiple merge) 하여 결과 테이블 생성

저 이유들 중 1번은 해결할 수 없는 경우가 대부분일 것이다.

그 아래의 2가지 느린 이유를 하나씩 제거하면서 성능을 끌어올려보자

# 최적화 1단계. deferred join 을 이용하라

첫번째로 적용할 최적화는 바로 **deferred join** 이라는 기법이다

[##_Image|kage@orspm/btsAxhzzztT/P58w8ZfsYQ20K7sRORulF0/img.png|CDM|1.3|{"originWidth":720,"originHeight":398,"style":"alignCenter","width":488,"height":270}_##]

deferred 라는 뜻은 postponed, delay 으로 지연시키다는 의미를 가지고 있다.

deferred join 은 **일종의 lazy loading 을 수행**하는 것이다.

#### 핵심은 OFFSET 구문으로 인해 그 만큼 Disk 의 I/O 가 발생하는 것은 막을 수 없지만, **대신 버려지는 데이터를 줄이는 것**이다.

버려지는 데이터를 줄여서 메모리에서 (buffer pool) 처리되는 데이터의 사이즈를 줄이는 것이다

**어떻게 할까?**

- 정렬을 수행해야 하는 OFFSET 구문을 sub query 로 만든다.
- 앞선 결과로 조회된 id 를 원래 테이블과 join 한다.

이 과정을 거치면, 다량의 데이터를 조회하는 OFFSET 쿼리에서 id 만 조회하게 되고, 원래 테이블과 join 을 하여 전체 결과를 얻을 수 있게 된다.

### deferred join - 구현 방법

```sql
SELECT *
FROM 테이블명
ORDER BY 정렬_조건
LIMIT 오프셋_값, 페이지_사이즈;

SELECT *
FROM 테이블명
         JOIN (/*앞선 오프셋 쿼리 단, id 만 조회한다*/) AS temp USING (id)
ORDER BY 정렬_조건;
```

첫번째 쿼리에서 `SELECT * FROM..` 이 아니라 `SELECT id FROM..` 으로 수정한 쿼리를 두번째 쿼리의 JOIN 의 sub query 로 넣으면 된다.

그럼 `OFFSET LIMIT` 이 적용될 때 id 만 조회할 것이고, OFFSET 이후 버려지는 데이터들도 id 만 버려지게 된다.

마지막으로 실제 client 에게 반환해야하는 데이터들은 JOIN 외부 쿼리에서 실행하는 것이다

예시를 통해 알아보자

### deferred join - 예시

아래의 쿼리는 170만건의 데이터에 적용된 일반적인 OFFSET 쿼리이다.

```sql
SELECT *
FROM simple_todos AS todos
ORDER BY todos.createdAt,
         todos.title
LIMIT 1700000, 10;
```

이 쿼리에서 SELECT 뒤에 나오는 `*` 때문에 OFFSET 만큼 가져와 정렬을 하는데, 메모리 공간을 많이 잡아먹게 된다.

하지만 여기에 deferred join 을 사용한다면

```sql
SELECT *
FROM simple_todos AS todos
    JOIN ( -- deferred join 시작

      SELECT id -- id 만 조회
      FROM simple_todos
      ORDER BY todos.createdAt, todos.title
      LIMIT 1700000, 10

    ) AS temp USING (id) -- sub query 의 결과를 driving table id 로 join
ORDER BY todos.createdAt, todos.title; -- 재정렬
```

과 같이될 수 있다

### deferred join - 성능 비교

deferred join 을 사용한 쿼리와 그렇지 않은 쿼리의 결과 약 **1.6배의 성능 차이**를 보였다.

[##_Image|kage@UuV2j/btsAuKifqfj/y31u23xHXfooI6KNfQqnY1/img.png|CDM|1.3|{"originWidth":1432,"originHeight":568,"style":"alignCenter","width":1074,"height":426}_##]

유의미한 성능의 차이는 확인했지만 아직 부족하다.

이 쿼리는 170만 건의 데이터일 때 의미가 있지 10만건의 정도의 데이터에서는 큰 차이가 없을 것이다.

그냥 복잡한 쿼리로만 보일 뿐이다.

더 높은 수준의 최적화를 해보자

# 최적화 2단계. Random Disk I/O 를 줄여보자

사실 위의 문제중 가장 큰 문제, 즉 가장 느린 작업은 당연히 데이터 레코드를 조회할 때 발생하는 Disk I/O (Random I/O) 일 것이다.

어떻게 하면 Disk I/O 를 줄일 수 있을까?

#### 답은 간단하다. 데이터 레코드를 위한 Disk I/O 를 하지 않도록 유도하면 된다

DB 의 실행 엔진이 데이터 레코드를 조회하기 위해 Disk I/O 를 하기 전에 **필요한 데이터를 모두 쥐어주면 된다.**

- ORDER BY 조건에 `createdAt` 이 있어서 어쩔 수 없이 Disk 에 접근해야한다?
  - 그럼 index 를 걸어버리자.
  - index 를 미리 만들어놓았기 때문에 레코드 전체를 조회하는 Disk I/O 가 사라질 것이다
- `SELECT * FROM..` 때문에 전체 데이터 조회를 위해 Disk 에 접근해야한다?
  - 그럼 `SELECT id FROM..` 으로 pk(id) 만 조회하도록 하자
  - pk(id) 는 자동으로 생성되는 index 이기 때문에 index 조회시 모든 조건이 충족된다.
  - 데이터 레코드 접근을 위한 Disk IO 가 없어질 것이다

사실 위에서 설명한 내용이 바로 Covering Index 이다.

### Disk I/O 줄이기 - covering index

**covering index 는 쿼리 결과를 얻기 위해 필요한 모든 정보를 포함하는 index 를 의미한다.**

```sql
SELECT username
FROM users
WHERE username = '장원익'

ALTER TABLE users
    ADD INDEX idx_name (username);
```

위와 같이 index 를 걸고 index 에 설정된 column name 으로 WHERE 조건과 SELECT 결과를 구성한다면 **Table Scan 이 아니라 Index Scan 으로 동작**하게 될 것이다

[##_Image|kage@buN1ZK/btsAxJpv2wK/ulZzKz52Ez6Koc5yQGcZ8K/img.png|CDM|1.3|{"originWidth":1789,"originHeight":979,"style":"alignCenter","width":1341,"height":734}_##]

그럼 결국 특정 데이터 조회를 위해 데이터 레코드를 직접 조회하는 Disk I/O 가 사라질 것이다.

커버링 인덱스를 적용하여 성능을 비교하기 전에 아래 최적화를 먼저 확인해보자.

# 최적화 3 단계. filesort 를 없애자

filesort 도 역시 복잡하고 시간이 오래 걸리는 작업중 하나로 꼽힌다.

filesort 를 없애면 성능 향상이 자명하다!!

### filesort 를 없애기 - 사전지식

filesort 를 없애기 위해서는 우선 **그게 무엇인지**, 그리고 **대안은 무엇인지** 알아야 한다.

filesort 와 index sort 에 대한 설명은 지난 [오프셋 페이징이 느린 진짜 이유](https://wonit.tistory.com/664) 에서 언급하였지만 간략히 정리하자면

- **index sort**
  - **항상 정렬된 상태로 저장하는 index 의 특성**을 이용하는 것
  - `ORDER BY` 구문에 index 로 지정된 column 이 있는 경우 **미리 정렬된 인덱스**의 특성을 이용해서 정렬된 결과를 반환
  - 정렬을 위한 **임시 file 생성** 및 **multiple merge** 를 위한 **추가적인 작업 없음**
  - 정렬 작업중 가장 빠른 속도 보장
- **filesort**
  - filesort 는 정렬을 위해 디스크나 임시 파일을 사용하는 방법
  - 주로 index sort 를 사용할 수 없는 경우에 사용되며 다음과 같은 일을 한다
  - 내부적으로 다음과 같이 처리되므로 비교적 느림
    - **내부적으로 메모리에 sort buffer 를 생성(할당받음)**
      - sort buffer 에서 정렬 연산을 수행
    - **데이터가 많은 경우 전체 데이터를 블록 단위로 나눔**
      - 블록 내의 정렬 결과를 file 형태로 임시 저장
      - 추가적인 Disk I/O 발생
    - **정렬된 결과들을 병합후 결과 반환**
      - multi-merge 작업 수행하여 결과 테이블 생성

### filesort 를 없애기 - 복합 인덱스 설정

filesort 를 없애고 **옵티마이저가 index sort 를 사용하도록 유도하기 위해**서는 ORDER BY 에 들어가는 조건이 **모두 index 로 지정된 column 이어야 한다.**

ORDER BY 에 들어가는 조건을 index 로 하는 **복합 인덱스**를 만들어주면 된다

```sql
select createdAt, content
from simple_todos as todos
order by createdAt, title
LIMIT 1700000, 10;

ALTER TABLE simple_todos
    ADD INDEX idx_createdAt_title (createdAt, title);
```

그럼 정렬 과정에서 sort buffer 나 temp file io 를 통한 정렬이 사라지고 이미 정렬된 index 순서대로 반환을 하게될 것이다.

### 복합 인덱스 및 covering index 적용 후 성능 비교

170만건의 데이터를 Ordering 하였을 때의 성능 차이를 봐보자

[##_Image|kage@1CcTM/btsAwpLIn7W/PeNTqcSpPcGkrsU3KkDPMK/img.png|CDM|1.3|{"originWidth":2014,"originHeight":659,"style":"alignCenter","width":1511,"height":494}_##]

앞은 order by 에 해당하는 정렬 조건에 복합 인덱스를 걸기 전이고 뒤는 index 를 추가한 후다.

7,585ms 에서 234ms 로 약 32배의 속도 차이가 난다

# 마지막! 이 모든 최적화를 다 적용해보자

### 최적화 전 쿼리

아래의 쿼리는 최적화를 하기 전의 쿼리다.

```sql
select *
from simple_todos as todos
order by createdAt, title
LIMIT 1700000, 10;
```

### 최적화 후 쿼리

최적화를 마친 쿼리이다.

```sql
SELECT *
FROM simple_todos AS todos
         JOIN (SELECT id
               FROM simple_todos
               ORDER BY createdAt,
                        title
               LIMIT 1700000, 10) AS temp USING (id)
ORDER BY todos.createdAt, todos.title;

ALTER TABLE simple_todos
    ADD INDEX idx_createdAt_title (createdAt, title);
```

우리는 이 최적화를 위해 꽤나 많은 것을 적용하였다.

- buffering 방식의 어쩔 수 없는 데이터 버려짐(discard) 를 위해 deferred join 을 적용했다.
- 불필요한 Disk I/O 를 없애기 위해 covering index 를 적용하였다
- filesort 를 index sort 로 바꾸기 위해 정렬 조건에 composite index 를 적용하였다

그 결과 기존 대비 약 62배 빨라진 결과를 얻을 수 있었다

[##_Image|kage@biiOmB/btsAxj5fV40/HHaVM1NQMCBUe0ANXYHBok/img.png|CDM|1.3|{"originWidth":1135,"originHeight":287,"style":"alignCenter","width":851,"height":247}_##]

이 속도는 아마 데이터 양이 많아질 수록, 페이지가 깊어질수록 더 늘어날 것이다.

# 결론

이렇게 여러가지 장치를 해두었지만 결국 검색 조건, 정렬 조건마다 인덱스를 거는것은 사실상 매우 어렵다.

또 다른 문제는 저 최적화 쿼리가 이러한 지식이 없이 본다면 매우 복잡한 쿼리로 보일 것이다.

어쩔 수 없는 상황을 제외하고는 가능하다면 cursor 기반 페이징으로 가는 것도 좋은 선택이다.

이렇게 앞선 글과 이번 글을 통해서 데이터베이스의 여러가지 키워드와 기술에 대해서 알아보았다.

내용의 맥락을 지키기 위해서 여러 키워드들에 대해 제한적으로 설명을 했기 때문에 관련해서는 더 깊게 학습하는 것을 추천하며 글을 마무리한다.
