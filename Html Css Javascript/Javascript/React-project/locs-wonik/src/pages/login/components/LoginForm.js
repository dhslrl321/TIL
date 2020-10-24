import React, { useState } from 'react';

const LoginForm = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  })

  const { username, password } = inputs;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: [value]
    })
  }

  const handleOnClick = (e) => {
    console.log(inputs);
  }

  return (
    <div>
      <input type="text" name="username" value={username} onChange={handleOnChange} />
      <input type="password" name="password" value={password} onChange={handleOnChange} />
      <button onClick={handleOnClick}>Login</button>
    </div>
  );
}

export default LoginForm;