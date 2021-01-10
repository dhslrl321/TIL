import React from 'react'
import * as S from './style';

const Label = ({ children, styleType }) => {
  const props = {
    styleType,
  }

  if (styleType === "FirstLabel") {
    return <S.FirstLabel {...props}>{children}</S.FirstLabel>;
  } else if (styleType === "SecondLabel") {
    return <S.SecondLabel {...props}>{children}</S.SecondLabel>;
  } else if (styleType === "ThirdLabel") {
    return <S.ThirdLabel {...props}>{children}</S.ThirdLabel>;
  } else if (styleType === "FourthLabel") {
    return <S.FourthLabel {...props}>{children}</S.FourthLabel>;
  } else {
    return (<></>);
  }
};

export default Label;
