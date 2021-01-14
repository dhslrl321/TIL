import styled from 'styled-components';


export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bolder;
  height: 80px;
  background: gray;
`;

export const HeaderWrapper = styled.div`
  display: flex;
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
  position: relative;
  justify-content: flex-end;
  padding-bottom: 30px;
`;

export const LinkItem = styled.li`
  padding: 10px;
`;

export const Link = styled.a`
  height: 100%;
  transition: all 0.5s ease;
  :hover{
    color: blue;
  }
`;

export const HiddenMenu = styled.div`
  position: absolute;
  display: ${({ menuActivation }) => menuActivation ? "flex" : "none"};
  top: ${({ menuActivation }) => menuActivation ? "263%" : "0%"};
  width: 270px;
  height: 100px;
  background: gray;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: all 0.5s ease;
  z-index: 10;
`;
