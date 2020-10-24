import React from 'react';
import LoginForm from "./components/LoginForm";

const SigninPresenter = ({
  setInputs
}) => {
  return (
    <div>
      <LoginForm setInputs={setInputs} />
    </div>
  );
}

export default SigninPresenter;