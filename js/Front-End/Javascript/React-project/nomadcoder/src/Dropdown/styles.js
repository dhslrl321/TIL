import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  position: absolute;
  background: #181818;
  border-radius: 10px;
  transition: 1s ease;
  top: ${({ show }) => show ? "90%" : "50%"};
  opacity: ${({ show }) => show ? "1" : "0"};
  width: 350px;
  left: 1px;
`;



export const NavColumn = styled.div`
  width: 100px;
  :first-child {
    padding-left: 20px;
  }
  :last-child {
    margin-left: -10px;
  }
`;

export const NavItem = styled.li`
  padding: 6px 0;
  :last-child {
    margin-bottom: 5px;
  }
`;

export const Link = styled.a`
  transition: 0.5s ease;
  font-size: 0.8rem;
  :hover {
    color: #3C59FD;
  }
`;