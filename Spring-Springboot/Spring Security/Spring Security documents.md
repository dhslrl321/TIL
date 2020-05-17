# Spring Security

스프링 시큐리티는 강력하고 높은 수준으로 인증과 접근 제어를 **커스터마이징** 할 수 있는 **스프링 기반 프레임워크이다.**

스프링 시큐리티는 **인증과 허가**에 집중하는 프레임워크고 쉽게 커스텀할 수 있다는 특징이 있다.

## Spring Security Prerequisites (전제 조건)
Spring Security는 java 8 보다 높은 버전에서만 작동함.

## Spring Security Version

- MAJOR : 갑작스런 업데이트 가능
- MINOR : 수동적 업데이트 가능
- PATCH : 안정 버전

## gradle

#### Manually add
``` 
dependencies {
    compile "org.springframework.boot:spring-boot-starter-security"
}
```

## Authentication, Support
## Password Storage Histroy
`PasswordEncoder` inteface : provide one way tranformation of a password to data storage.