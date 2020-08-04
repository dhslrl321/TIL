import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom'
import Login from '../login/Login';
import Register from '../register/Register';
import Info from '../info/Info';
import App from '../../App';

class TopTemplate extends Component {


  loginControl = (isLoggedIn) => {
    return isLoggedIn ? <UserMenu /> : <GuestMenu />
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <BrowserRouter>
          <Link to="/">Home</Link>
          {this.loginControl(isLoggedIn)}

          <Switch>
            <Route exact path="/">
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/info">
              <Info />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
function GuestMenu() {
  return (
    <span>
      <Link to="/login">Login</Link>
      <Link to="/register">Join</Link>


    </span>
  );
}

function UserMenu() {
  return (
    <Link to="/info">Member</Link>
  );
}


export default TopTemplate;