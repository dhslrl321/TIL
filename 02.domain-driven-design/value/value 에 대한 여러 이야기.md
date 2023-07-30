[DDD] Value Object 에 대한 여러 이야기

### 목차

- entity 에 대한 짧은 소개
  - 모든 객체가 entity 일까?
- value object
  - entity 와 value object
- value object 의 3가지 특성
  - 측량, 측정, 수량화, 표현
  - 불변성
  - 등가성
- value object 는 이렇게 쓴다
  - java 에선 lombok 의 `@Value` 가 있다
  - value object 와 context
  - 개념적 하나
  - 엔티티의 책임 분산

# 서론

지난시간에 여러번에 걸쳐서 entity 에 대해서 이야기를 해보았다. 기본적인 [entity 의 개념과 특성](https://wonit.tistory.com/652) 부터 시작해서 [entity 와 식별자](https://wonit.tistory.com/653)에 대한 이야기까지..

[##_Image|kage@O8s3S/btsoxIbBhUw/Vs5iRm9TobxnWM0ZGADdd0/img.png|CDM|1.3|{"originWidth":534,"originHeight":220,"style":"alignCenter","width":400,"height":165}_##]

이번시간에는 엔티티와 더불어 도메인 모델의 핵심 구성요소인 **Value Object**, 값 객체에 대해서 알아보도록 하겠다

# entity 에 대한 짧은 recap

`value object` 를 이야기할 땐 항상 `entity` 도 함께 등장한다.

value object 를 잘 이해하기 위해서 entity 에 대해서도 알아볼 필요는 있지만, entity 에 대해서는 지난 시간 이야기를 많이 나눴기 때문에 자세한 설명은 생략하고 핵심만 이야기해보자.

entity 한 문장으로 표현하자면 이렇게 말할 수 있다

> entity: 도메인 객체가 연속성을 가지기 위해 식별자를 부여받아, 애플리케이션 내에서 식별이 될 수 있는 대상 객체

이렇게 식별이 필요한 이유는 바로 시간에 흐름에 따른 **변화를 추적**하고 싶기 때문이다.

일반적으로 `주문(Order)` 도메인에서 유저의 주문 하나가 여러가지 상태를 갖게된다.

- 주문요청
- 결제 대기
- 결제 완료
- 주문 성공
- 배송중

각각의 상태에 따라서 주문 객체가 해야할 일이 다르다.

유저 플로우상 유저가 결제를 마치면 `결제 대기` 중이던 주문 객체를 식별하고 `결제 완료` 상태로 변경하는 일반적인 흐름을 갖는다.

그럼 모든 객체가 entity 처럼 **식별성**이 필요할까?

#### 그렇지 않다. 도메인 모델에 존재하는 모든 객체가 식별성을 가지면 매우 복잡한 구조가 될 것이다.

value object 는 식별해야할 필요가 없는 값 그 자체를 의미한다.

entity 와 value object 를 적절하게 섞어 도메인을 모델링하는것이 일반적이다.

# value object

Value Object 는 도메인 모델 내에서 특정한 객체를 표현하고, 수치화하거나 측량하는 일만 수행한다.

value 는 언제, 어디서, 누구에의해 생성되었든 그냥 값일 뿐이다.

우리가 영속 과정에서 value 에 대한 식별을 잃어버린다고 하더라도 entity 와 달리 문제가 되지 않는다.

## entity 와 value object 구분하기

entity 와 value 는 도메인 모델 내에서 중요한 역할을 수행하고, 서로 상호 보완적인 역할을 수행한다.

앞서 이야기한 내용을 토대로 이해를 돕기 위해 한가지 상황을 가정해보도록 하겠다.

나는 세상에서 다른 사람들과 구분이 된다. '나' 라는 사람은 다른 사람들과 식별되어 독립적인 개체로써 살아가게 된다.

그리고 `나` 를 다른 사람들과 구분하기 부모님은 나에게 `이름` 을 지어주셨고, 나라는 나에게 고유한 시민임을 증명하기 위한 `주민등록번호` 를 발급해주었다.

여기서 entity 와 value 를 구분해보자.

[##_Image|kage@dGd13C/btsoz8AyQ2w/8hI9T87yn6xHtW8qu4gKmk/img.png|CDM|1.3|{"originWidth":506,"originHeight":832,"style":"alignCenter","width":380,"height":624}_##]

- entity: 식별해야할 대상
- value: 어떤 대상을 표현하고 수치화하거나 측량하는 존재

그렇다면 '나' 는 entity 가 될 것이고, 나를 설명하는 '이름' 이나 '키와 몸무게' 혹은 '주민등록번호' 는 value 가 될 수 있다.

우리가 이름에 일련번호를 부여하는 일은 없다. 이름은 그냥 이름이다.

# Value 의 특성

일반적으로 Value Object 는 코드로서 primitive value 가 아닌 해당 value 를 Wrapping 한 객체로 표현한다.

```java
class Username {
  private final String value;

  public Username(String value) {
    this.value = value;
  }
}
```

이렇게 Value 를 Object 로 사용하면 primitive type 의 value 보다 훨씬 더 readable 하며, type safe 하다.

이제 본격적으로 Value 의 3가지의 특성에 대해서 알아보자

1. 불변성
2. 값 등가성

## value 의 특성 1. 불변성

value 와 entity 의 가장 큰 특성이라고 한다면 `mutable` 과 `immutable` 이라고 할 수 있다.

우선 질문 하나를 해보겠다.

#### 어떤 데이터가 mutable 해야하는 이유는 뭘까?

entity 의 존재 이유와도 동일하다.

특정 객체가 연속성을 가지고 연속성에 따라 다른 상태 (state) 를 가져야 하기 때문이다.

그 연속성을 위해서 우리는 식별자라는 것을 부여하고 어느 시점엔 식별자를 통해서 과거 상태를 load 하여 새로운 상태로 변화시켜준다.

#### 하지만 어떤 데이터가 immutable 하다면?

immutable 이라면 언제든, 어떤 시점이든 생성하고 잊어버릴 수 있다. 변경될 일이 없기 때문에 식별되어야할 이유도 없다.

변경될 필요가 없는 데이터라면 오히려 시스템 내에서 변경될 수 없음을 보장하는 편이 훨씬 낫다.

### 어떻게 immutable 하게 만들까?

java 에서 immutable 하게 만드는 방법은 간단하다.

값을 변경할 수 없는 상수로 만들어버리거나, 한 번 생성되면 파괴될때까지 변경되지 않도록 만들면 된다

- final
  - 변수를 상수로 만들어버린다.
- no setter
  - 객체가 소멸할 때 까지 변경될 수 없다.

### 불변성을 이용한 예

immutable 한 특성을 가장 잘 이용한 일례는 바로 **엔티티 식별자를 값객체로 만드는 것이다.**

엔티티의 식별자는 애플리케이션 내에서 변경될 수 없음을 보장해야한다.

> 지난시간 [엔티티와 식별자](https://wonit.tistory.com/653)에 대해 이야기하며 식별자 안정성에 대한 이야기를 했었다. 식별자 안전성은 식별자가 한 번 할당되면 변경될 수 없도록 하여 식별자에 대해 side effect free 한 환경을 만들어주는 것을 의미한다

User 라는 엔티티가 존재한다면, 엔티티의 식별자로 primitive type 을 이용했을 때, 식별자 안정성이 지켜지지 않을 수 있다.

결국 식별자 객체를 immutable 함을 보장하는 Value Object 로 만들어서 식별자 안정성을 제공할 수 있다.

```java
// 식별자 안정성 x
public class User {
  Long id;
}

// 식별자 안정성 o
public class User {
  final UserId id; // 변경 불가
}
```

가 더 낫다.

## value 의 특성 2. 값 등가성

예를들어 내가 가진 5만원 지폐와 내 통장에 있는 5만원은 서로 동일한 가치를 나타낸다.

#### 이렇듯 값은 속성과 구조가 동일하다면 서로 같다고 이야기할 수 있다.

이렇게 말할 수 있는 이유는 바로 값은 등가성이 존재하기 때문이고 value object 역시 값 등가성, 동등성(equality) 비교를 지원해야 한다.

일반적으로 java 에서 `equals()` 메서드는 기본적으로 객체의 동일성을 비교하기 위해 reference 를 확인한다.

즉, 두 객체의 메모리 주소가 같은지를 확인하기 때문에 동일한 속성과 값을 가지더라도 다른 객체라고 표현하는데, Value 는 reference 비교가 아닌 property value, structure 비교를 수행해야 한다.

결국 `equals()` 와 hashcode() 메서드를 재정의해줘야 한다.

> equals 와 hashcode overriding 에 대해서는 [equals와 hashCode는 왜 같이 재정의해야 할까?](https://tecoble.techcourse.co.kr/post/2020-07-29-equals-and-hashCode/) 에서 자세히 확인할 수 있다.

# Value 는 이렇게 쓴다

앞서서 value object 에 대한 특성을 살펴보았으니 이제 Value Object 를 어떻게 사용할지 이야기해보자.

1. java 에선 lombok 의 `@Value` 가 있다
2. value object 도 context 가 중요하다
3. 개념적 하나
4. entity 의 책임 분산

## value 사용하기 1. java 에선 lombok 의 `@Value` 가 있다.

앞서 알아본 Value Object 의 3가지 특성을 구현하기 위해서 나는 lombok 의 `@Value` 어노테이션을 주로 사용한다.

```java
import lombok.Value;

@Value
class Username {
  String value;
}
```

`@Value` 를 사용하면 우선 해당 객체가 값객체인지 아닌지 어노테이션 메타로 쉽게 명시할 수 있다는 장점이 있다.

또한 Value 의 불변 특성을 만족시키기 위해서 항상 반복적으로 작성하는 `private final` 코드를 대신 작성해주며 값 등가성을 위한 `equals and hash code` 도 대신해서 작성해준다.

equals 가 참조값에 대한 비교가 아닌 특성으로 `toString()` 에서 더 이상 객체 주소값을 출력할 필요가 없는데, 이또한 `@Value` 가 `toString()` 을 override 해주기 때문에 간편하다.

## value 사용하기 2. value object 도 context 가 중요하다

다른 DDD 의 전술적 요소들과 마찬가지로 value object 도 역시 context 가 중요하다.

즉, context 에 따라서 value object 냐 아니냐가 결정된다는 것이다

우리가 5만원권 지폐를 한장 가지고 있다고 해보자. 그럼 그 돈을 누가 만들었고 언제 만들었는지 중요할까?

내 옆에 있는 동료 지갑에 있는 5만원권과 내가 가지고 있는 5만원권을 바꾸자고 하면 별 의심없이 바꿀 수 있다.

왜일까? 바로 동일한 가치를 지니기 때문이다.

반면에 범죄에 연류된 지폐는 나라에서 일련번호를 통해 식별할 수 있다.

우리가 범죄에 연류된 돈을 value object 로 만들면 어떻게 될까? 그럼 앞선 특성에 의해서 돈이라는 value 는 식별자가 없기에 연속성을 잃어버려 추적이 불가능하게 될 수 있다.

[##_Image|kage@cXiZr8/btsoIMJ3IRS/EkWSZxzd66jPnaf0DU8Eyk/img.png|CDM|1.3|{"originWidth":1562,"originHeight":937,"style":"alignCenter","width":1172,"height":703}_##]

이렇듯 값을 나타내는 value object 더라도 상황에 따라서 entity 가 될 수도 있고 value object 가 될 수도 있다.

## value 사용하기 3. 개념적 하나

Value Object 는 값 속성을 하나 또는 여러개를 가질 수 있다.

여러가지 속성이 존재할 수 있기 떄문에 잘못된 설계에 따라서는 Value Object 가 모호한 개념으로 진화할 가능성이 있다.

개념적으로 하나여야 한다.

```java
// 5,000,000₩ 개념적 하나, 두 특성을 하나로 봐야 하나가 됨
class Money {
  long value; // 5,000,000
  String currency; // 원, 달러
}
```

## **value 사용하기 4. entity 의 책임 분산**

#### 이 개념이 가장 중요하다.

value 를 단지 entity 를 표현하는 구성요로소만 사용한다는 것은 anemic 한 도메인 모델이 될 가능성이 높다.

> 예전에는 value 를 단지 primitive type 대신해서 이름을 부여하는 목적으로 사용했었는데, 이렇다면 primitive type 을 사용하는편이 훨씬 낫다. 적절한 책임이 없는 value object 는 존재 이유가 없다.

다음 구독에 대한 다음 청구를 생성하는 도메인 모델링을 봐보자

[##_Image|kage@by8BLI/btsoxdbM5zL/kpS3gwp5YwtWrqKOmIoHv1/img.png|CDM|1.3|{"originWidth":1285,"originHeight":601,"style":"alignCenter","width":964,"height":450}_##]

사용자는 Subscription 객체에게 다음 청구 생성을 요청한다.

그 때의 참여 객체들을 Value Object 를 이용하여 모델링한 코드이다.

```java
public class Subscription {
    ReservedBill bill; // 다음 청구
}

@Value(staticConstructor = "of")
public class ReservedBill {
    ReservedAt reservedAt; // 청구 예약일
    BillInterval interval; // 청구 주기
}

@Value(staticConstructor = "of")
public class ReservedAt { // 청구 예약일
    LocalDateTime value; // 청구 예약일의 value
}

@Value(staticConstructor = "of")
public class BillInterval { // 청구 주기
    long value; // 주기 value
    IntervalUnit unit; // 주기의 단위
}

public enum IntervalUnit {
    DAY,
    MONTH
}
```

클래스명만 보더라도 Value Object 에 대한 도메인 모델링이 잘 되어있고, 각각의 Value 들이 개념적 하나를 표현하고 있다.

그리고 앞선 상황을 구현하기 위해서 나는 이렇게 코드를 짜봤다.

```java
public class Subscription {
  ReservedBill bill;

  public void reserveNextBill() {

    ReservedAt reservedAt = bill.getReservedAt();

    BillInterval interval = bill.getInterval();

    if (MONTH.equals(interval.getUnit())) { // 청구 주기가 '월' 이라면
      LocalDateTime past = reservedAt.getValue();

      // interval 만큼 예약일을 plus
      LocalDateTime next = past.plusMonths(interval.getValue());

      ReservedAt nextReservedAt = ReservedAt.of(next);

      // 다음 bill 생성
      this.bill = ReservedBill.of(nextReservedAt, interval);

    } else if (DAY.equals(interval.getUnit())) {
      // TODO impl
    }
  }
}
```

위 코드는 **value object 의 책임 분산이 적절하게 수행되지 않았다고 할 수 있다.** 그냥 primitive value 를 wrpping 한것 그 이상도 이하도 아니다.

Subscription 에서 `reserveNextBill()` 이라는 메서드를 통해 **청구를 예약하는** 클라이언트 입장에서는 캡슐화가 잘 되었을지는 몰라도, entity 와 value object 간의 책임 분배가 적절하게 이뤄지지 않았다.

**이는 Value Object 를 단순히 value data holder 로만 바라보았기 때문이다.**

#### Value Object 가 진정한 빛을 내기 위해서는 Value 만의 책임을 부여해야한다.

Value Object 를 data holder 로 사용했던 앞선 예제를 **책임과 역할에 따라 다음과 같이 리팩토링할 수 있다.**

```java
public class Subscription {
  private ReservedBill bill;

  public void reserveNextBill() {
      this.bill = bill.reserve(); // 예약 요청
  }
}
```

Subscription 은 ReservedBill 에게 다음 청구를 생성하라고 요청한다.

Subscription 입장에서는 세부적인 내용을 알 필요가 없다. 단지 요청할 뿐이다.

그럼 ReservedBill 이 다음 과정을 거쳐서 nextBill 을 생성한다

```java
@Value(staticConstructor = "of")
public class ReservedBill {
  ReservedAt reservedAt;
  BillInterval interval;

  public ReservedBill reserve() {
    ReservedAt nextReservedAt = reservedAt.next(interval); // reservedAt 에게 계산 요청
    return ReservedBill.of(nextReservedAt, this.interval); // value 반환
  }
}
```

nextBill 을 생성할 때에도 ReservedAt 을 어떻게 계산하는지 알 필요가 없다.

실제로 ReservedAt 에게 적절한 근거를 파라미터로 넘겨 협력할 뿐이다

```java
@Value(staticConstructor = "of")
public class ReservedAt {
  LocalDateTime value;

  public ReservedAt next(BillInterval interval) {
    if (MONTH.equals(interval.getUnit())) {
      return ReservedAt.of(value.plusMonths(interval.getValue()));
    }

    throw new UnsupportedOperationException();
  }
}
```

이렇게 함으로써 각각의 Value 가 책임을 갖고 entity 와 협력을 하게 되는데, 이것이 바로 Value Object 의 본질이다.

> 어쩌면 DDD 의 몇몇 전술적 패턴은 객체를 잘 지향하는 방법을 말하는것 같기도 하다. 객체의 역할과 책임, 협력과 캡슐화가 DDD 의 근간이라 생각한다

# 마치며

value object 는 어쩌면 DDD 의 여러 전술중에 가장 많이 사용되는 전술이 아닐까 생각한다.

과거에 DDD 에 경험이 풍부한 한 시니어 개발자로부터 `당신의 Value Object 는 너무 빈약해요, 그냥 값들을 객체로 만든것 뿐이에요.` 라는 피드백을 받았다.

그 당시에는 내가 만든 Value Object 가 뭘 더 할 수 있을지 몰랐는데, 점점 시간이 지날수록 그 차이가 느껴졌고 이번 글을 통해서 나도 Value Object 에 대해 더 가까워진것 같다.

Value Object 야 말로 rich domain model 을 만들 수 있는 가장 쉽고 안전한 길이 아닐까 생각하기도 한다.

이 글을 보는 여러분도 그러한 인사이트가 되었으면 좋겠다.

Value Object 에 대해서는 아직 하지 못한 이야기가 많다.

ORM 이 defacto 가 된 현재, Value Object 를 저장하기 위해서 겪어야 하는 몇가지의 불편한 점들과 그 회피 기법들에 대해서 기회가 된다면 글을 써보도록 하겠다.
