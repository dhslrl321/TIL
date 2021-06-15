import React, { useState } from 'react'
import { useDispatch } from "react-redux";

import * as S from "./InputForm.styles";
import { add_todo } from "../../modules/todo";

import useInput from "../../hooks/useInput";

const InputForm = () => {
  const dispatch = useDispatch();

  const value = useInput();

  const [text, setText] = useState("");

  const handleClick = () => {
    const todo = {
      title: value.value,
      isComplete: false
    };

    dispatch(add_todo(todo));
    setText("");
  }

  return (
    <S.Container>
      <S.InputBox
        type="text"
        placeholder="할 일을 입력하세요!!"
        {...value} />
      <S.InputBox
        type="text"
        placeholder="할 일을 입력하세요!!"
        {...value} />
      <S.Button onClick={handleClick}>추가 하기</S.Button>
    </S.Container>
  )
}

export default InputForm;
