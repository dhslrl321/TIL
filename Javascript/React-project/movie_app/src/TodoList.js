import React from 'react';


const TodoItem = ({ todo, handleMouseHoverTrue, handleMouseHoverFalse, handleTodoItemClick, handleTodoItemRemove }) => {
  return (
    <div>
      <span
        style={{
          cursor: "pointer",
          color: todo.active ? "green" : "black",
          fontWeight: todo.active ? "bolder" : (todo.hover ? "bold" : "normal"),
        }}
        onMouseEnter={() => handleMouseHoverTrue(todo.id)}
        onMouseLeave={() => handleMouseHoverFalse(todo.id)}
        onClick={() => handleTodoItemClick(todo.id)}
      >{todo.id} {todo.title}</span> <button onClick={() => handleTodoItemRemove(todo.id)}>삭제</button>
    </div >
  )
}

const TodoList = ({ todos, handleMouseHoverTrue, handleMouseHoverFalse, handleTodoItemClick, handleTodoItemRemove }) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          handleMouseHoverTrue={handleMouseHoverTrue}
          handleMouseHoverFalse={handleMouseHoverFalse}
          handleTodoItemClick={handleTodoItemClick}
          handleTodoItemRemove={handleTodoItemRemove} />
      ))}
    </div>
  );
}

export default TodoList;