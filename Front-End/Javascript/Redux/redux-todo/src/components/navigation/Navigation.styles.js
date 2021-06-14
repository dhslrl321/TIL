import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  background: white;
  height: 80px;
  width: 100%;
`;

export const ColumnWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const NavColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavItem = styled.div`
  font-size: 1.3rem;
  margin: 0 20px;
  padding: 5px;
  
  cursor: pointer;
`;