import React, { useState } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Home } from './page/Home';
import { NotFound } from './page/NotFound';
import { Profile } from './page/Profile';
import { signIn } from "./auth";
import { About } from './page/About';
import { AuthRoute } from './components/AuthRoute';
import Logout from './page/Logout';
import { Login } from './page/Login';

function App() {

  const [user, setUser] = useState(null); // state process
  const authenticated = user != null; // logout 하면 null;

  const login = ({ email, password }) => setUser(signIn({ email, password }));
  const logout = () => setUser(null);

  return (
    <Router>
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
        <Link to="/profile">
          <button>Profile</button>
        </Link>

        {authenticated ? (
          <div>
            <Logout logout={logout} />
          </div>
        ) :
          (<Link to="/login">
            <button>Login</button>
          </Link>
          )}
      </header>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route
          path="/login"
          render={props => (
            <Login
              authenticated={authenticated}
              login={login} {...props} />
          )} />
        <AuthRoute
          authenticated={authenticated}
          path="/profile"
          render={props => <Profile user={user} {...props} />}
        />

        <Route component={NotFound} />
      </Switch>

    </Router>
  );
}

export default App;
