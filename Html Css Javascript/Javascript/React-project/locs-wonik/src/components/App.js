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
      const { data: { data: result } } = await UserApi.deleteUser(2);

      setTestUser({
        //username: result.username,
        //password: result.password,
        //email: result.email
      })
    }

    async function createUser(username, password, email) {

      //const { data: { data: result } } = await UserApi.createUser("제발", "돼라", "진짜루");



      setPostUser({
        //username: result.username,
        //password: result.password,
        //email: result.email
      })
    }


    getUser();
  }, [])

  return (
    < Router >
      <div>
        GET Test ==> {}
      </div>
      <div>
        POST Test ==> {}
      </div>
      <GlobalStyle />
      <Header />
    </Router >
  );
}

export default App;
