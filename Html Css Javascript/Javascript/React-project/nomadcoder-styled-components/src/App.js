import React, { Component } from 'react';
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
`

class App extends Component {
  render() {
    return (
      <Container>
        <GlobalStyle></GlobalStyle>
        <Button> Hello</Button>
        <Button danger>Hello</Button>
        <Anchor href="http://google.com">goto google</Anchor>
      </Container>
    );
  };
}

const Container = styled.div`
  height:100vh;
  width: 100%;
  background-color: #bdc3c7;
`

const Button = styled.button`
  border-radius: 50px;
  padding: 5px;
  min-width: 120px;
  color: wheat;
  font-weight: 600;
  -webkit-appearance: none;
  cursor: pointer;

  &:active,
  &:focus{
    outline: none;
  }
  background-color: ${props => (props.danger ? "yellow" : "green")}
`;

const Anchor = styled(Button.withComponent("a"))`
  text-decoration: none;
`;

export default App;