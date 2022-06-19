import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  overflow-x: hidden;
  font-size: 2rem;
`;

const Section1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
`;
const Section2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
`;
const Section3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
`;
const Section4 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
`;
const Section5 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  background: #121212;
`;
const Main = () => {

  return (
    <Container>
      <Section1 id="커리큘럼">커리큘럼</Section1>
      <Section2>졸업 후 진로</Section2>
      <Section3>선배의 인터뷰</Section3>
      <Section4>this is section n</Section4>
      <Section5>this is section n</Section5>
      <Footer>this is footer</Footer>
    </Container>
  )
}

export default Main
