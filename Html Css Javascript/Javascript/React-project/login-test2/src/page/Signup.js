import React, { useState } from 'react';
import { SignupForm } from '../components/SignupForm';

export const Signup = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    passwordChk: ""
  })

  const handleInputFormOnChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value
    })
    console.log(inputs);
  }

  const handleSingnupButtonOnClick = () => {
    console.log("Join detected ", inputs);
  }

  return (
    <div>
      Sign-Up Us
      <SignupForm
        handleInputFormOnChange={handleInputFormOnChange}
        handleSingnupButtonOnClick={handleSingnupButtonOnClick} />
    </div>
  );
}