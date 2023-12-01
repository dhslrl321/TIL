이 글은 offset based pagination 을 빌미로 데이터베이스의 내부 동작과 여러 개념들을 알아보는 글 입니다.

2개의 글로 구성되어 있고, 각각의 글에서 얻을 수 있는 insight 가 다르니 함께 읽으면 더욱 유익합니다.

1. [오프셋 페이징이 느린 진짜 이유](https://wonit.tistory.com/664) <- 현재 글
2. [오프셋 페이징, 단계별로 최적화하기](https://wonit.tistory.com/665)

---

DB 에서 많은 양의 데이터를 view 에서 보여주기 위해 우리는 paging 이라고 불리는 기법을 사용한다.

고정된 크기의 데이터들의 집합을 page 라는 단위로 나누고 page 에 해당하는 데이터만 사용자에게 보여주는 형태로 사용하게 된다

[##_Image|kage@bLHnNl/btsAuPcMcBs/ATpQ3pQE6RxkLg3GwjhKG0/img.png|CDM|1.3|{"originWidth":1898,"originHeight":410,"style":"alignCenter","width":629,"height":136,"caption":"okky 의 pagination"}_##]

이를 data pagination 이라고 하고 이러한 페이징 전략은 일반적으로는 2가지가 사용된다

1. 오프셋 기반 페이징, offset based pagination
2. 커서 기반 페이징, cursor based pagination

일반적으로 [offset based pagination 은 느리다](https://levelup.gitconnected.com/why-is-offset-pagination-so-slow-d17e4b5ee1e0)는 것이 잘 알려진 사실이다.

유명한 글로는 향로님의 [페이징 성능 개선하기 - No Offset 사용하기](https://jojoldu.tistory.com/528) 에서도 확인할 수 있다.

offset based pagination 은 느리다고 하는데 왜 느리다고 하는걸까?

왜 offset 에서는 limit 쿼리의 이점이 사라지는걸까?

#### 오늘은 오프셋 페이징이 가지는 단점이나 해결방법 보다는 **왜 느린지에 대한 근본적인 원인**을 생각해보는 시간을 가져볼 것이다

이번 글을 통해 여러분들은 아래 키워드에 대해서 알아갈 수 있을 것이다.

- offset based pagination 과 문제점
- filesort vs index sort
- streaming vs buffering

# TL;DR

[##_Image|kage@bgstCd/btsz9YUwUnE/ZOROFxZObWppzwGuWpcEO0/img.png|CDM|1.3|{"originWidth":1326,"originHeight":464,"style":"alignCenter","width":700,"height":245}_##]

이번 글의 핵심을 요약하면 다음과 같다.

- **offset based pagination**
  - 정의
    - 전체 데이터를 특정 page 단위로 나누어 offset 부터 page 만큼만 조회하여 데이터를 처리하는 방법
  - 문제점
    - page 가 깊어질 수록 offset 까지 데이터를 모두 조회하고 page size 만큼만 반환
      - 만약 offset 이 100만이고 page size 가 10 이라면, 1,000,010 건을 실제로 조회
        - 조회할 때 Disk Random I/O 가 다량 발생 -> 느림의 근본적인 원인
      - 0번 offset 부터 시작 offset 까지의 데이터는 버려지고 10건만 결과로 반환됨
- **offset based pagination 이 느린 이유**
  - 문제는 정렬 방식에 있음
    - 정렬을 위해 결과 처리를 streaming 이 아닌 buffering 방식으로 전환
  - streaming vs buffering
    - streaming: 쿼리 실행 결과를 즉시 client 에게 반환
      - **LIMIT** 구문과 함께 사용할 때 이점 존재
    - buffering: 쿼리 실행 결과를 모았다가 client 에게 반환
      - **ORDER BY** 구문이 존재하면 해당 방식으로 사용
    - 이 과정에서 다량의 Random I/O 가 발생
  - filesort 를 사용하는것도 문제의 원인이기도 함
- **모든 offset based pagination 이 느린가?**
  - 그렇지 않음
  - page 깊이 문제는 동일하지만 성능상 이점을 보이는 방법이 존재
  - filesort 대신 index sort 를 사용하면 됨
    - **filesort**: 정렬 기준에 index column 이 존재하지 않다면 내부적으로 정렬 작업 수행 -> 느림
    - **index sort**: 정렬 기준에 index column 이 존재할 때 정렬 작업을 안함 -> 빠름

---

# 오프셋 기반 페이징, offset based pagination 이 뭘까? 빠르게 알아보자

이 글의 목적은 offset based pagination 이 무엇인지 이해하는 것에 있지 않다.

그러나 문제를 공감하기 위해서는 offset based pagination 이 무엇인지 알아야 하므로 핵심만 빠르게 이해해보자.

[##_Image|kage@b3xIW8/btsAxafWfvm/kRMWtzNRhnUqekBXMEUke0/img.png|CDM|1.3|{"originWidth":1428,"originHeight":826,"style":"alignCenter","width":701,"height":405}_##]

offset based pagination 은 **전체 데이터를 특정 page 단위로 나누어 offset 부터 page 만큼만 조회하여 데이터를 처리하는 방법**을 의미한다

MySQL 에서는 다음과 같은 방법으로 오프셋 페이징을 수행할 수 있다.

```sql
SELECT * FROM 테이블_이름
LIMIT 오프셋_값, 페이지_사이즈;
```

그럼 `오프셋_값` 에 해당하는 데이터부터 `페이지_사이즈` 만큼 조회를 하여 반환할 것이다

### 예를 들어보자

게시판이 있다고 해보자. 게시글 id 는 1 부터 id 가 순차적으로 증가한다

```sql
-- ex1. 0번째 오프셋부터 4개 조회-> 1, 2, 3, 4 조회
SELECT id FROM users as u
LIMIT 1, 4;

-- ex2. 1번째 오프셋부터 4개 조회 -> 3, 4, 5, 6 조회
SELECT id FROM users as u
LIMIT 3, 4;

-- ex3. 3,457번째 오프셋부터 4개 조회 -> 3,457, 3,458, 3,459, 3,460 조회
SELECT id FROM users as u
LIMIT 3457, 4;
```

예제의 마지막 쿼리만 보면 유저는 3457 페이지를 클릭했을 때, 3,457, 3,458, 3,459, 3,460 글을 해당 페이지에서 확인할 수 있게 된다.

이렇듯 쿼리가 매우 단순해서 쉽게 구현될 수 있는 페이징 기법이다

---

# offset based pagination 이 느리다?

이렇게 구현하기에도 쉽고 직관적인 오프셋 기반 페이징은 성능 이슈가 있다는게 일반적으로 받아들여지는 사실이다.

Chat GPT 한테 왜 offset based paging 이 느린지 물어보자

[##_Image|kage@b0YSEk/btsAueX0Qwn/rgkKH7HP03L6uR7HTtGAIK/img.png|CDM|1.3|{"originWidth":1224,"originHeight":656,"style":"alignCenter","width":662,"height":355}_##]

GPT 의 말을 요약하면 이렇다

- 오프셋 기반 페이징은 느리다
- 특정 오프셋으로 이동하기 위해서 해당 오프셋까지 결과를 건너뛰어야 한다
- 큰 오프셋일 경우 선형의 시간복잡도를 갖는다

### 느린 이유1. 오프셋 기반 페이징은 느리다.

우선 느리다라는 것이 **왜 느린지**, **무엇이 오래 걸리는지** 이해해야한다.

데이터베이스에서 시간이 가장 오래 걸리는 것은 **Disk I/O 작업**을 의미한다.

메모리가 아무리 크고 CPU 연산 성능이 아무리 뛰어나도 **물리적인 Disk head 를 움직이며** 보조기억장치에서 데이터를 가져오는 행위는 **시간이 오래걸리고 비싼 작업**중 하나이다.

그래서 우리가 index 를 사용해 Disk head 를 무작위로 움직이는 `Random I/O` 를 `Sequential I/O` 로 만드는것이 핵심이라고 하는것도 다 그런 이유이다.

### 느린 이유2. 특정 오프셋으로 이동하기 위해서 해당 오프셋까지 결과를 건너뛰어야 한다

여기서는 건너뛰어야 한다고 표현했지만 **실제로는 결과 집합을 만들기 위해서 데이터를 offset 만큼 조회하고 버리기(discard)** 때문이다.

`OFFSET` 에 지정된 갯수부터 `LIMIT` 인 page size 만큼만 조회할 것이라 기대하지만 실제로는 그렇지 않다.

**0번 OFFSET 부터 지정된 OFFSET 까지 데이터 조회를 모두 수행한다.**

즉, 속도가 느려지는 주 원인인 Disk I/O 가 offset 만큼 다 일어나고 결과를 제외한 나머지 데이터를 버린다

### 느린 이유3. 큰 오프셋일 경우 선형의 시간복잡도를 갖는다

앞선 말을 이어서 하자면 오프셋이 높아질수록, 즉 페이지가 깊어질 수록 그 만큼 조회하는 데이터가 많아지므로 시간복잡도가 `o(n)` 이기에 다음과 같은 그래프가 그려질 수 있다

[##_Image|kage@bMhLxt/btsAzBwZw0f/2MOrcWzhGRXI3NRGcLdvJ0/img.png|CDM|1.3|{"originWidth":2778,"originHeight":1914,"style":"alignCenter","width":463,"height":319}_##]

그럼 offset 만큼의 Disk I/O 가 늘어날 것이고 시간복잡도는 선형만큼 증가하게 되는 것이다

# 왜 offset based pagination 이 느릴까?

offset based pagination 이 느리게 되는 주된 원인은 바로 `ORDER BY` 에 있다.

이 말을 이해하기 위해서는 RDBMS(MySQL) 에서 **데이터처리 결과를 반환하는 방법**에 대해서 이해해야 한다.

### 데이터 처리 결과 반환 방법 2가지

데이터 처리 결과를 반환하는 방법은 2가지로 나뉘게 된다

[##_Image|kage@bRCvSL/btsAyLmMLaY/3ebh3CrhpRxkY7uumFvl31/img.png|CDM|1.3|{"originWidth":1641,"originHeight":441,"style":"alignCenter","width":1231,"height":331}_##]

1. streaming 처리
2. buffering 처리

### 1. streaming 처리

streaming 방식은 데이터 양에 관계 없이 쿼리 조건에 해당하는 **결과가 찾아질 경우** 바로바로 client 전송하는 방식이다

client 입장에서는 언제 마지막 데이터가 조회될지는 모르지만 우선은 첫번째 결과를 바로 확인할 수 있게 된다.

**이 때, `LIMIT` 구문이 추가되면 마지막으로 가져와야하는 데이터 레코드 건수가 줄기 때문에 성능 향상에 도움이 된다**

### 2. buffering 처리

이와 반대로 buffering 방식은 쿼리가 실행되고 **결과를 모두 모아놨다가** client 에게 반환하는 방식이다

그래서 client 는 결과를 받기 위해 대기하는 시간이 길어지게 된다.

**보통** `ORDER BY` 나 `GROUP BY` **구문이 추가되면 buffering 방식으로 처리되는데, 결과들을 모두 모아놓고 정렬이나 grouping 을 해야하기 때문이다**

paging 은 대부분 **최신순**, **수정순**, **특정 상태별**로 정렬(`ORDER BY`)을 하여 데이터를 제공하기 때문에 **buffering 방식이 적용된다고 할 수 있다.**

그래서 streaming 방식으로 처리될 때 `LIMIT` 을 통한 성능상 이점을 누릴 수 없게 되는 것이다.

---

# 모든 offset based pagination 이 느릴까?

**당연히도 그렇지 않다.**

offset based pagination 을 최적화하는 여러가지 방법이 존재하고 적절히 사용하면 page 가 깊어질 때 성능이 하락하는 문제도 어느정도 해결할 수 있다.

아래 두 쿼리를 한 번 봐보자

```sql
-- 1번 쿼리
SELECT * FROM simple_todos
ORDER BY createdAt, title
LIMIT 700000, 3

-- 2번 쿼리
SELECT * FROM simple_todos
ORDER BY id
LIMIT 700000, 3
```

이 두 쿼리는 약 70만건의 데이터에서 offset paging 쿼리를 수행하는 쿼리이다.

쿼리 실행 결과를 확인해보자

[##_Image|kage@cXCxdr/btsAzSSYUA7/jOZ2lXnICQsHCszv16rs20/img.png|CDM|1.3|{"originWidth":1804,"originHeight":571,"style":"alignCenter","width":1353,"height":428}_##]

page 가 충분히 깊고 성능 하락이 명확하게 보이는데, 두 쿼리는 실행 시간이 거의 24배에 달한다.

왜 두 쿼리간 속도 차이가 저렇게 심할까?

이에 대한 답은 DBMS 가 정렬, `ORDER BY` 를 처리하는 방법에 있다.

이 것을 이해한다면 offset based pagination 최적화에 대해서 더 쉽게 이해할 수 있을 것이다.

## 데이터를 정렬하기 위한 2가지 처리 방법

데이터를 정렬하기 위해서는 대표적으로 다음 2가지 방법이 사용된다

1. index sort
2. filesort

### 1. index sort

index sort 는 **항상 정렬된 상태로 저장하는 index 의 특성**을 이용하는 것이다.

`ORDER BY` 구문에 index 로 지정된 column 이 있는 경우 **미리 정렬된 인덱스**의 특성을 이용해서 정렬된 결과를 반환한다

이 방법을 사용하면 정렬을 위한 **임시 file 생성** 및 **multiple merge** 를 위한 **추가적인 작업 없이** 정렬된 index 를 반환하므로 가장 빠른 속도를 자랑한다

### 2. filesort

filesort 는 정렬을 위해 디스크나 임시 파일을 사용하는 방법을 의미한다.

주로 index sort 를 사용할 수 없는 경우에 사용되며 다음과 같은 일을 한다

- **내부적으로 메모리에 sort buffer 를 생성(할당받음)**
  - sort buffer 에서 정렬 연산을 수행
- **데이터가 많은 경우 전체 데이터를 블록 단위로 나눔**
  - 블록 내의 정렬 결과를 file 형태로 임시 저장
    - 추가적인 Disk I/O 발생
- **정렬된 결과들을 병합후 결과 반환**
  - multi-merge 작업 수행하여 결과 테이블 생성

그냥 보기에도 정말 많은 작업을 하기 때문에 당연히도 filesort 가 index sort 보다 훨씬 느리다.

## 비교

이제 우리가 알아할 지식들은 다 이야기했다! 실행 계획을 통해서 쿼리를 분석해보자

[##_Image|kage@k7VGQ/btsAAPu7xO7/0E002jMDLl0QyaRwce14b0/img.png|CDM|1.3|{"originWidth":1244,"originHeight":804,"style":"alignCenter"}_##]

실행 계획을 통해 알 수 있는 정보는 이렇다

- 두 쿼리 모두 `ORDER BY` 쿼리가 적용되어 streaming 방식이 buffering 방식으로 처리됨
  - 결과 set 이 모두 모일때 까지 대기함
- 첫번째 쿼리
  - 정렬 조건에서 index 를 사용할 수 없음 -> filesort 사용
- 두번째 쿼리
  - 정렬 조건에 index column 이 존재함 -> index sort 사용

결국 정렬을 할 때 index 를 사용할 수 있느냐 마느냐가 두 쿼리간의 실행 시간을 결정하는 것이다.

# 정리

이번에는 offset based pagination 이 느린 이유에 대해서 알아보았다.

그 이유들을 정리하자면 이렇다

- **느린 이유 1.** ORDER BY 구문에 의해 streaming 방식에서 buffering 방식으로 변경됨
  - 그에 따라 LIMIT 쿼리가 존재하더라도 전체 데이터를 조회
- **느린 이유 2.** 정렬을 위해 필요한 데이터들을 가져오기 위해 offset 만큼 Disk I/O 가 발생
  - 특정 케이스에서 위의 I/O 는 인덱스를 사용할 수 없기 때문에 비싼 Random I/O 유발
- **느린 이유 3.** filesort 가 사용됨
  - 정렬을 위한 sort buffer 할당
  - 데이터들을 특정 단위로 나누고 정렬을 수행 후 결과를 디스크에 임시 저장
  - 정렬된 임시 파일들을 병합(mutiple merge) 하여 결과 테이블 생성

혹자는 이런 이야기를 한다.

"꼭 offset based paging 을 해야하나요? cursor based paging 을 하면 안돼요?"

맞는 말이다. 페이스북에서도 가능한 항상 cursor based pagination 이 사용되어야 한다고 강조한다.

[##_Image|kage@byr8z8/btsAxHLXjBg/RkZ3IptmakJUCW5r6YPJc0/img.png|CDM|1.3|{"originWidth":1704,"originHeight":882,"style":"alignCenter","width":584,"height":302}_##]

하지만 어떠한 비즈니스 요구사항에서는 다를 수 있다.

그럴 경우를 대비하여 다음에는 [오프셋 페이징 단계별로 최적화하기](#) 에 대해서 알아볼 것이다.
