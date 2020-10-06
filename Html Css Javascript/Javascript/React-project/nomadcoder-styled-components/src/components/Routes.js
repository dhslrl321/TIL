import React from 'react';
import { Switch, Route } from "react-router-dom";
import Join from './Join';
import Login from './Login';
import Home from './Home';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/join" component={Join} />
    </Switch>
  );
}