# build.gradle / dependencies

implementation('org.springframework.boot:spring-boot-starter-data-jpa')
implementation('mysql:mysql-connector-java')
implementation('org.projectlombok:lombok')

# application.properties 설정 

// <properties 설정>
spring.datasource.url=jdbc:mysql://`localhost:3307(포트번호)`/`study(스키마 이름)`?useSSL=false&useUnicode=true&serverTimezone=Asia/Seoul&allowPublicKeyRetrieval=true

// <db response name DB 아이디>
spring.datasource.username=root
 
// <db response password DB 비밀번호>
spring.datasource.password=root