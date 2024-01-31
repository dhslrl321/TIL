캐시란 무엇인가 - 캐시에 대한 거의 모든 것

이번에는 cache 에 대해서 알아볼 것이다.

cache 라고 한다면 computer science 에서 정말 다양한 분야에서 사용되고, 동일한 기능을 수행하지만 문맥에 따라서 다른 이해도가 필요하다.

나는 cache 에 대해서 web application layer 의 문맥에서 설명을 할 것이고, software cache 에 대한 설명을 주로 할 것이다.

hardware cache 와 더 low level 의 cache 를 원한다면 이 글은 적합하지 않을 수 있다.

# TL;DR

[##_Image|kage@bgstCd/btsz9YUwUnE/ZOROFxZObWppzwGuWpcEO0/img.png|CDM|1.3|{"originWidth":1326,"originHeight":464,"style":"alignCenter","width":700,"height":245}_##]

이번 글의 핵심을 요약하면 다음과 같다

- **캐시란 무엇인가**
  - cache: 데이터를 저장하여 미래에 해당 데이터에 대한 요청을 더 빠르게 처리할 수 있도록 하는 hardware 혹은 software
  - cache 의 종류
    - h/w cache
    - s/w cache
- **왜 cache 가 효과적일까?**
  - software 에서 프로세서의 특성인 참조 지역성을 구현한 것이 바로 캐시임
    - 참조 지역성: 프로세서가 짧은 시간 동안 동일한 메모리 위치에 특정 패턴을 가지고 반복적으로 액세스 하는 경향
- **cache 성능과 cache 교체 전략**
  - cache 성능
    - cache hit & cache miss
    - cache hit ratio
  - cache 교체 정책
    - LRU
    - MRU
    - 그 외의 알고리즘
      - balady
      - RR
- **cache 성능 최적화**
  - 성능 향상? LRU 도 포함됨
  - multi level cache
  - write buffer
- **그럼 cache 는 언제 쓰는가?**
  - cache 는 비싼 리소스므로 비용 효율성을 높이려면 backing store 에 비해 작게 유지되어야 함
  - 자주 바뀌지 않는데 자주 사용되는 데이터일 경우 매우 유용함

---

# 1. cache 란 무엇인가?

cache 는 데이터를 저장하여 향후 데이터에 대한 요청을 더 빠르게 처리할 수 있도록 하는 h/w 혹은 s/w 이다.

cache 의 컨셉은 아주 간단하다. 그림으로 이해해보자.

어떤 웹 애플리케이션이 있고 다음과 같이 요청을 처리하여 사용자가 응답을 받기까지 2,000ms 가 소요된다고 가정했을 때

[##_Image|kage@bmtHZz/btsDnfsUQND/NsLcJC0ejP2aPqsQDOT0Uk/img.png|CDM|1.3|{"originWidth":1123,"originHeight":440,"style":"alignCenter","width":842,"height":330}_##]

추후에도 이러한 요청이 올 것을 예측해, 연산의 결과나 응답을 미리 어떤 공간에 저장해놓는 것이다.

[##_Image|kage@GJ5Gi/btsDrgjizKK/cIAr2yBkiPKhtatKb11Dn1/img.png|CDM|1.3|{"originWidth":1123,"originHeight":837,"style":"alignCenter","width":782,"height":583}_##]

그리고 이후 요청들에 대해서는 entries 를 조회하였을 때 존재하면 그 미리 저장된 결과를 바로 반환한다.

[##_Image|kage@7AX9J/btsDp8fgCZv/SzyrLkcD7kFDGa4fcrKXuK/img.png|CDM|1.3|{"originWidth":1123,"originHeight":837,"style":"alignCenter","width":842,"height":628}_##]

만약 데이터가 entries 에 존재한다면 결과를 바로 반환할 것이고 그렇지 않다면 기존 요청과 같이 전체 플로우를 동일하게 진행하는 것이다

### 캐시는 거창하지 않다.

캐시는 꼭 어떠한 솔루션을 이용해야하 캐시를 쓰는 것일까? 그렇지 않다.

단순히 코드레벨에서 db 결과값을 저장해놨다가 쓴다는 것 자체도 cache 라고 볼 수 있다

```java
public class FooService {

  // DB connection & interactions
  private final FooRepository repository;
  // In memory operations
  private final Map<UserId, User> myCache;

  public User getUser(UserId id) {
    if (myCache.contains(id)) {
      return myCache.get(id);
    }

    return repository.findBy(id);
  }
}
```

이제 다시 본론으로 돌아와서, 캐시에 대한 정의를 마무리해보자

## 1-1. 캐시는 결국 무엇인가?

캐시는 **이전 계산의 결과**나 다른 곳에 **저장된 데이터의 복사본**을 특정 공간에 저장하여 재사용하는 것을 의미한다.

- **이전 계산의 결과**: 동일한 매개변수라면 결과도 동일할 것이므로 이중 연산에 대한 overhead 를 줄여준다
- **데이터의 복사본**: 물리적으로 떨어진 데이터를 조회할 때 발생하는 overhead 를 줄여준다

## 1-2. 대표적인 캐시의 종류

캐시는 2가지 종류로 크게 나눌 수 있다.

1. hardware cache
2. software cache

### 캐시의 종류 - hardware cache

hardware cache 는 operating system 과 computer architecture 에서 자주 언급되는 CPU cache 가 대표적이다.

[##_Image|kage@boTxJN/btsDnvCwU4G/41MwkWDtUzpFTuKi1lqT8K/img.png|CDM|1.3|{"originWidth":1568,"originHeight":1112,"style":"alignCenter","width":595,"height":422}_##]

H/W 나 S/W 모두 컨셉은 동일하다.

H/W cache 중에 CPU cache 는 주기억장치인 RAM 과 보조기억장치 사이의 속도를 향상시키기 위한 목적으로 사용된다

### 캐시의 종류 - software cache

software cache 는 application layer 에서 동작하는 cache 를 생각하면 된다

유명한 솔루션인 Redis 를 사용하여 DB 데이터나 연산 결과를 저장하는 global cache 도 software cache 이며

MySQL 에서 사용되는 [InnoDB buffer](http://www.asktheway.org/official-documents/mysql/refman-5.6-en.html-chapter/innodb-storage-engine.html) 나 복잡한 데이터 조합을 미리 만들어 저장하는 [materialized view](https://learn.microsoft.com/ko-kr/azure/architecture/patterns/materialized-view) 도 cache 에 속한다.

## 1-3. 왜 cache 가 효과적일까?

왜 cache 가 효과적일까? 이쯤 되면 앞선 설명으로 cache 가 더 빠른 속도로 요청을 처리하는 것은 당연해 보일 것이다.

cache 가 효과적인 이유는 computer science 에서 필연적으로 발생하는 **참조 지역성, Locality of Reference** 때문이다.

### Locality of Reference, 참조 지역성 때문이다!

참조 지역성, Locality of Reference 은 **프로세서가 짧은 시간 동안 동일한 메모리 위치에 특정 패턴을 가지고 반복적으로 액세스 하는 경향**을 의미한다.

결국 반복적으로 액세스하는 경향만 잘 이용한다면 최적화를 이뤄낼 수 있고 **그것이 바로 cache 인 것이다**

---

# 2. cache hit 와 miss 그리고 ratio

cache 를 사용하는 client 는 상황에 따라 다양하다.

네트워크 캐시를 사용하는 브라우저가 될 수도, cache memory 를 사용하는 CPU 가 될 수도, global cache storage 를 사용하는 redis 가 될 수도 있다.

이러한 cache client 는 backing store 에 존재한다고 생각되는 데이터에 접근할 때 cache 를 조회하여 2가지 결론을 낸다.

[##_Image|kage@bpFwan/btsDEjT1BrR/fNy9vlZeEDrpCAUyyhvD51/img.png|CDM|1.3|{"originWidth":987,"originHeight":595,"style":"alignCenter","width":566,"height":341}_##]

1. **cache hit**, cache 에 client 가 원하는 데이터가 존재해
2. **cache miss**, cache 에 client 가 원하는 데이터가 존재하지 않아

### 2-1. cache hit

client 가 원하는 데이터가 cache memory 에 존재할 경우 cache hit 라고 한다

[##_Image|kage@bPx4ag/btsDyDtEWZq/D0I90Bdu3hdXV9wMzOZFN1/img.png|CDM|1.3|{"originWidth":766,"originHeight":595,"style":"alignCenter","width":456,"height":354}_##]

cache client 는 cache hit 시 해당 데이터를 그대로 반환하기 때문에 별도의 추가 작업이 필요하지 않다

그래서 cache hit 가 많을 수록 전반적으로 시스템의 성능이 향상된다

### 2-2. cache miss

하지만 client 가 원하는 데이터가 cache 에 존재하지 않는 경우라면 이야기는 달라진다.

이를 cache miss 라고 한다

[##_Image|kage@cT8yLv/btsDEiU7ABP/fZt43kPCkchYLIaD1kQSP1/img.png|CDM|1.3|{"originWidth":1123,"originHeight":595,"style":"alignCenter","width":738,"height":391}_##]

만약 cache miss 가 발생했다면 cache client 는 backing store 에 다시 요청을 통해 데이터를 조회하는 과정이 추가적으로 발생하고 성능 하락으로 이어지게 된다.

### 2-3. cache ratio

cache ratio 는 2가지가 존재한다.

1. cache hit ratio
2. cache miss ratio

cache hit ratio 와 cache miss ratio 는 각각에 대한 비율이다

[##_Image|kage@cwM2k4/btsDBRkT8jG/5AzjY4khVTM7dVHW0ITn3K/img.png|CDM|1.3|{"originWidth":2407,"originHeight":253,"style":"alignCenter","width":1805,"height":190}_##]

전체 요청(액세스)에 대비해서 얼마나 hit or miss 인지 나타내는 비율인데, 당연히 hit ratio 가 높아져야 cache 에 대한 성능 평가와 설계가 잘 되었다고 한다

### 그럼 cache miss 가 발생한다면 어떤 상황이 벌어지게 될까?

cache miss 가 발생하면 cache client 는 2가지를 고민해야한다

1. 추후를 대비해 이 데이터를 cache 에 적재해 놓을까?
2. 만약 적재를 하려는데 cache 가 꽉 찼다면 어떤 데이터를 삭제해야하지?

이 고민을 더 자세히 알아보자

---

# 3. 캐시 방출과 교체

앞선 고민은 cache 를 사용할 때 한 번쯤 해봐야 하는 고민이다.

이 고민 안에는 사실 2가지의 큰 개념이 숨어있는데, 그것이 바로 eviction 과 replacement 이다

## 3-1. 캐시 방출, cache eviction

cache 는 특정한 형태의 저장소이다. 즉, 제한된 크기를 가지고 있기 때문에 언젠가는 데이터가 꽉 차게 된다.

만약 새로운 데이터를 cache 에 적재하려 하는데 cache 가 **꽉 차있다고 가정 해보자**

그럼 당연히 cache 에 새로운 데이터를 수용할 수 있는 공간을 만들어야 할 것이다.

이 때 cache 에 새로운 데이터를 추가하기 위해서는 cache 에 존재하는 특정 데이터를 **삭제라는 과정을 거쳐야 하고 이 것이 바로 cache eviction, 캐시 방출**이라고 한다

[##_Image|kage@4hZ9k/btsDBxNijLy/j7C6vjmnMGahEg3zEN57Jk/img.png|CDM|1.3|{"originWidth":1317,"originHeight":837,"style":"alignCenter","width":652,"height":414}_##]

> cache 를 사용하다 보면 eviction 과 expiration 이라는 용어를 만날 수 있다. 이 둘은 명확히 구분되어야 하는데, eviction 은 명시적으로 의도하지 않은 방출의 행위라면 expiration 은 명시적으로 의도한 방출의 행우이다.

Eviction 은 lack of memory 에 의해서 발생하는 passive 한 연산이다

**그래서 항상 cache 의 put 연산 이전에 완료되어야 한다**

## 3-2. 캐시 교체, cache replacement

캐시 교체는 앞선 **cache miss -> cache eviction -> load data to cache** 의 전체 프로세스를 의미한다

[##_Image|kage@bWx7FN/btsDESQrdhm/5IaeKbFjaP1z37GM4Jttj1/img.png|CDM|1.3|{"originWidth":1541,"originHeight":1167,"style":"alignCenter","width":801,"height":607}_##]

결국 cache miss 가 발생하여 cache eviction 을 통해 공간을 만들고 새로운 데이터를 cache 에 적재하는 행위들을 통틀어서 **교체** 라고 하는 것이다

이 캐시 교체는 cache 의 성능과 효율성에 있어서 아주 중요한 부분을 차지한다.

### cache replacement 는 캐시의 성능과 직결된다

만약 캐시가 꽉 차있어서 **임의로** 어떤 데이터를 evict 하였다.

하지만 해당 데이터는 eviction 된지 얼마 안 있어 다시 교체되어 cache 에 저장되었다.

하지만 또 캐시가 꽉 차서 해당 데이터를 evict 한다면 계속해서 cache miss 가 발생하게 될 것인데 그럼 cache miss ratio 가 올라가 결국 cache 의 성능이 매우 떨어지게 될 것이다

그래서 cache miss 시 cache 에 데이터를 방출하는 방법에 대해 많은 고민이 필요하다

---

# 4. cache 교체 전략

cache 를 교체할 때에는 전략이 필요하다

앞선 예시처럼 cache 를 교체해야 하는데 임의이 데이터를 선택해서 교체했다고 가정해보자.

그렇다면 최악의 상황에서 가장 많이 사용하는 cache 를 방출하게 되어 cache miss ratio 가 높아져 cache 를 사용하는데 큰 효과를 얻지 못하게 될 수 있다.

그래서 cache 교체 전략을 잘 세운다면 cache hit ratio 를 높게 유지할 수 있는데, cache 교체 전략은 Operation System 에서 이야기하는 Page Fault 에 대한 handling 과 유사하게 처리된다.

다양한 replacement algorith 이 존재하는데, 가장 대표적인 LRU 알고리즘에 대해서 알아보자

요즘 사용하는 cache 는 LRU cache 가 가장 대표적이다

## 4-1. cache 교체 전략, LRU (Least Recently Used)

LRU 알고리즘은 **가장 사용하지 않은, 오래된 데이터를 교체하는 전략**이다

이 논리는 앞서 이야기한 **참조 지역성**의 특성 즉, 최근에 사용하지 않은 데이터는 미래에도 사용하지 않을 것이라는 idea 에서 시작되었다.

LRU 알고리즘의 핵심은 바로 `accessOrder` 이다.

즉, 특정 데이터에 얼마나 액세스 했냐를 통해서 데이터가 eviction 될지 말지가 결정되기 때문에 LRU 알고리즘을 사용할 때에는 access 에 대한 tracking 이 필요하다

Java 에서는 `HashMap` 과 `LinkedHashSet` 을 통해서 쉽게 구현이 가능하다

```java
public class MyCache {
  public static final int STORAGE_CAPACITY = 10;
  // 초기 용량이 10 인 map 생성
  HashMap<String, String> storage = new HashMap<>(STORAGE_CAPACITY);
  LinkedHashSet<String> accessOrder = new LinkedHashSet<>();

  /**
   * 캐시 조회
   */
  public String get(String key) {
    if (!storage.containsKey(key)) {
      return "CACHE MISS";
    }
    markUsed(key); // access tracking
    return storage.get(key);
  }

  /**
   * 사용 했다는 마킹
   */
  private void markUsed(String key) {
    accessOrder.remove(key);
    accessOrder.add(key);
  }

  /**
   * 캐시 교체 혹은 적재
   */
  public void put(String key, String value) {
    if (storage.containsKey(key)) {
      throw new IllegalArgumentException("이미 cache 에 존재하는 key 입니다");
    }

    evictLRU(); // 방출
    storage.put(key, value);
  }

  /**
   * 가장 오래 사용되지 않은 데이터를 삭제
   */
  private void evictLRU() {
    if (storage.size() != STORAGE_CAPACITY) { // 만약 캐시가 꽉 차지 않았다면
      return;
    }

    String lruKey = accessOrder.iterator().next();
    storage.remove(lruKey);
  }
}
```

`LinkedHashSet` 은 삽입된 element 의 순서를 알고 있다.

그래서 storage 에 put 을 할 때마다 `삭제 -> 삽입` 과정을 거쳐 access 에 대한 order 를 tracking 할 수 있게 하는 것이 핵심이다

## 4-2. 이외에 어떤 Cache Replacement 전략이 있을까?

이외에도 다양한 Cache Replacement 전략이 존재한다.

하지만 가장 많이 사용하는 알고리즘은 LRU 와 LFU 이므로 이 두가지만 알고 있어도 충분하며 다른 알고리즘들이 크게 어렵지 않다

- **LFU (Least Frequently Used)**
  - LRU 와 동일하게 참조 지역성을 이용하였으나 accessOrder 가 아니라 사용 빈도를 tracking 한다
  - access 에 대한 counter 를 구현하여 빈도를 tracking 하는 방식으로 구현된다
- **MRU (Most Recently Used)**
  - LRU 와 반대로 가장 최근에 사용된 페이지를 교체하는 전략이다
    - 이 컨셉은 한 번 사용되면 가까운 미래에 사용되지 않는 패턴을 이용한다
  - 그래서 패턴이 존재하는 특정 순환 주기의 데이터를 제외하고서는 자주 사용하지 않는다
- **RR (Random Replacement)**
  - 말 그대로 랜덤하게 교체를 하는 알고리즘이다.
  - 구현하기 가장 간단하지만 cache 성능이 매우 떨어질 수 있기 때문에 사용하지 않는다

여담으로 Global Cache 의 대표격인 Redis 는 4.0 버전 이후부터 LRU 뿐만 아니라 LFU 알고리즘을 지원하기 시작했다.

하지만 기본적으로는 다음 시간에 알아볼 내용이지만, TTL(Time To Live) 을 이용한 LRU 를 통해 관리된다

---

# 5. cache 는 언제 사용하는 것이 효과적일까?

[##_Image|kage@cA896E/btsDAjO0mAs/A08UlobPC5dOKIi7dH7qMK/img.png|CDM|1.3|{"originWidth":596,"originHeight":420,"style":"alignCenter","width":175,"height":123}_##]

cache 는 비싸다.

os 책에서 봤을 memory hierarchy 의 비용 그림은 너무나도 유명하다

빠를 수록, cpu 와 가깝고 비싸진다

[##_Image|kage@lSiyh/btsDAGJTMEa/Vp2ROftpVnsZkqxp2LeP00/img.png|CDM|1.3|{"originWidth":670,"originHeight":598,"style":"alignCenter","width":227,"height":203}_##]

cache memory 는 비싸다. 그래서 비용 효율성을 따진다면 backing store 보다 cache 는 훨씬 작게 유지하는 편이 일반적이고 효율적이다.

우리가 적재 적소에 캐시를 잘 배치하였다면 캐시의 크기가 작더라도 강력한 최적화 도구가 될 수 있다.

### 그래서 언제 써야하지?

결론만 이야기하자면 **캐시는 자주 사용되며 잘 바뀌지 않는 데이터일 경우에 적합하다**

우리는 cache replacement 에 대해서 이제 알고있다.

아무리 좋은 교체 알고리즘을 적용하더라도 결국 **교체가 애초에 되지 않는 상황을 만드는 것**이 좋다.

cache hit ratio 가 높을 수록 `eviction` & `replacement` 에 들어가는 오버헤드를 줄일 수 있기 때문이다.

자주 바뀌는 데이터에 대해서는 cache 를 적용하는 것 또한 좋은 선택은 아니다

# 마치며

이제 cache 에 대한 기초를 떼었다고 볼 수 있다.

앞으로 cache 에 대해서 알아야 할 것들과 넘어야 할 산이 매우 높은데, 이번 시간을 통해서 기본적인 그 기본기를 다졌다고 생각하면 될것 같다
