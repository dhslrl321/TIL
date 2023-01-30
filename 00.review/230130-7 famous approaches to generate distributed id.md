> 해당 글은 개발, 기술관련 아티클이나 블로그 글 혹은 유튜브 영상의 내용을 정리하거나 후기를 적는 글입니다.

#### 리뷰할 글: ['Love Sharma 의 블로그 devgenius.io' 의 '7 Famous Approaches to Generate Distributed ID with Comparison Table'](https://blog.devgenius.io/7-famous-approaches-to-generate-distributed-id-with-comparison-table-af89afe4601f)

# 주제와 간단 요약

- **2가지의 전통적인 id 생성 기법.**
  - 두가지 방법
    - 방법 1. call 마다 shared counter 를 이용해서 id 를 생성
    - 방법 2. timestamp 함수를 이용해서 id 생성
  - 단점
    - 여러 독립 서버에서 동일한 id 를 생성할 수 있음
  - 단점을 극복하기 위해서는
    - 분산 환경에서도 유일한 id 를 생성할 수 있어야함
    - High Concurrent Request per Second 를 다룰 수 있어야 함
- **분산 id 생성기가 필요한 곳**
  - 통계 수집 장치
  - 채팅, messaging
- **분산 ID 생성기에 대한 요구사항**
  - Functional Requirements
    - 64bit 언저리의 길이
    - 클러스터 제약 없이 순차적인 unique id 생성
    - 초당 10,000 개 이상의 id 를 생성
  - Non-Functional Requirements
    - High Performance
    - Low Latency including Geo-Latency
    - High Availability
    - Fault-Tolerant
- **7개의 대표적인 분산 id 생성기**
  - **UUID/GUID**
    - 가장 잘 알려진 쉬운 id 생성기
    - 128비트의 16진수 숫자, 32 문자
      - 8-4-4-4-12
  - **MySQL: Centralizing Auto-Increments**
    - flickr's ticketing service 라고도 불림
    - id 생성만을 위한 데이터베이스
    - auto-increment 와 replace into 문을 이용
  - **MySQL: Cluster Mode**
    - 앞선 방법에서 고가용성을 추가한 방법
    - 두 개의 MySQL 인스턴스가 개별적으로 auto-increment 를 사용함
  - **MongoDB**
    - mongoDB 가 자체적으로 사용하는 id 생성기법
    - 96 bit 숫자
      - 4(timestamp)-5(random)-3(incrementing counter)
  - **Twitter Snowflake**
    - time based generation
    - 64 bit 의 unsigned integers 를 이용한 unique id 생성기
      - 41(epoch timestamp in millisec)-10(machine/node/shard id)-12(seq, local counter per machine)
      - epoch timestamp 로 인해서 time sortable, 거친 정렬이 가능함
  - **Baidu UID Generator**
    - snowflake 를 기반으로 만듦
      - snowflake 와 달리 workID bit 를 client 가 override 할 수 있음
      - snowflake 의 동시성 문제를 해결
      - worker node table 을 이용해서 실제 실행되는 애플리케이션의 데이터를 추가할 수 있음
  - **Sonyflake**
    - 39(timeunit)-8(seq)-16(machine id)
    - snowflake 를 보완함
    - snowflake 에 비해서 장점과 단점이 있음
      - snowflake 보다 더 긴 lifetime
      - 더 많은 distributed machines 를 허용
      - 더 느림

# 리뷰와 나의 해석

회사 일을 제외하고 아마 근 시일동안 가장 관심있게 작업을 할 분야가 바로 distributed system id generation 일 것이다.

그런 의미에서 이 글을 읽을 때 굉장히 재밌게 읽었다

우선, snowflake 에 대해서도 당연히 흥미로웠지만 MySQL 의 Centralizing 을 이용한 방법과 cluster mode 이 정말 흥미로웠다.

MySQL 의 replace into 를 이용한 방법으로 만약 sameID 가 존재한다면 `REPLACE INTO` 를 통해서 id 를 생성한다는 컨셉이다.

이외에도 snowflake 를 사용하면서 겪었던 여러가지 불편한 점들이 있었는데

- 64 bit 라는 너무 긴 문자열
- 쉽게 드러나지 않는 machineId 에 대한 정보
- spof

위의 것들을 Baidu 와 Sonyflake 를 이용해서 어느정도 보완할 수 있다는 사실이 꽤나 중요한 정보였다
