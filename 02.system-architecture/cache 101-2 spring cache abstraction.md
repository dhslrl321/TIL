cache 101 - Spring Cache 에 대하여 (feat. 캐시로 todo list 를 만들어보자)

cache 101 시리즈는 web application 을 개발하며 마주하는 cache 에 대해 필요한 지식과 도구들의 사용법을 학습하는 시리즈입니다.

- [1. Cache 에 대한 거의 모든 것](https://wonit.tistory.com/666)

의 순서대로 글을 읽으시면 학습에 더 많은 도움이 됩니다.

---

오늘은 Spring 에서 제공하는 Cache 에 대해서 이야기 해볼 것이다

Spring 에서는 Cache 에 대하여 Spring Transaction 과 마찬가지로 높은 추상화를 제공한다

```java
@Transactional // spring transaction support
public Todo create() {}

@Cacheable // spring cache support
public Todo create() {}
```

Spring 에서는 이를 Cache Abstraction 이라고 부르는데, 이번 시간에는 그 개념과 case-study 를 통해 사용 방법까지 알아볼 예정이다.

# TL;DR

[##_Image|kage@bgstCd/btsz9YUwUnE/ZOROFxZObWppzwGuWpcEO0/img.png|CDM|1.3|{"originWidth":1326,"originHeight":464,"style":"alignCenter","width":700,"height":245}_##]

### 목차

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
  - step 1. 애플리케이션 세팅 및 sample code 구현 (cache configuration)
  - step 2. `@Cacheable` 을 통한 cache 조회
  - step 3. `@CacheEvict` 를 이용한 cache 초기화
  - step 4. `@CachePut` 을 이용한 cache 업데이트
  - step 5. `@Caching` 을 이용한 복합 cache 관리
- Cache 더 잘 쓰기
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

2012 년 Spring framework 3.1 버전이 릴리즈 되고 4.1 버전 즈음에 **Spring Integration 의 하위 모듈로 Cache Abstraction 이라는 모듈이 함께 포함**되어 릴리즈 되었다,

[##_Image|kage@NB2b9/btsELpTl5Zr/4JgnFv1jakViKZRKEvC9x1/img.png|CDM|1.3|{"originWidth":1806,"originHeight":1736,"style":"alignCenter","width":360,"height":346}_##]

JPA 와 마찬가지로 캐싱도 역시 [JCache (JSR-107)](https://www.javadoc.io/doc/javax.cache/cache-api/1.0.0/index.html) 이라고 불리는 캐싱에 대한 표준이 존재하였는데, 2012년도 출시한 Spring 3.1 버전과 4.1 버전 이후부터 이를 공식적으로 지원 및 강력한 확장 기능을 제공한다

Spring 에서는 JCache 에서 **사용할 수 없는 기능**들 **외**에도 더욱 **다양한 기능을 제공**한다.

대표적으로는 단일 캐시만 지원하는 JCache 와 달리 `CacheResolver` 를 통해 cache 에 name 을 지정할 수 있어 multi cache 구성이 가능하다

이제 역사는 여기까지만 알아보고, 실제로 Spring Cache Abstraction 를 지탱하는 구성요소들에 대해서 간략히 알아보자

## Spring Cache Abstraction 의 핵심 요소들

Spring Cache Abstraction 에서는 크게 3가지 클래스가 존재한다

[##_Image|kage@cpzxop/btsEEWZOwhS/AxKetxTilRDtDRJh05zKv1/img.png|CDM|1.3|{"originWidth":2141,"originHeight":872,"style":"alignCenter","width":752,"height":306}_##]

1. CacheManager
2. Cache
3. CacheResolver

이 3개의 핵심 클래스들과 여러가지 CacheOperation 들을 통해 Spring 은 AOP 로 캐싱을 지원한다

### 1. CacheManager

CacheManager 는 이름에서부터 알 수 있듯 Spring cache abstraction 의 가장 **핵심적인 클래스**이다.

Redis, Caffeine 혹은 Ehcache 와 같은 **캐시 구현체**의 인스턴스를 **생성/관리**하는 역할을 수행한다.

Spring Cache 를 사용하려면 필수적으로 `CacheManager` 인스턴스를 등록해줘야 한다.

이 CacheManager interface 의 DIP 덕분에 우리가 여러가지 cache 의 구현체들을 원하는 시점에 편리하게 변경이 가능해졌다

### 2. CacheResolver 와 Cache

`CacheResolver` 는 **name 을 기반으로 Cache 를 찾을 수 있게** 해준다.

앞서 말한 JCache 와 다른 점인 **name 을 통해 multi cache 가 가능하도록 하는 역할**을 수행한다

CacheResolver 를 통해 **Cache 라는 객체를 찾아오면**, 우리는 **해당 객체**에게 Put, Evict 나 조회 명령을 수행한다.

## Spring Boot 와 Cache Abstraction

기본적으로 Spring Cache Abstraction 은 구현이 아닌 추상으로 즉, Implementation 을 등록해줘야 한다

하지만 `spring-boot-starter-cache` 를 gradle 의존으로 추가하면 autoconfiguration 에 의해 기본 구현체가 등록된다.

[##_Image|kage@bm4nSk/btsEGPSMl5a/yxXW0CpG6at8pukeyKIDrk/img.png|CDM|1.3|{"originWidth":1226,"originHeight":848,"style":"alignCenter","width":635,"height":439}_##]

이 클래스는 `spring-boot-autoconfigure` 에 존재하는 `SimpleCacheConfiguration` 클래스이다

해당 클래스를 보면 CacheManager Bean 이 없다면 기본으로 `ConcurrentCacheManager` 를 사용한다.

`ConcurrentCacheManager` 내부적으로는 일반적인 HashMap 에서 segmented locking 을 추가하여 Thread-Safe 를 보장하는 [ConcurrentHashMap](https://en.wikipedia.org/wiki/Java_ConcurrentMap) 을 이용한다.

### CacheManager 등록하기

CacheManager Bean 을 Redis 나 Caffeine 과 같은 다른 구현체를 이용하는 것 역시 가능하다.

우리가 직접 Bean 으로 `RedisCacheManager` 나 `CaffeineCacheManager` 를 등록해주거나 Configuration property 를 이용하면 된다.

[##_Image|kage@q6tte/btsEIPrkSeo/afaSx4X6k2YXwKoXo8rp8k/img.png|CDM|1.3|{"originWidth":1102,"originHeight":338,"style":"alignCenter","width":713,"height":219}_##]

spring cache 의 `ConfigurationProperties` 클래스를 보면 `"spring.cache"` 라는 설정 값을 기반으로 동작하는데, 내부적으로는 Redis property, Caffeine property 등을 지원하므로 자세한 속성과 configuration 은 [Spring docs-Configuring the Cache Storage](https://docs.spring.io/spring-framework/reference/integration/cache/store-configuration.html) 를 확인하자

# Spring Cache 의 핵심, Cache 어노테이션

Spring Cache 은 다른 Spring family 와 동일하게 어노테이션을 통한 선언적으로 캐시를 관리할 수 있게 해준다.

다음 행위와 어노테이션만 이해해도 Spring Cache 를 가볍게 이용하는데 무리가 없을 것이다

Spring Cache Abstraction 에서는 5가지 어노테이션을 제공한다.

- **@Cacheable** -> Cache 에 값을 쓰기/읽기
- **@CachePut** -> Cache 에 값을 갱신
- **@CacheEvict** -> Cache 를 초기화
- **@Caching** -> cache 연산을 하나로 만들어주기
- **@CacheConfig** -> cache 설정 공유하기

아래에 나올 case-study 에서 자세히 알아보도록 하고 지금은 개념만 하나씩 핵심만 알아보자

### **@Cacheable**

**메서드의 호출 결과, 즉 return value 를 cache 에 저장하고 이후 동일한 요청이라고 판단될 경우 실제 메서드를 호출하지 않고 cache 에 존재하는 값을 반환한다**

어떤 데이터를 캐싱한다 라고 했을 때 `@Cacheable` 만 명시하면 된다.

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

이제 실제로 간단한 Todo 를 등록하고 조회, 수정할 수 있는 서비스에 Spring Cache 를 추가해보자

내부적으로는 복잡할 수 있지만 Spring Cache 가 **정말 추상화를 잘 해놓았기 때문에**, 쉽게 사용할 수 있다

다음 4가지 step 을 통해서 cache 를 경험해보고 추가적으로 **캐시를 사용할 때 마주할 수 있는 문제**도 함께 알아볼 것이다

- step 1. 애플리케이션 세팅 및 sample code 구현
- step 2. **@Cacheable 을 통한 cache 조회**
- step 3. **@CacheEvict 를 이용한 cache 초기화**
- step 4. **@CachePut 을 이용한 cache 업데이트**
- step 5. **@Caching 을 이용한 복합 캐시 관리**

위의 코드와 테스트 환경을 위한 자세한 세팅 및 세부 구현 로직들은 [https://github.com/my-research/spring-cache](https://github.com/my-research/spring-cache) 에서 확인할 수 있다.

## step 1. Todo 애플리케이션 세팅 및 코드 구현

우리가 만들어볼 TODO application 은 다음 4가지의 API 들을 제공하고 있다.

[##_Image|kage@d9W5xT/btsFs2wmvOH/dO2qbuegcJrdV16A7qF3CK/img.png|CDM|1.3|{"originWidth":1844,"originHeight":1380,"style":"alignCenter"}_##]

API 들은 성격에 따라서 command 와 query 로 분류할 수 있다.

1. TODO 를 생성한다 (**command**)
2. TODO 의 상태를 변경한다 (**command**)
3. TODO 상세를 조회한다 (**query**)
4. user 가 소유한 모든 TODO 를 조회한다 (**query**)

빠르게 저 4개의 API 를 구현할 것인데 사실 핵심은 todo 를 구현하는 것이 아니므로 핵심 로직만 보여줄 것이다.

자세한 코드들은 앞서 이야기 했던 [git repository](https://github.com/my-research/spring-cache) 에서 확인할 수 있다.

#### **먼저 todo 의 상태를 변경하는 command service 를 구현해보자**

```kotlin
// TODO 를 생성한다
fun create(userId: Long, name: String): Todo {
  val todo = Todo(
    userId = userId,
    name = name,
  )
  return repository.save(todo)
}

// TODO 의 상태를 변경한다
fun transit(todoId: Long, status: String): Todo {

  val todo = repository.findById(todoId).orElseThrow()

  todo.transitTo(TodoStatus.valueOf(status))

  return repository.save(todo)
}
```

#### **그리고 todo 의 상태를 조회하는 query service 를 구현해보자.**

여기서 눈여겨봐야 할 점은 repository 에 조회하는 로직에 캐시를 적용한 후 극적인 성능 향상을 체감하기 위해 의도적으로 Thread sleep 을 줬다는 점이다

```kotlin
// userId 에 해당하는 모든 TODO 를 조회한다
fun findAllBy(userId: Long): List<Todo> {
  SleepUtils.sleep()
  return repository.findAllByUserId(userId).toList()
}

// TODO id 를 통해 상세를 조회한다
fun findBy(id: Long): Todo {
  SleepUtils.sleep()
  return repository.findById(id).orElseThrow()
}
```

이제 앞선 로직들을 http 를 통하여 호출할 수 있도록 간단한 Controller 만 구현해주면 실습 준비가 끝난다

## step 2. @Cacheable 을 이용한 cache 조회

**애플리케이션이 준비되었으니 todo 를 하나 생성하고 userId 로 조회해보자!**

우리는 앞서서 thread sleep 을 통해 latency 를 의도적으로 발생시켰다. (약 3초)

[##_Image|kage@no0Fw/btsFqaot3xI/vvEJUiUYNeHxiP7nNxMKJK/img.png|CDM|1.3|{"originWidth":1352,"originHeight":976,"style":"alignCenter","width":555,"height":401}_##]

해당 메서드에 캐시를 적용하여 성능 향상을 시켜보자. 우리가 배웠던 `@Cacheable` 을 명시해주면 된다

```kotlin
@Cacheable(cacheNames = ["todosByUserId"])
fun findAllBy(userId: Long): List<Todo> {
  // 로직 생략
}
```

`@Cacheable` 를 사용할 때는 cacheName 을 지정해줘야 하는데, 이 cache name 은 중요한 역할을 수행한다.

[##_Image|kage@bfN75v/btsFyvMYaHr/4hO1IZ1pYrSOfu552wuxO1/img.png|CDM|1.3|{"originWidth":749,"originHeight":742,"style":"alignCenter","width":365,"height":362}_##]

그럼 위의 그림과 같이 spring cache 가 내부적으로 캐시를 `cache name` (globally unique) -> `cache key` (locally unique) 순서로 구분하여 저장하고 조회한다.

결국 위의 메서드가 호출되면 `todosByUserId` **라는 cache 에 userId(예를 들어 1004) 의 key 를 가진 Todo(id: 1, name:"밥먹기") 라는 value** 가 저장된다

#### 결과

cache 를 적용한 후 API call 의 성능이 향상하는 것은 너무나도 당연하다

- **첫번쨰 요청 & 응답**
  - cache miss 발생 3s 소요
  - 연산의 결과를 cache 에 저장
- **두번째 요청 & 응답**
  - cache hit 발생 (n)ms 소요

## step 3. @CacheEvict 를 이용한 cache 초기화

> **여기서 만약 todo 를 또 추가하고 userId 로 모든 todo 를 조회하면 어떻게 될까?**

우리가 앞선 step 에서 cache miss 에 의해 todo 정보들을 캐시에 적재하였으니 이후 모든 API call 은 cache hit 가 발생하여 backing store 인 database 에 접근을 하지 않을 것이다.

결국 실제로는 todo 가 추가되었지만 **cache 에 의해 최신의 데이터를 제공받지 못하게 되는 상황**이 발생한다.

[##_Image|kage@bcPlTX/btsFJlp417N/cQL46Y2L4nR8TLi9q0LlAK/img.png|CDM|1.3|{"originWidth":1497,"originHeight":668,"style":"alignCenter","width":1122,"height":501}_##]

이떄, cache 에 존재하는 **과거의 데이터**를 `stale data` 라고 하고 cache 를 최신으로 갱신하기 위해 `cache invalidate` 가 발생해야 한다.

cache invalidate 는 여러가지 방법이 존재하는데, **가장 쉬운 방법으로는 cache 에 값을 지워버려 cache miss 를 유도하고 db 에 다시 조회**하도록 하는 방법이다.

이 방법을 사용하려면 `@CacheEvict` 를 사용하면 된다

```kotlin
@CacheEvict(cacheNames = ["todosByUserId"], key = "#userId")
fun create(userId: Long, name: String): Todo {
  val todo = Todo(userId, name)
  return repository.save(todo)
}
```

`@CacheEvict` 어노테이션이 붙어있는 메서드가 호출되면 cacheName 과 key 에 mapping 된 value 들을 모두 모두 evict(방출, 제거)하는 명령을 수행한다.

그럼 앞서 이야기했던것 처럼 todo 가 새롭게 추가되면 userId 에 해당되는 모든 todo cache 를 지워버리기 때문에 추후 조회를 수행하는 client 가 stale data 를 받지 않게 된다

## step 4. @CachePut 을 이용한 cache update

userId 로 조회할 때 cache 를 적용했는데, 이번에는 todo detail 을 조회하는 api 에도 cache 를 적용해보자

역시 마찬가지로 `@Cacheable` 을 이용하면 된다. 이번에는 **todoById** 라는 cache name 을 지정해보자.

```kotlin
@Cacheable("todoById")
fun findBy(id: Long): Todo {
  SleepUtils.sleep()
  return repository.findById(id).orElseThrow()
}
```

> 이런 상황에서 만약 todo 를 update 하면 cache 는 어떻게 될까?

그럼 앞서 이야기했던 방식으로 `@CacheEvict(cacheNames = ["todoById"], key = "#userId")` 를 통해 update 된 todo 가 업데이트될 때마다 Eviction 을 수행하여 cache 를 최신화시킬 수 있을 것이다.

**하지만 cache evict 는 말 그대로 캐시에서 방출시켜버리는 연산이기 때문에 항상 cache miss 가 발생하게 된다.**

[##_Image|kage@bcPlTX/btsFJlp417N/cQL46Y2L4nR8TLi9q0LlAK/img.png|CDM|1.3|{"originWidth":1497,"originHeight":668,"style":"alignCenter","width":1122,"height":501}_##]

그래서 자주 update 된다면 cache evict & cache miss 가 잦아지므로 **캐시를 이용한 성능 향상을 기대하기가 어렵다**.

이런 상황에서는 `@CachePut` 을 통해 cache 에 저장된 값을 update 시켜버리는 방법을 사용하면 좋은 해결책이 될 수 있다.

```kotlin
@CachePut(cacheNames = ["todoById"], key = "#todoId")
fun transit(todoId: Long, status: String): Todo {

  val todo = repository.findById(todoId).orElseThrow()
  todo.transitTo(TodoStatus.valueOf(status))

  return repository.save(todo)
}
```

해당 이렇게 `@CachePut` 을 사용하게 된다면, 해당 어노테이션이 붙은 메서드의 return 값을 cache 에 직접 update 하게 되므로 cache miss 가 발생할 일이 없다.

## step 5. @Caching 을 이용한 복합 캐시 관리

지금 우리는 cache 를 이용해서 다음과 같은 것을을 했다

- **userId 에 해당하는 모든 todo 를 조회할 수 있다**
- **todo 를 생성/추가할 수 있다.**
  - todo 가 추가되면 userId 에 연결된 캐시를 evict 하여 stale 을 방지하였다.
- **todo 의 상태를 변경할 수 있다**
  - todoId 에 연결된 캐시를 update 하여 stale 을 방지하였다

#### 하지만 한 가지 문제가 있다. 다음 플로우를 봐보자

[##_Image|kage@dBdL6Z/btsFJotCpd9/9tKoGCHHajAK6oh1HrVRU1/img.png|CDM|1.3|{"originWidth":1284,"originHeight":923,"style":"alignCenter","width":680,"height":489}_##]

1. **todo 생성**
2. **userId 로 todo 전체 조회** -> cache 적재
3. **특정 todo 업데이트** -> userId cache 에는 반영 x
4. **userId 로 todo 전체 조회** -> stale 데이터 반환

이 상황을 보면 todo update 연산에서 2개의 cache 를 invalidation 해주어야 한다는 것을 의미한다.

1. todoById 캐시를 update
2. todosByUserId 캐시를 evict

2번이 update 가 아닌 evict 인 이유는 **반환값** 때문이다.

`@CachePut` 은 **메서드 호출 반환값**을 cache 에 update 한다고 했는데, transit 메서드의 반환값은 `Todo` 클래스인 반면 todosByUserId cache 에 저장된 value 는 `List<Todo>` 이므로 **반환 타입이 다르므로 사용할 수 없다.**

**또한 param 으로 userId 를 받을 수 없으므로 특정 key 에 해당하는 cache 를 지울 수 없다.**

`@CacheEvict` 의 속성 중에 `allEntries` 라는 속성이 있는데, 해당 속성은 cache name 에 해당하는 모든 캐시 엔트리를 지워버릴 수 있다.

이렇게 2개의 cache 어노테이션을 사용할 때에는 `@Caching` 이라는 어노테이션을 통해 여러개의 **캐시 연산을 하나로 묶을 수 있다.**

```kotlin
@Caching(
  put = [CachePut(cacheNames = ["todoById"], key = "#todoId")],
  evict = [CacheEvict(cacheNames = ["todosByUserId"], allEntries = true)]
)
fun transit(todoId: Long, status: String): Todo {

  val todo = repository.findById(todoId).orElseThrow()
  todo.transitTo(TodoStatus.valueOf(status))

  return repository.save(todo)
}
```

# Spring Cache 더 잘 쓰기

### 1. CachePut 을 사용하며 주의할 점

`@CachePut` 연산은 method 의 반환 값이 cache 에 update 된다.

**이 특성 때문에 발생할 수 있는 문제가 하나 있다.**

cache update 가 runtime 에 발생하기 때문에 메서드의 반환 값이 기존에 cache 에 저장된 객체의 type 과 맞지 않는다면 `@Cacheable` 가 명시된 로직에서 `ClassCastException` 이 발생할 수 있다.

바로 앞선 step 5 에서 발생할 수 있는 문제와 동일하다

compiler type check 를 이용할 수 없기 때문에 항상 타입에 대해서는 주의를 기울여야 한다

### 2. 복합 캐시 연산을 사용하며 주의할 점

앞선 case-study 의 step5 를 보면 서로 다른 캐시 연산을 하나로 묶었는데, `@CacheEvict` 는 위와 같은 상황에서는 최대한 사용하지 않는 것이 바람직하다.

`@CacheEvict` 를 사용하게 된다면 자연스럽게 cache key 에 해당하는 데이터를 없애는 것이기 때문에 자연스럽게 cache miss 확률이 올라간다.

결국 캐시로 인한 성능 향상을 기대하기 어려워진다.

그럼에도 불구하고 우리는 해당 메서드에서 cache key(userId) 를 받을 수 없으니 `CacheEvict` 를 사용할 수 밖에 없다.

**이때 `CacheManager` 를 직접 사용한다면 evict 대신 put 을 수행할 수 있다.**

사실상 우리가 사용하는 `@Cacheable` 이나 `@CachePut` 과 같은 어노테이션은 Spring AOP 를 위한 것이고 결국 내부적으로는 CacheManager 에게 연산을 요청하는 것이다.

다음과 같이 CacheManager 에게 직접 연산을 하는 방법도 존재한다.

```kotlin
@Caching(
  put = [CachePut(cacheNames = ["todoById"], key = "#todoId")],
)
fun transit(todoId: Long, status: String): Todo {

  val todo = repository.findById(todoId).orElseThrow()
  todo.transitTo(TodoStatus.valueOf(status))

  cacheManager.getCache("todosByUserId")
    ?.evict(todo.userId)

  return repository.save(todo)
}
```

### 3. 캐시 만료 정책

캐시에는 expiration 이라는 개념이 있다.

특정 시간이 지나도 캐시가 업데이트되지 않는다면 아예 해당 캐시를 방출시켜버리는 것이다.

기본적으로 ConcurrentCacheManager 에는 cache expiration 이 없지만 caffeine 구현체에는 expiration 이 존재한다.

아래는 Caffeine Cache 를 사용할 때 추가해주는 bean config 를 가져와봤다

```kotlin
@Configuration
class CacheConfig {
  @Bean
  fun caffeineCacheManager(caffeine: Caffeine<Any, Any>): CacheManager {
    val manager = CaffeineCacheManager()
    manager.setCaffeine(caffeine)
    return manager
  }

  @Bean
  fun caffeine(): Caffeine<Any, Any>? {
    return Caffeine.newBuilder()
      .initialCapacity(10)
      .expireAfterWrite(Duration.of(100, ChronoUnit.SECONDS))
      .recordStats()
  }
}
```

위의 코드를 보면 `expireAfterWrite` 옵션을 통해 write 이후 언제 해당 cache 를 expire 시킬지 명시할 수 있다.

# 마치며

이렇게 오늘은 Spring Cache Abstraction 을 통해서 cache 에 대한 개념과 실제 그 구현을 알아보았다.

단순해보이는 todo application 을 만들더라도 여러가지 캐시 정합성에 대한 고민 포인트가 존재한다는 것을 여러분도 확인했을 것이다.

이처럼 cache 는 소프트웨어를 **빠르지만 복잡하게 만드는 요소**중 하나다.

앞선 예제처럼 자주 변경되는 데이터에는 캐시가 매우 비효율적이다. 오히려 관리 요소만 늘리는 것이다.

이처럼 맞지 않는 상황에 캐시를 도입하게 된다면 시스템은 복잡성의 늪에 빠져버리게 되니 주의하자.

아마도 이 시리즈를 전부 완주한다면 어디에 캐시를 배치하고 어떤식으로 캐시 정합성을 맞춰줘야 할지 insight 를 얻어갈 수 있으리라 믿는다.
