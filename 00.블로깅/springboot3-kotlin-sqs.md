[##_Image|kage@VKIBp/btsIPSdQmpp/YqWX5EZkyEW38kWaVZTiKK/img.png|CDM|1.3|{"originWidth":1078,"originHeight":578,"style":"alignCenter","width":500,"height":268}_##]

### 관련 글

- [AWS SQS + Spring Boot 3 + kotlin 인프라 구축하기](https://wonit.tistory.com/670)
- [AWS SQS 를 이용한 DLQ 설정](#)
- [message converter 를 이용한 sqs message serializer](#)
- [AWS SQS 의 DLQ 처리 가이드](#)

이번 글의 목표는 Spring Boot 과 kotlin 을 이용해서 SQS 를 연동하는 application 을 개발하는 것이다.

Spring Boot 로 application 을 만들어보며 간략하게 SQS 의 설정이 어떤 것을 의미하는지 알아보자.

### 목차

1. prerequisites
2. IAM User 생성하기
3. sqs 생성하기
4. spring boot 와 연동
5. SQS 의 여러 설정들

# prerequisities

다음 버전으로 실습을 진행할 예정이다.

1. kotlin (java 21)
2. Spring Boot 3.3.2
3. awspring 3.1.1

당연하게도 SQS 를 생성할 AWS 의 계정도 필요하고 local application 을 통해 접근하기 위한 IAM user 도 필요하다.

이번 예제에서는 IAM 을 통해 생성한 user 를 통해 access 할 것이다.

실습을 통해 하나씩 진행해보자.

# 1. IAM user 생성하기

AWS 계정을 생성하면 root 사용자 계정으로 access 권한을 받는다.

root access permission 이 유출되면 아주 크리티컬 하므로 일반적으로 application 에서는 root 계정을 사용하지 않는다.

각자가 모두 하위 특정 서비스만 접근 가능한 계정을 부여받고 programming access 방식을 위한 IAM 계정을 부여받는다.

이번 실습에서도 동일하게 SQS 만 접근할 IAM user 를 생성해보도록 하자.

[##_Image|kage@K1b94/btsIPuxG2WO/9FwetDWkp432uJzc0CPIak/img.png|CDM|1.3|{"originWidth":1162,"originHeight":798,"style":"alignCenter","width":639,"height":439}_##]

먼저 IAM 에 접속해서 IAM `사용자 생성하기` 를 클릭한다

[##_Image|kage@bBEpO2/btsIQnRV2da/EfXyzQPCHvnSMS3LJXLT10/img.png|CDM|1.3|{"originWidth":1840,"originHeight":1080,"style":"alignCenter"}_##

사용자 이름을 입력하고 `직접 정책 연결` 을 통해 SQS 에 한해서만 접근 권한을 부여하자.

`SQSFullAccess` role 을 추가하고 사용자를 생성하면 아래와 같은 화면이 뜬다.

[##_Image|kage@pi6X9/btsIPLeRnSN/JVFFGPaSC9KCZGAOukKKm1/img.png|CDM|1.3|{"originWidth":1570,"originHeight":1080,"style":"alignCenter"}_##]

액세스 키를 발급할 때 애플리케이션용으로 생성하면 ACCESS_KEY 와 SECRET_KEY 를 발급받을 수 있다.

# 2. SQS 생성하기

이제 aws console 에서 queue 를 생성해 볼 것이다. queue 를 생성하는 것은 아주 간단하다.

자세한 설정은 가장 마지막 파트에서 하나씩 알아볼 예정이니 우선은 아래 스텝을 따라서 Standard 타입의 queue 를 생성해보자.

[##_Image|kage@qLyOz/btsIPkBVUBt/te6zULuKJmiadSQwuXvVkk/img.png|CDM|1.3|{"originWidth":980,"originHeight":1080,"style":"alignCenter","width":680,"height":749}_##]

[##_Image|kage@cyDoM6/btsIOI4bcVu/wJaWFXUVQtBrblGV8jl8M1/img.png|CDM|1.3|{"originWidth":1206,"originHeight":156,"style":"alignCenter"}_##]

# 3. Spring Boot 와 연동

앞에서 우리는 IAM 을 생성하고 accessKey 와 secrets 를 발급 받았다. 이제 IAM 과 SQS 를 가지고 Spring Application 으로 연동해볼 차례이다.

가장 먼저 gradle 의존성을 추가해주자.

```gradle
implementation("io.awspring.cloud:spring-cloud-aws-starter-sqs:3.1.1")
```

위의 의존성은 Spring Cloud AWS 에서 관리하는 프로젝트로 [awspring.io](https://docs.awspring.io/spring-cloud-aws/docs/3.1.0/reference/html/index.html#using-amazon-web-services) 에서 AWS 의 S3, SQS, SNS, DynamoDB 등 다양한 서비스와 통합을 제공한다.

위의 의존성은 sqs starter 로, 다른 starter 라이브러리의 특성과 동일하게 복잡한 설저 없이 핵심 bean 들을 auto configuration 으로 제공한다.

대표적으로는 아래와 같은 클래스들이 있는데, 이 덕분에 우리는 별다른 bean configuration 설정을 자동 구성에게 위임할 예정이다.

- SqsAsyncClient
- SqsTemplate
- @SqsListener
- SqsMessageListenerContainerFactory

### 3-1. aws sqs conf 및 pub/sub 구조

auto-configuration 에 의해 등록되는 bean 들과 pub/sub 을 위해 상호작용하는 구조를 간단하게 도식화 한다면 아마 아래와 같을 것이다.

[##_Image|kage@wRDGq/btsIQHWU3d3/eRhWgynW4RTmNt9e4zDqQ1/img.png|CDM|1.3|{"originWidth":1171,"originHeight":835,"style":"alignCenter","width":696,"height":496}_##]

SqsListener 와 SqsPublisher 연산 모두 [AwsClient](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/services/sqs/SqsAsyncClient.html) 를 통해 AWS 와 통신을 수행하는데, 이때 접근을 위한 인증 정보들이 (ACCESS_KEY, SECRET_KEY) 필요하다.

앞서 우리가 aws console 에서 획득했던 인증 정보와 동일한데, 이들은 보통 외부에서 관리되므로 application.yml 혹은 environment variable 로 주입된다.

### 3-2. credential 연동과 configuration

우리가 사용할 application 은 대부분 remote git repository 에 올라가니 `access-key` 와 `secret-key` 는 유출이 되지 않도록 잘 관리해야 한다.

이건 secret 정보를 숨길 때 사용하는 다양한 방법들 중 편한 방법을 찾아 자유롭게 해주면 된다.

```yml
spring:
  cloud:
    aws:
      credentials:
        access-key: ABCDEF
        secret-key: xxx
      region:
        static: ap-northeast-2
```

나는 `application-local.yml` 을 만들고 직접 access 와 secret 을 명시하여 gitignore 를 처리해 주었다.

위와 같이 명시하고 나면 Aws 와 직접 통신을 수행할 `AwsClient` 설정을 해줘야 하는데, 우리는 Spring Boot 와 Auto-Configuration 을 이용할 것이므로 별다른 Credential 설정이 필요하지 않다.

### 3-3. 간단 publisher 와 listener 구현

우리가 만든 Spring Application 에 앞서 생성한 queue 에 메시지를 발행할 publisher 와 이를 수신할 listener 를 만들어주면 된다.

publisher 는 간단하게 controller 를 통해 message 를 요청으로 받아 이를 게시하는 역할을 수행할 것이다.

```java
@RestController
class PublishMessageController(
  private val sqsTemplate: SqsTemplate,
) {

  @PostMapping("/messages")
  fun sendMessage(@RequestBody body: Map<String, String>) {

    val content = body["content"]!!
    sqsTemplate.send {
      it.queue("member-event")
        .payload(content)
    }
  }
}
```

listener 는 `@SqsListener` 어노테이션을 이용하면 쉽게 생성할 수 있다.

```java
@Component
class MemberEventListener {

  @SqsListener("member-event")
  fun listen(message: String) {

    println("received message ($message)")
  }
}

```

이제 api 를 호출하여 정상적으로 message 가 consume 되는지 확인해볼 수 있다.

[##_Image|kage@cYv11j/btsIQLLHNU9/8ywEqZJfkMjgpUY9YKIsX0/img.png|CDM|1.3|{"originWidth":908,"originHeight":168,"style":"alignCenter","width":579,"height":107}_##]

# SQS 여러 설정들

아까 SQS 를 생성할 때 상세 설정들에 대해서는 자세히 알아보지 않았다.

아래 설정들을 간단히 알아보자

[##_Image|kage@t1vtE/btsIPs7Izqk/uUi6aD5lRy9xFb302CNM9k/img.png|CDM|1.3|{"originWidth":980,"originHeight":1080,"style":"alignCenter","width":704,"height":776}_##]

### queue type

queue type 은 standard 타입과 FIFO 타입이 존재한다.

standard type 은 가장 simple 한 형태의 queue 이다. 일반적인 상황에서 많이 사용하고 순서와 중복을 **최대한 보장**한다.

FIFO 는 가장 달성하기 어렵다는 message delivery semantics 의 exactly once 를 표방한다.

FIFO 형태의 queue 를 사용할 경우 가장 안정적이나 처리량에 대한 고민과 error handling 시 blocking 되는 다양한 이슈들을 대응해야 한다. (이는 다음 DLQ 에서 자세히 알아보자)

### visibility timeoue 과 retention period

메시지 보존 기간(Message Retention Period)과 가시성 타임아웃(Visibility Timeout) 이라고 부르는 속성은 중요한 속성이다.

**메시지 보존 기간 (Message Retention Period)**

처리되지 않은 메시지를 얼마나 SQS 에 보존할 것인가? 를 결정하는 속성이다.

만약 여기에 명시된 시간 만큼 처리되지 않으면 자동으로 메시지를 큐에서 제거한다.

**가시성 타임아웃 (Visibility Timeout)**

이 속성은 중복 처리를 방지하기 위해서 사용되는 일종의 hold and wait 방식의 locking 이다.

특정 consumer 에게 소비되었을 때 일정 시간 동안 다른 consumer 에게 보이지 않도록 하는 시간이고 해당 시간이 모두 소비되어야 다른 소비자가 이를 다시 점유할 수 있다.

하지만 완전한 의미에서 locking 이나 atomic 을 보장하지는 않는다는 것을 명심하자.

### DLQ 와 Redriving

DLQ 를 통해 실패를 핸들링할 수 있다. 이와 관련된 속성들은 다음 시간에 배울 DLQ 에서 자세히 알아보자.

5. message wait time
6. redrive allow
7. dead-letter-queue
