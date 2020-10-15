import React from 'react';
import styled from 'styled-components';


const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div``;

const CheckCircle = styled.div``;

const Text = styled.div``;

const TodoItem = ({ id, done, text }) => {
  return (
    <TodoItemBlock>
      <CheckCircle done={done}></CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove>

      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;