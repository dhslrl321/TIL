import React, { useState } from "react";

const Login = ({ user, onLogin }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: [value],
    });
  };

  const onClick = (e) => {
    onLogin(username, password);
    setInputs({
      username: "",
      password: "",
    });
  };

  const { username, password } = inputs;
  return (
    <div>
      <h2>Login</h2>
      <input type="text" name="username" value={username} onChange={onChange} />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
      />
      <button onClick={onClick}>로그인</button>
      <hr></hr>

      <h4>Username : {user.username}</h4>
      <h4>Password : {user.password}</h4>
      <h4>Token : {user.token}</h4>
    </div>
  );
};

export default Login;
