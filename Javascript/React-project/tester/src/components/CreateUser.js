import React from 'react';

const CreateUser = ({ username, email, name, onCreate, onChange }) => {
  return (
    <div>
      <input
        name="username"
        placeholder="Account"
        onChange={onChange}
        value={username} />

      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={onChange}
        value={email} />

      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={onChange}
        value={name} />

      <button onClick={onCreate}>Create</button>
    </div>
  );
}

export default CreateUser;