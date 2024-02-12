cache 101 - Spring Cache Abstraction 으로 알아보는 cache

cache 101 시리즈는 web application 을 개발하며 마주하는 cache 에 대해 필요한 지식과 도구들의 사용법을 학습하는 시리즈입니다.

- [1. cache 에 대한 거의 모든 것](https://wonit.tistory.com/666)

의 순서대로 글을 읽으시면 학습에 더 많은 도움이 됩니다.

---

오늘은 Spring 에서 제공하는 Cache 에 대해서 이야기 해볼 것이다

Spring 에서는 Cache 에 대하여 Spring transaction 과 마찬가지로 높은 추상화를 제공한다

```java
@Transactional // spring transaction support
public Todo create() {
    // --[start tx]--
    //   business logic   
    // --[commit or rollback tx]--
}

@Caching // spring cache support
public Todo create() {
    // --[caching]--
}
```

오늘은 Spring 이 제공하는 Cache Abstraction 들에 대해서 알아볼 것이다

# TL;DR

[##_Image|kage@bgstCd/btsz9YUwUnE/ZOROFxZObWppzwGuWpcEO0/img.png|CDM|1.3|{"originWidth":1326,"originHeight":464,"style":"alignCenter","width":700,"height":245}_##]

이번 글의 핵심을 요약하면 다음과 같다

- Cache Abstraction 에 대한 소개
- 다양한 캐시 어노테이션
    - @Cacheable
    