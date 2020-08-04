import React, { Component } from 'react';
class Register extends Component {

  render() {
    return (
      <div>
        <form>
          <div>회원가입</div>
          <div>
            <label>아이디 : </label>
            <input type="text" />
          </div>
          <div>
            <label>비밀번호 : </label>
            <input type="password" />
          </div>
          <div>
            <label>비밀번호 확인 : </label>
            <input type="password" />
          </div>
          <div>
            <label>Email : </label>
            <input type="password" />
          </div>
          <input type="submit" value="회원가입" />
        </form>
      </div>
    );
  }
}

export default Register;