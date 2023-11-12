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

# CAP 이론

CAP 이론은 바로 앞선 3가지의 guarantee 로 부터 시작된다.

분산 시스템에서는 서로 다른 노드들이 하나의 목적을 달성하기 위해서 하나인 것 처럼 clustered 되어 동작하게 된다.

[##_Image|kage@JC5mt/btsz86Zw4Fs/QoS3gLDD1xrxorqLuJDeEK/img.png|CDM|1.3|{"originWidth":960,"originHeight":727,"style":"alignCenter","width":536,"height":406}_##]

이러한 분산 시스템에서 가장 주요한 특성은 바로 노드간의 Liveness 이다.

노드간의 Liveness 가 지겨키지지 않는 경우는 매우 다양하다.

우리가 항상 network 를 신뢰하지 않는점, 언제든지 computing engine 은 down 될 수 있다는 점을 고려한다면 partition 인 상황은 분산 환경에서 항상 발생할 수 있는 불가항력이다.

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

[##_Image|kage@QkX3F/btsAeEUQeHb/dOLB3B51Y5z4Af4ZRSpNck/img.png|CDM|1.3|{"originWidth":877,"originHeight":727,"style":"alignCenter","width":552,"height":458}_##]

파티션이 복구될 때 까지 요청을 blocking 하기 때문에 availability 는 낮아지게 된다.

## 1-2. CAP 이론 - AP 시스템

`Availability + Partition Tolerance`

AP 시스템은 Partition 상황에서 가용성(Availability) 을 우선으로 생각한다는 시스템이다

[##_Image|kage@WkQNT/btsAbpYbkXu/AEZvLHzwgMAYmYK2FZ79V0/img.png|CDM|1.3|{"originWidth":1716,"originHeight":1426,"style":"alignCenter","width":440,"height":366}_##]

AP 시스템은 일명 Turntable consistency 라고도 불린다.

이 구조는 Primary 가 존재하지 않는 Primaryless, Masterless 구조이다. 즉 모두가 Primary 이며 Secondary 라는 것이다.

그래서 모든 노드로 write 연산과 read 연산이 분배될 수 있고, write 작업이 발생하면 모든 노드를 동기화하는 형태이다.

그래서 만약 파티션 상황이 발생하더라도 요청을 다른 node 로 보내면 되기 때문에 가용성이 높아진다.

[##_Image|kage@btlikE/btsz8penKrI/MGDroMCJyYFQJdHfMryOJK/img.png|CDM|1.3|{"originWidth":877,"originHeight":727,"style":"alignCenter","width":540,"height":448}_##]

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

- 완벽한 CP, AP 시스템은 존재하지 않는다
- 대부분의 분산 시스템은 CP 와 AP 사이 어디쯤이다
- 즉, partition 이 없는 모든 노드가 availiable 인 상황에는 latency 와 consistency 사이의 절충안이 필요하다

# 3. PACELC 이론
