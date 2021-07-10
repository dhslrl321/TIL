import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputBox = styled.input`
  width: 295px;
  height: 40px;
  margin: 10px 5px;
  
  border-radius: 15px;
  font-size: 1.2rem;

  background: white;
  padding: 5px 25px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.34);
`;

export const Button = styled.button`
  width: 100px;
  height: 50px;

  font-size: 1.2rem;

  background: white;
  
  border: none;
  border-radius: 15px;

  color: #20c997;

  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.34);

  cursor: pointer;
`;