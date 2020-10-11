import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 18px;
  margin-top: 20px;
`;

export default () =>

  <Container>

    <span role="img" aria-label="loading">
      loading...
    </span>
  </Container>