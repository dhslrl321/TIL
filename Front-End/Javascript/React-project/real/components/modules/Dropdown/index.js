import React, { useState, useEffect } from 'react'
import * as S from "./styles";
import Link from "../../atoms/Link";

const Dropdown = ({ show }) => {

  const [test, setTest] = useState(false);
  useEffect(() => {
    if (show) setTest(true);
  }, [])
  return (
    <S.Container show={test}>
      <S.NavColumn>
        <S.NavItem>
          <Link styleType="Anchor"
            to="services"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            activClass="active">커리큘럼</Link>
        </S.NavItem>
        <S.NavItem>
          <Link styleType="Anchor"
            to="services"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            activClass="active">졸업 후 진로</Link>
        </S.NavItem>
        <S.NavItem>
          <Link styleType="Anchor"
            to="services"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            activClass="active">선배의 인터뷰</Link>
        </S.NavItem>
      </S.NavColumn>
      <S.NavColumn>
        <S.NavItem>
          <Link styleType="NextLink" href="/test1">
            <Link styleType="Anchor"
              to="section1"
              smooth={true}
              duration={500}
              syp={true}
              exact="true"
              offset={-80}
              activClass="active">CTF</Link>
          </Link>
        </S.NavItem>
        <S.NavItem>
          <Link styleType="Anchor"
            href="/test1"
            to="section2"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            activClass="active">세미나</Link>
        </S.NavItem>
        <S.NavItem>
          <Link styleType="Anchor"
            href=""
            to="section3"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            activClass="active">컨퍼런스</Link>
        </S.NavItem>
      </S.NavColumn>
      <S.NavColumn>
        <S.NavItem>
          <Link styleType="Anchor"
            to="services"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            activClass="active">교수진</Link>
        </S.NavItem>
        <S.NavItem>
          <Link styleType="Anchor"
            to="services"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            activClass="active">랩실</Link>
        </S.NavItem>
        <S.NavItem>
          <Link styleType="Anchor"
            to="services"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            activClass="active">소모임</Link>
        </S.NavItem>
      </S.NavColumn>
    </S.Container>
  )
}

export default Dropdown
