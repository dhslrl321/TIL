import React from 'react'

import * as S from "./TodoList.styles.js";

import TodoItem from './TodoItem.js';
import { useSelector } from 'react-redux';


const TodoList = () => {

  const todos = useSelector(state => state.todos);

  return (
    <S.Container>
      {todos.map(todo =>
        <TodoItem
          key={todo.id}
          todo={todo} />
      )}
    </S.Container>
  )
}

export default TodoList
