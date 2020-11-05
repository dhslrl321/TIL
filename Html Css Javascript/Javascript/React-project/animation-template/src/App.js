import React, { useState } from "react";
import Home from "./background/index";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Dropdown from "react-dropdown";

const TopNav = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  div:first-child {
    margin-right: auto;
  }
  border-bottom: 1px solid;
  padding: 1%;
`;

const LinkItem = styled(Link)`
  font-size: 1.2rem;
  margin: 10px;
`;



const App = () => {

  return (
    <Router>
      <TopNav>
        <div>
          <LinkItem to="/">Home</LinkItem>
        </div>
        <div>
          <LinkItem to="/edu">교육</LinkItem>
        </div>
        <div>
          <LinkItem to="/info">학과 소개</LinkItem>
        </div>
        <div>
          <LinkItem to="/member">구성원</LinkItem>
        </div>
      </TopNav>

      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
