import React, { Component } from 'react';
import Router from 'react-router-dom'
import TopTemplate from './components/TopTemplate';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import Info from './components/Info';
import TodoTemplate from './components/TodoTemplate'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      mode: "index"
    }
  }

  handleLoggedIn = () => {
    this.setState({ isLoggedIn: true })
  }
  handleLoggedOut = () => {
    this.setState({ isLoggedIn: false })
  }

  handleChangePage = (mode) => {
    this.setState({ mode: mode })
  }

  getContent = (page) => {
    const { isLoggedIn, mode } = this.state;
    if (mode === 'index') {
      isLoggedIn ? page = <TodoTemplate /> : page = <Index />
    } else if (mode === 'login') {
      page = <Login />
    } else if (mode === 'register') {
      page = <Register />
    } else if (mode === 'info') {
      page = <Info />
    } else {
      page = <TodoTemplate />
    }
    return page;
  }
  render() {
    const { isLoggedIn } = this.state;
    let page = null;
    page = this.getContent(page);
    return (
      <Switch>

      </Switch>
      <div>
        <TopTemplate isLoggedIn={isLoggedIn} handleChangePage={this.handleChangePage}></TopTemplate>
        {page}
      </div>
    );
  }
}

export default App;
