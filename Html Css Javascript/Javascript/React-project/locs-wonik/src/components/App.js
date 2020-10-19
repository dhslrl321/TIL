import React, { useState, useEffect } from 'react';
import GlobalStyle from "../config/GlobalStyle";
import { BrowserRouter as Router } from "react-router-dom";
import Header from './Header';
import { UserApi } from "../api";


function App() {
  const [testUser, setTestUser] = useState({
    username: "",
    password: "",
    email: ""
  });

  const [postUser, setPostUser] = useState({
    username: "",
    password: "",
    email: ""
  });

  useEffect(() => {

    async function getUser() {
      const { data: { data: result } } = await UserApi.findUser(1);

      setTestUser({
        username: result.username,
        password: result.password,
        email: result.email
      })
    }

    async function createUser(username, password, email) {
      const { data: { data: result } } = await UserApi.createUser("react post test", "react post test", "react post test");

      setPostUser({
        username: result.username,
        password: result.password,
        email: result.email
      })
    }


    createUser();
    getUser();
  }, [])

  return (
    < Router >
      <div>
        GET Test ==> {testUser.username}
      </div>
      <div>
        POST Test ==> {postUser.username}
      </div>
      <GlobalStyle />
      <Header />
    </Router >
  );
}

export default App;
