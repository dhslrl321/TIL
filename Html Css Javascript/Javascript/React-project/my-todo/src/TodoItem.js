import React from 'react'

const TodoItem = ({ todo, onClickDelete }) => {

  const { id, title } = todo;

  return (
    <>
      <li>{title}</li>
      <button onClick={() => onClickDelete(id)}>완료</button>
    </>
  )
}

export default TodoItem;
