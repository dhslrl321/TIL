import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Carrer from './topMenu/carrer/Carrer';
import Forum from './topMenu/forum/Forum';
import Roadmap from './topMenu/roadmap/Roadmap';
import People from './topMenu/people/People';
import Login from './topMenu/login/Login';
import Register from './topMenu/register/Register';
import Home from './topMenu/home/Home';
import './MenuTemplate.css';


class MenuTemplate extends Component {
  render() {
    return (
      <header>
        <BrowserRouter>
          <div className="top-menu">
            <Link className="index" to="/">Rocx</Link>
            <Link className="roadmap" to="/roadmap">로드맵</Link>
            <Link className="carrer" to="/carrer">커리어 업</Link>
            <Link className="forum" to="/forum">포럼</Link>
            <Link className="people" to="/people">People</Link>
            <Link className="login" to="/login">Login</Link>
            <Link className="register" to="/register">Join</Link>
          </div>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/roadmap">
              <Roadmap />
            </Route>

            <Route path="/carrer">
              <Carrer />
            </Route>

            <Route path="/forum">
              <Forum />
            </Route>

            <Route path="/people">
              <People />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </BrowserRouter>
      </header>
    );
  }
}

export default MenuTemplate;