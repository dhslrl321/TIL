# DispatcherServlet

- HTTP RequestHandler 혹은 Controller 를 위한 dispatcher
- 웹 요청을 처리하기 위해 등록된 handler
- Http 프로토콜로 들어오는 모든 요청을 받아 적절한 컨트롤러로 요청을 분배함

# 동작 과정

![image](https://user-images.githubusercontent.com/48385288/204817352-77d06e72-9bb8-4b52-8978-438241d85acc.png)

1. HandlerMapping 을 통해서 controller 조회
2. controller 에서 요청을 처리하고 결과를 출력
3. 만약 View 가 있다면 ViewResolver 를 통해서 View 를 찾고 처리 결과가 포함된 View 를 DispatcherServlet 에 송신
