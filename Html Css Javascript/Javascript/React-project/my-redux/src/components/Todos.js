import React, { useState } from 'react'

const TodoItem = React.memo((todo, onToggle) => {
  return (
    <li
      style={{ textDecoration: todo.done ? 'line-through' : "none" }}
      onClick={() => onToggle(todo.id)}>
      {todo.text}
    </li>
  );
})

const TodoList = React.memo((todos, onToggle) => {
  return (
    <ul>{todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
    ))}</ul>
  );
})

const Todos = () => {
  const [text, setText] = useState('');
  const onChange = e => setText(e.target.value);
  const onSubmit = e => {
    e.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지
    onCreate(text);
    setText(''); // 인풋 초기화
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={text}
          placeholder="할 일을 입력하세요.."
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <TodoList todos={todos} onToggle={onToggle} />
    </div>
  );
}

export default Todos
