import React from 'react'
import * as S from "./style";
const Title = ({ children, styleType }) => {
  const props = {
    styleType,
  }
  if (styleType === "MainTitle") {
    return (<S.MainTitle {...props}>{children}</S.MainTitle>);
  } else if (styleType === "SubTitle") {
    return (<S.SubTitle {...props}>{children}</S.SubTitle>);
  } else {
    return (<></>);
  }

}

export default Title;
