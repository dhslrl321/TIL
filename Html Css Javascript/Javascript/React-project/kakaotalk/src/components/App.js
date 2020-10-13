import React from 'react';
import GlobalStyle from "../config/GlobalStyle";
import styled from "styled-components";
import Header from './Header';


const ScrollTestBlock = styled.div`
  height: 1000vh;
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <Header />
    </div>
  );
}

export default App;
