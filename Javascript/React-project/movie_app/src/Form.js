import React from 'react';

const Form = ({ title, handleTodoInputChange, handleTodoItemAdd }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="What Todo..."
        onChange={handleTodoInputChange}
        name="title"
        value={title} />

      <button onClick={handleTodoItemAdd}>추가</button><br></br><br></br><br></br>
    </div>
  );
}

export default Form;