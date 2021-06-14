import React from 'react'

import * as S from "./TodoList.styles";

import TodoItem from './TodoItem';
import { useSelector } from 'react-redux';


const TodoList = () => {

  const { todos } = useSelector(state => state.todoReducer);



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
