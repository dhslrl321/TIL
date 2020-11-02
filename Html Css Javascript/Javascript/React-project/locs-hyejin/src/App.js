import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Entry from './pages/entry/index';
import Login from './pages/login/index';
import Account from './pages/account/index';
import Transaction from './pages/transaction/index';
import GlobalStyles from './util/GlobalStyle';
import StateContextProvider from './util/context';

const Navigation = styled.div`
  padding-bottom: 5px;
  border-bottom: 1px solid;
  a {
    margin-left: 3px;
    margin-right: 3px;
  }
`;

const App = () => {


  return (
    <StateContextProvider>
      <GlobalStyles />
      <Router>
        <Navigation>
          <Link to="/entry">Entry</Link>
          <Link to="/login">Login</Link>
          <Link to="/account">Account</Link>
          <Link to="/transaction">Transaction</Link>
        </Navigation>
        <Switch>
          <Route exact path="/entry" component={Entry} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/transaction" component={Transaction} />
        </Switch>
      </Router>
    </StateContextProvider>
  );
}

export default App;
