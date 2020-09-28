import React from 'react';

export const SigninForm = ({ handleSigninFormOnChange }) => {
  return (
    <div>
      Sign In<br></br>
      <input
        type="text"
        placeholder="Id"
        name="username"
        onChange={(e) => handleSigninFormOnChange(e)} /> <br></br>
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={(e) => handleSigninFormOnChange(e)} /> <br></br>
    </div>
  );
}