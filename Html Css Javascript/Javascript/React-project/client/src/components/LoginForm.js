import React from 'react';
import { useLoginInputsData, useSetLoginInputs } from "../context/context";


const LoginForm = () => {
  const loginInputs = useLoginInputsData();
  const setLoginInputs = useSetLoginInputs();

  const onChange = (e) => {
    const { target: { name, value } } = e;
    setLoginInputs({
      ...loginInputs,
      [name]: [value]
    })
  }
  const { username, password } = loginInputs;

  return (
    <>
      <input
        type="text"
        placeholder="아이디를 입력하세요"
        name="username"
        value={username}
        onChange={onChange} />
      <input
        type="text"
        placeholder="비밀번호를 입력하세요"
        name="password"
        value={password}
        onChange={onChange} />
      {console.log(loginInputs)}
    </>
  );
}

export default LoginForm;