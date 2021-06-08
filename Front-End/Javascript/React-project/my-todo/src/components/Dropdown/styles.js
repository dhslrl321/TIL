import styled from 'styled-components';

// 드롭 다운
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  position: absolute;
  top: 23px;
`;

export const DropdownItem = styled.div`
  margin: 4px 0px;
  transition: 0.5s ease;
  display: flex;
  align-items: center;
`;