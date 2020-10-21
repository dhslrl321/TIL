import React from 'react';
import { Route, Link, Switch, withRouter } from "react-router-dom";
import Home from "../pages/home/HomeContainer";
import Login from "../pages/login/LoginContainer";
import Join from "../pages/join/JoinContainer";
import styled from "styled-components";

const HeaderBlock = styled.div`
  display: flex;
  justify-content: center;
  background-color: #1E1E1E; 
  box-shadow: 1px 1px 10px #BB86FA;
`;

const NavBlock = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  :first-child {
    justify-content: flex-start;
    font-size: 28px
  }

  :last-child {
    justify-content: flex-end;
    font-size: 20px;
  }

  margin: 20px;
`;

const LinkBlock = styled(Link)`
  border: 2px none powderblue;
  color: ${props => props.current ? "#BB96FA" : ""};
  :nth-child(2),
  :nth-child(3) {
    margin: 0px 14px;
  }
`;


const Header = ({ location: { pathname }, user }) => {

  const login = (
    <NavBlock>
      <LinkBlock to="/login">Login</LinkBlock>
      <LinkBlock to="/join">Join</LinkBlock>
    </NavBlock>
  )

  // todo 로그아웃시에 redirect 해줘야함.
  const logout = (
    <NavBlock>
      <LinkBlock to="/mypage">My Page</LinkBlock>
      <LinkBlock to="/logout">Logout</LinkBlock>
    </NavBlock>
  );

  return (
    <>
      <HeaderBlock>
        <NavBlock>
          <LinkBlock exact to="/" current={pathname === "/"}>DDoDo List</LinkBlock>
        </NavBlock>
        <NavBlock>
          {user.auth ? logout : login}
        </NavBlock>
      </HeaderBlock>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} />
      </Switch>
    </>
  );
}

export default withRouter(Header);

