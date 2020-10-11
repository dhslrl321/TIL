import React from 'react';
import styled from "styled-components";
import TodoItem from "./TodoItem";
const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  return (
    <TodoListBlock>
      <TodoItem text="컴포넌트 스타일링" done={true} />
      <TodoItem text="gkf" done={false} />
      <TodoItem text="스타일링" done={true} />
    </TodoListBlock>)
}

export default TodoList;