import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import Info from './Info';
import App from '../App';

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