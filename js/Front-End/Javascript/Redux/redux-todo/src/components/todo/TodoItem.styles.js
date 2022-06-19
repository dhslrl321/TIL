import styled from 'styled-components';

export const Container = styled.div`
  margin: 10px 10px;
  padding: 10px 10px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  border-radius: 4px;
`;

export const TextColumn = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Text = styled.span`
  margin: 0 8px;
`;

export const X = styled.button`
  color: red;
  border: none;
  background: white;

  font-size: 1rem;

  cursor: pointer;
`;