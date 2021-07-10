import React from 'react'
import * as S from "./styles";
import Navigation from '../Navigation';
import ExpandableNavigation from "../ExpandableNavigation";


const dropdownData = [
  {
    id: 1,
    name: "활동",
    data: [
      { id: 1, name: "행사 및 활동" },
      { id: 2, name: "동아리" },
    ]
  },
  {
    id: 2,
    name: "교육",
    data: [
      { id: 1, name: "커리큘럼" },
      { id: 2, name: "졸업 후 진로" },
      { id: 3, name: "연구실" },
    ]
  },
  {
    id: 3,
    name: "구성원",
    data: [
      { id: 1, name: "교수진" },
      { id: 2, name: "학생들" },
      { id: 3, name: "선배의 인터뷰" },
    ]
  },
  {
    id: 4,
    name: "Wargame",
    data: [
      { id: 1, name: "모든 문제 풀기" },
      { id: 2, name: "랭킹" },
    ]
  }
]

const Navbar = () => {
  return (
    <S.Container>
      <S.NavWrapper>

        <S.NavColumn>
          <Navigation name="배재대학교 정보보안학과" />
        </S.NavColumn>

        <S.ExpandableColumn>
          {dropdownData.map(data => <ExpandableNavigation data={data} />)}
        </S.ExpandableColumn>

        <S.NavColumn>
          <Navigation name="로그인" />
          <Navigation name="회원가입" />
        </S.NavColumn>

      </S.NavWrapper>
    </S.Container >
  )
}

export default Navbar
