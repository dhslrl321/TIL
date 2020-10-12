import React from 'react';
import GlobalStyle from "./config/GlobalStyle";
import StatusBar from './components/StatusBar';
import styled from "styled-components";


const ScrollTestBlock = styled.div`
  height: 1000vh;
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <StatusBar />
      <ScrollTestBlock />
    </div>
  );
}

export default App;
