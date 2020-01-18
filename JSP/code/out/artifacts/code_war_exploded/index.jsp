<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %><%--
  Created by IntelliJ IDEA.
  User: USER
  Date: 2020-01-18
  Time: 오후 1:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>Dynamic</title>
  </head>
  <body>
  <%
    Date date = new Date();

    SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy-mm-dd");
    String dateString = simpleDate.format(date);
  %>

  기상청 홈페이지에 오신 것을 환영합니다.

  오늘의 날짜는 <%=dateString%> 입니다.

  오늘의 날씨는 맑습니다.
  </body>
</html>
