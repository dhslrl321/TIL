import React from 'react';
import LoginForm from '../components/LoginForm';
import LoginButton from "../components/LoginButton";
import { useUserData } from "../context/context";
const Signin = () => {
  const { username, email, authenticated } = useUserData();
  return (
    <div>
      <LoginForm />
      <LoginButton />
    </div>
  );
}

export default Signin;