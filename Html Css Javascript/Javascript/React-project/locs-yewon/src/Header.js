import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Columns = styled.div`

`;

const ParCol = styled.div`
  width: 33%;
  display: flex;

  :first-child {
    justify-content:
  }

  :nth-child(2) {
    justify-content: center;
  }

  :last-child {
    justify-content: flex-end;
  }
`;

const Header = () => {
  return (
    <Container>
      <ParCol>
        <Columns>
          Noservice
          Wifi
        </Columns>
      </ParCol>
      <ParCol>
        <Columns>
          18:43
        </Columns>
      </ParCol>
      <ParCol>
        <Columns>
          54%
          Battery
          Bolt
        </Columns>
      </ParCol>
    </Container>
  );
}

export default Header;