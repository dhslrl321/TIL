> 이번 글은 100% 저의 경험과 시야에만 의존하기에 주관적이며 부적절할 수 있습니다. 또한 몇가지 가설을 세우며 가설에 대한 반박과 이유를 '개인적인 해석'에 따라서 흘러갑니다. 또한 CQRS 에 대한 기본적인 이해가 없다면 글을 읽는데에 있어 공감이 없을 수 있습니다. CQRS 에 대한 자세한 이야기는 [CQRS 패턴에 대한 오해 풀기](https://wonit.tistory.com/628) 글에서 확인할 수 있습니다

# 고민의 시작

나는 종종 개발자 모임에 참여해서 내 이야기를 하고 그들의 이야기를 듣는 것을 즐긴다. 네트워킹도 하며 부족한 부분들을 찾아가며 내가 잘 하는 것들을 이야기하며 건강한 대화들이 오가는 이 모임을 좋아한다.

평소와 다름이 없던 모임에서 나는 커리어에 대한 이야기를 하다가 다른 선배 개발자로부터 이런 이야기를 듣게 되었다.

#### 지금 연차에 CQRS 를 고민하지 않아도 된다. 한국에서 CQRS 를 하는 기업이 얼마나 될 것 같으냐?

위 내용이 지금 텍스트로 보여져서 그렇지 대화에서는 전혀 악의적인 비난이나 감정이 섞이지 않았었고 오히려 건설적인 대화의 한 부분이고 나의 커리어에 대한 조언 중 하나였다.

위 이야기가 나온 이유는 즉, 내가 CQRS 에 많은 관심을 두고 있고 대화에서 비슷한 주제의 이야기들을 많이 쏟아냈기 때문이었다.

처음에 CQRS 에 대한 부정적인 이야기를 듣고 나서 나는 수긍했다.

`그래, 나는 아직 MySQL 옵티마이저도 모르고 쿼리가 어떻게 실행되는지도 모르는데, 다익스트라 알고리즘도 모르는데 이런 것들을 할 시간에 좀 더 기본적인 것들을 잘하자` 라며

하지만 집에 돌아와 곰곰히 몇일간 생각을 해봤다.

**'CQRS 는 과연 특정 연차가 지나야만 고민하는 어떤 그들만의 문제인가? CQRS 는 많은 경험을 토대로 생각해야 할게 많은 trade-off 의 덩어리인가?'**

그리고 여러 사람들과 내 생각을 나누며 조언을 구하고 찾아보고 관심을 가진 결과로 **난 CQRS 에 대해서 다음과 같은 결론에 다다르게 되었다**.

#### CQRS 는 Spring 진영에서 사용되는 Layered Architecture 만큼이나, Repository Pattern 만큼이나 일반적이고 자연스럽게 받아들여저야 마땅하다.

이 결론에 이르기까지 어떤 생각이 오갔는지 앞으로 설명해보도록 하겠다.

위의 생각에는 내가 세운 3가지 가설로부터 시작한다.

3가지 가설은 모두 CQRS 에 대한 오해에 대한 가설로 대부분이 내가 이전에 생각했던 오해들과 사실들이다.

1. **가설: 누군가는 CQRS 에 대해서 하나의 복잡한 '아키텍처' 라고 생각한다**
2. **가설: 누군가는 CQRS 를 성능과 구현에만 결부시킨다**
3. **가설: 누군가는 CQRS 에 존재하는 특정 구현법만이 진정 CQRS 라고 생각한다.**

위에서는 누군가라고 표현하였으나 정확이 말하면 `과거의 나와 비슷한 누군가` 가 더 적절한 표현일듯 싶다.

아무튼 이제 하나씩 이야기해보자

# 가설 1. 누군가는 CQRS 에 대해서 하나의 복잡한 '아키텍처' 라고 생각한다

CQRS 는 아키텍처가 아니다

[##_Image|kage@bG329j/btrSUrq3BzS/beNVp9xXKIlpuC8PgswsPK/img.png|CDM|1.3|{"originWidth":806,"originHeight":440,"style":"alignCenter","caption":"페이스북 그룹 cqrs 에서 이규원님께서 공유해주신 글"}_##]

위의 글에서도 알 수 있지만 CQRS 는 아키텍처가 아니다.

자세한 이야기는 CQRS 를 창시한 Greg Young 의 [cqrs is not an architecture](https://gregfyoung.wordpress.com/2012/09/09/cqrs-is-not-an-architecture/) 라는 글에서 알 수 있다.

결국 위의 글에서는 이야기하는 바는 CQRS 는 하나의 아키텍처가 아니라는 것이다.

아키텍처의 정의에 따르면

> 아키텍처: 건물이나 다른 구조물을 계획하고 설계하고 건설하는 과정과 그 결과물이다. 건물의 물질적인 형태에 있어 건축적인 작업은 흔히 문화적인 상징과 예술적인 작업으로서 인지된다. 역사적인 문명들은 흔히 남아 있는 그들의 건축의 성과물들로 인식된다

이나 그렉 영이 말하는 CQRS 는 어떤 설계의 결과물로서의 덩어리가 아니라 건축물 안에서 사용되는 부품의 일부 혹은 기법의 일부라는 것이다.

즉, 누군가는 CQRS 를 EDA 나 MSA 와 동일한 위상으로 놓고 비교하기에 어떠한 단어가 주는 **중압감이 있는게 아닐까** 생각한다.

# 가설 2. 누군가는 CQRS 를 성능과 구현에만 결부시킨다

CQRS 는 멋진 장점이 존재한다.

- command side 와 query side 를 분리함으로 동시성에 대한 문제를 해결한다. [CQRS Journey Guide, ref.4-8](https://github.com/dhslrl321/cqrs-journey-guide-korean/blob/master/part02-references/reference04/08.%20Optimizing%20the%20write%20side.md)
- read 연산이 write 연산보다 훨씬 많이 일어나기 때문에 scalability 를 각각 다른 기준으로 고려할 수 있다 [CQRS Journey Guide, ref.2-4](https://github.com/dhslrl321/cqrs-journey-guide-korean/blob/master/part02-references/reference02/04.%20왜%20CQRS%20를%20사용해야%20할까.md)

등등 많겠지만 말하고자 하는 바는 **CQRS 는 오로지 성능과 구현에만 관심있는 것이 아니다.**

아래에서 내 생각을 이야기하겠지만 CQRS 는 도메인을 위한 것이다. 이것은 하나의 CQRS 에 대한 오해중 하나라고 스스로 가설을 세웠다.

# 가설 3. 누군가는 CQRS 에 존재하는 특정 구현법만이 진정 CQRS 라고 생각한다.

CQRS 는 여러가지 구현 방법이 존재한다. 하지만 과거의 나를 포함한 누군가는 CQRS 는 복잡하고 어려운 내용들이 포함된 구현이라고 생각한다고 가설을 세웠다.

그 구현법들 중 데이터 소스를 기준으로 분류해보면 다음과 같다.

1. 단일 데이터 소스
2. 다중 데이터 소스

`단일 데이터 소스`를 사용하면 단순하게 하나의 애플리케이션에서, 혹은 다른 애플리케이션에서 동일한 데이터소스의 read model 과 write model 을 단순히 분리하여 사용하게 된다.

#### 이 경우라면 앞서 언급한 성능과 동시성에 장점은 포기하겠지만 구현은 더욱 쉽다

이에 반해 `다중 데이터 소스`를 사용하면 read side 와 write side 를 server level 에서 의존성을 격리시키고 서로 다른 지표를 가지고 서버를 구성할 수 있게 된다.

write side 는 insert 와 update 에 능한 데이터 소스를 사용할 수도 있고 read side 에서는 Materialized View 나 Elasticsearch 와 같은 조회용 데이터 소스 혹은 모델 애플리케이션을 도입할 수도 있다.

[##_Image|kage@b2jJQX/btrSQVfe7wO/YqJkpuIK41taqU5tuIBx3K/img.png|CDM|1.3|{"originWidth":1114,"originHeight":929,"style":"alignCenter","caption":"cqrs journey guide 에서 나온 CQRS 와 Event Sourcing"}_##]

**그럼 여기서 이제 여러가지 고민해야하는 것들이 발생한다.**

`Timing Issue` 나 어떻게 `Eventual consistency` 를 보장하며 `ViewGeneration` 을 위한 write model 의 변경사항은 어떻게 전파하는지? -> [(CQRS Journey Guide, journey.5-4)](https://github.com/dhslrl321/cqrs-journey-guide-korean/blob/master/part01-journey/journey05/04.%20Patterns%20and%20Concepts%20-%203.md) `Event Driven Architecture` 를 어떻게 함께 적용시켜서 느슨한 연결을 하는지? 혹은 `Event Sourcing` 을 해야하는 것은 아닐까? -> [(CQRS Journey Guide, ref.3-4)](https://github.com/dhslrl321/cqrs-journey-guide-korean/blob/master/part02-references/reference03/04.%20CQRS%20와%20ES.md)

이러한 고민이 **YAGNI, KISS 나 DRY 원칙들 사이에서 외줄타기**를 하고 있다고 생각한다.

# 나는 CQRS 를 조금 더 가볍게 봐야 한다고 주장한다.

내가 세운 위의 가설들에 대해서 나는 이렇게 주장하고싶다.

#### CQRS는 도메인에서 시작되고 도메인을 위해서 존재한다. 그외의 것들은 상황에 따라서 고려해야한다.

CQRS 의 존재 이유는 바로 **도메인과 비즈니스** 때문이라고 생각한다. 도메인과 비즈니스는 CQRS 와 어떤 연관이 있을까?

# 도메인과 비즈니스는 CQRS 와 어떤 연관이 있는가

이들 사이의 관계에 대해서 이야기하기 전에 먼저 도메인과 비즈니스란 무엇인지 정의해보자.

### 정의 1. 비즈니스란 무엇인가

비즈니스는 우리와 같은 개발자들이 **해결해야 하는 문제들의 집합체이다**.

비즈니스는 시시때때로 변화하고 급변하며 안정적이며 동시에 불안정하다.

비즈니스는 우리 개발자들이 제어하는 영역이 아닌것 같다. 더 세게 표현하자면 **제어해서는 안된다고 생각한다**. 비즈니스를 더 잘 이해하고 더 잘 하는 관련자들이 올바른 비즈니스를 적절한 시기에 수행할 수 있도록 그들을 도와야하는 것이다.

### 정의 2. 도메인이란 무엇인가

도메인은 우리(개발자) 가 해결해야 하는 문제의 영역이며 동시에 우리가 자신있는 공간이라고 정의하고싶다.

우리는 도메인을 잘 정의하고 복잡한 비즈니스를 적절히 덩어리로 잘라내고 우리가 제어할 수 있는 상태로 만드는 것이 가장 중요한 일이라고 생각한다.

특징이라고 한다면 도메인은 제어가 가능하다.

#### 제어가 가능한 영역으로 분리시켜 비즈니스를 끌여들인 뒤에 우리는 도메인 영역을 충분히 작고 단순하게 만들어야 한다.

이러한 노력이 나는 너무나도 가치있는 일이라고 믿는다.

도메인을 비즈니스에서 떼어내고 작게 유지하는 몇가지의 유명한 노력들이 존재한다.

`Layered Architecture` 도 `domain layer` 를 `infrastructure layer` 와 분리하여 도메인을 변하지 않는개념으로 만들어주고 `application layer` 는 **facade 로 구성하여** 비즈니스 로직이 `application layer` 로 올라가는 것을 막아준다. `hexagonal architecture` 비슷한 맥락이며 `cqrs` 도 그렇다.

**CQRS 는 command 와 query 를 분리함으로 도메인을 더 도메인답게 유지하도록 만든다**

사실상 우리가 구현하는 비즈니스의 시작은 domain 인스턴스의 상태를 변경하고 생성하는 command side 로 부터 시작된다.

나는

- **command side 를 잘 다루어야 비즈니스를 더 잘 해결할 수 있다고 믿는다.**
- **command side 를 잘 가꾸어야 더 빠르게 새로운 비즈니스를 수용할 수있다고 믿는다.**
- **command side 를 충분히 작게 유지해야 도메인을 보호할 수 있다고 믿는다.**

복잡한 조회의 요구사항을 만족시키기 위해서 query side 의 로직이 command side, 즉 도메인 자체에 침투하게 되면 위의 것들을 하는데에 걸림돌이 된다고 생각한다.

#### 그럼 다시 본론으로 돌아와서, CQRS 의 존재 이유는 query side 의 복잡한 조회 요구사항을 분리시켜 바로 도메인을 **도메인답게 잘 유지하는 여러 방법 중에 하나라는 결론에 스스로 도달**했다.

그런 의미에서 다시 CQRS 를 돌아보면 **write model 과 read model 을 분리하는 것 만으로도 CQRS 의 가치를 충분히 느낄 수 있다고 생각한다**

이를테면, write model 에는 ORM 을 사용하고 read model 에는 jdbc 를 지원하는 쿼리 지향 라이브러리를 사용하는것 처럼 말이다.

CQRS 는 아키텍처가 아니다. 모든 애플리케이션에 적용해야 하는 것도 아니고 **우리가 관심을 갖고 충분히 노력을 들여도 되는 작은 부분에서만 이라도** 적용한다면 이를 복잡한 오버엔지니어링이라고 생각하지 않는다.

# 하지만 주의하고 명심하자.

앞서서 마치 사실인냥 말했던 CQRS 는 오로지 나의 주장일 뿐이다.

### 이것은 매우 추상적인 이야기, 마치 클린 코드란 무엇인가? 와 같은 예술의 영역이기에 누군가에게는 거부감을 일으킬 수 있다는 사실을 명심하자.

[트위터의 마이크로서비스 사태](https://www.boannews.com/media/view.asp?idx=111865)에서 알 수 있듯이,

모든 것은 팀이 취하는 전략을 추구하는 데 있어 어떤 이점을 가져다주는지를 깊이 고민하고 **팀원들 간의 가치가 align 이 된 상태여야** 진정 내가 믿는 **CQRS 가치가 빛을 발휘한다**고 생각한다.

그래서 내 소신이 필요할 때는 소신대로 행동할 것이지만 그렇지 않을 때를 잘 구분하면서 내가 가진 도구를 써야겠다.

# 맺음말

이렇게 긴 글에서 내가 하고자 하는 말은 명확하다.

#### 사실 CQRS 라는 용어 자체와 개념은 중요하지 않다는 것이다. 도메인을 지키는 행위 자체가 중요하다고 본다.

그런 의미에서 CQRS 는 도메인을 지키는 행위라는 명세 (specification) 의 구현체 (implementation) 중 하나라고 생각한다.

도메인이라는 어떠한 예술적, 추상적 개념을 설명하는 공학적이며 실질적인 방법이라 믿는다.

### 추가로 난 참 좋은 팀에 있다는 것을 이번 글을 쓰면서 또 한번 느낀다.

[##_Image|kage@Lrp6O/btrSUbaNAoC/lANvfGX8CIRpEyRQjiHtk1/img.png|CDM|1.3|{"originWidth":1000,"originHeight":922,"style":"alignCenter","width":754,"height":695,"caption":"나와 생각이 비슷한 동료가 있다는 사실이 너무 감사하다"}_##]

앞선 장황한 설명을 이 대화에서 모두 표현할 수 있고, 이런 대화가 꽤나 자주 있었기에 앞선 사고들이 가능했다고 생각한다.

하지만 누군가는 나에게 경각심을 심어주기도 한다.

[##_Image|kage@YzY2e/btrSUqZ1JII/7lCtnxnPGN6RbQvv5duQ3k/img.png|CDM|1.3|{"originWidth":1221,"originHeight":471,"style":"alignCenter","caption":"한 가지 사고에만 빠져서는 안된다는 것을 느낄 때도 있다"}_##]

또 누군가는 나에게 생각해볼법한 것들을 던져준다.

[##_Image|kage@LRXwj/btrSTxZrLAb/AK1RQQFKB3qCb4GGTygq80/img.png|CDM|1.3|{"originWidth":324,"originHeight":261,"style":"alignCenter"}_##]

### 마지막으로

CQRS 와 Event Sourcing 에 대해서 다양한 사람들이 더 많은 의견을 내고 관심을 가져주었으면 좋겠다.

그래서 github [cqrs journey guide 한글 번역 repository](https://github.com/dhslrl321/cqrs-journey-guide-korean) 에 다음과 같은 discussion 을 만들었고, 여기서 더 많은 성공과 실패의 사례를 듣고싶은 마음이다.

[##_Image|kage@bLyJOW/btrSWwyaeTm/UYlNFFgHGeXeDlvB9i2r9k/img.png|CDM|1.3|{"originWidth":1427,"originHeight":895,"style":"alignCenter","caption":"cqrs journey guide repository 의 discussion"}_##]

(개인적으로는 많이 활성화가 됐으면 좋겠지만..)
