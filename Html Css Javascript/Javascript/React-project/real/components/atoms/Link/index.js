import React from 'react'
import * as S from "./styles";
import NextLink from "next/link";
import { Link } from "react-scroll";
const Link = ({ styleType, children, href, to }) => {
  const props = {
    href
  }
  if (styleType === "NextLink") return <NextLink href={href}><S.NextLink>{children}</S.NextLink></NextLink>;
  else if (styleType === "Anchor") return <S.Anchor href={href}>{children}</S.Anchor>
  else return <></>

}

export default Link
