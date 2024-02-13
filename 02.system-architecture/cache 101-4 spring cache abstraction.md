cache 101 - Spring Caching 으로 알아보는 cache

cache 101 시리즈는 web application 을 개발하며 마주하는 cache 에 대해 필요한 지식과 도구들의 사용법을 학습하는 시리즈입니다.

- [1. Cache 에 대한 거의 모든 것](https://wonit.tistory.com/666)

의 순서대로 글을 읽으시면 학습에 더 많은 도움이 됩니다.

---

오늘은 Spring 에서 제공하는 Cache 에 대해서 이야기 해볼 것이다

Spring 에서는 Cache 에 대하여 Spring transaction 과 마찬가지로 높은 추상화를 제공한다

```java
@Transactional // spring transaction support
public Todo create() {
}

@Cacheable // spring cache support
public Todo create() {
}
```

Spring 에서는 이를 Cache Abstraction 이라고 부르는데, 이번 시간에 알아볼 것이다.

Todo Application 을 만드는 case study 를 통해 실제 사례까지 알아볼 수 있으니 끝까지 완주해보자

# TL;DR

[##_Image|kage@bgstCd/btsz9YUwUnE/ZOROFxZObWppzwGuWpcEO0/img.png|CDM|1.3|{"originWidth":1326,"originHeight":464,"style":"alignCenter","width":700,"height":245}_##]

이번 글의 핵심을 요약하면 다음과 같다

# 목차

- Cache 에 대한 간략 정리
- Spring Cache Abstraction 이란?
  - cache 관련된 핵심 클래스 설명
    - cache manager
  - Spring Boot Starter 에 포함된 기본 CacheManager
- Spring Cache 의 핵심, Cache 어노테이션
  - Cacheable
  - CachePut
  - CacheEvict
  - Caching
- Case Study. Todo 를 만들어보며 배우는 Spring Cache
  - step 1. 애플리케이션 세팅 및 sample code 구현
    - cache config
  - step 2. cacheable 을 통한 cache 조회
  - step 3. cacheEvict 를 이용한 cache 초기화
  - step 4. cachePut 을 이용한 cache 업데이트
- cache 를 사용할 때 주의해야할 점
  - cachePut 과 cacheEvict 를 같이 사용하는 경우
  - invalidation 누락과 stale data
- cache expiration
  - 기본 구현은 없음

# Cache 에 대한 간략 설명

지난 [Cache 에 대한 거의 모든 것](https://wonit.tistory.com/666) 에서 우리는 캐시에 대한 개념적, 이론적 내용들을 이해하였다.

[##_Image|kage@b61eD7/btsEKEpyogt/b5A2g8oGGbkYnc78TIc1zk/img.png|CDM|1.3|{"originWidth":2025,"originHeight":682,"style":"alignCenter","width":1519,"height":511}_##]

지난 시간 이야기했던 캐시에 대해서 아주 간략하게 요약해보자

- **캐시는 web application 의 응답/처리 성능 향상을 위해 사용된다**
  - 캐시는 이전에 연산된 값을 재연산 하지 않도록 미리 저장한다
  - 과거에 조회한 데이터가 변하지 않았다면, 이를 빠르게 접근할 수 있도록 저장한다
  - 데이터를 특정 공간에 저장하는 것을 `캐싱한다!` 라고 표현한다
- **캐시 저장소에 데이터를 조회하였을 때는**
  - 값이 존재하면 cache hit
  - 존재하지 않으면 cache miss
- **캐시가 꽉 차면 방출, eviction 을 수행해줘야 한다**
  - 만료 시간에 의한 `expiration`
  - 저장소의 lack of memory 에 의한 `replacement`

만약 기억이 나지 않거나 처음 보는 사람들이라면 앞선 글을 다시 보고 와도 좋다

# Spring 의 Cache Abstraction 이란?

2012 년 Spring framework 3.1 버전이 릴리즈 되고 4.1 버전 즈음에 Spring Integration 의 하위 모듈로 Cache Abstraction 이라는 기능이 함께 포함되어 릴리즈 되었다,

[##_Image|kage@NB2b9/btsELpTl5Zr/4JgnFv1jakViKZRKEvC9x1/img.png|CDM|1.3|{"originWidth":1806,"originHeight":1736,"style":"alignCenter","width":360,"height":346}_##]

JPA 와 마찬가지로 캐싱도 역시 [JCache (JSR-107)](https://www.javadoc.io/doc/javax.cache/cache-api/1.0.0/index.html) 이라고 불리는 캐싱에 대한 표준이 존재하였는데, 2012년도 출시한 Spring 3.1 버전과 4.1 버전 이후부터 이를 공식적으로 지원 및 강력한 확장 기능을 제공한다

Spring 에서는 JCache 에서 사용할 수 없는 기능들 외에도 더욱 다양한 기능을 제공한다.

대표적으로는 단일 캐시만 지원하는 JCache 와 달리 `CacheResolver` 를 통해 cache 에 name 을 지정할 수 있고, 구분할 수 있어 multi cache 구성이 가능하다

이제 역사는 여기까지만 알아보고, 실제로 Spring Cache Abstraction 를 지탱하는 구성요소들에 대해서 간략히 알아보자

## Spring Cache Abstraction 의 핵심 요소들

Spring Cache Abstraction 에서는 크게 3가지 클래스가 존재한다

[##_Image|kage@cpzxop/btsEEWZOwhS/AxKetxTilRDtDRJh05zKv1/img.png|CDM|1.3|{"originWidth":2141,"originHeight":872,"style":"alignCenter","width":752,"height":306}_##]

1. CacheManager
2. Cache
3. CacheResolver

이 3개의 핵심 클래스들과 여러가지 CacheOperation 들을 통해 Spring 은 AOP 로 캐싱을 지원한다

### 1. CacheManager

CacheManager 는 이름에서부터 알 수 있듯 Spring cache abstraction 의 가장 중심적이고 핵심적인 클래스이다.

Redis, Caffeine 이나 Ehcache 와 같은 캐시 구현체의 인스턴스를 생성/관리하는 역할을 수행한다.

Spring Cache 를 사용하려면 필수적으로 CacheManager 인스턴스를 등록해줘야 한다.

이 CacheManager interface 덕분에 우리가 여러가지 cache 의 구현체들을 바꾸더라도 기존 코드에 영향 없이 변경이 가능하게 되는 것이다

### 2. CacheResolver 와 Cache

CacheResolver 는 name 을 기반으로 Cache 를 찾을 수 있게 해준다.

이 특징이 JCache 와 다른 점인데, Spring 은 name 을 통해 여러개의 캐싱을 가능하게 한다.

CacheResolver 를 통해 Cache 라는 객체를 찾아오면, 우리는 해당 객체에게 Put, Evict 나 조회 명령을 수행한다.

## Spring Boot 와 Cache Abstraction

기본적으로 Spring Cache Abstraction 은 Abstraction 일 뿐이다.

Cache Abstraction 이 있으면 Implementation 이 존재해야 하고, 구현을 등록해줘야 하지만 `spring-boot-starter-cache` 를 gradle 의존으로 추가하면 autoconfiguration 에 의해 기본 구현체가 등록된다.

[##_Image|kage@bm4nSk/btsEGPSMl5a/yxXW0CpG6at8pukeyKIDrk/img.png|CDM|1.3|{"originWidth":1226,"originHeight":848,"style":"alignCenter","width":635,"height":439}_##]

이 클래스는 `spring-boot-autoconfigure` 에 존재하는 `SimpleCacheConfiguration` 클래스이다

해당 클래스를 보면 CacheManager Bean 이 없다면 기본으로 `ConcurrentCacheManager` 를 사용한다.

`ConcurrentCacheManager` 내부적으로는 일반적인 HashMap 에서 segmented locking 을 추가하여 Thread-Safe 를 보장하는 [ConcurrentHashMap](https://en.wikipedia.org/wiki/Java_ConcurrentMap) 을 이용한다.

### CacheManager 등록하기

CacheManager Bean 을 Redis 나 Caffeine 과 같은 다른 구현체를 이용하는 것 역시 가능하다.

우리가 직접 Bean 으로 `RedisCacheManager` 나 `CaffeineCacheManager` 를 등록해주거나 Configuration property 를 이용하면 된다.

`CacheProperties` 를 확인해보자

[##_Image|kage@q6tte/btsEIPrkSeo/afaSx4X6k2YXwKoXo8rp8k/img.png|CDM|1.3|{"originWidth":1102,"originHeight":338,"style":"alignCenter","width":713,"height":219}_##]

ConfigurationProperties 를 보면 "spring.cache" 라는 설정 값을 기반으로 동작하는데, 내부적으로는 Redis property, Caffeine property 등을 지원하므로 자세한 속성과 configuration 은 [Spring docs-Configuring the Cache Storage](https://docs.spring.io/spring-framework/reference/integration/cache/store-configuration.html) 를 확인하자

# Spring Cache 의 핵심, Cache 어노테이션

Spring Cache 은 다른 Spring family 와 동일하게 어노테이션을 통한 선언적으로 캐시를 관리할 수 있게 해준다.

다음 행위와 어노테이션만 이해해도 Spring Cache 를 가볍게 이용하는데 무리가 없을 것이다

Spring Cache Abstraction 에서는 5가지 어노테이션을 제공한다.

- **@Cacheable** -> Cache 에 값을 쓰기/읽기
- **@CachePut** -> Cache 에 값을 갱신
- **@CacheEvict** -> Cache 를 초기화
- **@Caching** -> cache 연산을 하나로 만들어주기
- **@CacheConfig** -> cache 설정 공유하기

하나씩 알아보자

### **@Cacheable**

**메서드의 호출 결과, 즉 return value 를 cache 에 저장하고 이후 동일한 요청이라고 판단될 경우 실제 메서드를 호출하지 않고 cache 에 존재하는 값을 반환한다**

어떤 데이터를 캐싱한다 라고 했을 때 `@Cacheable` 만 명시하면 끝이다.

### **@CachePut**

**메서드의 호출 결과, 즉 return value 를 강제로 캐시에 저장/갱신 한다**

보통 caching 된 데이터를 update 할 때 사용한다

### **@CacheEvict**

**cache 에 존재하는 데이터가 stale 되어 invalidate 시킬 때, 즉 캐시를 초기화할 때 사용한다**

cache 는 정합성이 중요하다. 어떤 데이터를 `@Cacheable` 로 캐시에 적재했는데, 그 데이터가 업데이트 되었다.

Put 을 통해 하나하나 update 하기도 힘들고 할 수도 없을 때는 Evict 를 통해서 캐싱된 데이터를 날려버리는 것도 좋은 방법이다.

### **@Caching**

**여러 캐시 연산들을 하나로 묶을 때 사용한다**

어떤 메서드 위에서는 cache 된 데이터가 update 되며 동시에 다른 cache 에는 evict 가 되어야 할 때 `@Caching` 을 사용하면 좋다

# Case Study. Todo 를 만들어보며 배우는 Spring Cache

이제 실제로 Todo Application 을 만들어보면서 Spring Cache 를 한 번 느껴보자

내부적으로는 복잡할 수 있지만 Spring Cache 가 정말 추상화를 잘 해놓았기 때문에 정말 쉽게 사용할 수 있다

다음 4가지 step 을 통해서 cache 를 경험해보고 추가적으로 **캐시를 사용할 때 마주할 수 있는 문제**도 함께 알아볼 것이다

- step 1. 애플리케이션 세팅 및 sample code 구현
- step 2. cacheable 을 통한 cache 조회
- step 3. cacheEvict 를 이용한 cache 초기화
- step 4. cachePut 을 이용한 cache 업데이트

위의 코드와 테스트 환경을 위한 자세한 세팅 값 및 http req file 들은 [https://github.com/my-research/spring-cache](https://github.com/my-research/spring-cache) 에서 확인할 수 있다

## step 1. Todo 애플리케이션 세팅 및 코드 구현

## step 2. @Cacheable 을 이용한 cache 조회

## step 3. @CacheEvict 를 이용한 cache 초기화

## step 4. @CachePut 을 이용한 cache update
