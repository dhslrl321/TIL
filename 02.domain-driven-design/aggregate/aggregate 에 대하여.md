# TL;DR

[##_Image|kage@bgstCd/btsz9YUwUnE/ZOROFxZObWppzwGuWpcEO0/img.png|CDM|1.3|{"originWidth":1326,"originHeight":464,"style":"alignCenter","width":700,"height":245}_##]

이번 글의 핵심을 요약하면 다음과 같다

- **aggregate 란 무엇인가**
  - 3가지 핵심 도메인 구성요소 중 가장 기본
  - entity 와 value 의 composition
  - 완전한 하나의 개념
- **왜 aggregate 가 필요할까**
  - 고정자(invariant) 와 일관성 (consistency) 을 지키는 핵심 객체
- **aggregate 의 핵심 구성요소 3가지**
  - entity, root-entity, value
- **aggregate 을 설계하기**
  - 3가지 설계 지표
    - 일관성을 기준으로 나누기
    - actor 를 기준으로 나누기
    - usecase 를 기준으로 나누기
  - 잘 나뉘어진 aggregate 의 특성

# aggregate 란 무엇인가

에릭 에반스가 제시한 DDD, `domain driven design` 에서 핵심 도메인 구성요소는 3가지라고 분류한다.

1. **aggregate**
2. factory
3. repository

`factory` 를 통해 `aggregate` 를 생성하고 `repository` 를 통해 **aggregate 를 영속한다.**

일반적인 웹 애플리케이션을 구현할 때 많은 프로젝트에서 Entity 를 aggregate 와 **혼동해서 사용**하는 모습을 보았는데, DDD 에서는 이를 완벽히 구분한다.

> 지난 시간에 우리는 [entity](https://wonit.tistory.com/652) 와 [value](https://wonit.tistory.com/654) 에 대해서 알아 보았는데 해당 글을 통해 더욱 자세한 내용들을 확인 할 수 있다

앞선 두 글에서 자세히 확인할 수 있지만 **entity** 와 **value** 의 차이를 간략하게 이야기 하면 다음과 같다.

[##_Image|kage@8bzsR/btsGrSVokD9/nzefKWgs0hdOBPNbGOgQkK/img.png|CDM|1.3|{"originWidth":1004,"originHeight":336,"style":"alignCenter","width":753,"height":252}_##]

시간의 변화에 따라 entity 는 **변화** (change) 하지만 value 는 **대체** (replace) 된다.

aggregate 는 이러한 entity 와 value 객체를 composition 을 통하여 완전한 하나의 개념으로 묶어주는 역할을 수행한다.

[##_Image|kage@FFQWC/btsGq0fa4T6/dx6uvc8DDN22tkClZrI5l1/img.png|CDM|1.3|{"originWidth":1053,"originHeight":705,"style":"alignCenter","width":615,"height":412}_##]

aggregate 는 `완전한 하나` 이다.

aggregate 는 domain entity 와 value 들의 집합으로 이루어진 **완전한 하나**의 개념이다.

만약 하나의 행위를 하기 위해서 여러 aggregate 를 함께 조회해야 한다면 이는 완전한 하나의 개념에 벗어나는 것이다.

# 왜 aggregate 가 필요한가?

aggregate 가 entity 와 value 를 묶어놓은 **'완전한 하나'인 이유**는 바로 2가지가 있다.

1. 비즈니스 규칙, 고정자, invariant
2. 일관성, consistency

**이 2가지를 지키고 유지해야하는 책임이 바로 aggregate 에게 있는 것이다.**

### 1. 고정자

invariant 라고 불리는 고정자는 **비즈니스 규칙**을 의미한다.

비즈니스 규칙은 시스템이 어떤 상황에 놓여있더라도 **절대 변하지 않는 불변식**이다.

즉, `1 + 2 = 3` 인 것 처럼 산술연산의 도메인에서는 수식이 가진 의미와 등호가 가진 의미는 어떠한 상황에서도 변하지 않아야 한다.

aggregate 는 이러한 비즈니스 규칙을 코드로서 컴파일되어 어떠한 상황에도 변경되지 않도록 하는 역할을 수행한다.

이는 각각의 entity 와 value 들이 aggregate 내에서 **유기적으로 협력하여 달성**하는 것이다.

### 2. 일관성

consistency 라고 불리는 일관성도 역시 시스템이 어떠한 상황에 놓이더라도 **최대한 올바른 상태를 보장**해야 한다.

이러한 일관성은 보통 고정자 (invariant)인 비즈니스 규칙에 의해 정의되며 동작한다.

### aggregate 는 고정자(invariant) 를 통해 일관성(consistency) 을 가능한 항상 보장해야 하는 책임이 있다.

DDD 에서는 이렇게 aggregate 라는 하나의 **묶음 개념**을 통해서 어떠한 도메인 객체에게 **큰 역할을 부여**한다.

그리고 aggregate 를 통해 비즈니스 규칙을 캡슐화 하여 **복잡성을 낮추는 것**이다.

# aggregate 의 핵심 구성요소

aggregate 는 크게 3 가지로 이루어진다.

1. entity
2. root entity
3. value

### entity 와 root entity

entity 의 가장 큰 특징은 **id 가 존재하냐 하지 않냐에 있다.**

> 지난 [entity 와 식별자의 이야기](https://wonit.tistory.com/653) 에서 정리한 글을 보면 도움이 될 것이다.

id 가 존재한다는 것은, 상태를 가지고 있으며 **시간의 흐름에 따라 변경됨**을 의미한다.

결국 시스템은 특성 시점에 특정 entity 를 식별하고 식별된 entity 에게 어떠한 **명령 (command) 를 내림으로써 상태를 변경**한다.

aggregate 내에서 entity 는 또 2가지로 구분될 수 있다.

1. 전역 식별자를 가졌느냐?
2. 지역 식별자를 가졌느냐?

전역 식별자를 가진 entity 는 시스템 내에서 유일한 id 를 가지고 있으며 **global 하게 식별**될 수 있다.

반면에 지역 식별자를 가진 entity 는 시스템이 아닌 aggregate 내에서만 **지역적으로만 식별**되면 된다.

이때, 전역 식별자를 가진 entity 가 바로 root entity, `aggregate root entity` 가 된다.

### aggregate root entity 의 역할

aggregate root entity 는 일종의 `communicator` 이다.

aggregate **외부의 세상에 식별자를 노출**하여 entity 와 value composition 을 대표한다.

[##_Image|kage@QwwdB/btsGstgDPx3/ot3RNnhwWwHkjpFOPJ0HRk/img.png|CDM|1.3|{"originWidth":925,"originHeight":705,"style":"alignCenter","width":601,"height":458}_##]

외부에서는 aggregate 의 특정 entity 에 직접 접근하지 못하고 항상 **root entity 를 통해 간접적으로만 접근**할 수 있다.

**일종의 변경 지점을 하나로 모은 것이라고 봐도 무방하다.**

변경 지점이 하나로 모이므로 비즈니스 규칙을 한 곳에서만 적용할 수 있고 코드가 더욱 단순화 되는 것이다

# aggregate 을 설계하기

aggregate 을 설계하는 일은 정말 쉽지 않다.

aggregate 를 잘 설계하는 것은 초기에 이루어지기 어렵고 시스템이 발전할 수록 변경되는게 aggregate 라고 한다.

aggregate 을 설계하는 것은 **어떠한 공식이 존재하지 않는다.**

하지만 잘 설계하기 위한 **지침**들은 몇가지 존재하므로 한 번 알아보자.

[##_Image|kage@dreDcs/btsGuNGAMFU/1YudEJOtTUm6w3JK40uBLk/img.png|CDM|1.3|{"originWidth":1602,"originHeight":1580,"style":"alignCenter","width":482,"height":475}_##]

동일한 비즈니스라도 규칙이 세세하게 다르고 aggregate 를 정의하기 위해 발생하는 trade-off 모두 다르지만, 이러한 aggregate 를 설계하는 기준은 크게 3가지로 나눠 정리 할 수 있다.

- **1. 일관성을 기준으로 나누기**
  - aggregate 는 consistency 를 보장하는 도메인 객체
  - 정말 이 aggregate 에 존재하는 속성(데이터) 들이 하나의 일관성을 가져야 할까? 를 고민해봐야 함
- **2. actor 를 기준으로 나누기**
  - 하나의 aggregate 를 여러 actor 가 수정해야 한다면 잘못된 aggregate 설계일 가능성이 존재함
  - race condition 이 발생할 수 있고
  - ex) productItem aggregate 에 재고(stock) 를 함께 포함시키면 안됨
    - productItem 을 수정하는 seller
    - productItem 을 구매하는 customer
    - actor 가 다르기에 이 둘을 나눠야 함
- **3. usecase 를 기준으로 나누기**
  - 단지 aggregate 의 책임, 속성, 데이터 만으로 aggregate 을 설계하는 것은 힘듦
  - usecase 를 분석한다 == transaction 을 분석한다
  - 한 transaction 에서 여러 aggregate 를 항상 함께 수정한다면 그 aggregate 는 하나로 묶여야 할 확률이 높음

이러한 몇가지 고려사항들을 기반으로 잘 나뉘어진 (설계된) aggregate 는 다음 특성을 띈다.

- 언제나 단일 트랜잭션 내에서 완벽한 일관성을 유지한다
- 비즈니스적으로 요구되는 모든 방식과 고정자에 맞춰 수정될 수 있다
- 한 transaction 에서 여러 aggregate 를 수정하지 않는다
