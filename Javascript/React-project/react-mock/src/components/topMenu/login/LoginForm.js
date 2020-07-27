import React, { Component } from 'react';
import './LoginForm.css';

class LoginForm extends Component {
  state = { email: '', password: '' }

  handleEmail = e => {
    this.setState({ email: e.target.value })
  }

  handlePassword = e => {
    this.setState({ password: e.target.value })
  }

  handleLogin = e => {
    // 로그인 통신 로직 구현
    if (this.state.email === 'admin' && this.state.password === 'admin') {
      console.log("hello admin");
      alert("hello admin");
    } else {
      alert("check your info");
    }
  }

  render() {
    return (
      <div>
        <label><b>이메일</b></label>
        <input type="text" onChange={this.handleEmail} placeholder="Please Enter your email" required />

        <label><b>비밀번호</b></label>
        <input type="password" onChange={this.handlePassword} placeholder="Plaese Enter your password" required />
        <div className="findPw">
          <a href="/">비밀번호</a>를 잊으셨나요?
        </div>
        <button className="button__login" onClick={this.handleLogin}>로그인</button>
      </div>
    );
  }
}

export default LoginForm;