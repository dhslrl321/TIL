[##_Image|kage@VKIBp/btsIPSdQmpp/YqWX5EZkyEW38kWaVZTiKK/img.png|CDM|1.3|{"originWidth":1078,"originHeight":578,"style":"alignCenter","width":500,"height":268}_##]

### 관련 글

- [AWS SQS + Spring Boot 3 + kotlin 인프라 구축하기](https://wonit.tistory.com/670)
- [AWS SQS Consumer 에러를 DLQ 로 처리하기](https://wonit.tistory.com/671)
- [message converter 를 이용한 sqs message serializer](#)
- [AWS SQS 의 DLQ 처리 가이드](#)

앞선 시간에 우리는 [SQS 를 생성하고 Spring Boot 3 로 producer/consumer 를 구현](https://wonit.tistory.com/670) 하였다.

이번 시간에는 Consumer Application 에서 발생할 수 있는 실패에 대처하는 여러 방법 중 하나인 DLQ 를 알아볼 것이다.

또한 실습을 통해 Spring Boot 3 와 kotlin 으로 간단히 DLQ Consumer 를 구현해보도록 하자.

### 목차

- DLQ
- AWS 에서 DLQ 구성하기
- DLQ Consumer 구현하기
- FIFO 와 DLQ

# DLQ

시스템은 기본적으로 실패한다. 그러므로 우리는 실패에 잘 대처할 수 있는 여러가지 방법을 고안해야 하고 이를 내결함성 (fault tolerant) 라고 한다.

AWS SQS 에서도 이러한 에러를 처리하기 위해 DLQ 라는 것을 제공한다.

DLQ 는 **Enterprise Integration Pattern** 이라는 책에서 소개된 `Dead-Letter-Channel` 이라는 패턴을 AWS 에서 구현한 managed queue 서비스이다.

[##_Image|kage@cOgStL/btsIO4GcRTQ/qh0I3rVJ7BjcbErO5iYSVK/img.png|CDM|1.3|{"originWidth":1196,"originHeight":1530,"style":"alignCenter","width":351,"height":449}_##]

앞선 책에서는 `Dead Letter Channel` 을 아래와 같이 설명한다.

> 메시징 시스템에서 메시지를 전달할 수 없거나 전달해서는 안 된다고 판단되면 메시지를 Dead Letter Channel 혹은 Dead Letter Queue 로 이동시켜 보관합니다.

즉, Consumer Application 에서 특정 큐의 메시지를 소비하다 처리에 실패한다면 이를 Dead Letter Channel 로 옮긴다는 것이다.

DLQ 동작 원리는 직접 queue 를 만들면서 알아보자

# AWS 에서 DLQ 구성하기

우리는 지난 시간에 [Spring Boot 3 로 AWS SQS 인프라를 구축](https://wonit.tistory.com/670)하였다.

앞서 만든 queue 인 `member-event` 에 대한 DLQ 를 구성할 것이다.

[##_Image|kage@rlhqn/btsIPLTHXqP/XHr1UEaZbJLQ1KYY5HENRK/img.png|CDM|1.3|{"originWidth":1304,"originHeight":340,"style":"alignCenter"}_##]

DLQ 역시 일반적인 queue 와 동일하므로 aws sqs console 에서 신규 큐를 만들어주면 된다.

이름은 구분하기 쉽게 `member-event-dlq` 로 설정하고 앞선 실습과 동일한 설정으로 queue 를 만들다 보면 redrive policy 에 대한 설정을 해야한다.

[##_Image|kage@QB69f/btsIRNvCF9D/k1nuimYTHQbpKdMbEs6oi0/img.png|CDM|1.3|{"originWidth":1224,"originHeight":912,"style":"alignCenter","width":762,"height":568}_##]

**어떤 queue 에 대해 DLQ 설정을 할 것인가?** 에 대한 설정이다. 우리는 `member-event` 에 대한 DLQ 를 구성할 것이므로 앞서 생성한 큐의 ARN 을 추가한다.

[##_Image|kage@daDrSi/btsIOS6YxVo/cMFKiT2ZjZlFx25X4R3c5k/img.png|CDM|1.3|{"originWidth":918,"originHeight":242,"style":"alignCenter","width":667,"height":176}_##]

그럼 위와 같이 2개의 큐가 생성되었다.

이제 `member-event` 의 DLQ 로 `member-event-dlq` 를 연결시켜주기 위해 `member-event` 큐의 설정을 변경해보자.

[##_Image|kage@HxTbn/btsIPzsmouB/3wK6V2yh7CrEgZrYCbo1b0/img.png|CDM|1.3|{"originWidth":2060,"originHeight":724,"style":"alignCenter"}_##]

위의 설정에서 2가지를 알 수 있다.

1. 어떤 큐를 DLQ 로 설정할 것인가
2. **최대 retry 횟수는 얼마인가**

기본적으로 queue 은 message 를 처리 완료하면 해당 message 를 제거하는 책임이 존재한다.

하지만 어떤 이유에서인지 처리를 못하여 삭제가 안된 대상들을 다른 임시 큐로 옮기는 것이 DLQ 의 핵심이다.

위에 보이는 miximum receives 는 **몇번 재시도 끝에 DLQ 로 옮길 것인가?** 를 결정하는 필드다.

앞의 설정은 3번 retry 끝에 실패하면 DLQ 로 옮기는 것을 의미한다.

# DLQ Consumer 구현하기

DLQ Consumer 역시 일반 Queue 와 동일하므로 앞선 실습때 만들었던 SQS Listener 와 동일하게 연동해주면 된다.

```java
@Component
class MemberEventListener {

  @SqsListener("member-event")
  fun listen(message: String) {
    println("received message ($message)")
  }

  @SqsListener("member-event-dlq")
  fun listenDLQ(message: String, ack: Acknowledgement) {
    println("DLQ received message ($message)")
  }

```

DLQ 에 정상적으로 메시지가 잘 옮겨지는지 확인하기 위해서는 실습 환경을 약간 변경해야 한다.

### 의도적으로 member-event consumer 에서 실패하기

DLQ 는 origin queue 의 처리가 실패하였을 때 메시지가 전송되므로, `member-event` 큐가 메시지를 소비하더라도 [ack](https://hanainu.tistory.com/31) 를 수행하지 않도록 설정을 바꿔 볼 것이다.

```java
@Configuration
class SqsConfiguration {
  @Bean
  fun defaultSqsListenerContainerFactory(sqsAsyncClient: SqsAsyncClient) =
    SqsMessageListenerContainerFactory
      .builder<Any>()
      .configure { options: SqsContainerOptionsBuilder ->
        options
          .acknowledgementMode(MANUAL) // ACK 수동
      }
      .sqsAsyncClient(sqsAsyncClient)
      .build()
}
```

아래 Configuration Bean 을 등록하면 Consumer instance 를 생성할 때 수동 commit mode 인 consumer 를 생성할 것이다.

그리고 메시지를 발행한다면 다음과 같이 DLQ 로 메시지가 들어온 것을 확인할 수 있다.

[##_Image|kage@lw413/btsIPSZsLCP/k95EQNJgwkSZh5BFE5SEc1/img.png|CDM|1.3|{"originWidth":1004,"originHeight":380,"style":"alignCenter","width":640,"height":242}_##]

# Queue Type 과 DLQ

앞서 우리는 SQS 에는 2가지 타입이 존재한다고 확인했다.

[##_Image|kage@nZVa4/btsIQIVZxHr/FOYrJPoK32omGCP5ZCMuuK/img.png|CDM|1.3|{"originWidth":1224,"originHeight":720,"style":"alignCenter","width":506,"height":298}_##]

DLQ 를 구성할 때는 한 가지 주의해야 할 점이 존재한다.

바로 FIFO Type 의 Queue 에서는 DLQ 를 구성할 경우 동일 message group 에서 다른 message 들이 Blocking 된다는 것이다.

First In First Out 을 통해 Exactly Once 를 보장하는 FIFO 는 메시지 순서를 보장하기 위해 내부적으로 정렬과정을 수행한다.

그래서 특정 메시지가 처리되지 않으면 해당 메시지가 존재하는 origin queue 의 message group 은 DLQ 에 의해 Blocking 된다는 점을 명심해야 한다.
