# TL;DR

[##_Image|kage@bgstCd/btsz9YUwUnE/ZOROFxZObWppzwGuWpcEO0/img.png|CDM|1.3|{"originWidth":1326,"originHeight":464,"style":"alignCenter","width":700,"height":245}_##]

이번 글의 핵심을 요약하면 다음과 같다

- **@Async 은?**
  - Spring 에서 비동기 작업을 쉽게 실행할 수 있도록 도와주는 기능
- **왜 ThreadPoolTaskExecutor 를 등록해야 할까?**
  - Spring 의 기본 비동기 처리 Executor 는 매번 새로운 thread 를 생성
  - ThreadPool 을 이용할 필요가 있음
- **사전지식**
  - Executor 와 ThreadPoolExecutor
  - Spring 의 TaskExecutor
- **ThreadPoolExecutor 이해하기**
  - 정확히는 ThreadPoolExecutor 안에서 어떤 로직에 의해 새로운 thread 를 만드는지 알아야 함
  - 설정에 따라 single thread 처럼 동작할 수 있음
- **적절한 ThreadPoolTaskExecutor 의 설정 값 찾기**
  - 연산의 종류에 따라 CPU bound / IO bound 로 구분
  - Java Concurrency in Practice 에서 제안하는 계산법
  - 중요한 건 직접 성능 테스트를 통해 확인하기

# Spring 에서 `@Async` 어노테이션

Spring 으로 Application 을 개발하다 보면 **비동기 task 를 실행해야 할 일**이 종종 있다.

다음과 같이 `@EnableAsync` 와 `@Async` 를 이용해서 Spring 에서 비동기 task 를 많이 처리 할 것이다.

[##_Image|kage@bkUonq/btsGAMVqNN6/2LDbvEoFHqI318FiwOozz0/img.png|CDM|1.3|{"originWidth":1392,"originHeight":668,"style":"alignCenter","width":629,"height":302}_##]

다른 보통의 AoP 나 Spring abstraction 의 사용법과 비슷하게, bean 으로 등록된 클래스의 어떤 메서드가 `@Async` 어노테이션으로 decorate 되었다면 Spring 은 해당 method 를 proxy 를 이용하여 **요청 thread 와 별개의 thread 에서 해당 메서드를 수행할 수 있게 한다.**

# 왜 ThreadPoolTaskExecutor bean 을 등록해야 할까?

그럼 **본론**으로 들어가서, `@Async` 를 사용할 때에는 왜 `ThreadPoolTaskExecutor` 를 이용해야 할까?

그 이유는 `@EnableAsync` 어노테이션에서 쉽게 확인 할 수 있다.

[##_Image|kage@8qMmd/btsGCpeyNId/E2EUkvv3EjfcSsEcsyWIPK/img.png|CDM|1.3|{"originWidth":1226,"originHeight":964,"style":"alignCenter","width":595,"height":468}_##]

- 기본적으로 **@EnableAsync** 어노테이션을 사용할 경우 **TaskExecutor 타입의 bean 을 찾음**
- 만약 user 가 등록한 custom bean 이 존재하지 않을 경우 **SimpleAsyncTaskExecutor** 를 사용함
- **SimpleAsyncTaskExecutor 에서는 thread 를 reuse 하지 않음**

즉, 비동기 task 가 발생할 때마다 **계속해서 thread 를 생성**하기 때문이다.

thread 를 생성하는 작업은 매우 **비싼 작업**이라는 사실은 매우 유명한데, 우리가 ThreadPool 을 사용하겠다고 명시하지 않으면 Spring 은 기본적으로 `SimpleAsyncTaskExecutor` 를 비동기 task executor 의 **기본 구현체로 등록** 하기 때문에 애플리케이션의 **성능 하락**이 발생 할 수 있다.

> 왜 ThreadPool 을 사용해야 하는가에 대한 이야기는 하지 않겠다. 이유가 궁금하다면 [10 분 테코톡 ThreadPool - 우테코 youtube](https://www.youtube.com/watch?v=um4rYmQIeRE&t=8s) 에서 확인할 수 있다.

모든 작업에서 thraedPool 을 사용하는 것이 **항상 좋은 성능을 내지는 않지만** (CPU bound 작업과 같은) 우리가 만드는 대부분의 application 은 **IO bound 가 많기 때문에 비동기 처리는 threadPool 을 이용하는 편이 좋다**

# ThreadPoolTaskExecutor 이야기 하기 전에 사전지식

그 전에, 짧은 **사전 지식**을 이야기 해보며 java 의 `Executor` 와 `ExecutorService` 그리고 Spring 의 `TaskExecutor` 에 대해서 알아보자

### 사전지식 1. java 의 Executor 와 ExecutorService

java5 버전이 출시될 때 `java.util.concurrent` 패키지 threading, scheduling 과 같은 비동기 작업을 더 쉽게 할 수 있도록 `Executor` 라는 인터페이스가 추가되었다.

- 개발자는 명시적으로 `new Thread` 를 통해 스레드를 생성하지 않아도 됨
- **runnable 작업을 쉽게 실행할 수 있도록 도와줌**
- 스레드 생명주기를 애플리케이션 개발자들이 쉽게 관리할 수 있도록 함

`ExecutorService` 는 `Executor` 인터페이스를 확장하여 비동기 task 의 실행을 더 쉽고 확장성 있도록 관리하는 확장 인터페이스이다.

- task 실행이 더욱 간편해짐
- Executors 라는 static factory class 를 통해 여러 타입의 ExecutorService 인스턴스를 생성할 수 있도록 함
  - fixedThreadPool, singleThread 등등 쉽게 executor 를 생성할 수 있음

이 두 클래스를 잘 이용한다면 다음과 같이 **쉽게 threading 을 할 수 있게 된다**

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

### 사전지식 2. Spring 의 TaskExecutor

[Spring Core docs 의 TaskExecution](https://docs.spring.io/spring-framework/reference/integration/scheduling.html) 에서 알 수 있지만 Spring 은 TaskExecutor 를 통해 비동기 작업에 대한 추상화를 제공한다.

TaskExecutor 는 앞서 설명한 java 의 Executor 를 wrapping 한 인터페이스로 `java.util.concurrent.Executor` 를 상속한다

Spring 에서도 여러 `TaskExecutor` 의 구현체를 제공하는데 대표적으로 우리가 봤던 `SimpleAsyncTaskExecutor` 와 앞으로 이야기 할 `ThreadPoolTaskExecutor` 가 있다.

# ThreadPoolTaskExecutor 란?

ThreadPoolTaskExecutor 는 java 의 [ThreadPoolExecutor.java](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ThreadPoolExecutor.html) 를 wrapping 한 Spring 의 Executor 이다.

`ThreadPoolTaskExecutor` 를 Async task 를 처리할 Bean 으로 등록하기 위해서는 동작 방식을 정확히 이해해야 한다

### ThreadPoolTaskExecutor 는 어떻게 스레드를 생성하는가

생성에 대한 동작 방식을 이해해야 하는 이유는 **우리가 등록하는 bean 설정이 직접적으로 성능에 영향**을 미치기 때문이다.

이유는 `ThreadPoolTaskExecutor` 가 **Thread 를 생성하는 방식**에 있는데, 이를 이해하기 위해서는 다음 4가지 개념만 기억하자

1. core pool size
2. max pool size
3. queue capacity (waiting queue)
4. activeThreadCount

`ThreadPoolTaskExecutor` 는 위의 3가지 정보를 가지고 bound 에 따라 **자동으로 풀 크기(스레드의 수)를 조절**한다.

[##_Image|kage@3Pk7x/btsGFrPxDIb/Yfg7GAr5FzG5d1B92qsGfk/img.png|CDM|1.3|{"originWidth":1167,"originHeight":440,"style":"alignCenter","width":690,"height":260,"caption":"threadPoolTaskExecutor 의 핵심 3가지"}_##]

어떤 순서로 생성이 되는지 알아보자.

1. 초기에는 corePoolSize 만큼 스레드를 생성한다.
2. 신규로 요청이 들어 왔을 때, corePoolSize 만큼 스레드가 할당되면 queue 에 요청을 대기시킨다
3. **queue 가 꽉 차면 신규로 스레드를 생성한다.**
4. 3번 과정을 maxPoolSize 만큼 스레드를 생성될 때 까지 반복한다
5. 만약 maxPoolSize 만큼 스레드를 생성했고 corePoolSize 가 꽉 찼다면 요청을 reject 한다

위의 순서를 그림으로 도식화 한다면 다음과 같다.

[##_Image|kage@lz9jg/btsGFpd0OtH/c3cOHm2TkiP2IF9A6U91tk/img.png|CDM|1.3|{"originWidth":1955,"originHeight":791,"style":"alignCenter","width":1466,"height":593,"caption":"ThreadPoolTaskExecutor 가 스레드를 생성하는 로직"}_##]

여기서 중요한 사실은 `activeThreadCount` 가 `maxPoolSize` 만큼 할당되고 `waiting queue` 가 꽉 찬다면 모든 요청을 Reject 한다는 것이다.

### ThreadPoolTaskExecutor 가 요청을 Reject 할 때?

앞선 문장을 약식으로 표현한다면 `activeThreadCount == maxPoolSize && queue is full` 라면 **task 실행 요청이 거부**된다.

> 이때, 거부된 요청은 [RejectExecutionHandler.java](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/RejectedExecutionHandler.html) 에 의해서 handling 될 수 있다. 여기서 RejectionHandlingPolicy 를 어떻게 가져가야 하는지도 매우 중요하므로 자세한 내용은 앞선 docs 를 통해 확인하자.

**앞선 스레드 생성 방식을 이해하지 못한 채 ThreadPool 만 사용하겠다고** `ThreadPoolTaskExecutor` bean 을 다음과 같이 설정하여 bean 을 등록한 코드를 필자는 많이 봐 왔다.

```java
@Primary
public TaskExecutor taskExecutor() {
  ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();

  executor.setCorePoolSize(1);
  executor.setQueueCapacity(1024); // waiting pool size
  executor.setMaxPoolSize(10);

  return executor;
}
```

이런 설정을 추가한 개발자의 의도는 아마도 `요청이 reject 되는 것 보다 queue 에서 waiting 하는 편이 낫다` 라고 생각했을 텐데,

**실제로는 single thread 로 처리될 것이고 multi thread 가 동작하려면 1024 개 이상이 와야 두 번째 스레드가 생성될 것이다.**

# 그럼 적절한 ThreadPoolTaskExecutor 의 설정 값은?

적절한 ThreadPool 의 설정값은 뻔한 이야기지만 **환경과 컴퓨팅 엔진에 따라 다르다**.

하지만 **몇가지 팁**이 존재하는데, 바로 다음 2가지를 고려하면 쉽게 접근할 수 있다.

1. 연산의 종류에 따라
2. CPU 코어에 따라

### 적정 스레드 구하기 - 1. 연산 종류 파악하기

**연산의 종류**에 따라 스레드 풀의 크기가 커야 하는지 작아야 하는지 판단 할 수 있다.

- **CPU Bouond 연산**
  - CPU 를 활용한 연산 작업
  - 대기시간이 거의 0에 수렴하므로 스레드 풀이 작다면 Context Switching 이 자주 발생해 비효율 발생
- **IO Bound 연산**
  - HTTP, File 과 같은 IO 연산 작업
  - 보통 WAITING TIME 이 길기 때문에 스레드 풀의 크기가 클 때 효과적임

### 적정 스레드 구하기 - 2. CPU 코어 수 파악하기

효율적인 연산을 위해서는 **CPU 의 Free time 에 적절히 일을 시키는 것**이 중요하다.

하나의 코어에서 보통 하나의 스레드를 실행 시키므로 **적정 스레드의 수는 코어의 수에 비례**한다.

[##_Image|kage@buF0P7/btsGDIk826X/7o0fOv7yUNi7equCvB2jm0/img.png|CDM|1.3|{"originWidth":1564,"originHeight":238,"style":"alignCenter","width":650,"height":99,"caption":"Java Concurrency in Practice 에서 제안하는 계산법"}_##]

이러한 공식이 있지만 멀티 스레드 풀이 고려되지 않았고, 이를 고려한 여러 수식이 존재하나 적정 스레드의 개수를 구하는 가장 효과적인 방법은 stress test 등을 통해 직접 수를 조절하는 것을 명심하자.

> 적절한 ThreadPool 의 설정 값은 [이상적인 스레드 풀 크기에 대하여 - code-lab1.tistory.com](https://code-lab1.tistory.com/269) 에서 설명을 잘 해주고 있으니 참고하는 것도 좋을 것 같다.
