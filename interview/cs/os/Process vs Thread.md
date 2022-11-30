# Process vs Thread

- Process
  - 정의
    - 메모리에 올라와 실행되고 있는 프로그램 인스턴스
    - 운영체제로부터 시스템 자원을 할당받는 작업의 단위
  - 프로세스당 하나의 main 스레드를 가짐
  - 다른 프로세스의 메모리에 접근할 수 없어서 IPC 를 통해서 통신
    - socket
    - pipeline
    - file
- Thread
  - process 내의 실행 흐름
  - 별도의 stack 을 가짐
  - process 의 code, data, heap 을 공유
