[DDD] Entity 에 대한 이야기

### 목차

- 서론
- 식별자란 무엇인가
- 식별자의 종류
  - 전역 식별자와 지역 식별자
- 식별자는 언제 생성되는가?
  - 빠른 식별자 생성과 늦은 식별자 생성
    - 빠른 식별자: 애플리케이션에서 객체가 생성될 때
    - 늦은 식별자: 객체가 영속화 될 때
- 3가지 식별자 생성 방법
  1. db 에서 생성
  2. application 에서 생성
  3. 다른 aggregate 에서 생성

# 서론

지난시간 [entity 란 무엇인가](https://wonit.tistory.com/652)에 대해서 이야기를 나눴다.

지난 시간에 이야기했던 entity 를 다시 정리하자면,

#### entity 는 핵심 도메인 모델중 하나로 도메인 객체가 연속성을 가지기 위해 식별자를 부여받아 영속성 장치에 영속화가 되는 대상 객체이다.

이번에는 식별자에 대해서 이야기를 해보려 한다.

# 식별자란 무엇인가, Identifier

식별자는 객체를 유일하게 식별할 수 있는 고유한 값 또는 속성이다.

식별자는 도메인 객체를 식별하기 위해서 사용되는데, 앞선 이야기처럼 식별해야하는 도메인 객체는 엔티티이다.

결국 엔티티의 대표 id 인 셈이다.

식별자는 일반적으로 Relation Database 에선 `Primary Key` 라고 불리고 document database 에서는 `Key` 라고도 불리는데, 영속성 장치에 저장된 도메인 객체를 꺼내오기 위해서 사용되는 row 고유 값과 동일하다.

#### 일반적으로 key 를 만드는 방법은 매우 복잡하다

key 를 만들어낸다는 것은 **시스템에서 고유한 값**을 생성해내야 하기 때문에 **충돌** 내성이 기본적으로 필요하다.

그래서 보통의 경우 key 의 길이를 늘려 충돌의 가능성을 줄이기 위한 후보군을 확 늘려버리기도 한다.

```
9141 <- 2^14 가지 경우의 수
1924175127931237 <- 대충 2^49 가지의 경우의 수
```

충돌내성 특성을 만족해내기 위해서는 단순하게 난수면 될까? 그렇지 않을 수도 있다.

일반적인 주문 도메인에서는 id 로 소통하는 케이스와 이해관계자들이 많이 있기 때문에 uuid 나 guid 같은 복잡한 값보다 human readable 한 값이 필요하다.

```
❌ 1c0db7f4-1e1e-4d0f-9c7c-f7fc0a486db2
✅ ORD-20230701-991572
```

또한 대부분의 우리가 개발하는 환경은 multiple computing engine 으로 구성되기 때문에 동시성에 대해서 안전하도록 고려가 되어야 한다.

#### 또한 key 는 보안적 측면에서도 고려되어야 한다.

어떤 도메인에서는 key 자체가 유추가 가능하면 안될 수 있다.

key 가 자동 증분으로 이루어져 있다면 특정 key 를 유추할 수 있는 단서가 될 수 있고, 서비스의 이용자의 사이즈나 특정 비즈니스의 사이즈가 유추될 수 있기 때문이다.

> A 회사의 주문 id 를 증분으로 사용했다면 B 회사 전략팀에서 A 회사의 최근 주문 id 를 통해 서비스 이용자가 하루동안 얼마나 주문을 하는지 쉽게 예측할 수 있을 것이다.

# 식별자의 종류

식별자에는 종류가 있다.

식별자라고 해서 모두 같은 식별자가 아니다.

식별을 해야하는 상황에 따라서 식별자의 종류가 달라진다.

1. 전역 식별자
2. 지역 식별자

### 전역 식별자

전역 식별자는 시스템에서 고유하게 식별되어야 하는 대상들에게 부여하는 식별값이다.

전역 식별자는 **중복**과 **충돌** 그리고 **보안적 요소**를 다방면으로 고려해야한다.

일반적으로 전역식별자는 도메인 혹은 테이블 내에서만 식별성을 가지는것이 아니라 전체적인 분산 시스템 레벨에서 식별성을 요구하는 경우가 있다.

### 지역 식별자

반면에 지역식별자는 시스템 전역에서 식별성을 가질 필요는 없지만, 특정 데이터 내부에서만 식별성을 가지면 된다.

비교적 전역식별자보다 더 적은 노력으로 식별값을 생성해낼 수 있고 그 후보군 자체도 적기 때문에 충돌에 비교적 안전하다.

때에 따라서는 지역 식별자에게 **컬렉션의 인덱스** 혹은 **난수가 아닌 의미를 부여하는 값**을 할당하기도 한다.

아래의 그림은 전역 식별자와 지역 식별자를 나타내는 그림이다.

[##_Image|kage@b0UBjT/btsnLaLUFP8/GmvOKj3bJ5RymOxEH6eUTK/img.png|CDM|1.3|{"originWidth":2332,"originHeight":1003,"style":"alignCenter","width":1749,"height":752}_##]

다이어그램으로 만든 자동차의 모습이라고 생각하면, Car 엔티티는 시스템 전역적으로 식별이 되어야 하기 때문에 전역 식별자를 갖지만, 바퀴(Wheel) 는 앞, 뒤, 좌, 우만 식별되면 되기 때문에 지역 식별자를 갖는다.

# 식별자는 언제 생성되는가?

식별자는 언제 생성되어 엔티티에게 할당되느냐? 에 따라서 2가지로 구분될 수 있다.

1. Entity 가 생성된 후
2. Entity 가 생성되기 전

이렇게 Entity 의 생성을 기준으로 시점에 따라서 **빠른 식별자 할당법** 과 **늦은 식별자 할당법** 으로 나눈다

## Entity 가 생성된 후 식별자를 생성, 늦은 식별자 생성

[##_Image|kage@pU9i7/btsnEMMAoeF/00Bv35kiyx4U0QY44u0Dy1/img.png|CDM|1.3|{"originWidth":1166,"originHeight":662,"style":"alignCenter","width":765,"height":434}_##]

말 그대로 식별자를 Entity 가 생성된 후 생성 & 할당하는 것이다.

이 방법은 일반적으로 Database 의 id 생성 위임을 이용한 구현이 가장 일반적이다.

다음과 같이 MySQL 에서 AUTO_INCREMENT로 산술 증분 방식으로 구현할 수 있다.

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);
```

앞서 key 생성이 복잡하다고 이야기 했는데, 그 복잡한 과정을 database 의 기술로 해결한다.

database 의 안정성만 보장된다면 내부적으로 thread-safe & concurrent safe 한 id 를 증분하여 발급하기 때문에 쉽게 id 를 생성할 수 있다

하지만 문제는 **도메인 이벤트**에서 발생된다.

> 도메인 이벤트는 도메인에서 발생한 비즈니스적으로 의미있는 일종의 사건이다. 도메인간 결합도를 낮추기 위해 사용되는데, 이는 DDD 에서 매우 중요한 일을 하기 때문에 추후 깊게 설명하도록 하겠다.

대부분의 엔티티는 **생성됨** 이라는 이벤트가 중요한 역할을 수행한다.

하지만 domain event 가 발행되는 시점에는 즉, 도메인 핵심 엔티티가 생성된 시점에는 database 에 접근하기 전이기 때문에 늦은 식별자 할당으로 domain entity 의 id 를 알 수 없다.

[##_Image|kage@ejpBRx/btsnF6p5pyT/802FC5aT1vakK9pqDNLIUK/img.png|CDM|1.3|{"originWidth":1413,"originHeight":662,"style":"alignCenter","width":1060,"height":497}_##]

Spring Data 와 Spring Events 를 사용하여 늦은 식별자 기법을 사용하더라도 생성됨에 대한 domain event 를 사용할 수 있는데, (이는 역시 추후 다루기로 하겠다.)

Spring Data 와 Spring Events 를 활용한다고 하더라도 id 생성의 주체가 모두 DB 에 의존적이다는 문제가 있다.

또다른 문제는 유일 식별자가 아닐 수 있다는 것이다.

이 방법은 일반적으로 call 마다 `shared counter` 를 이용하는 방법이 대부분이기 때문에 여러 독립된 서버에서 동일한 id 를 생성할 수도 있다

## Entity 가 생성되기 전 식별자를 생성, 빠른 식별자 생성

[##_Image|kage@JEhEe/btsnG0wgGhC/oETYogBkjnlcPcTVPVKiAk/img.png|CDM|1.3|{"originWidth":1172,"originHeight":662,"style":"alignCenter","width":879,"height":497}_##]

식별자를 생성하는 두번째 방법은 바로 빠른 식별자 생성이다.

앞선 문제 상황을 해결할 수 있는 한가지 해결방법으로, 식별자 자체를 미리 생성해서 entity 를 생성하는 생성자 메서드의 인자로 넘기는 방법이다.

```java
public class User {

    // id 를 외부에서 생성해서 전달
    public static User newInstance(long id, String username) {
        return new User(id, username);
    }

    private final long id; // invariant
    private final String username;
    // ...
}
```

이렇게 되면 entity 의 입장에서는 id 생성 주체가 누가 되든 상관 없이 일관되게 동작될 수 있다.

이 방법은 DB 에 의존적일 수도 있고 그렇지 않을 수도 있지만 핵심은 application 내에서 id 를 언제든지 생성할 수 있다는 것에 있다.

domain-event 에 대해서도 안전하고, 외부 통합을 위한 message 의 id 를 생성할 때도 사용될 수 있다.

> 이 방법은 개인적으로 도메인에서 중요한 역할을 수행하는 식별자가 특정 기술에 의존하지 않게 만들 수 있고 식별자 생성에 대해 가시적이고 통일된 인터페이스를 제공할 수 있기 때문에 개인적으로 가장 선호하는 방식이다.

이 빠른 식별자 할당법은 구현법이 다양한데, 아래에서 대표적인 구현법 3가지를 알아보도록 하자

### 정리

- 식별자 생성은 entity 의 생성 전과 후에 따라 나뉜다.
  - entity 생성 전: 빠른 식별자 생성
  - entity 생성 후: 느린 식별자 생성
- 느린 식별자 생성
  - 복잡한 식별자 생성의 책임을 외부의 도움을 받아 쉽게 해결한다
  - 일반적으로 데이터베이스에 의존적이다.
  - domain event 나 외부 시스템 통합에 제한적이다
  - 분산환경에서 유일 식별자를 생성하지 못할 수 있다.
- 빠른 식별자 생성
  - 특정 기술이나 구현에 의존적이지 않을 수 있다.
  - 식별자 생성을 제어하고 애플리케이션 내의 식별자 생성 방법이 통일될 수 있다.
  - 복잡한 식별자 생성의 책임을 감내해야 한다

# 식별자를 생성하는 다양한 방법

일단 빠른 식별자 생성을 선택했다면 식별자를 생성하는 책임을 우리가 직접 관리해야한다.

몇가지 방법에는 역시 복잡한 id 생성을 대신해주는 외부의 도움을 받아 해결할 수도 있다.

식별자를 생성하는 방법은 크게 3가지 일반적인 방법에 대해서 알아보도록 하자

1. DB 에서 식별자를 생성
2. Application 내에서 식별자를 생성
3. 식별자를 생성하는 책임이 있는 다른 Bounded Context 에서 식별자를 생성

## DB 에서 식별자를 생성

가장 쉽게 식별자를 생성하는 방법으로 Database 의 기술을 이용하는 것이다.

[##_Image|kage@bJMnT6/btsnEWu2a2S/XmAkV3GPX03FT4ovdjZkC0/img.png|CDM|1.3|{"originWidth":1172,"originHeight":662,"style":"alignCenter","width":879,"height":497}_##]

데이터베이스의 AUTO_INCREMENT 테이블을 이용하여 id 를 생성하는 방법이므로 생성 주체가 DB 이기 때문에 느린 식별자 생성법에서도 사용될 수 있다.

## Application 내에서 식별자를 생성

이 방법은 가장 명시적이고 가시적인 방법이다.

[##_Image|kage@npQdy/btsnEoL3lYK/FkuOe2pgyUxF4cie94g60k/img.png|CDM|1.3|{"originWidth":1172,"originHeight":673,"style":"alignCenter","width":879,"height":505}_##]

Application 내에서 식별자를 생성하는 것이다.

대표적으로는 EpochTimeBased Id, UUID 나 GUID 를 이용하는 방법이 있는데, 이 방법도 문제가 존재한다.

- Id 생성의 복잡성을 애플리케이션이 감당해야 한다
- 분산환경에서 아주 유일한 식별자를 생성하기 어렵다

## 식별자 생성을 위한 Bounded Context 에서 식별자를 생성

오직 식별자 생성에만 관심이 있는 Bounded Context 를 만들고, 해당 BC 에서 id 를 획득하는 방법이다

[##_Image|kage@bhmSTj/btsnFL7xhOV/5LAokYb833NrcgofhKmrLK/img.png|CDM|1.3|{"originWidth":1303,"originHeight":662,"style":"alignCenter","width":977,"height":497}_##]

식별자 생성 방법은 BC 내부로 캡슐화가 되기 때문에 전혀 문제가 되지 않는다.

이 방법은 분산환경에 초점이 맞춰져 있다.

분산 환경에서 많은 독립된 서버들 사이에서 유일한 id 생성을 위해서 id 생성 주체를 통일시켜 중복을 방지하는 방법이다.

대표적으로는 다음과 같은 방법이 있다.

- MySQL Centralizing Auto-Increment
- MySQL Cluster Mode
- MongoDB id generation
- Twitter Snowflake Id Generator
- Baidu UID generator
- Sonyflake Id Generator

> 위 방법에 대해서 특징과 장단점에 대해서 [분산환경에서 7가지 유일 id 생성법 비교 리뷰](https://wonit.tistory.com/648) 에서 정리해놓았다.

또한 이 방법을 사용한다면 id 자체에도 의미있는 비즈니스 규칙을 추가시킬 수 있다.

가장 좋은 방법이나, 이 방법을 선택하기 위해서는 매우 신중에 신중을 가해야 한다.

이 방법은 서로 다른 애플리케이션 환경이기에 네트워크 통신이 일반적으로 필요하다.

그렇다면 ID 생성 서버 자체는 완벽한 Single Point of Failure 이므로 매우 강하게 HA 구성을 해야거나 수많은 서버들 사이의 Id 생성에 대한 Orchestration 이 필요하다.

### 정리

- id 생성 방법은 크게 3가지가 존재함
  - DB 에서 id 생성
  - application 내에서 id 생성
  - id 생성을 위한 Bounded Context 에서 생성
- **DB 에서 id 생성**
  - 장점
    - 구현이 간단하다
  - 단점
    - DB 의존적이다
    - 분산환경의 유일한 식별자를 생성하지 못할 수 있다.
- **application 내에서 id 생성**
  - 장점
    - id 생성 방법을 제어할 수 있다
  - 단점
    - id 생성의 복잡성을 감당해야한다
    - 분산환경의 유일한 식별자를 생성하지 못할 수 있다.
- **id 생성을 위한 Bounded Context 에서 생성**
  - 장점
    - 분산 환경에서도 안전한 방법이다
    - id 생성 방법을 제어할 수 있다
  - 단점
    - SPOF 이다.
    - 관리 포인트가 증가한다

# 마치며

앞서서 Entity 가 생성되기 전과 후로 식별자를 생성하는 방법에 대해서 알아보았고, 식별자 자체를 어떻게 생성하는지에 대해서도 여러 선택지를 알아보았다.

이번 내용은 DDD 자체와는 조금 먼 내용일 수 있지만 식별자를 생성하는 방법은 매우 중요하다.

나는 DB AI 나 UUID 를 사용해서 혹은 Twitter 나 Baidu IdGenerator 를 이용해 애플리케이션 내에서 식별자를 생성했던 적도, id generation 을 위한 Bounded Context 를 구현한 적도 있다.

결국엔 3가지 방법 모두 문제점에 봉착했던 경험이 많은데, 그만큼 식별자 생성은 쉽지 않은 주제이다.

각각의 해법이 가진 강점, 단점 그리고 복잡성이 존재하기 때문에 상황에 알맞은 방법을 선택하는데 시간을 쏟아야 한다.

식별자 생성은 다른 여러 소프트웨어 방법론과 동일하게 한가지 master key 가 존재하지 않는다.

각각의 상황을 잘 분석하고 정확한 해결책을 찾도록 노력하자
