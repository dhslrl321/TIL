import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import GlobalStyles from "./config/GlobalStyle";
import Account from "./pages/account/index";
import Detail from './pages/detail';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <span>(Test::</span>
        <Link to="/">홈으로__</Link>
        <Link to="/account"> 계좌 목록 확인하기__ </Link>
        <Switch>
          <Route exact path="/account" component={Account} />
          <Route path="/account/:id?" component={Detail} />
        </Switch>
      </Router >
    </>
  );
}

export default App;
