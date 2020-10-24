import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import Signup from "../pages/signup/SignupContainer";
import Signin from "../pages/signin/SigninContainer";
import MyPage from "../pages/mypage/MyPageContainer";
import Home from "../pages/home/HomeContainer";

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
        <Route path="/mypage" component={MyPage} />
      </Switch>
    </Router>
  );
}

export default Header;