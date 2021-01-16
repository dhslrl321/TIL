import React from 'react'
import * as S from "./styles";
import NextLink from "next/link";
const Link = ({ styleType, href, children }) => {
  const props = {
    styleType,
    href
  }
  if (styleType === "NextLink") return <NextLink {...props}><S.NextLink>{children}</S.NextLink></NextLink>
  else if (styleType === "Anchor") return <S.Anchor {...props}>{children}</S.Anchor>
  else return <> </>

}

export default Link
