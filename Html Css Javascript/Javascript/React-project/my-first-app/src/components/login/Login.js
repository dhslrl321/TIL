import React, { Component } from "react"


class Login extends Component {
    render(){
        return (
            <div className="login-wrapper">
                아이디 : <input type="text"/><br></br>
                비밀번호 : <input type="password"/><br></br>
                <input type="button" value="로그인 버튼"/>
            </div>
        );
    }
}
export default Login;