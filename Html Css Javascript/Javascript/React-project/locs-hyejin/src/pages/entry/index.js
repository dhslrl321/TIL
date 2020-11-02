import React from 'react';
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
const Background = styled.div`
  background: linear-gradient( 135deg, #9CC3FA 1%, #0b03fc 99%);
  height: 100vh;
  width: 100vw;
`;

const LogoText = styled.div`
  color: white;
  
  padding-top: 10%;

  div {
    :last-child{
      font-weight: bold;
    }
  }
`;

const Entry = () => {
  return (
    <Background>
      <LogoText>
        <div>똑똑한 지출</div>
        <div>편리한 관리</div>
        <div>금융을 분석하다.</div>
      </LogoText>
      <div>
        Icon
      </div>
      <div>
        Icon + test
      </div>
      <div>
        <Link to="/login">
          <MdKeyboardArrowRight />
        </Link>
      </div>
    </Background>
  );
}

export default Entry;