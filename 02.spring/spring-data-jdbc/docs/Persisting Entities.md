# Persisting Entities

- `CrudRepository` 에 의해서 save 가 됨
  - 구현체는 `SimpleCrudRepository`
- 객체 생성 방법
  - `@PersistenceCreator` 어노테이션이 생성자 위에 있으면 해당 생성자로 객체를 생성
  - 단일 생성자가 있다면 해당 생성자를 사용
  - 여러 생성자가 있고 특정 생성자에 `@PersistenceCreator` 어노테이션이 있다면 사용
  - 기본 생성자가 있다면 사용, 다른 생성자 무시

# 번외, 라이브러리 까보면 나오는 것들

- `SimpleCrudRepository` 에 의해서 save 가 호출되면?
  - `JdbcAggregateOperations` 의 `save()` 가 호출됨
  - 구현체로는 `JdbcAggregateTemplate` 가 있음
    - RelationalMappingContext 가 내부적으로 존재
    - 인스턴스에 대한 정보를 가지고 insert 냐 update 냐 결정
      - jdbcInsertWriter, jdbcUpdateWriter 가 쿼리를 만들고 수행
- `RelationalMappingContext` 가 저장하려는 인스턴스를 보고 isNew() 연산을 수행
  - isNew 는 insert 이냐 update 이냐를 결정
  - default 는 version 이 존재하면 new
  - 혹은 `Persistable` 인터페이스를 구현하고 isNew 메서드를 오버라이드 하면 new 생성 로직이 위임됨
