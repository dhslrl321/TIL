import React from 'react';
import { Todo } from './Todo';
import { Route, NavLink, Switch } from 'react-router-dom';

export const Home = ({ authenticated }) => {

  return (
    <div>
      <NavLink to="/todo">
        <button> 나만의 멋진 Todo List 생성하기</button>
      </NavLink>
    </div>
  );
}