import React, { Component } from 'react';
import styled from "styled-components";

class App extends Component {
  render() {
    return (
      <Container>
        <Button>Hello</Button>
        <Button danger />
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
  background-color: ${props => (props.danger ? "yellow" : "green")};
`;

export default App;
