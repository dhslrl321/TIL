import React, { useState } from 'react';

const Login = () => {



  const handleOnChnage = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: [value]
    })
  }

  const handleOnClick = (e) => {
    const { email, password } = inputs;
    // api (email, password);
    console.log(email, password);
  }

  return (
    <>
      <div>
        이메일 주소
      </div>
      <input type="text" name="email" onChange={handleOnChnage}></input>
      <div>
        비밀번호
      </div>
      <input type="password" name="password" onChange={handleOnChnage}></input>
      <div>
        <button onClick={handleOnClick}>
          로그인 하기
        </button>
      </div>
    </>
  );
}

export default Login;