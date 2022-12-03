# Index

- 데이터를 빠르게 찾을 수 있도록 하는 장치
- 데이터의 저장 능력(insert, update, delete) 을 포기하고 조회 (select) 능력을 향상시킴
  - 인덱스 데이터를 저장하려면 항상 정렬된 상태로 저장해야 하기 때문

# 인덱스 종류

- 역할에 따라
  - primary index
  - secondary index
- 구현에 따라
  - B Tree index
  - Hash Index
- 중복 여부에 따라
  - unique index
  - non-unique index

# 인덱스 종류 (구현에 따라)

- B Tree 인덱스
- Hash 인덱스

# 인덱스 단점

- insert 시 재정렬을 해야함
- update 시 index key 를 update 한다면 재정렬을 해야함

# 인덱스 설정 의사결정 순서

1. 쿼리에 동등 조건 (equal, =) 이 있다면 가장 먼저 인덱스로 설정할 것 (하나만 찾고 끝내면 되니까 옵티마이저한테 이득)
2. 정렬에 쓰이는 필드라면 인덱스로 설정할 것
3. 쿼리 자체가 `>` 이거나 `<` 등 많은 값을 출력해야 한다면 나중에 설정할 것
4. 유니크한 정도를 나타내는 카디널리티가 높은 (유니크성이 높은) 순서대로 인덱스를 설정할 것
