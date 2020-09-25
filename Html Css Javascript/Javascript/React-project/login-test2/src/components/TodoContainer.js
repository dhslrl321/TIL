import React from 'react';

const TodoItem = ({ todo, handleDeleteButtonOnClick }) => {
  return (
    <div>
      {todo.id}. {todo.title} <button onClick={() => handleDeleteButtonOnClick(todo.id)}>Delete</button>
    </div>
  );
}

export const TodoContainer = ({ todos, handleDeleteButtonOnClick }) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteButtonOnClick={handleDeleteButtonOnClick} />
      ))}
    </div>
  );
}