import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;
const TestSection01 = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default TestSection01
