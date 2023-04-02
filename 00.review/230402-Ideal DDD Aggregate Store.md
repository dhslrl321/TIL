> 해당 글은 개발, 기술관련 아티클이나 블로그 글 혹은 유튜브 영상의 내용을 정리하거나 후기를 적는 글입니다.

#### 리뷰할 글: ['반 버논' 의 'The Ideal Domain-Driven Design Aggregate Store?'](https://kalele.io/the-ideal-domain-driven-design-aggregate-store/)

# 주제와 간단 요약

- 2014 NYC 에서 열린 DDD eXchange 에서 애그리거트 저장에 대한 토론이 진행되었다
  - 구식이라고 표현하는 ORM 저장 방식에 대한 의견이 있었다
  - 이유는 ORM 의 mapping option 이 모델링을 방해한다는 데에 있다
  - 그래서 반 버논은 ORM 을 이용하는 대신에 json 을 이용하는 방법을 제안했다
  - json 기반 애그리거트 저장소를 활용한다면 도메인 모델을 순수하게 유지하고 mapping 정보들을 조작하는데 들어가는 시간을 줄일 수 있다고 주장한다
  - 이를 통해서 Object-Relation 의 임피던스 불일치 없이 개발될 수 있다고 한다
- ORM 을 사용하지 않는다면 어떠한 대안이 있는가?
  - orm 을 이용하지 않고 json 을 저장하는 방식을 떠올린다면 당연히 MongoDB 를 떠올릴 수 있다
- MongoDB 는 ACID 를 지원하지 않기 때문에 Domain Event 를 사용할 수 없다
  - 즉, 애플리케이션의 일관성이 떨어지게될 수 있음
  - TokuMX 프로젝트를 통해서 MongoDB 가 ACID tx 를 지원할 것이라는 소문이 있음
- 반버논이 생각하는 최고의 DDD Aggregate 저장소는 PostgreSQL 9.4 임
  - json 과 jsonb(json binary) 를 를 지원함
  - jsonb 를 사용하면 json 에 대해서 직접 쿼리할 수 있음, 혹은 필드에 대한 인덱싱을 지원함
  - postgreSQL 은 RDB 이므로 ACID 트랜잭션을 지원함

# 리뷰와 나의 해석

이 글에 대해서는 내가 하고싶은 이야기가 너무나도 많다.

관련하여 현재 library 를 만들고 있기도 하고 단순한 생각을 나열하기에는 오해를 불러일으킬 만한 것들이 많기에 추후에 이 주제만 가지고 더욱 깊게 이야기할 수 있도록 하겠다

그래서 이 섹션에서는 관련하여 궁금한 것들을 찾아본 적이 있는데, 그 내용들에 대해서 간략히 적어보겠다.

- **왜 MongoDB 는 ACID 를 지원하지 않는가**
  - 엄격한 tx 의 guarantee 보다 확장성, 성능, flexibility 를 우선시하는 설계 철학 때문
  - mongoDB 는 대규모 분산 시스템의 데이터를 빠른 속도로 처리하도록 설계됨
  - 데이터 모델이 복잡한 tx 가 아닌 읽기 및 쓰기 성능에 최적화됨
  - ACID 대신 eventual consistency 를 제공함
    - 만약 tx 를 엄격히 적용한다면 분산 클러스터의 모든 노드가 변경사항을 반영하는데에 까지 locking 을 하는 등의 작업이 필요할 것이고 결국 반영에 대한 시간적 제약이 존재함
    - 결국 eventtual consistency 를 적용하여 데이터 작업을 더 빠르고 확장성 높게 유지함
  - ACID 와 유사한 기능을 multi-documentation tx 를 이용하여 atomic update 를 지원함
    - 하지만 RDB 의 tx 보다는 제한적임
