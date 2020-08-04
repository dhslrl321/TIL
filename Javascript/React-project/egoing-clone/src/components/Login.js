import React, { Component } from 'react';


class Login extends Component {

  render() {
    return (
      <div>
        <form>
          <div>로그인</div>
          <div>
            <label>id : </label>
            <input type="text" />
          </div>
          <div>
            <label>pw : </label>
            <input type="password" />
          </div>
          <input type="submit" value="로그인" />
        </form>
      </div>
    );
  }
}

export default Login;