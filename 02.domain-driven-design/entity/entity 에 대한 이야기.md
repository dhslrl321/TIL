[DDD] Entity 에 대한 이야기

### 목차

- 서론
- entity 란 무엇인가
  - 도메인 세상 이야기
  - vo 와 entity 가 있다
  - 무엇이 entity 를 결정하는가?
- entity 의 속성
  - invariant
  - immutable
- entity 의 행위
  - object autonomy
  - self encapsulation

# 서론

DDD 에서는 **유비쿼터스 랭귀지**를 통하여 여러 이해관계자들과 비즈니스 영역에 대해 합의 (Cosensus) 를 맞추고 그 결과물로 도메인에 대한 모델링 즉, `domain model` 이 산출된다.

이 `domain model` 은 여러 상호작용을 통해 비즈니스를 지탱하게 되는데, domain model 의 가장 기초가 되는 **두가지 타입의 객체**가 존재한다.

1. Entity
2. Value Object

오늘은 이 Entity 에 대해서 알아보도록 하자

# Entity 란 무엇인가?

엔티티 entity, spring 을 이용하는 개발자는 entity 에 대해서 익히 들어왔고 사용해 왔을 것이다.

바로 Spring Data JPA 에서 사용되는 개념 혹은 어노테이션으로, Database Table 에 대응되는 ORM 의 핵심이 되는 객체를 바로 Entity 라고 표현하고 코드레벨에선 이를 `@Entity` 어노테이션으로 지정한다.

DDD 에서 말하는 Entity 와 JPA 에서 이야기하는 Entity 가 크게 다를바는 없지만, 요즘 웹 개발의 흐름에서 보면 다르다는 것을 느끼고 있다.

그럼 entity 는 무엇인가?

#### Entity 자체의 개념은 영속성 장치와 무관하고 DB field 를 mapping 하는 java 객체가 아니다.

우리가 핵심 도메인 객체라 부르는 것들은 대부분 데이터베이스에 영속화를 하는데, 이유가 무엇인지 살펴볼 필요가 있다.

#### 왜 우리는 영속화를 하는 것일까?

영속화의 본질은 바로 **연속성**이다.

어떤 객체가 가져야 하는 책임을 연속적으로 추적하고 관찰하고싶은 것이다.

어느 순간에는 그 핵심 객체에게 상태를 변경하라는 명령(command) 를 할 것이고, 그 행위는 가능한 영원히 연속적이어야 한다.

가능한 연속적이기 위해서는 수많은 객체들을 각각 식별할 수 있어야 한다.

그때 우리는 그 핵심 객체에게 **식별자** 라는 것을 할당하게 되고, 이것을 바로 Entity 라고 부른다.

이러한 entity 들을 영원히 실행될 수 없는 현실의 computing engine 에서 안전하게 유지시키기 위해서 우리는 database 로 **영속화**라는 과정을 하는 것이다.

#### 즉, entity 는, 도메인 객체가 연속성을 가지기 위해서 식별자를 부여받아, 데이터베이스에 영속화가 되는 것이다.

다시 말하면 데이터베이스에서 값을 꺼내오기 위한 식별자가 있기에 entity 가 존재하는 것이 아니라는 것이다

