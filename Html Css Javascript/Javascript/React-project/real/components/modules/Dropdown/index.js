import React, { useState, useEffect } from 'react'
import * as S from "./styles";

const Dropdown = ({ show }) => {

  const [test, setTest] = useState(false);
  useEffect(() => {
    if (show) setTest(true);
  }, [])
  return (
    <S.Container show={test}>
      <S.NavColumn>
        <S.NavItem>
          <S.Link href="#">커리큘럼</S.Link>
        </S.NavItem>
        <S.NavItem>
          <S.Link href="#">졸업 후 진로</S.Link>
        </S.NavItem>
        <S.NavItem>
          <S.Link href="#">선배의 인터뷰</S.Link>
        </S.NavItem>
      </S.NavColumn>
      <S.NavColumn>
        <S.NavItem>
          <S.Link href="#section1">CTF</S.Link>
        </S.NavItem>
        <S.NavItem>
          <S.Link href="#section2">세미나</S.Link>
        </S.NavItem>
        <S.NavItem>
          <S.Link href="#section3">컨퍼런스</S.Link>
        </S.NavItem>
      </S.NavColumn>
      <S.NavColumn>
        <S.NavItem>
          <S.Link href="#">교수진</S.Link>
        </S.NavItem>
        <S.NavItem>
          <S.Link href="#">랩실</S.Link>
        </S.NavItem>
        <S.NavItem>
          <S.Link href="#">소모임</S.Link>
        </S.NavItem>
      </S.NavColumn>
    </S.Container>
  )
}

export default Dropdown
