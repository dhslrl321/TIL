import React, { useState } from 'react';
import { Link, Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Home from "./page/Home";
import About from "./page/About";
import NotFound from "./page/NotFound";
import Profile from './page/Profile';
import { signIn } from './config/Auth';


function App() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

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
      </header>
      <hr />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </Router>
  );
}


export default App;
