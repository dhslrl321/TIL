import React from 'react';
import * as S from "./App.styles";

import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./modules/user";

import InputForm from "./components/form/InputForm";
import TodoList from './components/todo/TodoList';
import Navigation from './components/navigation/Navigation';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const user = {
      id: 1004,
      nickname: "James",
      profileImage: "http://k.kakaocdn.net/dn/boEp6l/btq6MTNzPgH/mVE7m02pyxfoMLZIb0iJQK/img_640x640.jpg",
    };

    dispatch(setUser(user));
    // dispatch(clearUser());
  }, [])

  return (
    <S.Container>
      <Navigation />
      <S.Wrapper>
        <h1>Redux 로 배우는 Todo List</h1>
        <InputForm />
        <TodoList />
      </S.Wrapper>
    </S.Container>
  );
}

export default App;
