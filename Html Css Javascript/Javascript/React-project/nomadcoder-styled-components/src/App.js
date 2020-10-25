import React from 'react';
import styled from "styled-components";

const Box1 = styled.input`
  background-color: red;
`;

const Box2 = styled.div`
  background-color: wheat;
`;

export const App = () => {

  return (
    <>
      <h1>asdf</h1>
      <input type="text" />
      <input type="text" />
      <button>로그인</button>
    </>
  );
}

export default App;