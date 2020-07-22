import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render(){
    return ( 
      <SayHello name="jang"></SayHello>
    );
  }
}

function SayHello(props){
  return(
    <div>
      {props.name}
    </div>
  );
}

export default App;

