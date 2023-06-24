# 의존성을 제어하는 방법

- 의존성이란
  - 의존성이란?
  - 왜 의존성을 관리해야하는지
- 코드레벨
  - import 구문
  - module 을 강제화
  - 확인법
    - import 구문 확인
    - dsm
- 모듈레벨
  - anti corruption layer
  - 실천법
    - adapter pattern
- 아키텍처 레벨
  - uplus mapper

### 목차

- 영속화란, persist 란
  - 영속 과정의 복잡성
- aggregate 란
  - aggregate root
  - 핵심은 일관성
- aggregate 를 영속하는 방법
  - orm
    - 단점 : mapping
  - 여러 table 을 aggregation 하는 객체로
  - json 을 이용하여 저장
    - domain - persist layer 분리

# json 을 저장하는 것은 나쁜 선택일까?

### Refs

- https://kalele.io/the-ideal-domain-driven-design-aggregate-store/
- https://medium.com/daangn/json-vs-text-c2c1448b8b1f
