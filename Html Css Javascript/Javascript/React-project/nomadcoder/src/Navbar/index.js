import React, { useState, useEffect, useRef } from 'react'
import * as S from "./styles";
import Dropdown from '../Dropdown';

const isBrowser = typeof window !== `undefined`

function getScrollPosition() {
  if (!isBrowser) return { x: 0, y: 0 }

  const position = document.body.getBoundingClientRect()

  return { x: window.scrollX, y: window.scrollY }
  // : { x: position.left, y: position.top }
  // ? 
  // : 
}

const Navbar = () => {

  const [dropdown, setDropdown] = useState(false);
  const menuMouseOver = () => {
    setDropdown(true);
  }

  const menuMouseLeave = () => {
    setDropdown(false);
  }

  const position = useRef(getScrollPosition());
  console.log("position: ", position.current.y);


  return (
    <S.Header>
      <S.HeaderWrapper>
        <S.TitleColumn>
          <li><S.Link href="/">Jangwonik</S.Link></li>
        </S.TitleColumn>
        <S.LinkColumn onMouseOver={menuMouseOver} onMouseLeave={menuMouseLeave}>
          {dropdown && <Dropdown />}
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
