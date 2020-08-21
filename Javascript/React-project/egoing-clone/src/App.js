import React from 'react';
import { Link, Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './page/Home';
import About from './page/About';
import NotFound from './page/NotFound'
import Login from './page/Login';


function App() {

  return (
    <Router>
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </header>
      <hr />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </Router>
  );
}


export default App;
