import React from "react";
import * as S from "./style";

const My = ({ children, title, subtitle, paragraph }) => {
  const props = {
    title,
    subtitle,
    paragraph
  }
  return (
    <S.My {...props}>{children}</S.My>
  )
}

export default My;