import React, { Component } from 'react';
import './Login.css';
import KakaoLogin from './KakaoLogin';
import GithubLogin from './GithubLogin';
import LoginForm from './LoginForm';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  handleEmail = (e, email) => {
    this.setState = {
      email: email
    }
    console.log("target: ", e.target.value);
    console.log("email state: ", this.state.email);
  }

  handlePassword = (e) => {
    e.preventDefault();
    this.setState = {
      password: e.target.value
    }
    console.log(e.target.value);
  }
  handleLogin = e => {
    e.preventDefault();
    const data = this.state;
    console.log(data.email);
  }
  render() {
    return (
      <section>
        <div className="container">
          <label className="intro">Welcome to ROCX</label>
          <LoginForm handleEmail={this.handleEmail} handlePassword={this.handlePassword}></LoginForm>


          <div className="button-container">
            <KakaoLogin></KakaoLogin>
            <GithubLogin></GithubLogin>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;