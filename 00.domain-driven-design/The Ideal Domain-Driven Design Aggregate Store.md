- [https://kalele.io/the-ideal-domain-driven-design-aggregate-store/?fbclid=IwAR1HmFGBJno2GwueN9RZ82jb_1qOdEIRIuiILZYoLWlR24LiIeEZXZazcVE](https://kalele.io/the-ideal-domain-driven-design-aggregate-store/?fbclid=IwAR1HmFGBJno2GwueN9RZ82jb_1qOdEIRIuiILZYoLWlR24LiIeEZXZazcVE)

# 서론

- 반버논이 2014년도에 DDD 회의에서 aggregate 를 저장하는 방법에 대해서 논의함
  - aggregate 를 통으로 json 으로 저장하는 방법을 홍보함
  - json 통으로 넣으면 ORM 모델링의 고군분투가 없어도 됨
- 당연히 document based 저장소인 mongodb 생각할 것임
  - 근데 mongo db 는 ACID 트랜잭션이 없음 (In short, Mongo DB doesn't support ACID transactions.)
    - 하지만 몽고에서 TokuMX 라는 프로젝트에서 지원한다고는 하지만 믿을 수 없음
  - This is a big problem when you want to use Domain Events along with your Aggregates, but you don't want to use Event Sourcing.
    That is, your Domain Events are an adjunct to your Aggregate state, not its left fold.
    - (이해 못함)
- 반버논이 생각하는 최고의 aggregate 저장소는 postgresql 임
  - PostgreSQL 9.4 에서 엄청나게 빠른 json 저장 방법을 고안해냈음
    - 초당 14,000 개의 tx
    - 몽고디비보다 빠르다고함
- 그리고 PostgreSQL 을 json 저장하는게 매우 쉬움

뉴욕의 2014년 DDD eXchange에서, 집계 저장에 관한 진행되었다.

DDD 리더십 간의 합의는 객체 관계 매핑(ORM)과 집계를 저장하는 더 나은 방법을 생각해 내려는 열망에 반대했다.

일반적으로 ORM이 구식 접근 방식이라는 의견이 있었다. 일부 개발자들은 여전히 ORM을 처음 접하지만, 관계형 데이터베이스로 저장하는 기술은 20년이 넘었다.

20년 이상 동안, 왜 우리는 aggregate 를 저장하는 더 나은 방법을 찾지 못했을까?

---

# Document store and json

토론에서 나는 aggregate 를 JSON으로 직렬화하고 document store 에 json 을 저장하는 아이디어를 홍보했다.

JSON 기반 저장소를 사용하면 객체의 필드를 쿼리할 수 있습니다.

토론의 중심에는 ORM을 사용할 필요가 없을 것이다.

이것은 도메인 모델을 순수하게 유지하고 일반적으로 매핑 세부 사항을 만지작거리는 데 며칠 또는 몇 주를 절약하는 데 도움이 될 것이다.

더욱이, 당신의 객체는 유비쿼터스 언어가 개발되는 방식으로, 그리고 객체 관계 임피던스 불일치 없이 설계될 수 있습니다.

DDD와 함께 ORM을 사용한 사람은 매핑 옵션의 한계가 정기적으로 모델링 노력을 방해한다는 것을 알고 있습니다.

---

# rdb and json

JSON 기반 저장소를 생각할 때, 의심할 여지 없이 당신의 마음은 즉시 MongoDB 를 생각할 것이다.

그것이 바로 MongoDB가 작동하는 방식이기 때문이다.

**사실이지만, MongoDB는 여전히 DDD 집계의 요구를 하나의 매우 중요한 방식으로 채우지 못한다.**

> MongoDB still falls short of filling the needs of DDD Aggregates in one very important way

토론에서 저는 MongoDB가 제가 원하는 방식에 일치하지만, MongoDB를 사용하여 Aggregate의 상태를 저장소의 하나의 컬렉션으로 업데이트하고, 동일한 작업에서 하나 이상의 새로운 도메인 이벤트를 다른 컬렉션에 추가할 수 없다는 점에 주목했습니다.

**간단히 말해서, MongoDB는 ACID 트랜잭션 지원하지 않습니다.**

이것은 집계와 함께 도메인 이벤트를 사용하고 싶지만 이벤트 소싱을 사용하고 싶지 않을 때 큰 문제입니다.

즉, 도메인 이벤트는 왼쪽 폴드리가 아닌 집계 상태의 부속물입니다.

Aggregate의 상태를 MongoDB에 성공적으로 저장했지만 동일한 저장소에 새 도메인 이벤트를 추가하지 못하면 발생할 문제를 설명할 필요가 없기를 바랍니다.

그것은 단순히 애플리케이션의 상태를 완전히 잘못 만들 것이며, 의심할 여지 없이 우리 자신의 도메인 모델의 종속 부분 및/또는 하나 이상의 다른 경계 컨텍스트의 불일치로 이어질 것이다.

---

# 몽고디비 쓰고싶으면 써, 솔루션이 있긴 해

MongoDB가 미래에 ACID 거래를 지원할 것이라는 소문이 있다.

사실 이제 ACID 트랜잭션을 지원하는 MongoDB의 지점이 있다.

그건 TokuMX 프로젝트야. 비록 당신이 개인적으로 이 제품을 사용하는 것을 편안하게 느낄 수도 있지만, 그것은 나를 흥분시키지 않았다.

솔직히, 모든 이해 관계자가 덜 알려진 제3자가 제공하는 MongoDB 지점을 지원하도록 설득하는 것은 말할 것도 없고, 주어진 기업이 처음에 MongoDB를 지원하도록 하는 것은 큰 도전이 될 수 있다.

프로젝트에서 ACID 거래와 함께 MongoDB를 사용할 수 있는 가장 좋은 기회는 마침내 MongoDB.
org에서 다운로드할 수 있을 때인 것 같습니다.

# rdb 에서도 쓸 수 있어

나에게 이것은 다른 곳을 보는 것을 의미했고, 소년, 나는 그렇게 해서 기쁘다. 나는 PostgreSQL 9.4에서 정말 이상적인 DDD 집계 저장소를 찾았다고 믿는다. 이것이 그렇게 생각하는 주된 이유는 다음과 같습니다:

- PostgreSQL 9.4는 텍스트 기반 JSON(json 데이터 유형)과 바이너리 JSON(jsonb 데이터 유형)을 모두 지원합니다. 바이너리 JSON 유형은 텍스트 기반 데이터 유형보다 더 높은 성능의 데이터 유형이다.
- JSON에 대해 직접 쿼리하고 특정 JSON 객체 필드/속성에 대한 인덱스를 만들 수 있습니다.
- 물론 PostgreSQL은 관계형 데이터베이스이며 ACID 트랜잭션을 지원합니다.
- PostgreSQL은 매우 성숙한 오픈 소스 제품이며 Postgres Enterprise Manager 등과 같은 지원 도구와 함께 제공됩니다.
- PostgreSQL에 대한 커뮤니티와 상업적 지원을 모두 받을 수 있으며, 여러 지원 공급업체 중에서 선택할 수 있습니다.
- PostgreSQL은 빠르다 . 내 말은, PostgreSQL은 심각하게 빠르다는 거야. 버전 9.4 주변의 벤치마크에서 PostgreSQL은 초당 14,000개 이상의 트랜잭션에서 데이터베이스 쓰기를 수행할 수 있습니다. 당신은 그렇게 빠르거나 빠르게 수행해야 할 많은 프로젝트를 찾기가 어려울 것입니다. 비교 벤치마크는 편리하지 않지만, MongoDB보다 훨씬 빠르다고 생각합니다(ACID 거래 없이). 제 경험상 PostgreSQL 9.4(및 이후 버전)는 전 세계 모든 엔터프라이즈 프로젝트의 97%와 같은 성능 요구를 해결할 수 있습니다. 물론 당신의 마일리지는 다를 수 있지만, 저는 정기적으로 개발자들에게 성과 번호를 투표합니다. 대다수는 초당 1,000건 미만의 거래가 필요하며, 소수만이 초당 10,000건에 가까운 거래가 필요하다.
- PostgreSQL의 JSON 지원을 사용하는 것은 매우 쉽습니다.
- 다음으로 할 일은 PostgreSQL을 사용하여 DDD Aggregate 스토리지를 만드는 것이 얼마나 쉬운지 살펴보는 것입니다.
