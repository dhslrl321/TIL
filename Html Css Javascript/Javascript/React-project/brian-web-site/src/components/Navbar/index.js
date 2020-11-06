import React from 'react'
import { FaBars } from "react-icons/fa";
import {
  Nav, NavbarContainer, NavLogo, MobileIcon,
  NavMenu, NavItem, NavLinks
} from "./styles";
const Navbar = ({ toggle }) => {

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">
          Blessed Music Studio
        </NavLogo>
        <MobileIcon onClick={toggle}>
          <FaBars />
        </MobileIcon>
        <NavMenu>
          <NavItem>
            <NavLinks to="about">
              About
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="tour">
              Tour
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="pricing">
              Pricing
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="Reservation">
              Reservation
            </NavLinks>
          </NavItem>
        </NavMenu>
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar;
