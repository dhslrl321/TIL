# Thread Safe 하다

- 여러 스레드에서 하나의 자원에 동시에 접근하더라도 안전하다
- 임계 영역 (critical section) 에 동시 접근 해도 안전하게 상호 배제 (mutex) 를 구현

# 실천법

- **Atomic Operation**
  - 원자성
  - lock 과 관련된 로직을 구현함으로써 atomic 하게 할 수 있다
- **Mutual Exclusion**
  - 공유 자원에 대해서 mutex 를 통해 한 번에 하나의 스레드만 접근할 수 있도록 한다
- **Thread Local Storage**
  - 아예 데이터를 각자의 스레드의 데이터만 사용하도록 하는 것이다.
- **Immutable**
  - 불변성을 지키도록 한다
  - 즉, 변수를 없애버린다
