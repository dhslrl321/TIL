import React from 'react';
import styled, { createGlobalStyle } from "styled-components";
import TodoTemplate from './components/TodoTemplate';
import TodoHead from "./components/TodoHead";
import TodoList from './components/TodoList';
import TodoCreate from "./components/TodoCreate";
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e9ecef;
  }
`;


function App() {

  return (
    <>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </>
  );
}

export default App;
