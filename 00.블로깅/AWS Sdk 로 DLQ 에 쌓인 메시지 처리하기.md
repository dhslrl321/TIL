[##_Image|kage@VKIBp/btsIPSdQmpp/YqWX5EZkyEW38kWaVZTiKK/img.png|CDM|1.3|{"originWidth":1078,"originHeight":578,"style":"alignCenter","width":500,"height":268}_##]

### 관련 글

- [AWS SQS + Spring Boot 3 + kotlin 인프라 구축하기](https://wonit.tistory.com/670)
- [AWS SQS Consumer 에러를 DLQ 로 처리하기](https://wonit.tistory.com/671)
- [message converter 를 이용한 sqs message serializer](#)
- [AWS SDK 로 DLQ 에 쌓인 메시지 처리하기](https://wonit.tistory.com/672)

앞선 시간에 우리는 [SQS 를 생성하고 Spring Boot 3 로 producer/consumer 를 구현](https://wonit.tistory.com/670) 하여 [DLQ 를 이용하여 에러를 처리](https://wonit.tistory.com/671) 하였다.

DLQ 에 쌓인 메시지들을 처리하는 방법은 다양하다. 직접 console 을 이용할 수도 있고 programmatically 하게 처리할 수도 있다.

이번 시간에는 **web console UI 가 아닌 programmatically 한 방법으로 메시지를 처리**하는 2가지 방법에 대해서 알아볼 예정이다.

### 목차

1. 배경
2. DLQ 와 redrive
3. DLQ 에 쌓인 message redrive 하기
4. 특정 message 만 redrive 하기

# 배경

회사에서 특정 시스템에서 SQS 를 사용하는데, DLQ 를 구성하여 처리에 살패한 메시지들을 관리한다.

보통 consumer 에서 message 처리에 실패하는 이유는 2가지로 나뉜다.

1. 일시적인 에러
2. 보정이 필요한 에러

보통 1번은 network timeout 이나 service temporary unavailable 과 같은 케이스로 대부분 일정 시간이 지난 후에 **retry 를 수행하면 정상적으로** 동작한다.

하지만 2번의 경우는 개발자나 운영자가 **수동**으로 데이터를 확인하고 보정을 처리해야 한다.

보정이 완료되면 message 를 redrive 하여 재시도를 한다.

하지만 사내의 개발 환경 정책에 의해 aws console 에 접근하기가 귀찮고 복잡하기에 리소스 낭비가 심했고 이를 프로그래밍 방식으로 해결할 수 있는 방법이 필요했고 이를 Spring Boot 3.x 와 kotlin 으로 구현한 내용들을 공유해보려 한다.

# DLQ 와 redrive

SQS 를 통해 messaging infrastructure 를 구성한 application 에서는 DLQ 를 구성하여 실패에 대해 대응한다.

[2014년 AWS 가 처음으로 DLQ 를 출시](https://aws.amazon.com/fr/blogs/aws/amazon-sqs-new-dead-letter-queue/)하기 전은 consumer application 에서 메시지 처리에 실패하면 해당 메시지가 retention 기간동안 계속해서 queue 에 남아 있게 되었다.

결국 consumer application 은 처리하지 못하는 message 를 계속해서 쌓아놓음으로써 처리량이 낮을 수 밖에 없었지만.

AWS 는 2014년 DLQ 를 공개하며 SQS 에서 처리되지 않은 메시지가 계속해서 queue 에 남아있는 문제를 해결하였다.

[##_Image|kage@zNwV8/btsIScDw1a2/NV0aVt7hRbD1JBOXxp7MBK/img.png|CDM|1.3|{"originWidth":1226,"originHeight":668,"style":"alignCenter","width":583,"height":318}_##]

DLQ 에 대한 설정과 구성은 지난 시간에 실습을 통해 알아본 [DLQ 로 SQS Consumer 에러 처리하기](https://wonit.tistory.com/671) 에서 확인할 수 있다.

### message redrive 란?

redrive 란, DLQ 에 저장된 메시지를 consumer application 이 해당 메시지를 다시 처리할 수 있도록 origin queue 로 옮기는 것을 의미한다.

2021년 AWS re:Invent 에서 처음으로 DLQ 를 aws web console UI 에서 redrive 할 수 있게 하였다.

[##_Image|kage@uJEsi/btsIReaV54a/x26yUtLfEmrlw7MkKLKRXk/img.png|CDM|1.3|{"originWidth":1167,"originHeight":404,"style":"alignCenter","width":875,"height":303}_##]

하지만 이를 프로그래밍 방식으로 컨트롤 할 수 있는 방법은 없었고 **휴먼 에러가 가득한 개발자들의 수동의 영역으로 남아있었다.**

하지만 **2023년 6월 8일** Aws 에서는 DLQ 를 handling 하는 새로운 API 를 개발하여 AWS Sdk 에 포함시켰다.

[##_Image|kage@bb13Fp/btsIUAcrBUa/BspHoJ0osKDII1UTbAdKB0/img.png|CDM|1.3|{"originWidth":1968,"originHeight":334,"style":"alignCenter"}_##]

# DLQ 에 쌓인 메시지 redrive 하기

AWS consule UI 가 아닌 cli 나 sdk 로 DLQ 에 쌓인 메시지를 redrive 하기 위해서는 `start-message-move-task` 라는 커맨드를 이용할 수 있다.

아래의 제약조건에만 해당된다면 DLQ 에서 origin queue 로 message 를 redrive 할 수 있다.

- DLQ 구성이 된 queue 로만 redrive 할 수 있음
- DLQ 의 전체 message 가 redrive 됨을 고려햐애 함

### 구현하기

우선 AWS SDK 를 사용해야 하지만 나는 Spring Boot 를 이용하고 있고 Spring Cloud AWS 에서 제공하는 `io.awspring.cloud:spring-cloud-aws-starter-sqs:3.1.1` 를 이용하여 구현할 것이다.

> 실습에 사용된 모든 소스코드는 [https://github.com/my-research/try-aws-sdk](https://github.com/my-research/try-aws-sdk) 에서 확인할 수 있다.

아래 Controller 는 API 요청을 받으면 DLQ 를 원본 큐로 다시 redrive 하는 기능을 수행한다.

```java
@RestController
class SupportSqsController(
  private val sqsClient: SqsAsyncClient,
) {
  @GetMapping("/re-drive/messages")
  fun reDriveAll() {
    val request = StartMessageMoveTaskRequest.builder()
      .sourceArn(MEMBER_DLQ_ARN)
      .destinationArn(MEMBER_QUEUE_ARN)
      .build()

    sqsClient.startMessageMoveTask(request)
  }
}
```

`startMessageMoveTask` 를 사용하기 위해서는 spring-cloud-aws-starter-sqs 에서 sqs client 로 주로 사용하는 `SqsTemplate` 이 아닌 `SqsAsyncClient` 를 사용해야 한다.

`SqsAsyncClient` 를 통해 `startMessageMoveTask` 를 호출하고, 인자로 source 와 destination 만 지정해주면 된다.

### 테스트하기 (검증)

> 실습에서 사용된 SQS 와 consumer / config 정보들은 앞선 실습 글인 [AWS SQS + Spring Boot 3 + kotlin 인프라 구축하기](https://wonit.tistory.com/670) 와 [AWS SQS Consumer 에러를 DLQ 로 처리하기](https://wonit.tistory.com/671) 에서 확인할 수 있으며 전체 소스코드는 [github](https://github.com/my-research/try-aws-sdk) 에서 확인할 수 있습니다.

우리가 만든 기능을 테스트하기 위해서 DLQ 에 다음 2 개의 메시지를 쌓았다.

[##_Image|kage@bIdZiz/btsITSki1Nh/IiO3YOcX6Z8cXAcGexEqEK/img.png|CDM|1.3|{"originWidth":1226,"originHeight":372,"style":"alignCenter"}_##]

redrive policy 에 의해 3회 retry 후 최종적으로 ack 가 되지 않아 DLQ 에 2개의 메시지가 쌓인 상태이다.

[##_Image|kage@cRz0Cs/btsIVbDhcMv/VKCLUcmvAY5uUdhWCFBpH1/img.png|CDM|1.3|{"originWidth":1224,"originHeight":692,"style":"alignCenter"}_##]

그리고 앞서 우리가 만든 API 를 호출하면 다음과 같이 전체의 message 가 redrive 된 것을 확인할 수 있다.

[##_Image|kage@JkxEd/btsITaeYCWa/zY0rQucapHK1VWxrwMwGgK/img.png|CDM|1.3|{"originWidth":1226,"originHeight":342,"style":"alignCenter"}_##]

### 문제점

하지만 이렇게 했을 때 치명적인 문제가 존재한다.

전체 메시지를 redrive 하기는 좋겠지만 원치 않는 message 들 까지 redrive 되어 예상하지 못하는 에러가 발생할 수 있다.

(현재 버전에서는 개별 message 만 redrive 하는 기능은 제공하지 않는듯 하다..)

이를 해결하기 위해서는 DLQ 에서 messageId 로 개별 메시지들을 식별하고 원본 큐로 보내 해당 메시지를 DLQ 에서 수동으로 제거해줘야 한다.

아래에서 더 자세히 알아보도록하자

# 특정 message 만 redrive 하기

이 방법은 2023년에 신규로 출시된 기능이 아니라 기존에 존재하던 Aws SDK 를 이용하는 것이다.

컨셉은 간단하다.

1. DLQ 에서 message 를 polling
2. 특정 messageId 로 message 를 filter
3. 해당 message 를 원본 큐로 다시 전송
4. 해당 message 를 DLQ 에서 제거

[##_Image|kage@9TOyi/btsITFktgNm/G5dTNVrbK2jTMTNoHrMvyk/img.png|CDM|1.3|{"originWidth":934,"originHeight":404,"style":"alignCenter","width":710,"height":303}_##]

구현해보자

### 구현하기

아래는 간단한 Controller 이다.

`/messages/{id}` 를 통해 messageId 를 전달 받고 해당 id 로 메시지를 찾아 원본 큐로 전송하여 DLQ 에서 제거하는 기능을 수행한다.

```java
@RestController
class SupportSqsController(
  private val sqsClient: SqsAsyncClient,
) {
  @GetMapping("/re-drive/messages/{id}")
  fun reDriveBy(@PathVariable id: String) {
    val messages = receiveMessages()
    // 디버깅 로그 추가
    if (messages.isEmpty()) {
      return@repeat
    }
    val reDriveTarget = messages.firstOrNull { it.messageId() == id }
    reDriveTarget?.let {
      reDriveMessage(id, it)
      deleteMessage(it, id)
      return
    }
  }

  /**
   * message 를 polling
   */
  private fun receiveMessages(): MutableList<Message> {
    val request = ReceiveMessageRequest.builder()
      .queueUrl(MEMBER_DLQ_NAME)
      .maxNumberOfMessages(2)
      .waitTimeSeconds(10)
      .maxNumberOfMessages(10)
      .visibilityTimeout(3)
      .build()
    val messageFuture = sqsClient.receiveMessage(request)

    val messages = messageFuture.get().messages()
    println("Received messages: ${messages.size}")
    return messages
  }
  /**
   * message 를 다시 origin 큐로 send
   */
  private fun reDriveMessage(id: String, it: Message) {
    println("$id 에 해당하는 message 존재하여 origin queue 로 redrive")
    sqsClient.sendMessage(SendMessageRequest.builder()
      .queueUrl(MEMBER_QUEUE_NAME)
      .messageBody(it.body())
      .build())
  }

  /**
   * DLQ 에서 message 를 제거
   */
  private fun deleteMessage(it: Message, id: String) {
    val deleteMessageRequest = DeleteMessageRequest
      .builder()
      .queueUrl(MEMBER_DLQ_NAME)
      .receiptHandle(it.receiptHandle())
      .build()
    sqsClient.deleteMessage(deleteMessageRequest)
    println("DLQ 에서 message($id, ${it.receiptHandle()}) 제거됨")
  }
}
```

이제 실습을 통해 확인해보자.

### 테스트하기 (검증)

앞선 테스트와 마찬가지로 우리가 만든 기능을 테스트하기 위해서 DLQ 에 다음 2 개의 메시지를 쌓았다.

[##_Image|kage@nRlrN/btsISfuiTcP/7jvI8Erh0nkfPvDzxBapPk/img.png|CDM|1.3|{"originWidth":1224,"originHeight":584,"style":"alignCenter"}_##]

참고로 messageId 를 확인하기 위해서는 console 에서 직접 확인할 수도 있지만 다음과 같이 consumer 에서 messageHeader 를 parsing 할 수도 있다.

```java
@SqsListener("member-event")
  fun listen(
    @Header(value = "id") messageId: String,
    message: String
  ) {
    println("received message(id:$messageId,$message)")
  }
```

그리고 앞서 만든 API 를 통해 개별 redrive 를 호출하면 아래와 같이 정상적으로 원본 Q 로 메시지가 redrive 되는 것을 확인할 수 있다.

[##_Image|kage@A1KGu/btsIUtRVrhQ/ssFSZYMlsQRaaeWlLdEBM0/img.png|CDM|1.3|{"originWidth":1226,"originHeight":260,"style":"alignCenter"}_##]

redrive 가 되어 다시 원본 큐의 redrive policy 횟수만큼 retry 를 수행하였다.

앞선 구현에서는 2가지 문제점이 존재한다.

1. polling 이 아님
2. message 를 redrive 하면 신규 message 가 생성됨

앞선 함수 `receiveMessages()` 는 polling 이 아니다. `maxNumberOfMessages` 만큼 단지 receive 하는 역할을 수행한다.

만약 메시지가 1000개 쌓여있다면 maxNumberOfMessage 속성 수의 최대인 10만큼만 **한 번** 수신하고 끝난다.

이를 해결하기 위해서는 `repeat(n)` 과 같은 여러가지 방법으로 receiver 를 polling 형식으로 구현해줘야 한다.

또한 redrive 한다면 message 를 원본 큐로 옮기는 것이 아니라 신규로 메시지를 생성해서 발행하는 것이다.

그래서 messageId 가 새롭게 생성된다는 것을 유의해야 한다.

# Refs

- [https://aws.amazon.com/ko/blogs/aws/a-new-set-of-apis-for-amazon-sqs-dead-letter-queue-redrive/](https://aws.amazon.com/ko/blogs/aws/a-new-set-of-apis-for-amazon-sqs-dead-letter-queue-redrive/)
- [https://docs.aws.amazon.com/cli/latest/reference/sqs/start-message-move-task.html](https://docs.aws.amazon.com/cli/latest/reference/sqs/start-message-move-task.html)
