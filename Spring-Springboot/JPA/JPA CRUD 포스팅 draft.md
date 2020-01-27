[Spring & Springboot-JPA] JPA를 이용한 CRUD 메서드 작성하기

## CRUD란?

**CRUD**는 존재하는 거의 대부분의 소프트웨어가 가지고 있는 기본적 데이터 처리 기능을 뜻한다. 이렇게만 설명하면 말이 너무 어려우므로 쉽게 말 해서 **로그인하고, 글을 올리고, 회원가입을 하며, 내가 찜한 목록을 삭제하는 등** 이러한 모든 데이터 관련 처리의 가장 기초가 되는 초석을 뜻한다.

##### C
- Create
- 데이터를 **생성 또는 저장**하는 기능을 한다.
- SQL의 `insert`에 해당한다.

##### R
- Read
- 저장된 데이터를 **읽는** 기능을 한다.
- SQL의 `select`에 해당한다.

##### U
- Update
- 저장된 데이터의 값을 새롭게 **갱신**시키는 기능을 한다.
- SQL의 `update`에 해당한다.

##### D
- Delete
- 자장된 데이터를 **삭제**하는 기능을 한다.
- SQL의 `delete`에 해당한다.

## MVC의 Model과 Entity

JPA를 사용하여 Data를 이용하려면, Model과 Entity에 대해서 알아야 한다.

***
해당 포스트는 여러 편으로 나누어져 하나의 개념을 이루고 있습니다. 보다 자세한 학습과 이해를 위해 다른 포스트도 참고해주세요 :)

- 1. [Jpa의 Entity 설정 및 Repository 설정](https://wonit.tistory.com/127)
- 2. [create메서드로 회원가입 서비스 만들기-꼭 확인하셔야해요!!](https://wonit.tistory.com/128)
- 3. [read 메서드로 회원 검색 서비스 만들기](https://wonit.tistory.com/129)
- 4. [update 메서드로 개인정보 수정 서비스 만들기](https://wonit.tistory.com/130)
- 5. [delete 메서드로 회원 탈퇴 서비스 만들기](https://wonit.tistory.com/131)
***