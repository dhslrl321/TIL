import React from 'react'
import * as S from "./styles";

const Dropdown = ({ data }) => {
  return (
    <S.Container>
      {data.map(data =>
        <S.DropdownItem className="item">
          {data.name}
        </S.DropdownItem>)}
    </S.Container>
  )
}

export default Dropdown
