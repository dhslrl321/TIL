import React, { Component } from 'react';
import './App.css';
import PhoneForm from './components/PhoneForm';
import Greeting from './components/Greeting';

class App extends Component {

  state = {
    name: '',
    phone: ''
  }

  handleCreate = (data) => {
    console.log(data)
    this.setState({
      name: data.name,
      phone: data.phone
    })
  }
  
  render(){
    return ( 
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <Greeting name={this.state.name} phone={this.state.phone}></Greeting>
      </div>
    );
  }
}




export default App;

