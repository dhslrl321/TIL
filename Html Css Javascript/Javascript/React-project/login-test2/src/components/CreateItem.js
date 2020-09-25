import React from 'react';

export const CreateItem = ({ handleAddButtonOnClick }) => {
  return (
    <button onClick={handleAddButtonOnClick}>Add</button>
  );
}