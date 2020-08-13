import React, { Component } from 'react';
import { Link, Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { Home, About, Users, NotFound } from './page/Index';

class App extends Component {
  render() {
    return (
      <Router>
        <header>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/about">
            <button>About</button>
          </Link>
          <Link to="/users">
            <button>Users</button>
          </Link>
        </header>
        <hr />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/users" component={Users} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
