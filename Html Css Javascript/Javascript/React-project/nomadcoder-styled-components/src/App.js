import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from './components/Header';
import { Routes } from './components/Routes';
import styled from "styled-components";
import GlobalStyles from "./components/GlobalStyles"

export const App = () => {
  return (
    <>

      <RootContainer>
        <TextField>Box1</TextField>
        <TextField>Box2</TextField>
      </RootContainer>
    </>
  );
}

const RootContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TextField = styled.span`
  display: flex;
  width: 150px;
  height: 150px;
  background-color: wheat;
  justify-content: center;
  align-items: center;
`;

export default App;


// <Router>
// <Header />
// <br></br>
// <Routes />
//</Router>