import React, { useState } from 'react'
import * as S from "./styles";
import Dropdown from '../Dropdown';
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { FaBars } from "react-icons/fa";

const Navbar = ({ toggle }) => {

  const [dropdown, setDropdown] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(true)

  const menuMouseOver = () => {
    setDropdown(true);
  }

  const menuMouseLeave = () => {
    setDropdown(false);
  }

  useScrollPosition(({ prevPos, currPos }) => {
    const isShow = currPos.y > prevPos.y
    if (isShow !== hideOnScroll) setHideOnScroll(isShow)
  }, [hideOnScroll])


  return (
    <S.Header>
      <S.HeaderWrapper show={hideOnScroll}>
        <S.TitleColumn>
          <li><S.Link href="/">Jangwonik</S.Link></li>
        </S.TitleColumn>
        <S.MobileIcon onClick={toggle}>
          <FaBars />
        </S.MobileIcon>
        <S.LinkColumn onMouseOver={menuMouseOver} onMouseLeave={menuMouseLeave}>
          {dropdown && <Dropdown show={dropdown} />}

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
