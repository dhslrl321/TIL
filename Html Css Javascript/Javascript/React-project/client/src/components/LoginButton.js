import React from 'react';
import { useSetUser, useLoginInputsData, useSetLoginInputs } from "../context/context";

const LoginButton = () => {

  const { username, password } = useLoginInputsData();
  const setLoginInputs = useSetLoginInputs();
  const setUser = useSetUser();


  const onClick = (e) => {
    e.preventDefault();
    setLoginInputs({
      username: "",
      password: ""
    })

    setUser({
      username: username,
      email: password,
      authenticated: true
    })
  }

  return (
    <>
      <button onClick={onClick}>Login</button>
    </>
  );
}

export default LoginButton;