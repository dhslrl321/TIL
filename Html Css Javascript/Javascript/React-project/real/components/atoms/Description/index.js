import React from 'react'
import * as S from "./style";

const Description = ({ styleType, children }) => {
  const props = {
    styleType,
  }
  if (styleType === "PrimaryDescription") {
    return <S.PrimaryDescription {...props}>{children}</S.PrimaryDescription>
  } else if (styleType === "SecondaryDescription") {
    return <S.SecondaryDescription {...props}>{children}</S.SecondaryDescription>
  }

}

export default Description
