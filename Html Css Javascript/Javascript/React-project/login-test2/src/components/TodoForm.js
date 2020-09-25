import React from 'react';
import { CreateItem } from './CreateItem';

export const TodoForm = ({ title, handleTitleOnChange, handleAddButtonOnClick }) => {

  return (

    <div>
      <input
        name="todo"
        type="text"
        value={title}
        placeholder="해야할 일을 입력하세요"
        onChange={handleTitleOnChange} />

      <CreateItem
        handleAddButtonOnClick={handleAddButtonOnClick} />
    </div>
  );
}