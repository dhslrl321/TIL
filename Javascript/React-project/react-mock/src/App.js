import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <ul>
          <li>
            <Link to="Home"><button>home</button></Link>
          </li>

          <li>
            <Link to="About"><button>About</button></Link>
          </li>
          
          <li>
            <Link to="Dashboard"><button>Dashboard</button></Link>
          </li>
        </ul>
        <Switch>
          <Route path="/Home">
            <Home />
          </Route>

          <Route path="/About">
            <About />
          </Route>

          <Route path="/Dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

function Home(){
  return (
    <div>
      이 곳은 홈 페이지 입니당.
    </div>
  );
}

function About() {
  return (
    <div>
      우리 사이트는 React를 편하게 사용하기 위해서 진입 장벽을 낮춰주는 사이트 입니다.
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      이 곳은 질문을 하는 게시판 입니당.
    </div>
  );
}
export default App;

