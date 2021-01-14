import React, { Component } from 'react';
import "./app.css";
import Navbar from "./Navbar";
import Main from './Main';
import useScrollPos from "./hooks/useScrollPos";
function App() {

  useScrollPos();

  return (
    <>
      <Navbar />
      <Main />
    </>
  );

}

export default App;
