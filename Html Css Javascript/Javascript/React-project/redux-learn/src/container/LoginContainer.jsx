import React from "react";
import Login from "../components/Login";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../modules/user";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => ({
    username: state.user.username,
    password: state.user.password,
    token: state.user.token,
  }));
  console.log(userData);

  const onLogin = (username, password) => {
    dispatch(setUser(username, password));
    dispatch(setToken("SUCCESSFULLYLOGEDIN"));
  };

  return <Login user={userData} onLogin={onLogin} />;
};

export default LoginContainer;
