import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  position: absolute;
  top: 79px;
  background: #181818;
  border: 1px solid #181818;
  border-radius: 10px;
  transition: 1s ease;
`;

export const NavColumn = styled.div`
  margin-right: 50px;
  :first-child {
    margin-left: 15px;
  }
  :last-child {
    margin-right: 15px;
  }
`;

export const NavItem = styled.li`
  padding: 5px 0;
`;

export const Link = styled.a`
  transition: 0.5s ease;
  font-size: 0.9rem;
  :hover {
    color: #3C59FD;
  }
`;