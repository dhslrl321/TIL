import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import styled from "styled-components";

const Top = styled.div`
  background: #000;
  color: white;

`;

const Middle = styled.div`
  background: #050;
  color: white;


`;
const Bottom = styled.div`
  background: #005;
  color: white;

`;

const Footer = styled.div`
  background: #555;
  height: 100vh;
`;

const Header = styled.h1`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  color: #fff;
`;
const App = () => (
  <>
    <Header>This is header</Header>
    <ReactFullpage
      //fullpage options
      scrollingSpeed={1000} /* Options here */

      render={({ state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            <Top className="section">
              <p>Section 1 (welcome to fullpage.js)</p>
            </Top>
            <Middle className="section">
              <p>Section 2</p>
            </Middle>
            <Bottom className="section">
              <p>Section 3</p>
            </Bottom>
            <Footer className="section">
              footer
            </Footer>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  </>
);
export default App;
