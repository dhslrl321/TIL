[cache 101 - 1 캐시란 무엇인가]

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

# cache 란 무엇인가?

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

## 캐시는 결국 무엇인가?

캐시는 **이전 계산의 결과**나 다른 곳에 **저장된 데이터의 복사본**을 특정 공간에 저장하여 재사용하는 것을 의미한다.

- **이전 계산의 결과**: 물리적으로 떨어진 데이터를 조회할 때 발생하는 overhead 를 줄여준다
- **데이터의 복사본**: 동일한 매개변수라면 결과도 동일할 것이므로 이중 연산에 대한 overhead 를 줄여준다

## 대표적인 캐시의 종류

캐시는 2가지 종류로 크게 나눌 수 있다.

1. hardware cache
2. software cache

### 1. hardware cache

hardware cache 는 operating system 과 computer architecture 에서 자주 언급되는 CPU cache 가 대표적이다.

[##_Image|kage@boTxJN/btsDnvCwU4G/41MwkWDtUzpFTuKi1lqT8K/img.png|CDM|1.3|{"originWidth":1568,"originHeight":1112,"style":"alignCenter","width":595,"height":422}_##]

H/W 나 S/W 모두 컨셉은 동일하다.

H/W cache 중에 CPU cache 는 주기억장치인 RAM 과 보조기억장치 사이의 속도를 향상시키기 위한 목적으로 사용된다

### 2. software cache

software cache 는 application layer 에서 동작하는 cache 를 생각하면 된다

유명한 솔루션인 Redis 를 사용하여 DB 데이터나 연산 결과를 저장하는 global cache 도 software cache 이며

MySQL 에서 사용되는 [InnoDB buffer](http://www.asktheway.org/official-documents/mysql/refman-5.6-en.html-chapter/innodb-storage-engine.html) 나 복잡한 데이터 조합을 미리 만들어 저장하는 [materialized view](https://learn.microsoft.com/ko-kr/azure/architecture/patterns/materialized-view) 도 cache 에 속한다.

# 왜 cache 가 효과적일까?

왜 cache 가 효과적일까? 이쯤 되면 앞선 설명으로 cache 가 더 빠른 속도로 요청을 처리하는 것은 당연해 보일 것이다.

cache 가 효과적인 이유는 computer science 에서 필연적으로 발생하는 **참조 지역성, Locality of Reference** 때문이다.

### 참조 지역성, Locality of Reference 이란?

참조 지역성, Locality of Reference 은 **프로세서가 짧은 시간 동안 동일한 메모리 위치에 특정 패턴을 가지고 반복적으로 액세스 하는 경향**을 의미한다.

결국 반복적으로 액세스하는 경향만 잘 이용한다면 최적화를 이뤄낼 수 있고 그것이 바로 cache 인 것이다

# cache 의 성능

cache 를 사용하는 client 는 상황에 따라 다양하다.

네트워크 캐시를 사용하는 브라우저가 될 수도, cache memory 를 사용하는 CPU 가 될 수도, global cache storage 를 사용하는 redis 가 될 수도 있다.

이러한 cache client 는 backing store 에 존재한다고 생각되는 데이터에 접근할 때 cache 를 조회하여 2가지 결론을 낸다.

[##_Image|kage@bpFwan/btsDEjT1BrR/fNy9vlZeEDrpCAUyyhvD51/img.png|CDM|1.3|{"originWidth":987,"originHeight":595,"style":"alignCenter","width":566,"height":341}_##]

1. **cache hit**, cache 에 client 가 원하는 데이터가 존재해
2. **cache miss**, cache 에 client 가 원하는 데이터가 존재하지 않아

## cache hit

client 가 원하는 데이터가 cache memory 에 존재할 경우 cache hit 라고 한다

[##_Image|kage@bPx4ag/btsDyDtEWZq/D0I90Bdu3hdXV9wMzOZFN1/img.png|CDM|1.3|{"originWidth":766,"originHeight":595,"style":"alignCenter","width":456,"height":354}_##]

cache client 는 cache hit 시 해당 데이터를 그대로 반환하기 때문에 별도의 추가 작업이 필요하지 않다

그래서 cache hit 가 많을 수록 전반적으로 시스템의 성능이 향상된다

## cache miss

하지만 client 가 원하는 데이터가 cache 에 존재하지 않는 경우라면 이야기는 달라진다.

이를 cache miss 라고 한다

[##_Image|kage@cT8yLv/btsDEiU7ABP/fZt43kPCkchYLIaD1kQSP1/img.png|CDM|1.3|{"originWidth":1123,"originHeight":595,"style":"alignCenter","width":738,"height":391}_##]

만약 cache miss 가 발생했다면 cache client 는 backing store 에 다시 요청을 통해 데이터를 조회하는 과정이 추가적으로 발생하고 성능 하락으로 이어지게 된다.

## 만약 cache miss 가 발생하면?

cache miss 가 발생한다면 어떤 상황이 벌어지게 될까?

이 때, cache client 는 2가지를 고민해야한다

1. 추후를 대비해 이 데이터를 cache 에 적재해 놓을까?
2. 만약 적재를 하려는데 cache 가 꽉 찼다면 어떤 데이터를 삭제해야하지?

새로운 데이터를 cache 에 적재하려 하는데 cache 가 꽉 차있어서 다른 데이터를 방출해야 한다고 해보자.

근데 이때 방출한 데이터가 cache 에서 자주 사용이 되었고 앞으로도 자주 사용이 될 데이터만 찾아서 방출해버린다면 cache 를 사용하는데 큰 효과가 없을 것이다

그래서 cache miss 시 cache 에 데이터를 적재 & 방출하는 방법에 대해서도 고민이 필요하고 이것이 바로 캐시 교체 전략이다.

# cache 교체 전략

cache miss 가 발생했을 시, 새로 검색된 데이터를 다시 cache 에 적재하려 할 때, 이전에 존재했던 일부의 다른 캐시 항목이 제거가 된다.

이를 replacement 라고 하고 다양한 replacement 알고리즘이 존재한다

---

---

---

---

---

---

---

---

---

---

---

---

# cache 는 언제 사용하는 것이 효과적일까?

[##_Image|kage@cA896E/btsDAjO0mAs/A08UlobPC5dOKIi7dH7qMK/img.png|CDM|1.3|{"originWidth":596,"originHeight":420,"style":"alignCenter","width":175,"height":123}_##]

cache 는 비싸다.

os 책에서 봤을 memory hierarchy 의 비용 그림은 너무나도 유명하다

빠를 수록, cpu 와 가깝고 비싸진다

[##_Image|kage@lSiyh/btsDAGJTMEa/Vp2ROftpVnsZkqxp2LeP00/img.png|CDM|1.3|{"originWidth":670,"originHeight":598,"style":"alignCenter","width":227,"height":203}_##]

cache memory 는 비싸다. 그래서 비용 효율성을 따진다면 backing store 보다 cache 는 훨씬 작게 유지하는 편이 일반적이고 효율적이다.

우리가 적재 적소에 캐시를 잘 배치하였다면 캐시의 크기가 작더라도 강력한 최적화 도구가 될 수 있다.

## 그래서 언제 써야하지?

결론만 이야기하자면 **캐시는 자주 사용되며 잘 바뀌지 않는 데이터일 경우에 적합하다**

그 사유는 2가지 이다

1. cache replacement
2.
