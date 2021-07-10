import styled, { css } from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bolder;
  background: black;
  height: 80px;
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
  padding: 20px 0;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const LinkItem = styled.li`
  margin: 20px;
`;

export const Link = styled.a`
  transition: all 0.5s ease;
  :hover{
    color: #3C59FD;
  }
`;