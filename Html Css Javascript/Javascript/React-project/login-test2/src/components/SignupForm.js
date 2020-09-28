import React from 'react';

export const SignupForm = ({ handleInputFormOnChange, handleSingnupButtonOnClick }) => {
  return (
    <div>
      <input
        type="text"
        name="username"
        placeholder="Id"
        onChange={handleInputFormOnChange} /> <br></br>
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={handleInputFormOnChange} /><br></br>
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleInputFormOnChange} /><br></br>
      <input
        type="password"
        name="password-chk"
        placeholder="password check"
        onChange={handleInputFormOnChange} /><br></br>

      <button onClick={handleSingnupButtonOnClick}>Sign-Up</button>
    </div>
  );
}