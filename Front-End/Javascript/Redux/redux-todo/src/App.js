import React from 'react';
import * as S from "./App.styles";

import InputForm from "./components/InputForm";
import TodoList from './components/TodoList';

function App() {
  return (
    <S.Container>
      <S.Wrapper>
        <h1>Redux 로 배우는 Todo List</h1>
        <InputForm />
        <TodoList />
      </S.Wrapper>
    </S.Container>
  );
}

export default App;
