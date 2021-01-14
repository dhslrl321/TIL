import React, { useState } from 'react'
import * as S from "./styles";
const Navbar = () => {

  const [menuActivation, setMenuActivation] = useState(false);

  const menuMouseOver = () => {
    setMenuActivation(!menuActivation);
    console.log("마우스 오버", menuActivation);
  }

  const menuMouseLeave = () => {
    setMenuActivation(!menuActivation);
    console.log("마우스 리브", menuActivation);
  }

  return (
    <S.Header>
      <S.HeaderWrapper>
        <S.TitleColumn>
          <li><S.Link href="/">Jangwonik</S.Link></li>
        </S.TitleColumn>
        <S.LinkColumn onMouseOver={menuMouseOver} onMouseLeave={menuMouseLeave}>
          <S.LinkItem>
            <S.Link href="https://github.com/dhslrl321">Github</S.Link>
          </S.LinkItem>
          <S.LinkItem>
            <S.Link href="https://wonit.tistory.com/">Tech Blog</S.Link>
          </S.LinkItem>
          <S.LinkItem>
            <S.Link href="https://www.youtube.com/channel/UC-y9guKVBIwWDZ1HpwcWu6A">Youtube</S.Link>
          </S.LinkItem>
          <S.HiddenMenu onMouseOver={menuMouseOver} onMouseLeave={menuMouseLeave} menuActivation={menuActivation}>asdf</S.HiddenMenu>
        </S.LinkColumn>
      </S.HeaderWrapper>
    </S.Header>
  )
}

export default Navbar
