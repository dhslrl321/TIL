import React from 'react';
import styled from 'styled-components';
import TodoItem from "./TodoItem";
const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  background: gray;
`;

const TodoList = () => {
  return (
    <TodoListBlock>
      <TodoItem text="create" done={true} />
    </TodoListBlock>
  );
}

export default TodoList;