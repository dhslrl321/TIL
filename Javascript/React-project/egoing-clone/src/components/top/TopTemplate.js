import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom'
import Login from '../login/Login';
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


        </BrowserRouter>
      </div>
    );
  }
}
function GuestMenu() {
  return (
    <span>
      <Link to="/login">Login</Link>
      <Link to="/join">Join</Link>


    </span>
  );
}

function UserMenu() {
  return (
    <Link to="/info">Member</Link>
  );
}


export default TopTemplate;