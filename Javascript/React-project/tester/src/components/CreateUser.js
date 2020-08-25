import React from 'react';

const CreateUser = ({ onClick, onChange }) => {
  return (
    <div>
      <input type="text" placeholder="Account" />
      <input type="text" placeholder="Email" />
      <input type="text" placeholder="Name" />
      <button>Create</button>
    </div>
  );
}

export default CreateUser;