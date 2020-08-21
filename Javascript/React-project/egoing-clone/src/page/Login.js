import React from 'react';
import './Login.css'
const Login = () => {
  return (
    <div>
      <h2 className="login">This is Login</h2>
      <input type="text" placeholder="Id" /><br></br>
      <input type="password" placeholder="Password" /><br></br>
      <button>Login</button>
      <button>Join</button>
    </div>
  );
}

export default Login;