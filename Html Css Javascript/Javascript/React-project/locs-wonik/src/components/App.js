import React, { useState, useEffect } from 'react';
import GlobalStyle from "../config/GlobalStyle";
import { BrowserRouter as Router } from "react-router-dom";
import Header from './Header';
import { UserApi } from "../api";

const user = {
  id: 0,
  username: "",
  email: "",
  auth: false
}

const auth = (username, password) => {
  // api 호출해서 login 과정 인증
  /** async function login(username, password){
    const {
      data: {
        data: result
      }
    }= await UserApi.login(username, password);
    this.user = result.username
  }

  login(username, password) **/

  // 그럼 결과로 user가 나오던 error 메시지가 나옴
  // user 가 나오면 user를 설정
  // error 가 나오면 do nothing
  user.auth = true;
}

const App = () => {
  auth();
  return (
    < Router >
      <GlobalStyle />
      <Header user={user} />
    </Router >
  );
}

export default App;
