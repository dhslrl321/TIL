import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Join from "../pages/Join";
import styled from "styled-components";

const HeaderBlock = styled.div`
  display: flex;
  justify-content: center;
`;

const LinkBlock = styled(Link)`
  font-size: 28px;
  border: 2px solid powderblue;
  margin-top: 30px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  
  :first-child {
    margin-right: 78%;
  }
  
  :not(:first-child) {
    font-size: 20px;
    margin-left: 3px;
    margin-right: 3px;
  }
`;
const Header = () => {
  return (
    <>
      <Router>
        <HeaderBlock>

          <LinkBlock exact to="/">DDoDo List</LinkBlock>
          <LinkBlock to="/login">Login</LinkBlock>
          <LinkBlock to="/join">Join</LinkBlock>
        </HeaderBlock>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/join" component={Join} />
        </Switch>
      </Router>
    </>
  );
}

export default Header;

