import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  componentDidMount(){
    window.onpopstate = function(event) {
      this.console.log(`location: ${document.location}, state: %{event.state}`);
    }
  }
  render() {
    
    return (
      
    );
  }
}

export default App;
