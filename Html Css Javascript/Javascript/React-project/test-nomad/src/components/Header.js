import React from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "../routers/Home";
import TV from "../routers/TV";
import Detail from "../routers/Detail";


const SLink = styled(Link)`
  
`;

const Container = styled(Router)`
  display: flex;
  flex-direction: row;
`;
const Header = () => {
  return (
    <Container>
      <SLink exact to="/">Movie</SLink>
      <SLink to="/tv">tv</SLink>
      <SLink to="/detail">detail</SLink>

      <Route exact path="/" component={Home} />
      <Route path="/tv" component={TV} />
      <Route path="/detail" component={Detail} />
    </Container>
  );
}

export default Header;