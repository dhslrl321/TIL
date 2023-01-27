> 해당 글은 개발, 기술관련 아티클이나 블로그 글 혹은 유튜브 영상의 내용을 정리하거나 후기를 적는 글입니다.

#### 리뷰할 글: ['CodeOpnion' 의 'McDonald’s Journey to Event-Driven Architecture'](https://codeopinion.com/mcdonalds-journey-to-event-driven-architecture/)

# 주제와 간단 요약

- **맥도날드는 EDA 를 구성하고있다**
  - AWS 환경 안에서 MSK (managed streaming for kafka) 를 사용한다
  - 글쓴이는 맥도날드 기술블로그를 통해서 습득한 노하우 몇가지를 정리함
- **Schema Registry**
  - event 의 schema definition 을 관리
    - event 는 단일 진실 공급원으로써 이벤트 스키마의 주인은 하나여야 한다
    - 이렇게 함으로 (data quality issue) 를 해결
  - producer 와 consumer 는 schema registry 를 통해서 이벤트의 payload 와 version 을 관리
    - producer 는 이벤트 스키마의 registry 에 커스텀 SDK 를 통해서 접근해서 validation
    - consumer 는 역시 이벤트 스키마의 registry 에 커스텀 sdk 를 통해서 접근해서 validation
- **Validation**
  - 만약 producer 가 publish 에 실패한다면?
    - DLT (dead letter topic) 로 실패된 메시지를 전송한다
    - DLQ 혹으 DLT 에 빠진 메시지를 다시 잘 정비해서 다시 topic 에 정상 publish 해야함
- **Reliable Publishing**
  - 이벤트에 대한 publish 가 실패한다면 dynamoDB 에 해당 이벤트를 저장함
    - 람다를 이용하여 이벤트 발행을 retry 할 수 있음
  - outbox 패턴를 이용하는 것도 하나의 방법

# 리뷰와 나의 해석

이 글을 읽고 지난 과거의 작업들이 몇가지 떠오른 것이 있다.

outbox table 개념을 활용한 event streaming platform 을 만들 때, 이와 같은 고민들을 했었다.

해당 플랫폼을 사용하는 클라이언트들은 이벤트 버전에 대해서 신경써야 했고, 이벤트 타입과 definition 에 대해서도 고민했어야 했다

여기서 한가지 신기한 점은 맥도날드는 메시지 발행에 실패할 경우, dynamoDB 를 이용한다는 점이다.

왜 굳이 dynamoDB 를 사용할까?

내가 찾아본 가장 큰 이유는

- fully managed service by aws -> lambda 와 연동이 쉽다?

일 것이다.

이외에도 EDA 에 관련된 내용을 더 자세히 알고싶다면 애덤 벨메어의 [이벤트 기반 마이크로서비스 구축](http://www.yes24.com/Product/Goods/99423020) 책이 많은 도움이 될것 같다
