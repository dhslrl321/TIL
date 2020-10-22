import React, { useState, useEffect } from 'react';
import GlobalStyle from "../config/GlobalStyle";
import { BrowserRouter as Router } from "react-router-dom";
import Header from './Header';
import { UserApi } from "../api";

const App = () => {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ username, password }) => setUser()

  return (
    < Router >
      <GlobalStyle />
      <Header user={user} login={login} />
    </Router >
  );
}

export default App;
