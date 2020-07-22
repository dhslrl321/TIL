import React, { Component } from 'react';
import './App.css';
import PhoneForm from './components/PhoneForm';

class App extends Component {

  handleCreate = (data) => {
    console.log(data);
  }
  
  render(){
    return ( 
      <div>
        <PhoneForm />
      </div>
    );
  }
}




export default App;

