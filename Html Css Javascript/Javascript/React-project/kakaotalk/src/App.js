import React from 'react';
import { createGlobalStyle } from "styled-components";
import TodoTemplate from './components/TodoTemplate';
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e9ecef;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
      </TodoTemplate>
    </>
  );
}

export default App;