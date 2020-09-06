import React from 'react';

const Form = ({ handleTodoInputChange, handleTodoItemAdd }) => {
  return (
    <div>
      <input type="text" placeholder="What Todo..." onChange={handleTodoInputChange} />
      <button onClick={handleTodoItemAdd}>추가</button><br></br><br></br><br></br>
    </div>
  );
}

export default Form;