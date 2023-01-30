# Spring Data JPA vs Data JDBC

- https://medium.com/@maqbool.ahmed.mca/spring-data-jpa-vs-data-jdbc-evaluation-b36d8834ead6
- https://www.jpa-buddy.com/blog/spring-data-jpa-to-spring-data-jdbc-a-smooth-ride/
- https://velog.io/@bread_dd/Spring-Data-JDBC-vs-Spring-Data-JPA

# 글1. Spring Data JPA vs Data JDBC — Evaluation

- 100만건의 데이터를 insert 하며 JPA 와 JDBC 성능 측정을 해보면서 알아봄
- 성능 측정 요약
  - GeneratedValue 없이 JPA 와 JDBC 비교 (백만건 insert)
    - insert
      - jpa: 24.867s
      - jdbc: 16.920s
- 결과 요약
  - Spring Data JDBC 가 성능면에서는 우위
  - `@GeneratedValue` 는 많은 성능 단점이 존재한다
    - 각각 타입별 비교
      - IDENTITY or AUTO 는 나쁜 선택
      - SEQUENCE 는 위 둘보다 2배 빠르다.
      - 명시적인 ID 를 사용하는 것이 3배 빠르다.
- 결론
  - JPA
    - 장점
      - 내부 구현에 대해서 명확이 알고 있다면 성능상 더 나은 점들을 제공한다.
      - 많은 편리한 기능들을 제공한다
    - 단점
      - 명확한 의도를 가지고 내부 동작을 확인해야 한다. 그렇지 않다면 애플리케이션의 성능이 어디서 떨어지는지 모르는 상태가 된다
    - `saveAll()` 의 동작과 같이 내부 구현을 모르면 애플리케이션의 성능이 떨어진다.
  - JDBC
    - 개발자가 원하는 것을 명확히 수행한다
- 내가 생각한 중요한 말
  - 개발자로서 내가 알지 못하는 프레임워크에게 많은 것을 맡기는 것보다 코드로 내가 더 잘 통제하고싶다.

# 글 2. Spring Data JPA to Spring Data JDBC – a smooth ride?

- 서론
  - 많은 개발자들은 JPA 는 느리다, 복잡하다, 너무 고통스럽다라는 말을 많이 한다.
  - 대표적으로는
    - 생성된 SQL 쿼리에 대한 제어 부족
    - L1 캐시에 대한 메모리 소비
    - JPQL, HQL 로 복잡한 쿼리를 만들기 어려움
  - 근데 JPA 는 프레임워크가 아니라 specification 이다.
    - 그래서 jpa 라고 누군가가 말하면 이를 hibernate 자체라고 받아들이는 사람이 많다
    - Spring Data JPA 는 hibernate 와 함께 사용하기 떄문에 JPA 를 다른 프레임워크로 바꾸려면 Spring Data JPA 도 바꿔야 한다. hibernate 만 교체하는건 힘들다
  - 이를 대체하는 2가지 방법이 존재
    1. JdbcTemplate
    2. Spring Data JDBC
- Spring Data JDBC
  - 유망한 대체자
  - spring data commons 를 기본으로 사용한다
    - 그래서 jpa 와 같은 추상화를 공유한다, 인터페이스를 공유한다
  - 가장 중요한건 Repository 이다.
- Spring Data JPA
  - jpa 만 있는것
    - `@ManyToOne`
    - Automic ID 생성기
    - cascading 연산 : 연관 엔티티 모두 삭제
    - 몇가지 배치 작업들: hibernate 는 비슷한 연산을 묶어서 배치로 처리할 수 있게 함
    - L1 캐시: 한 tx 에 사용되는 엔티티를 메모리에 유지.

모든 프레임워크는 두 부분으로 구성되어 있다: API와 아이디어. API는 코드에 직접적인 영향을 미칩니다; 프레임워크에 제공된 클래스만 사용할 수 있습니다. 그리고 아이디어는 암시적이지만, 우리가 일반적으로 애플리케이션을 구현하는 방식에 영향을 미친다.

스프링 데이터 JDBC는 API 측면에서 스프링 데이터 JPA와 매우 유사합니다. 그러나, JPA는 스프링 데이터 JDBC에 없는 몇 가지 유용한 기능을 제공합니다:
