import React from 'react'
import {
  SidebarContainer, SideBtnWrap, SidebarLink,
  SidebarRoute, SidebarMenu, SidebarWrapper,
  Icon, CloseIcon
} from "./styles";
const Sidebar = () => {
  return (
    <SidebarContainer>
      <Icon>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="about">
            about
          </SidebarLink>
          <SidebarLink to="discover">
            discover
          </SidebarLink>
          <SidebarLink to="services">
            services
          </SidebarLink>
          <SidebarLink to="signup">
            signup
          </SidebarLink>
        </SidebarMenu>
      </SidebarWrapper>
      <SideBtnWrap>
        <SidebarRoute to="/signin">
          Signin
        </SidebarRoute>
      </SideBtnWrap>
    </SidebarContainer>
  )
}

export default Sidebar
