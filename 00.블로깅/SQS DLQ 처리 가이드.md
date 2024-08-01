[##_Image|kage@VKIBp/btsIPSdQmpp/YqWX5EZkyEW38kWaVZTiKK/img.png|CDM|1.3|{"originWidth":1078,"originHeight":578,"style":"alignCenter","width":500,"height":268}_##]

### 관련 글

- [AWS SQS + Spring Boot 3 + kotlin 인프라 구축하기](https://wonit.tistory.com/670)
- [AWS SQS Consumer 에러를 DLQ 로 처리하기](https://wonit.tistory.com/671)
- [message converter 를 이용한 sqs message serializer](#)
- [AWS SDK 로 DLQ 에 쌓인 메시지 처리하기](https://wonit.tistory.com/672)

앞선 시간에 우리는 [SQS 를 생성하고 Spring Boot 3 로 producer/consumer 를 구현](https://wonit.tistory.com/670) 하여 [DLQ 를 이용하여 에러를 처리](https://wonit.tistory.com/671) 하였다.

DLQ 에 쌓인 메시지들을 처리하는 방법은 다양하다. 직접 console 을 이용할 수도 있고 programmatically 하게 처리할 수도 있다.

이번 시간에는 web console 이 아닌 programmatically 한 방법으로 메시지를 처리하는 2가지 방법에 대해서 알아볼 예정이다.

### 목차

1. 배경
2. DLQ 와 redrive
3. DLQ 에 쌓인 message redrive 하기
4. 특정 message 만 redrive 하기

# 배경

회사에서 특정 시스템에서 SQS 를 사용하는데, DLQ 를 구성하여 처리에 살패한 메시지들을 관리하였다.

보통 consumer 에서 message 처리에 실패하는 이유는 2가지로 나뉜다.

1. 일시적인 에러
2. 보정이 필요한 에러

보통 1번은 network timeout 이나 service temporary unavailable 과 같은 케이스로 대부분 일정 시간이 지난 후에 **retry 를 수행하면 정상적으로** 동작한다.

하지만 2번의 경우는 개발자나 운영자가 수동으로 데이터를 확인하고 보정을 처리해야 한다.

보정이 완료되면 message 를 redrive 하여 재시도를 한다.

하지만 사내의 개발 환경 정책에 의해 aws console 에 접근하기가 귀찮고 복잡하기에 리소스 낭비가 심했고 이를 프로그래밍 방식으로 해결할 수 있는 방법이 필요했고 이를 Spring Boot 3.x 와 kotlin 으로 구현한 내용들을 공유해보려 한다.

# DLQ 와 redrive

SQS 를 통해 messaging infrastructure 를 구성한 application 에서는 DLQ 를 필수적으로 구성한다.

[##_Image|kage@zNwV8/btsIScDw1a2/NV0aVt7hRbD1JBOXxp7MBK/img.png|CDM|1.3|{"originWidth":1226,"originHeight":668,"style":"alignCenter","width":583,"height":318}_##]

[2014년 AWS 가 처음으로 DLQ 를 출시](https://aws.amazon.com/fr/blogs/aws/amazon-sqs-new-dead-letter-queue/)하기 전은 consumer application 에서 message 처리에 실패하면 해당 메시지가 retention 기간동안 계속해서 queue 에 남아 있게 되고,

consumer application 은 처리하지 못하는 message 를 계속해서 쌓아놓음으로써 처리량이 낮을 수 밖에 없었지만.

DLQ 를 통해 처리되지 않은 메시지가 계속해서 queue 에 남아있는 문제를 해결하였다.

### redrive 란?

그러다 2021년 AWS re:Invent 에서 처음으로 DLQ 를 aws web console UI 에서 redrive 할 수 있게 하였다.

redrive 란, DLQ 에 저장된 메시지를 consumer application 이 해당 메시지를 다시 처리할 수 있도록 origin queue 로 옮기는 것을 의미한다.

[##_Image|kage@uJEsi/btsIReaV54a/x26yUtLfEmrlw7MkKLKRXk/img.png|CDM|1.3|{"originWidth":1167,"originHeight":404,"style":"alignCenter","width":875,"height":303}_##]

하지만 이를 프로그래밍 방식으로 컨트롤 할 수 있는 방법은 없었고 **휴먼 에러가 가득한 개발자들의 수동의 영역으로 남아있었다.**

하지만 2023년 6월 8일 Aws 에서는 DLQ 를 handling 하는 새로운 API 를 개발하여 AWS Sdk 에 포함시켰다.

---

시스템은 기본적으로 실패한다. 그러므로 우리는 실패에 잘 대처할 수 있는 여러가지 방법을 고안해야 하고 이를 내결함성 (fault tolerant) 라고 한다.

[##_Image|kage@bTXvfk/btsIUleJpiG/7p0lAcpkBeuMQXMArqAbuK/img.png|CDM|1.3|{"originWidth":1696,"originHeight":1342,"style":"alignCenter","width":589,"height":466}_##]

내결함성을 높이기 위해서는 에러가 어떤 종류로 구분되는지 알아볼 필요가 있다.

일반적으로 웹 애플리케이션에서 발생할 수 있는 에러는 일반적으로 다음 2가지로 나뉜다.

1. 하드웨어 에러 및 보안 사고, 버그
2. 네트워크 및 시스템 에러
3. 비즈니스 에러

다른 접근 방법의 해결방법이 필요한 1번을 제외한 2번과 3번은 아래와 같이 구분할 수 있다.

# DLQ 에 쌓인 메시지 redrive 하기

DLQ 에 쌓인 메시지는 `start-message-move-task` 를 통해 origin queue 로 redrive 할 수 있다.

단, 아래의 제약조건에 맞아야 한다.

- DLQ 구성이 된 queue 로만 redrive 할 수 있음
- DLQ 의 전체 message 가 redrive 됨

### 구현하기

우선 AWS SDK 를 사용해야 하지만 나는 Spring Boot 를 이용하고 있고 Spring Cloud AWS 에서 제공하는 `io.awspring.cloud:spring-cloud-aws-starter-sqs:3.1.1` 를 이용하여 구현할 것이다.

> 실습에 사용된 모든 소스코드는 [https://github.com/my-research/try-aws-sdk](https://github.com/my-research/try-aws-sdk) 에서 확인할 수 있다.

아래는 API 요청을 받으면 DLQ 를 원본 큐로 다시 redrive 하는 기능을 수행한다.

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

`SqsAsyncClient` 를 통해 `startMessageMoveTask` 를 호출하고, 인자로 source 와 destination 만 지정해주면 된다.

확인해보자.

### 문제점

하지만 이렇게 했을 때 치명적인 문제가 존재한다.

전체 메시지를 redrive 하기는 좋겠지만 원치 않는 message 들 까지 redrive 되어 예상하지 못하는 에러가 발생할 수 있다.

(개별 message 만 redrive 하는 기능은 제공하지 않는듯 하다..)

개별 message 를 DLQ 에서 찾아서 원본 큐로 보내고 해당 메시지를 제거해줘야 한다.

# 특정 message 만 redrive 하기

이 방법은 2023년에 신규로 출시된 기능이 아니라 기존에 존재하던 Aws SDK 를 이용하는 것이다.

컨셉은 간단하다.

1. DLQ 에서 message 를 polling
2. 특정 messageId 로 message 를 filter
3. 해당 message 를 원본 큐로 다시 전송
4. 해당 message 를 DLQ 에서 제거

[##_Image|kage@9TOyi/btsITFktgNm/G5dTNVrbK2jTMTNoHrMvyk/img.png|CDM|1.3|{"originWidth":934,"originHeight":404,"style":"alignCenter","width":710,"height":303}_##]

이제 구현해보자

### 구현하기

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

### Refs

- [https://aws.amazon.com/ko/blogs/aws/a-new-set-of-apis-for-amazon-sqs-dead-letter-queue-redrive/](https://aws.amazon.com/ko/blogs/aws/a-new-set-of-apis-for-amazon-sqs-dead-letter-queue-redrive/)
- [https://docs.aws.amazon.com/cli/latest/reference/sqs/start-message-move-task.html](https://docs.aws.amazon.com/cli/latest/reference/sqs/start-message-move-task.html)
