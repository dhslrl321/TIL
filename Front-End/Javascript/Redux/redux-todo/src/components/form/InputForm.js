import React, { useState } from 'react'
import { useDispatch } from "react-redux";

import * as S from "./InputForm.styles";
import { add_todo } from "../../modules/todo";

const InputForm = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;

    setText(value);
  }

  const handleClick = () => {
    const todo = {
      title: text,
      isComplete: false
    };

    dispatch(add_todo(todo));
    setText("");
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  }

  return (
    <S.Container>
      <S.InputBox
        type="text"
        placeholder="할 일을 입력하세요!!"
        onChange={handleChange}
        value={text}
        onKeyDown={handleKeyPress} />
      <S.Button onClick={handleClick}>추가 하기</S.Button>
    </S.Container>
  )
}

export default InputForm;
