import React from 'react'
import * as S from "./styles";
const Sidebar = ({ isOpen, toggle }) => {

  return (
    <S.SidebarContainer isOpen={isOpen} onClick={toggle}>
      <S.Icon onClick={toggle}>
        <S.CloseIcon />
      </S.Icon>
      <S.SidebarWrapper>
        <S.SidebarMenu>
          <S.SidebarLink onClick={toggle}>
            커리큘럼
          </S.SidebarLink>
          <S.SidebarLink onClick={toggle} >
            졸업 후 진로
          </S.SidebarLink>
          <S.SidebarLink onClick={toggle} >
            선배의 인터뷰
          </S.SidebarLink>
          <S.SidebarLink onClick={toggle} >
            연구 활동
          </S.SidebarLink>
          <S.SidebarLink onClick={toggle} >
            CTF
          </S.SidebarLink>
          <S.SidebarLink onClick={toggle} >
            세미나
          </S.SidebarLink>
          <S.SidebarLink onClick={toggle} >
            대외활동
          </S.SidebarLink>
          <S.SidebarLink onClick={toggle} >
            교수진
          </S.SidebarLink>
          <S.SidebarLink onClick={toggle} >
            랩실
          </S.SidebarLink>
          <S.SidebarLink onClick={toggle} >
            소모임
          </S.SidebarLink>
        </S.SidebarMenu>
      </S.SidebarWrapper>
    </S.SidebarContainer>
  )
}

export default Sidebar
