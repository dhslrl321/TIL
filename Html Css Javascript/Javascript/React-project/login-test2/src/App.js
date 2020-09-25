import React from 'react';
import { NavLink, Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from './page/Home';
import { Signin } from './page/Signin';
import { Signup } from "./page/Signup";
import { Todo } from './page/Todo';
import { MyPage } from './page/MyPage';
import { AuthRouter } from './components/AuthRouter';
import { NotFount } from './page/NotFound';
const App = () => {

  const authenticated = true;

  return (
    <div>
      <Router>
        <header>
          <NavLink to="/">
            HOME
          </NavLink>
          {authenticated ? (
            <NavLink to="/mypage">MYPAGE</NavLink>
          ) : (
              <span>
                <NavLink to="/sign-in">
                  SIGN-IN
                </NavLink>
                <NavLink to="/sign-up">
                  SIGN-UP
                </NavLink>
              </span>
            )}
        </header>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sign-in" component={Signin} />
          <Route path="/sign-up" component={Signup} />
          <Route path="/mypage" component={MyPage} />
          <AuthRouter
            authenticated={authenticated}
            path="/todo"
            render={props => <Todo {...props} />} />
          <Route component={NotFount} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
