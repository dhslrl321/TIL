> 해당 글은 개발, 기술관련 아티클이나 블로그 글 혹은 유튜브 영상의 내용을 정리하거나 후기를 적는 글입니다.

#### 리뷰할 글: ['circile ci blog' 의 'Trunk-Based vs Feature-Based development'](https://circleci.com/blog/trunk-vs-feature-based-dev/?utm_source=google&utm_medium=sem&utm_campaign=sem-google-dg--japac-en-dsa-maxConv-auth-nb&utm_term=g_-_c__dsa_&utm_content=&gclid=Cj0KCQiAw8OeBhCeARIsAGxWtUwCTSCt5GG27Vg_yrwhRXNSsnPhnIHKEhMrPF98Jc1fyfAjSLAjBRMaAvJHEALw_wcB)

# 주제와 간단 요약

- trunk based development 과 feature based development
  - **trunk based development**
    - 당장 배포가 가능한 trunk 라고 불리는 단일 브랜치만 유지시킨다
    - 개발자는 변경사항에 대해서 main 혹은 trunk 라는 브랜치에 바로 push 할 수 있다
      - 필요에 따라서 오래걸리는 작업이라면 새로운 브랜치를 따도 좋다, 그리고 merge 한다
    - trunk/main 브랜치는 항상 production ready
      - commit 을 계속해서 push 함
    - 장점
      - well with cicd, 빠른 ci/cd 가 가능해짐
        - commit 을 계속해서 main 에 push 한다면 진정한 ci 가 가능해짐
      - refactoring 에 대한 빠른 피드백이 가능함
    - 단점
      - trunk based development 를 사용하기 위해선 조직의 git 에 대한 이해도와 기술력이 성숙해야함
        - commit 자체가 배포이므로
  - **feature based development**
    - gitflow 라고도 불리는 classic 한 접근법
    - main 브랜치로 직접 push 하지 않는다
      - feature 라는 브랜치 혹은 develop 이라는 브랜치를 통해서 main 에 merge 되게 한다
    - code review 는 일반적으로 main 에 feature 혹은 develop 브랜치가 merge 되기 전에 수행한다
    - 장점
      - 수백가지의 feature 를 병렬적으로 개발할 수 있음
      - 그리고 각각의 feature 가 독립적이라 서로 영향을 끼치지 않음
      - 역시 production 에도 영향을 끼치지 않음
    - 단점
      - 다량의 pr 이 queued 될 수 있음
      - 리뷰어가 꼼꼼이 보지 않는다면 queue 가 밀리게됨

# 리뷰와 나의 해석

이번에 새로 이직한 회사에서 지향하는 git strategy 가 바로 trunk based development 였다

trunk based development 를 **한 단어로 설명하자면 commit 별로 배포** 가 될것 같다

우선 이 글을 보고 격하게 동의하는 부분은 바로 refactoring 에 대한 빠른 피드백이다

일전에 거대한 레거시 시스템에 refactoring 을 수행한 적이 있다. 새로운 feature 를 추가하기 위해서는 refactoring 이 없으면 불가능한 상황이었고 심지어 해당 레거시는 테스트코드가 전무했다.

이러한 상황에서 팀에서 고안한 선택은 바로 small step 이었다

small step 을 통한 commit 과 잦은 배포, 그리고 항상 준비된 rollback 이 그 해답이었는데, trunk based development 를 보며 딱 small step 이 떠올랐다.

하지만 반대로 이런 생각도 든다

**현실적으로 가능할까?**

우선 commit 별로 배포 싸이클이 돈다는 이야기는 굉장히 효율적임과 동시에 위험하다.

commit 에 대한 충분한 review 가 이뤄지지 않는다면 계속되는 장애를 마주할 지도 모른다. (그래서 더 commit 에 신경을 쓰고 방어적으로 프로그래밍을 하려나?)

그래서 해당 방법론은 팀의 git 에 대한 노하우와 코드에 대한 성숙도에 영향을 많이 받을것 같다

현재 조직에서 지향하는 방법론이라고 하니 실무 적용 사례를 가지고 다음에 더 긴 글로 찾아볼 수 있을것 같다
