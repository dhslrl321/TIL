# TL;DR

[##_Image|kage@bgstCd/btsz9YUwUnE/ZOROFxZObWppzwGuWpcEO0/img.png|CDM|1.3|{"originWidth":1326,"originHeight":464,"style":"alignCenter","width":700,"height":245}_##]

이번 글의 핵심을 요약하면 다음과 같다

- **GROUP BY 의 한계**
  - GROUP BY:
- **윈도우 함수**
  - 윈도우 함수:

# 배경

- 작업을 하다가 이런 요구사항을 만족하는 쿼리를 짜야했음
  - 특정 일에 발생한 transaction 중 가장 최신 transaction 데이터를 뽑아라
  - 회사에서 매일마다 발생하는 transaction 데이터가 있음. 이는 append only 테이블임.
- group by 로 짜보려 했으나 한계에 부딪힘
- 그러다 데이터 엔지니어링 팀에게 도움을 요청했고 window 함수의 존재를 알게되었음. 앞으로도 자주 사용할 수 있을것 같음

# Group By 의 한계

이야기 할 내용은 Group By 의 한계라기 보다 특성에 가깝다.

Group By 는 데이터를 Grouping 하여 각 group 별로 계산된 결과를 생성할 때 사용한다.

예시로 봐보자

앞으로 예제로 사용할 아래 테이블 스키마는 아주 간단하다

[##_Image|kage@RvCAY/btsKLvg13TG/KjI5iFCMOKDIyq9Q084ueK/img.png|CDM|1.3|{"originWidth":734,"originHeight":632,"style":"alignCenter","width":293,"height":252}_##]

id, userId 그리고 상태를 나타내는 status 와 주문일이 있다

그리고 5개의 dummy data 가 들어있다

[##_Image|kage@MGHuO/btsKK4xsnmy/sKQEsCPV9QdJSFvOvTeECk/img.png|CDM|1.3|{"originWidth":1414,"originHeight":406,"style":"alignCenter","width":710,"height":204}_##]

Group By 함수를 이용한다면 user 와 일자별 주문의 합계를 나타낼 수 있다

```sql
SELECT user_id, ordered_at::DATE, count(1)
FROM orders
GROUP BY user_id, ordered_at::DATE;
```

[##_Image|kage@u3GEq/btsKKFSbMxg/Btq5CGCZEwkLPPTUQ1e6d0/img.png|CDM|1.3|{"originWidth":1058,"originHeight":298,"style":"alignCenter","width":448,"height":126}_##]

이외에도 다양하게 sum 이나 avg 를 이용해 산술계산을 할 수도 있지만 중요한 사실은 Group By 에 명시되지 않은 필드는 select 할 수 없다는 것이다.

**Group By 는 그룹화된 결과를 기준으로 작업을 수행하기 때문에 명시되지 않은 나머지 필드를 Result Set 중 어디에 표현 할지 애매하기 때문이다.**

이를 위해서는 WITH 혹은 Sub query 를 이용해야 하는데 이 마저도 특정 케이스에서만 가능하다는 것이다.

# 윈도우 함수

앞선 문제를 해결하기 위해 사용한 것이 Window 함수이다.

> [postgresql Window Function docs](https://www.postgresql.org/docs/current/tutorial-window.html) 에서 자세한 내용을 확인할 수 있다.

핵심은 다음과 같다.

> 테이블에서 **행 그룹**을 정의하고, 그룹 내에서 계산을 수행하도록 설계된 함수로 레코드별 계산을 수행하면서 데이터를 전체 참조하고 싶은 경우에 사용된다. 자세한 내용은 [PostgreSQL Window Function Docs](https://www.postgresql.org/docs/current/tutorial-window.html) 에서 확인할 수 있다.

행의 그룹을 정의한다는 면에서는 Group By 와 동일하지만 전체 데이터를 참조할 수 있다는 점에서 다르다.

함수의 사용법은 다음과 같다.

```sql
SELECT WINDOW_FUNCTION (ARGUMENTS) OVER

( [PARTITION BY 컬럼] [ORDER BY 컬럼] [WINDOWING 절] )

FROM 테이블명 ;
```

- OVER(): 윈도우를 정의
- PARTITION BY: 그룹화 기준 지정
- ORDER BY: 정렬 기준 지정

window 함수는 over 와 partition by 를 함께 사용해야 한다.

partition by 를 이용해서 Grouping 할 기준을 정해주고 windowing 할 기준을 정해주면 된다.

Window 함수를 이용해서 `2024-11-17 에 발생한 주문 중 가장 최신의 주문을 조회하라` 라는 요건을 만족시키면 다음과 같다

### 1. window 함수로 일자별 정렬하기

```sql
SELECT *,
       row_number() over (partition by user_id order by ordered_at desc)
FROM orders
```

여기서 사용한 `row_number()` 함수는 windowing 기준에 따라 순서대로 번호를 부여한다.

### 2. WITH 구문을 이용하여 테이블 검색

```sql
with TMP as (SELECT *,
                    row_number() over (partition by user_id order by ordered_at desc) as RN
             FROM orders)
SELECT *
FROM TMP
WHERE RN = 1;
```

가장 최신의 주문을 조회하기 위해 앞서 조회한 결과를 Sub query 로 넣고 row number 에 조건을 추가하면 아래와 같이 원하는 결과가 조회된다

# 다양한 Window 함수들

앞서 사용한 window 함수는 `row_number()` 로 windowing 조건에 따라 순서만 부여한 것이다.

이외에도 다양한 함수들이 존재한다

- 특정 값을 합산하는 [SUM OVER](https://docs.aws.amazon.com/redshift/latest/dg/r_WF_SUM.html)
- 현재 행을 기준으로 이전 행의 값을 가져오는 [LAG OVER](https://docs.aws.amazon.com/redshift/latest/dg/r_WF_LAG.html)
- 순위를 부여하는 [RANK OVER](https://docs.aws.amazon.com/redshift/latest/dg/r_WF_RANK.html)

등등

[##_Image|kage@85DO1/btsKMCGrjoT/1KbHE19RmdVgnNJi44rO60/img.png|CDM|1.3|{"originWidth":1816,"originHeight":316,"style":"alignCenter","width":791,"height":138}_##]
