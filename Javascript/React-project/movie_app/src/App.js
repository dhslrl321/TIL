import React, { useState, useRef } from 'react';
import Form from './Form';
import TodoList from './TodoList';

const App = () => {

  const [todos, setTodos] = useState([
    { id: 1, title: "여기에 할일을 추가해 보세요!", active: true, hover: false },
    { id: 2, title: "바로 이렇게요!", active: false, hover: false },
  ])

  const handleMouseHoverTrue = (id) => {
    setTodos(
      todos.map(todo => (
        todo.id === id ? { ...todo, hover: !todo.hover } : todo
      ))
    )
  }

  const handleMouseHoverFalse = (id) => {
    setTodos(
      todos.map(todo => (
        todo.id === id ? { ...todo, hover: !todo.hover } : todo
      ))
    );
  }

  const handleTodoItemClick = (id) => {
    setTodos(
      todos.map(todo => (
        todo.id === id ? { ...todo, active: !todo.active } : todo
      ))
    );
  }

  const handleTodoItemRemove = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const nextTodoId = useRef(3);

  const [todoInput, setTodoInput] = useState({
    title: ""
  })

  const { title } = todoInput;

  const handleTodoInputChange = (e) => {
    const { name, value } = e.target;

    setTodoInput({
      ...todoInput,
      [name]: value
    });
  }

  const handleTodoItemAdd = () => {
    const todo = {
      id: nextTodoId.current,
      title,
      active: false,
      hover: false
    }

    setTodos([...todos, todo]);
    setTodoInput({
      title: ""
    })

    nextTodoId.current += 1;
  }

  return (
    <div>
      <div><h2>Todo List</h2></div>
      <Form
        handleTodoInputChange={handleTodoInputChange}
        handleTodoItemAdd={handleTodoItemAdd} />
      <TodoList
        todos={todos}
        handleMouseHoverTrue={handleMouseHoverTrue}
        handleMouseHoverFalse={handleMouseHoverFalse}
        handleTodoItemClick={handleTodoItemClick}
        handleTodoItemRemove={handleTodoItemRemove} />
    </div>
  );
}

export default App;