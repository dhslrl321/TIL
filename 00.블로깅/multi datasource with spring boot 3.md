Multi Datasource Application 세팅하기 (with Spring Boot 3 + JPA + kotlin)

### 목차

1. Multi DataSource Application 환경
2. 실습 환경 구성
3. Spring Application 구성 - 1. DataSource 구성
4. Spring Application 구성 - 2. EntityMangager TxManager 구성

# 1. Multi DataSource Application 환경

Spring Application 을 개발하다 보면 분명 하나의 applcation 에서 두개 이상의 DB 를 바라봐야 하는 경우가 존재한다.

[##_Image|kage@bJFLrz/btsJRQTHwIZ/00clTbYjLLn8sAr6NjQS51/img.png|CDM|1.3|{"originWidth":1042,"originHeight":678,"style":"alignCenter","width":559,"height":364,"caption":"이기종 datasource 설정"}_##]

이번 실습에서는 하나의 Spring Container 에서 두개 이상의 DataSource 를 설정하는 방법에 대해서 알아볼 예정이다.

# 2. 실습 환경 구성

- kotlin (jdk 21)
- Spring Boot 3.3.4
- Spring Data Jpa
- MySQL & PostgreSQL
- docker-compose

우선 Database Server 는 Docker Contianer 를 사용해서 local 에서 실행시킬 예정이다.

MySQL 과 PostgreSQL 은 Application 에서 항상 동시에 같이 사용할 것이므로 여러 컨테이너를 실행하고 관리하기에 용이하도록 **docker-comopse** 를 사용할 것이다.

우선 **docker-componse.yml** 을 새로 만들고 local 에서 db 를 띄워보자

```yml
version: "3.8"
services:
  order-db:
    image: postgres:14
    container_name: order-db
    environment:
      POSTGRES_DB: orderdb
      POSTGRES_USER: orderuser
      POSTGRES_PASSWORD: orderpassword
    ports:
      - "5432:5432"
    volumes:
      - ./sql/init-order.sql:/docker-entrypoint-initdb.d/init.sql

  delivery-db:
    image: mysql:8
    container_name: delivery-db
    environment:
      MYSQL_DATABASE: deliverydb
      MYSQL_USER: deliveryuser
      MYSQL_PASSWORD: deliverypassword
      MYSQL_ROOT_PASSWORD: deliverypassword
      MYSQL_CHARACTER_SET_SERVER: "utf8mb4"
      MYSQL_COLLATION_SERVER: "utf8mb4_unicode_ci"
    ports:
      - "3306:3306"
    volumes:
      - ./sql/init-delivery.sql:/docker-entrypoint-initdb.d/init.sql

networks:
  default:
    driver: bridge
```

container 가 실행될 때 inital data 를 함께 넣어주자.

```sql
-- ./sql/init-delivery.sql
CREATE TABLE IF NOT EXISTS deliveries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  delivery_name VARCHAR(255) NOT NULL,
  delivery_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO deliveries (delivery_name) VALUES ('첫 번째 배송'), ('두 번째 배송');


-- ./sql/init-order.sql
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_name VARCHAR(255) NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO orders (order_name) VALUES ('첫 주문'), ('두 번째 주문');

```

우리는 이 두개의 서로 다른 DB 와 테이블에 접근하는 Application 을 만들 것이다.

`docker-compose up` 을 통해 container 들을 실행시키면 아래와 같이 정상적으로 DB 가 실행된 것을 볼 수 있다

[##_Image|kage@ABYIJ/btsJSlFGrJX/IZjNjeESwK8gcQcGn94HH0/img.png|CDM|1.3|{"originWidth":1226,"originHeight":496,"style":"alignCenter"}_##]

# 3. Spring Application 구성

이제 실습을 위한 환경 구성이 완료되었다.

Spring Application 을 개발해보자.

> 기본적으로 Spring Application 의 boilerplate 는 따로 설명하지 않겠다. 전체 소스코드가 궁금하다면 [https://github.com/my-research/distributed-transaction-basic](https://github.com/my-research/distributed-transaction-basic) 에서 확인할 수 있다.

## 3-1. DataSource 생성

일반적으로 우리는 JPA 를 구성할 때 spring-data-jpa-starter 의 auto configuration 을 사용한다.

이번 실습도 마찬가지로 auto configuration 을 할 예정이지만 default 가 단일 datasource 이므로 기존 방식에서 조금 변경할 것이다.

`spring.datasource` 하위에 `order` 와 `delivery` 를 추가해준다.

```yml
spring:
  datasource:
    order:
      url: jdbc:postgresql://localhost:5432/orderdb
      username: orderuser
      password: orderpassword
      driver-class-name: org.postgresql.Driver
    delivery:
      url: jdbc:mysql://localhost:3306/deliverydb
      username: deliveryuser
      password: deliverypassword
      driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        show_sql: true
```

그리고 각각 DB 에 맞는 DataSourceProperties 를 생성하도록 `@ConfigurationProperties` 로 custom properties bean 을 생성해주자.

```kotlin
@Configuration
class DeliveryJpaConfig {

    @Bean
    @ConfigurationProperties("spring.datasource.delivery")
    fun deliveryDataSourceProperties() = DataSourceProperties()

    @Bean
    fun deliveryDataSource(): DataSource = deliveryDataSourceProperties()
        .initializeDataSourceBuilder()
        .build()
}

@Configuration
class OrderJpaConfig {

    @Bean
    @ConfigurationProperties("spring.datasource.order")
    fun orderDataSourceProperties() = DataSourceProperties()

    @Bean
    fun orderDataSource(): DataSource = orderDataSourceProperties()
        .initializeDataSourceBuilder()
        .build()
}
```

이러한 방식은 spring boot 의 [externalized configuration docs](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.java-bean-binding) 에서 자세히 확인할 수 있다.

## 3-2. Jpa EntityManager 와 TransactionManager 등록하기

이제 DataSource 를 구성했으니 JPA 를 사용할 수 있도록 Entity Manager 와 TransactionManager 를 등록해주자.

나는 앞서 만들었던 `OrderJpaConfig` 와 `DeliveryJpaConfig` 하위에 각각 만들어 줄 것이다

### DeliveryJpaConfig.kt

```kotlin
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
    basePackageClasses = [DeliveryEntity::class],
    entityManagerFactoryRef = "deliveryEntityManagerFactory",
    transactionManagerRef = "deliveryTransactionManager"
)
class DeliveryJpaConfig {

    @Bean
    @ConfigurationProperties("spring.datasource.delivery")
    fun deliveryDataSourceProperties() = DataSourceProperties()

    @Bean
    fun deliveryDataSource(): DataSource = deliveryDataSourceProperties()
        .initializeDataSourceBuilder()
        .build()

    @Bean
    fun deliveryEntityManagerFactory(
        @Qualifier("deliveryDataSource") dataSource: DataSource?,
    ): LocalContainerEntityManagerFactoryBean {

        val vendorAdapter = HibernateJpaVendorAdapter()
        vendorAdapter.setGenerateDdl(true)

        val factory = LocalContainerEntityManagerFactoryBean()
        factory.dataSource = dataSource
        factory.jpaVendorAdapter = vendorAdapter
        factory.setPackagesToScan("com.example.atomikos.infra.delivery")
        return factory
    }

    @Bean
    fun deliveryTransactionManager(
        @Qualifier("deliveryEntityManagerFactory") entityManagerFactory: EntityManagerFactory
    ): PlatformTransactionManager {
        val txManager = JpaTransactionManager()
        txManager.entityManagerFactory = entityManagerFactory
        return txManager
    }
}
```

### OrderJpaConfig.kt

```kotlin
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
    basePackageClasses = [OrderEntity::class],
    entityManagerFactoryRef = "orderEntityManagerFactory",
    transactionManagerRef = "orderTransactionManager"
)
class OrderJpaConfig {

    @Bean
    @ConfigurationProperties("spring.datasource.order")
    fun orderDataSourceProperties() = DataSourceProperties()

    @Bean
    fun orderDataSource(): DataSource = orderDataSourceProperties()
        .initializeDataSourceBuilder()
        .build()

    @Bean
    @Primary
    fun orderEntityManagerFactory(
        @Qualifier("orderDataSource") dataSource: DataSource?,
    ): LocalContainerEntityManagerFactoryBean {
        val vendorAdapter = HibernateJpaVendorAdapter()
        vendorAdapter.setGenerateDdl(true)

        val factory = LocalContainerEntityManagerFactoryBean()
        factory.dataSource = dataSource
        factory.setPackagesToScan("com.example.atomikos.infra.order")
        factory.jpaVendorAdapter = vendorAdapter
        return factory
    }

    @Bean
    fun orderTransactionManager(
      @Qualifier("orderEntityManagerFactory") entityManagerFactory: EntityManagerFactory
    ): PlatformTransactionManager {
        val txManager = JpaTransactionManager()
        txManager.entityManagerFactory = entityManagerFactory
        return txManager
    }
}
```

여기서 주의해야 할 것은 OrderJpaConfig 에 `@Primary` 어노테이션이 붙었다는 것이다.

이는 spring data 에서 default properties 는 단일 데이터소스를 기반으로 하기 때문에 그렇다.

# 4. 테스트 및 검증

이제 Entity 및 Repository 를 만들고 Spring Application 을 실행시켜보자.

```kotlin
@Entity
@Table(name = "orders")
data class OrderEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(name = "order_name", nullable = false, length = 255)
    val orderName: String,

    @Column(name = "order_date", nullable = false, updatable = false)
    val orderDate: LocalDateTime = LocalDateTime.now()
)

interface OrderRepository: JpaRepository<OrderEntity, Long> {}

@Entity
@Table(name = "deliveries")
data class DeliveryEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(name = "delivery_name", nullable = false, length = 255)
    val deliveryName: String,

    @Column(name = "delivery_date", nullable = false, updatable = false)
    val deliveryDate: LocalDateTime = LocalDateTime.now()
)

interface DeliveryRepository: JpaRepository<DeliveryEntity, Long> {}
```

그럼 아래와 같이 정상적으로 8080 포트를 물고 애플리케이션이 실행되었다고 확인할 수 있다

[##_Image|kage@mAvwQ/btsJRZbUgbu/cjXpEPaZoDxPdalF66xEuK/img.png|CDM|1.3|{"originWidth":2934,"originHeight":734,"style":"alignCenter"}_##]
