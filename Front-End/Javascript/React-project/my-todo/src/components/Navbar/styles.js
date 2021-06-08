import styled from 'styled-components';

export const Container = styled.nav`

  margin-top: 100px;


  height: 80px;
  width: 100%;
  background: #0D1117;
  color: #C9D1D9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavWrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  display: flex;
  justify-content: space-between;
`;

export const NavColumn = styled.div`
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ExpandableColumn = styled.div`
  font-size: 1.2rem;
  display: flex;
  justify-content: flex-start;
`;