import React from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Join from "../pages/Join";

const Header = () => {
  return (
    <>
      <BrowserRouter>
        <Link exact to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/join">Join</Link>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/join" component={Join} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Header;

