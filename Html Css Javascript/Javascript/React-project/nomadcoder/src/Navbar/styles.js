import styled from 'styled-components';


export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bolder;
  /* height: ${({ scrollNav }) => scrollNav ? "80px" : "-80px"}; */
  background: black;
  height: 80px;
  /* visibility: ${({ show }) => show ? "visible" : "hidden"};
  transition: all 100ms ${({ show }) => show ? "ease-in" : "ease-out"};
  transform: ${({ show }) => show ? "none" : "translate(0, -100%"}; */
`;

export const HeaderWrapper = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
`;

export const TitleColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LinkColumn = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  padding: 20px 0;
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