import React from 'react';
import { createGlobalStyle } from "styled-components";
import TodoTemplate from './components/TodoTemplate';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e9ecef;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <TodoTemplate></TodoTemplate>
    </>
  );
}

export default App;