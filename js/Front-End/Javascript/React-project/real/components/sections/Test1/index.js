import React from 'react'
import styled from 'styled-components';
import { Element } from "react-scroll";
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;
const TestSection = ({ children, name }) => {
  return (
    <Element name={name}>
      <Container>
        {children}
      </Container>
    </Element>
  )
}

export default TestSection
