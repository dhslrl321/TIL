import React, { Component } from 'react';
import "./app.css";
import Navbar from "./Navbar";
import Main from './Main';
class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Main />
      </>
    );
  }
}

export default App;
