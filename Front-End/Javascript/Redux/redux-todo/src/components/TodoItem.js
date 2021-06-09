import React from 'react'

import * as S from "./TodoItem.styles";

const TodoItem = ({ id, title, isComplete }) => {
  return (
    <S.Container>
      {id} : {title} : {isComplete}
    </S.Container>
  )
}

export default TodoItem
