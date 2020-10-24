import React, { useState } from 'react';
import SigninPresenter from './SigninPresenter';

const SigninContainer = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });

  return (
    <SigninPresenter
      setInputs={setInputs} />
  );
}

export default SigninContainer;