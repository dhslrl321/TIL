import React, { Component } from 'react';
import './App.css';
import { Router } from 'react-router-dom';

class App extends Component {
  render(){
    return (
      <Router>
        <div>
          <Router path="/home">
            Home Page
          </Router>

          <Router path="/user">
            User Page
          </Router>
        </div>
      </Router>
    );
  }
}

export default App;

