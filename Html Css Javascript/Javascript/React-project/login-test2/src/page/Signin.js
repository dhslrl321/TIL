import React, { useState } from 'react';
import { SigninForm } from '../components/SigninForm';
import { SigninButton } from '../components/SigininButton';
import { NavLink } from 'react-router-dom';
export const Signin = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });

  const handleSigninFormOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const handleSigninButtonOnClick = () => {
    // data request
    console.log("Login detected: <", inputs, ">")
  }

  return (
    <div>
      <SigninForm handleSigninFormOnChange={handleSigninFormOnChange} />
      <SigninButton handleSigninButtonOnClick={handleSigninButtonOnClick} />

      If you want to join this page
      <NavLink to="/sign-up">
        , Click Here!!
      </NavLink>
      or are you <NavLink to="/find">for got</NavLink>?
    </div>
  );
}