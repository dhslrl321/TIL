import React from 'react'
import * as S from "./styles";

const Dropdown = () => {

  return (
    <S.Container>
      <S.NavColumn>
        <S.NavItem>
          <S.Link href="#">project</S.Link>
        </S.NavItem>
        <S.NavItem>
          <S.Link href="#">readme</S.Link>
        </S.NavItem>
      </S.NavColumn>
      <S.NavColumn>
        <S.NavItem>
          <S.Link href="#">Java</S.Link>
        </S.NavItem>
        <S.NavItem>
          <S.Link href="#">Python</S.Link>
        </S.NavItem>
        <S.NavItem>
          <S.Link href="#">Algorithm</S.Link>
        </S.NavItem>
        <S.NavItem>
          <S.Link href="#">Category</S.Link>
        </S.NavItem>
      </S.NavColumn>
      <S.NavColumn>
        <S.NavItem>
          <S.Link href="#">코드 윗 미</S.Link>
        </S.NavItem>
        <S.NavItem>
          <S.Link href="#">Description</S.Link>
        </S.NavItem>
        <S.NavItem>
          <S.Link href="#">Tech</S.Link>
        </S.NavItem>
      </S.NavColumn>
    </S.Container>
  )
}

export default Dropdown
