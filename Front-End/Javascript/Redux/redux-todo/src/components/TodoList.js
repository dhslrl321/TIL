import React from 'react'

import * as S from "./TodoList.styles.js";

import TodoItem from './TodoItem.js';


const TodoList = () => {
  return (
    <S.Container>
      <TodoItem id={1} title={"일 하기"} isComplete={false} />
    </S.Container>
  )
}

export default TodoList
