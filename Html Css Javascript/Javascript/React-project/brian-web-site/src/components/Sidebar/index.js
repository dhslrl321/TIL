import React from 'react'
import {
  SidebarContainer, SideBtnWrap, SidebarLink,
  SidebarRoute, SidebarMenu, SidebarWrapper,
  Icon, CloseIcon
} from "./styles";
const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="about">
            About
          </SidebarLink>
          <SidebarLink to="tour">
            Tour
          </SidebarLink>
          <SidebarLink to="pricing">
            Pricing
          </SidebarLink>
          <SidebarLink to="reservation">
            Reservation
          </SidebarLink>
        </SidebarMenu>
      </SidebarWrapper>
      <SideBtnWrap>
        <SidebarRoute to="/signin">
          FAQ
        </SidebarRoute>
      </SideBtnWrap>
    </SidebarContainer>
  )
}

export default Sidebar;