Entity 와 식별자에 대해서는 할 이야기가 많기 때문에, [Entity 와 Identifier(식별자) 에 대한 이야기](https://wonit.tistory.com/653) 에서 따로 이야기하도록 하겠다.

### 정리

- Domain Model 은 크게 2가지 객체로 나뉨
  - Entity
  - Value Object
- Entity 와 Value Object 를 구분짓는 것은 식별성임
  - Entity: 도메인 모델 내에서 식별이 되어야 하는 객체
  - Value Object: 도메인 모델 내에서 식별이 되지 않아도 되는 단순한 값 객체
- Entity 의 핵심은 DB Table 의 Relation Mapping Object 가 아님

# 내가 만든 Entity 는 DTO 그 자체

내가 진행했던 많은 예전 프로젝트들의 소스코드를 다시 보면 Entity 객체는 Database 의 Field 와 1:1 대응되는 단순 DTO 그 이상도, 이하도 아니었다.

```java
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Username 이 필요함")
    @Size(min = 3, max = 20, message = "3 이상 20 이하")
    private String username;

    @NotBlank(message = "Email 이 필요함")
    @Email(message = "email 형식이 아님")
    private String email;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    // 행위 메서드
}
```

DTO 는 행위가 존재하지 않는 메서드네, 뭐 DTO 는 setter 가 없어야 하네, 이런 여러 이야기를 들었지만, 행위가 존재하던 setter 가 존재하던 중요한게 아니다.

#### 객체들 사이에서 충분한 자율성과 책임을 갖지 못한 객체는 나는 모두 Value 혹은 DTO 라고 부른다.

이 DTO 를 Database 와 통신하기 위한 용도로만 사용하고 실제 행위는 모두 Service 라고 부르는 이상한 객체에서 transactional script 로 구현하고 있었다.

프로젝트를 시작하면 먼저 데이터베이스를 설계하고 Entity 객체 만드느라 많은 시간을 허비했었는데, 이런 행위와 시간 자체가 길어질 수록 [anemic 한 모델](https://martinfowler.com/bliki/AnemicDomainModel.html)이 나오게 되는 것이다.

Entity 를 설계하는 시점에는 Database 와 전혀 무관하다.

Entity 의 행위와 속성을 파악하기 위해서는 여러 이해관계자들과의 협의와 Event Storming 을 비롯한 도메인 탐구 과정을 거쳐 탄생하는 Ubiqutious Language 를 작성하는 것이 수반되어야 한다.

이러한 UL 을 만들고, 그 언어들 자체를 소스코드에 녹이는 것이다.

그럼 자연스럽게 도메인 객체의 행위가 떠오를 것이고, 적절한 객체의 field 가 떠오르게 된다.

# Entity 의 속성, entity field

도메인 레이어에 위치하는, 도메인 모델에 존재하는 Entity 나 Value Object 는 자율성을 가지고 책임을 가져야 한다.

이러한 Field 의 특성을 한 번 살펴보자.

## field 특성 1. Invariant

도메인을 모델링하면 엔티티의 어떤 속성들은 [invariant](<https://en.wikipedia.org/wiki/Invariant_(mathematics)>) 한 특성을 가지고 있다.

예를 들면, 도메인 규칙중 다음과 같은 상황이 있다고 가정하자

- 유저는 로그인을 위해서 대표 이메일을 설정할 수 있어
  - 이 대표 이메일은 한번 설정되면 변경될 수 없어
- 유저의 이름은 언제든지 변경될 수 있어

여기서 대표 이메일은 변경될 수 없기 때문에 Invariant 이다. 한 번 객체가 생성된 시점에서 절대 변경되어서는 안되는 중요한 비즈니스 규칙인 것이다.

보통 이런 불변식이 필요한 객체는 변경하지 않는 상수로 취급해야한다.

java 에서는 final 키워드를 통해서 특정 필드 데이터를 상수로 만들 수 있다.

final field 를 추가한다면 생성단계부터 값을 할당하지 않으면 컴파일 타임의 에러가 발생하기 때문에, 해당하는 객체가 생성되었다는 뜻은, 값이 존재한다는 뜻으로 해석할 수 있다

```java
public class User {
    private final UserId id; // 식별자 안정성
    private final Email email; // 상수 취급
    private UserName username; // immutable 한 reassign
}
```

식별자도 불변식이다.

### 식별자 안정성

이는 식별자 안정성이라고 부르는데, 한 번 객체가 애플리케이션에서 인스턴스화가 되었다면 그 객체는 과거부터 발생했던 모든 사건의 연속성에 대한 총 합이며 현재 상태를 표현한다

하지만 애플리케이션에서 인스턴스화가 된 엔티티의 식별자가 갑자기 바뀐다면?

이를테면 내 주민등록번호가 변경되어 그간 살아왔던 인생이 하루아침에 다른 사람이 되는 것과 마찬가지이므로 식별자의 안정성은 중요하다.

이도 역시 invariant 하게 불변식을 부여하여 상수로 만드는 것을 권장한다

## field 특성 2. Immutable

반면에 유저 이름은 언제든지 변경될 수 있기 때문에 변경될 수 있도록 상수로 취급해서는 안된다.

field 자체를 상수는 아니지만 단순 immutable 한 값 객체로 취급하는 것을 권장한다. (값 객체에 대해서는 이후 자세히 설명하도록 하겠다)

field 를 Immutable 하게 유지한다면 여러가지 이점이 있다.

우리는 메모리의 참조값을 이용하는 연산을 주로 하는 Reference-oriented programming 세상에 살고 있다.

만약 특정 field 의 reference 가 예상하지 못한 곳에 남아있고, 다른 operation 에 의해서 변경되는 것을 막아줄 수 있다.

예를 들어보면 보자

```java
public class User {
    private Age age;

    public User(int i) {
        this.age = new Age(i);
    }
}

public class Age {
    private int age;

    void plus() {
        this.age++;
    }
}
```

위 코드에서 Getter 나 Equals Hashcode 재정의 코드는 제거하였다.

다음 테스트코드는 성공할까?

```java
@Test
void name() {
    User user = new User(0);

    Age age = user.getAge();
    age.plus();

    assertThat(user.getAge()).isEqualTo(new Age(0));
    assertThat(age).isEqualTo(new Age(1));
}
```

실패한다.

testcode 내에서 참조를 통한 연산이 수행되어 user 가 소유한 age 의 메모리의 데이터 자체가 변경되어버렸을 것이다.

이런 상황을 대비하여 Field 의 모든 연산은 Immutable 하게 설계한다면 예상할 수 없는 side effect 에 대해 안전한 entity 를 설계할 수 있다

### 정리

- entity 의 속성은 db field 에 의해 결정되지 않는다.
  - 객체의 책임과 역할에 따라 결정된다
- entity 의 속성의 2가지 대표 특성
  1. invariant
  2. immutable

# Entity 의 행위

entity 는 도메인 모델의 핵심 객체이다.

그 역할과 책임이라는 것은 앞선 속성을 이야기할 때와 동일하게 Ubiqutious Language 로 부터 출발하는 것이다

entity 는 핵심이라는 이름에 걸맞게 적절한 역할과 책임이 존재해야 한다.

## Entity 행위의 특성 1. 자율적인 객체, object autonomy

객체의 자율성은 객체가 스스로 결정을 내리고 행동할 수 있는 능력을 의미한다.

객체는 자신의 속성과 상태에 대해서 캡슐화를 통해서 스스로 행위할 수 있어야 하는데, getter 와 setter 들로 사용하면서 객체의 자율성을 빼앗는 나의 과거 코드를 봐보자

```java
public class AbcService {
    //...
    public void changeUserName(long userId, String newUsername) {
        User user = repository.findBy(userId);

        UserName username = user.getName();

        if (!username.length() > 0) {
            throw new IllegalArgumentException("이름은 0자 이상이어야 합니다")
        } else if (!username.length() <= 6) {
            throw new IllegalArgumentException("이름은 6자 이하여야 합니다")
        }

        user.setUsername(newUsername);

        repository.save(user);
    }
    //...
}
```

해야하는 일이 일종의 순서도처럼 나열되어있고, 객체 스스로가 무언가를 전혀 하지 못한다.

Entity 스스로 행위를 할 수 있도록 자율성을 부여한다는 것은 간단하다.

앞선 행위들을 Entity 가 스스로 할 수 있도록 public interface 를 제공하는 것이다.

```java
public class AbcService {
    //...
    public void changeUserName(long userId, String newUsername) {
        User user = repository.findBy(userId);

        user.changeUsername(newUsername);

        repository.save(user);
    }
    //...
}
```

이렇게 자율성을 높이면 객체 스스로가 일관성에 대해서 책임질 수 있게 된다.

이렇게 Entity 에게 행위를 부여하면 부여할수록, 즉 자율성을 높일수록 Service Layer 의 코드가 줄어드는 또다른 부수효과를 일으킬 수 있다.

## Entity 행위의 특성 2. 자기 캡슐화, self encapsulation

martin fowler 는 본인의 블로그에 Self Encapsulation 이라는 글을 썼다.

즉, 객체의 상태와 행위를 캡슐화하여 외부에 노출되는 것을 최소화하여 객체 스스로가 책임을 수행하는 원칙이다.

앞선 자율성과 비슷한 맥락이지만 중요한 것은 **결합도를** 낮춘다는 것이다.

```java
public class AbcService {
    //...
    public void changeUserName(long userId, String newUsername) {
        User user = repository.findBy(userId);

        UserName username = user.getName();

        if (!username.length() > 0) {
            throw new IllegalArgumentException("이름은 0자 이상이어야 합니다")
        } else if (!username.length() <= 6) {
            throw new IllegalArgumentException("이름은 6자 이하여야 합니다")
        }

        user.setUsername(newUsername);

        repository.save(user);
    }
    //...
}
```

이 코드에서 AbcService 는 다음과 같은 import 를 가지고 있을 것이다.

```java
import com.github.dhslrl321.User.UserName;
```

이 말은 Service 가 UserName 에 의존한다는 것이다. 즉, UserName 이 변경되면 Service 까지 그 변경이 전파될 수 있다는 뜻이다.

다음과 같이 User 가 Self Encapsulation 을 통해서 의존 관계를 차단할 수 있게 된다.

```java
public class User implements Entity {

    // ...
    private UserName username;

    // 객체의 행위, self encapsulation
    public void changeUserName(String target) {
        username = username.change(target);
    }

    // ...
}

public class UserName {

    String value;

    public UserName change(String target) {
        validate(target.length() > 0, new IllegalArgumentException("이름은 0자 이상이어야 합니다"));
        validate(target.length() <= 6, new IllegalArgumentException("이름은 6자 이하여야 합니다"));

        return new UserName(target);
    }
}
```

이는 entity 만의 특성이라기 보다 Value Object 에도 해당될 수 있는 도메인 모델의 특성이라고 할 수 있다.

### 정리

- entity 의 행위 역시 domain modeling 과 ubiqutious language 에 의해 결정된다.
- entity 의 두가지 행위 특성 (이는 entity 뿐만 아니라 value object 에서도 동일하다)
  - object autonomy: 객체의 동작에 집중
  - self encapsulation: 객체의 정보 은닉과 캡슐화에 집중

# 마치며

이렇게 오늘은 Entity 에 대해서 이야기해보는 시간을 가졌다.

Entity 는 db table 에 의존하지 않는다.

entity 는 살아있는 도메인 객체 그 자체를 의미하고, 식별을 통해 연속성을 가지게 된다.

식별에 대해서는 할 이야기가 많다.

식별자가 무엇이고 어떤 특성을 가져야 하는지 부터 시작해서 언제 생성하느냐 누가 생성하느냐까지.

이와 관련된 이야기는 다음 시간에 진행해보려 한다.

Entity 외 Value Object 에 대해서도 차이점이 명확하지 않은데, 이후에 또 이야기를 하는 시간을 가져볼 것이다
