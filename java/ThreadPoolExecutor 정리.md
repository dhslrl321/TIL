java 의 ThreadPoolExecutor 에 대한 이야기

# TL;DR

[##_Image|kage@bgstCd/btsz9YUwUnE/ZOROFxZObWppzwGuWpcEO0/img.png|CDM|1.3|{"originWidth":1326,"originHeight":464,"style":"alignCenter","width":700,"height":245}_##]

이번 글의 핵심을 요약하면 다음과 같다

- Executor 와 ExecutorService 란
- ThreadPoolExecutor 란
- 번외, 적절한 ThreadPool 의 개수는

# 사전지식, Executor 와 ExecutorService 란

ThreadPoolExecutor 를 이야기 하기 전에 가볍게 관련된 java class 를 짚고 넘어가보자

### Executor

java5 버전이 출시될 때 `java.util.concurrent` 패키지 threading, scheduling 과 같은 비동기 작업을 더 쉽게 할 수 있도록 `Executor` 라는 인터페이스가 추가되었다.

- 명시적으로 `new Thread` 를 통해 스레드를 생성하지 않아도 됨
- runnable 작업을 쉽게 실행할 수 있도록 도와줌
- 스레드 생명주기를 애플리케이션 개발자들이 쉽게 관리할 수 있도록 함

### ExecutorService

Executor 인터페이스를 확장하여 비동기 task 의 실행을 더 쉽고 확장성 있도록 관리하는 확장 인터페이스이다.

- task 실행이 더욱 간편해짐
- Executors 라는 static factory class 를 통해 여러 타입의 ExecutorService 인스턴스를 생성할 수 있도록 함
  - fixedThreadPool, singleThread 등등 쉽게 executor 를 생성할 수 있음

이 두 클래스를 잘 이용한다면 다음과 같이 쉽게 threading 을 할 수 있게 된다

```java
public class ExecutorExample {
  public static void main(String[] args) {
    ExecutorService executor = Executors.newSingleThreadExecutor();
    executor.execute(() -> {
        System.out.println("비동기 작업 실행");
    });

    executor.shutdown();
  }
}
```

# ThreadPoolExecutor 란?

앞서 설명한 ExecutorService 의 ThreadPooling 을 제공하는 implementation 이라고 할 수 있다

ThreadPoolExecutor 를 이해하기 위해서 `new` 를 통해 직접 인스턴스를 생성하기 위한 parameter 들을 봐보자.

> 실제로는 Executors 라는 static factory 를 통해 생성하기 때문에

```java
ThreadPoolExecutor executor = new ThreadPoolExecutor(
  2, // corePoolSize
  4, // maximumPoolSize
  60, // keepAliveTime
  TimeUnit.SECONDS, // unit
  new LinkedBlockingQueue<Runnable>(), // workQueue
  Executors.defaultThreadFactory(), // threadFactory
  new ThreadPoolExecutor.AbortPolicy()
); // handler
```

위 파라미터로 전달되는 인자 값들이 어떤 것을 의미하는지 알아보자

### 1. corePoolSize

### 2. maximumPoolSize

### 3. workQueue
