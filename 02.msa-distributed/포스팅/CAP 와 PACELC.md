### 목차

- TL;DR
- 분산 시스템의 3 가지 Gaurantee
- CAP 이론
  - CP 시스템
  - AP 시스템
  - CAP 시스템이 존재하지 않는 이유
- CAP 이론의 한계
- PACELC 이론

# TL;DR

[##_Image|kage@bgstCd/btsz9YUwUnE/ZOROFxZObWppzwGuWpcEO0/img.png|CDM|1.3|{"originWidth":1326,"originHeight":464,"style":"alignCenter","width":700,"height":245}_##]

이번 글의 핵심을 요약하면 다음과 같다.

- **CAP 이론**
  - 파티션이 항상 발생할 수 밖에 없는 분산 시스템에서 C, A 중 하나만 선택할 수 있음을 의미하는 이론
  - **C**onsistency
  - **A**vailability
  - **P**artition Tolerance
- **CAP 이론의 한계**
  - 완벽한 CP, AP 시스템은 존재하지 않는다
  - 대부분의 분산 시스템은 CP 와 AP 사이 어디쯤이다
- **PACELC 이론**
  - partition 상황과 아닌(else) 상황으로 나누고 각각 trade off 의 앞 글자를 딴 이론
    - 파티션 `partition` 상황일 경우 `Avaliabilty` 와 `Consistency` 사이에서 고민하고
    - 아닌(`Else`) 상황에서는 `Latency` 와 `Consistency` 사이에서 고민한다

# 분산 시스템의 3 가지 Gaurantee

여러 개의 노드(node)라 불리는 개별 인스턴스들이 모여 하나의 목적을 달성하는 **분산 시스템**에서는 유명한 3가지의 guarantee 가 존재한다

1. 일관성, Consistency
2. 가용성, Availability
3. 파티션 내성(감내 혹은 허용), Partition Tolerance

## 일관성, **C**onsistency

consistency 는 분산 시스템에서 항상 데이터 일관성을 맞추는 gaurantee 이다.

[##_Image|kage@sUHxl/btsz84nyUZI/L0Ob5Y2xLAqsgKYw2Kj0n1/img.png|CDM|1.3|{"originWidth":877,"originHeight":727,"style":"alignCenter","width":658,"height":545}_##]

만약 특정 노드가 클러스터 내부에서 정상 동작을 하지 않는다면, 다른 시스템에 다시 연결할 수 있을 때까지 수신된 요청에 대해서 더 이상 응답하지 않는다.

만약 위의 상황에서 요청을 모두 수신한다면 특정 노드의 데이터 일관성은 깨질 수 있으므로 가용성을 포기하되 일관성을 보장한다고 볼 수 있다

## 가용성, **A**vailability

availability 는 수신된 모든 요청에 대해 계속해서 응답을 할 수 있는 gaurantee 를 의미한다

[##_Image|kage@bp9A1S/btsAaH5Pihg/KJKCKqEvFMQ9kKsp5vIHe0/img.png|CDM|1.3|{"originWidth":877,"originHeight":727,"style":"alignCenter","width":658,"height":545}_##]

만약 특정 노드가 클러스터 내부에서 정상 동작하지 않더라도 다른 노드들이 수신된 요청을 처리한다.

이는 가용성을 가장 우선으로 생각하고 보장한다고 할 수 있다

## 파티션 감내, **P**artition Tolerance

partition 은 DB 의 partitioning 이나 kafka 의 partition 과 다르다.

CAP 이론 문맥에서의 partition 은 바로 **장애**이다.

partition 은 다양한 상황에서 발생할 수 있다.

network 가 불안정해서 지연이 발생하거나, computing engine 이 일시적으로 down 된 것을 모두 partition 이라고 한다.

partition tolerance 는 이러한 partition 상황에서의 recovery gaurantee 를 의미한다

# CAP 이론

CAP 이론은 바로 앞선 3가지의 guarantee 로 부터 시작된다.

분산 시스템에서는 서로 다른 노드들이 하나의 목적을 달성하기 위해서 하나인 것 처럼 clustered 되어 동작하게 된다.

[##_Image|kage@JC5mt/btsz86Zw4Fs/QoS3gLDD1xrxorqLuJDeEK/img.png|CDM|1.3|{"originWidth":960,"originHeight":727,"style":"alignCenter","width":536,"height":406}_##]

이러한 분산 시스템에서 가장 주요한 특성은 바로 노드간의 Liveness 이다.

노드간의 Liveness 가 지겨키지지 않는 경우는 매우 다양하다.

앞서 이야기한것 처럼 `우리가 항상 network 를 신뢰하지 않는점`, `언제든지 computing engine 은 down 될 수 있다는 점`을 고려한다면 partition 인 상황은 분산 환경에서 항상 발생할 수 있는 **불가항력이다.**

#### CAP 이론은 **분산 시스템에서 Partition 상황이 항상 발생할 수 밖에 없다고 가정하고**, Partition 이 발생하면 Availability 와 Consistency 사이에서 선택을 해야한다는 이론이다

CAP 를 모두 만족하는 시스템은 존재할 수 없다. 우리는 2가지의 guarantee 에서 trade off 를 고려해 한 가지를 선택해야 한다

## 1-1. CAP 이론 - CP 시스템

`Consistency + Partition Tolerance`

CP 시스템은 Partition 상황에서 일관성(Consistency) 를 우선으로 생각한다는 시스템이다

[##_Image|kage@brJ82m/btsz85Nse30/1LKf27H7iIRdbLI4L0bZBK/img.png|CDM|1.3|{"originWidth":1704,"originHeight":674,"style":"alignCenter","width":607,"height":240}_##]

CP 시스템은 분산 시스템에서 가장 많이 사용되는 구조가 아닐까 싶다.

대표적으로 RDBMS 는 CP 시스템이라고 생각하면 된다.

일반적으로 CP 시스템은 Primary-Secondary 구조로 구성이 되고 p 와 s 사이에 계속해서 heartbeat checking 을 통해 liveness 를 확인한다.

만약 primary node 에 액세스할 수 없다면 secondary 중 누군가가 primary 가 된다.

이때, consistency 를 위해 모든 요청을 blocking 하는데, 이는 파티션이 해결될 때 까지 blocking 하게 된다.

파티션이 복구될 때 까지 요청을 blocking 하기 때문에 availability 는 낮아지게 된다.

## 1-2. CAP 이론 - AP 시스템

`Availability + Partition Tolerance`

AP 시스템은 Partition 상황에서 가용성(Availability) 을 우선으로 생각한다는 시스템이다

[##_Image|kage@WkQNT/btsAbpYbkXu/AEZvLHzwgMAYmYK2FZ79V0/img.png|CDM|1.3|{"originWidth":1716,"originHeight":1426,"style":"alignCenter","width":440,"height":366}_##]

AP 시스템은 일명 Turntable consistency 라고도 불린다.

이 구조는 Primary 가 존재하지 않는 Primaryless, Masterless 구조이다. 즉 모두가 Primary 이며 Secondary 라는 것이다.

그래서 모든 노드로 write 연산과 read 연산이 분배될 수 있고, write 작업이 발생하면 모든 노드를 동기화하는 형태이다.

그래서 만약 파티션 상황이 발생하더라도 요청을 다른 node 로 보내면 되기 때문에 가용성이 높아진다.

primary 가 없어서 노드간의 데이터 동기화가 이루어지기까지 동일한 데이터지만 서로 다른 version 을 가져 consistency 가 일시적으로 깨지는 상황이 존재한다.

하지만 모든 업데이트(write) 작업에 대해서 결국 모든 노드에 도달할 것임을 의미하는 Eventual Consistency 를 보장한다

## 1-3. CAP 이론 - 왜 CAP 를 모두 만족하는 시스템은 존재할 수 없을까?

Partition 이 발생했을 때, Consistency 와 Availability 를 만족하는 가장 쉬운 방법은 partitioned node 를 종료시키고 cluster 에서 제외하는 것이다.

[##_Image|kage@baMHbq/btsz84A1ePQ/wTOQfyC2NuvsdEL1aNmIfk/img.png|CDM|1.3|{"originWidth":1801,"originHeight":683,"style":"alignCenter","width":1351,"height":512}_##]

그럼 복구나 정합에 대한 신경을 더 이상 하지 않아도 되므로 Consistency 와 Availability 가 계속해서 만족될 것이다.

하지만 파티션이 항상 존재할 수 밖에 없는 분산 환경에서 계속해서 문제가 생긴 node 를 방출시킨다면 단일 노드로 수렴할 것이다.

그럼 분산 환경이 더 이상 아니게 된다. CAP 이론은 분산 환경에서 의미가 있는 것인데, 이렇게 되면 더 이상 CAP 가 필요 없어진다.

CA 시스템에 대해 설명하는 여러 글을 보면 단일 인스턴스로 MySQL 서버를 구성하면 된다고 한다.

하지만 사실상 단일 인스턴스인 경우는 분산 환경이 아니기에 CAP 이론을 적용하는 의미가 없어 지는 것이다.

# 2. CAP 이론의 한계

모든 이론이 그렇듯, 현실에 모든 것을 100% 적용하기란 쉽지 않다.

CAP 이론도 그러한데, CAP 이론은 크게 3가지 한계가 존재한다.

1. 완벽한 CP, AP 시스템은 존재하지 않는다. 대부분은 CP 와 AP 사이 어디쯤이다
2. 분산 시스템의 핵심 요소인 성능과 지연시간을 표현할 수 없다.
3. 우리의 시스템은 항상 partitioned 상황이 아니다

이러한 한계를 설명하기 위해서 PACELC 라는 이론이 존재하는데, 한 번 확인해보자

# 3. PACELC 이론

PACELC 이론은 앞선 CAP 이론의 한계로 인해 탄생하게 되었다.

현실에서는 Partition 상황과 아닌(Else) 상황이 함께 존재한다고 가정하고, 2가지 상황을 나눠 각각 어떤 gaurantee 를 선택할 것인지 나눠놓은 것이다.

처음에 소개했던 3가지의 Gaurantee 에 **Latency Gaurantee** 를 추가하여 PACELC 이론은 다음과 같이 구분한다

- Partition 상황
  - 선택지 1. Availability
  - 선택지 2. Consistency
- Else 상황
  - 선택지 1. Latency
  - 선택지 2. Consistency

[##_Image|kage@bqqNl5/btsAboZmdEN/tDoGIPrO70cXQaT52vdq70/img.png|CDM|1.3|{"originWidth":1588,"originHeight":788,"style":"alignCenter","width":651,"height":323}_##]

이러한 Gaurantee 들을 통해서 다음 4가지 조합(`PA/EL`, `PA/EC`, `PC/EL`, `PC/EC`)이 만들어질 수 있는데, 이들을 파티션이 존재하는 상황에 따라 먼저 구분해보자

## 3-1. 파티션이 발생했을 때 가용성을 우선으로 생각하는 PA System

파티션이 발생했을 때, 가용성을 우선으로 생각한다면 PA 시스템이라고 한다. 앞서 설명한 바로는 AP System 과 동일하다.

특정 노드가 비정상적이라도 모든 요청을 수신하여 최종적 일관성을 보장한다

그 외의 상황에서는 다음 2가지로 나눌 수 있다.

1. PA/EL
2. PA/EC

### PA/EL

PA/EC 시스템은 partition 상황에서는 가용성이 중요하고 **일반적인 상황에서는 속도가 우선인 시스템이다**

대표적으로 apache cassandra 나 dynamo 와 같은 시스템이 그러하다

cassandra 는 턴테이블 구조로 언제나 동일하게 모든 노드가 primary 이며 secondary 이기에 가용성과 성능(low latency)이 높다.

### PA/EC

PA/EC 시스템은 partition 상황에서는 가용성이 중요하고 **일반적인 상황에서는 일관성이 우선인 시스템이다**

대표적으로는 MongoDB 가 그렇다

MongoDB 는 replication 의 데이터 싱크가 비동기적으로 이루어지기 때문에 secondary 에 복제되지 않은 데이터가 손실될 수 있으나 가용성이 높다.

하지만 MongoDB 는 non-locking cosistent read 의 대표적인 기법인 [MVCC 를 제공](https://aws.amazon.com/ko/compare/the-difference-between-cassandra-and-mongodb/)하기 때문에 consistency 를 보장할 수 있다

## 3-2. 파티션이 발생했을 때 일관성을 우선으로 생각하는 PC System

파티션이 발생했을 때, 일관성을 우선으로 생각한다면 PC System 이라고 한다. 앞서 설명한 바로는 CP System 과 동일하다.

특정 노드가 비정상적이라면 요청을 block 하여 일관성을 우선으로 생각한다.

그 외의 상황에서는 다음 2가지로 나눌 수 있다

1. PC/EC
2. PC/EL

### PC/EC System

PC/EL 시스템은 partition 이든 그 외든 (else) 모두 Consistency 가 가장 중요하다

현존하는 data storage service 중에 RDBMS 가 그 대표적인 예시이다.

MySQL 이나 Postgresql 과 같은 rdb 는 ACID 를 통해 늘 consistent operation 만을 수행한다

### PC/EL System

PC/EL System 은 partition 인 상황에서는 Consistency 를 중요하게 생각하고 그 외의 상황에서는 속도를 중요하게 생각한다.

이 특성을 가진 시스템이 많지 않은데, 대표적인 것은 [Yahoo 의 PNUTS](https://sites.cs.ucsb.edu/~agrawal/fall2009/PNUTS.pdf) 라는 DBMS 가 있다고 한다.
