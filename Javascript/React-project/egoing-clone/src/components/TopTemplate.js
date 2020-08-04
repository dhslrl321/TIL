import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom'

class TopTemplate extends Component {


  loginControl = (isLoggedIn, handleChangePage) => {
    return isLoggedIn ? <UserMenu handleChangePage={handleChangePage} /> : <GuestMenu handleChangePage={handleChangePage} />
  }

  render() {
    const { isLoggedIn, handleChangePage } = this.props;
    return (
      <div>
        <BrowserRouter>
          <Link to="/" onClick={() => {
            handleChangePage("index");
          }}>Home</Link>
          {this.loginControl(isLoggedIn, handleChangePage)}
          <Route path="/login">
            asdf
          </Route>
        </BrowserRouter>
      </div>
    );
  }
}

function GuestMenu(props) {
  return (
    <span>
      <Link to="/login" onClick={() => {
        props.handleChangePage("login");
      }}>Login</Link>
      <Link to="/register" onClick={() => {
        props.handleChangePage("register");
      }}>Join</Link>
    </span>
  );
}

function UserMenu(props) {
  return (
    <Link to="/info" onClick={() => {
      props.handleChangePage("info");
    }}>Member</Link>
  );
}


export default TopTemplate;