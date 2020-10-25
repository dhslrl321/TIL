import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";


const Header = () => {

  return (
    <Router>
      <div>
        <Link exact to="/">HOME</Link>
        <Link to="/sign-in">Sign In</Link>
        <Link to="/sign-up">Sign Up</Link>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sign-in" component={Signin} />
        <Route path="/sign-up" component={Signup} />
      </Switch>
    </Router>
  );
}

export default Header;