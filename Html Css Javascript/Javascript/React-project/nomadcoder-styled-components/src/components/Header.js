import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";


export const Header = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/join">Join</Link>
    </>
  );
}