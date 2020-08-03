import React, { Component } from 'react';
import TopTemplate from './components/top/TopTemplate';


class App extends Component {

  render() {
    return (
      <div>
        <TopTemplate></TopTemplate>
        <main>
          Main Contents
        </main>
      </div>
    );
  }
}

export default App;
