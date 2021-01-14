import React, { useState } from 'react'
import * as S from "./styles";
import Dropdown from '../Dropdown';
const Navbar = () => {

  const [dropdown, setDropdown] = useState(false);
  const menuMouseOver = () => {
    setDropdown(true);
  }

  const menuMouseLeave = () => {
    setDropdown(false);
  }

  return (
    <S.Header>
      <S.HeaderWrapper>
        <S.TitleColumn>
          <li><S.Link href="/">Jangwonik</S.Link></li>
        </S.TitleColumn>
        <S.LinkColumn onMouseOver={menuMouseOver} onMouseLeave={menuMouseLeave}>
          {dropdown && <Dropdown dropdown={dropdown} />}
          <S.LinkItem>
            <S.Link href="https://github.com/dhslrl321">Github</S.Link>
          </S.LinkItem>
          <S.LinkItem>
            <S.Link href="https://wonit.tistory.com/">Tech Blog</S.Link>
          </S.LinkItem>
          <S.LinkItem>
            <S.Link href="https://www.youtube.com/channel/UC-y9guKVBIwWDZ1HpwcWu6A">Youtube</S.Link>
          </S.LinkItem>
        </S.LinkColumn>
      </S.HeaderWrapper>
    </S.Header>
  )
}

export default Navbar
