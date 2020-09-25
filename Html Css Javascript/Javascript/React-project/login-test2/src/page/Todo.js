import React, { useState, useRef } from 'react';
import { TodoForm } from '../components/TodoForm';
import { TodoContainer } from '../components/TodoContainer';

export const Todo = () => {

  const nextId = useRef(2);

  const [todos, setTodos] = useState([
    { id: 1, title: "해야할 일을 추가해주세요!" },
  ])

  const [input, setInput] = useState({
    title: ""
  })
  const { title } = input;

  const handleTitleOnChange = (e) => {
    setInput({
      title: e.target.value
    })
  }

  const handleAddButtonOnClick = () => {

    const todo = {
      id: nextId.current,
      title: title
    }

    setTodos([...todos, todo]);

    setInput({
      title: "",
    })

    nextId.current += 1;
  }

  const handleDeleteButtonOnClick = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div>
      <h2>나만의 세련된 투두리스트</h2>
      <TodoForm
        title={title}
        handleTitleOnChange={handleTitleOnChange}
        handleAddButtonOnClick={handleAddButtonOnClick} />
      <TodoContainer
        todos={todos}
        handleDeleteButtonOnClick={handleDeleteButtonOnClick} />
    </div>
  );
}