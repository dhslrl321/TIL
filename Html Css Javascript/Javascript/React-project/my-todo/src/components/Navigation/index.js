import React from 'react'
import * as S from "./styles";


const Navigation = ({ name }) => {
  return (
    <S.NavItemContainer>
      <S.NavItem>
        <span>{name}</span>
      </S.NavItem>
    </S.NavItemContainer>
  )
}

export default Navigation;
