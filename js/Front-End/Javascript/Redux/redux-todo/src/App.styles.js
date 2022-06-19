import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 200vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background: #e9ecef;

  input {
    appearance: none;
    outline-style: none;
    border:none;
  }
`;

export const Wrapper = styled.div`
  margin-top: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;