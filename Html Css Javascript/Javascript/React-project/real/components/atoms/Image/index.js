import React from 'react'
import * as S from "./style";
const Image = ({ styleType, src }) => {
  const props = {
    styleType,
    src
  }

  if (styleType === "Picture") {
    return <S.Picture {...props} />
  } else if (styleType === "Icon") {
    return <S.Icon {...props} />
  }
}

export default Image
