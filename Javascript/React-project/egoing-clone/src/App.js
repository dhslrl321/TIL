import React, { Component } from 'react';
import TopTemplate from './components/top/TopTemplate';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

  handleLoggedIn = () => {
    this.setState({ isLoggedIn: true })
  }
  handleLoggedOut = () => {
    this.setState({ isLoggedIn: false })
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <div>
        <TopTemplate isLoggedIn={isLoggedIn}></TopTemplate>
        <main>
          Main Contents
        </main>
      </div>
    );
  }
}

export default App;
