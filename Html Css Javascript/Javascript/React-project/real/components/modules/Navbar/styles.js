import styled from 'styled-components';
import { theme } from 'styled-tools';
import NextLink from "../../atoms/Link";
import { down } from "styled-breakpoints";
export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bolder;
  height: 80px;
  margin-bottom: 80px;
  list-style: none;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  height: -80px;
  transition: 0.5s ease;
  transform: ${({ show }) => show ? "translate(0, 0);" : "translate(0, -100%);"};
  background: black;
  z-index: 10;
`;

export const TitleColumn = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.6rem;
    cursor: pointer;
  }
`;

export const LinkColumn = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  

  @media screen and (max-width: 768px) {
    display: none;
  }

`;

export const LinkItem = styled.li`
  margin: 0 20px;
  padding: 30px 10px;
  :active{
    border-bottom: 3px solid #3C59FD;
  }
`;

export const Link = styled.a`
  cursor: pointer;
`;