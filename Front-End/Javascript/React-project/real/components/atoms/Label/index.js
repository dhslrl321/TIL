import React from 'react'
import * as S from './style';

const Label = ({ children, styleType }) => {
  const props = {
    styleType,
  }

  if (styleType === "PrimaryLabel") {
    return <S.PrimaryLabel {...props}>{children}</S.PrimaryLabel>;
  } else if (styleType === "SecondaryLabel") {
    return <S.SecondaryLabel {...props}>{children}</S.SecondaryLabel>;
  } else if (styleType === "PrimaryDescription") {
    return <S.PrimaryDescription {...props}>{children}</S.PrimaryDescription>;
  } else if (styleType === "SecondaryDescription") {
    return <S.SecondaryDescription {...props}>{children}</S.SecondaryDescription>;
  } else {
    return (<></>);
  }
};

export default Label;
