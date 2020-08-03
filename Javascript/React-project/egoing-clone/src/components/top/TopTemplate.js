import React, { Component } from 'react';
//import { BrowserRouter, Link } from 'react-router-dom'

class TopTemplate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

  loginControl = (isLoggedIn) => {
    isLoggedIn ? <User /> : <Guest />
  }
  render() {

    return (
      <div>
        <Link to="/">Home</Link>
        {loginControl}
      </div>
    );

  }
}

function Guest() {
  return (
    <Link to="/login">Login</Link>
    <Link to="/join">Join</Link>
  );
}

function User() {
  return (
    <Link to="/info">Member</Link>
  );
}


export default TopTemplate;