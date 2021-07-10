import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  background: #181818;
  border-radius: 10px;
  transition: 1s ease;
  top: ${({ show }) => show ? "90%" : "50%"};
  opacity: ${({ show }) => show ? "1" : "0"};
  width: 300px;
  left: 1px;
  z-index: 1;
`;

export const NavColumn = styled.div`
  margin: 0 20px;
`;

export const NavItem = styled.li`
  margin: 10px 0;
`;