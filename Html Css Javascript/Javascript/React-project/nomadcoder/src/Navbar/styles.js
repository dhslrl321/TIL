import styled from 'styled-components';


export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bolder;
  height: 80px;
  background: black;
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