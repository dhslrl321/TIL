import * as S from "./Navigation.styles";

import { BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";
import Profile from "./Profile";

const Navigation = () => {

  const user = useSelector(state => state.userReducer);
  console.log(user);

  const loggedInComponent = user ? (
    <>
      <Profile />
      <BiChevronDown />
    </>) : (
      <>
        <S.NavItem>로그인</S.NavItem>
        <S.NavItem>회원 가입</S.NavItem>
      </>
    );
  return (
    <S.Container>
      <S.ColumnWrapper>
        <S.NavColumn>
          <S.NavItem>My-Todo</S.NavItem>
        </S.NavColumn>
        <S.NavColumn>
          <S.NavItem>About Us</S.NavItem>
          <S.NavItem>Dashboard</S.NavItem>
          <S.NavItem>Dashboard</S.NavItem>
        </S.NavColumn>
        <S.NavColumn>
          {loggedInComponent}
        </S.NavColumn>
      </S.ColumnWrapper>
    </S.Container>
  )
}

export default Navigation
