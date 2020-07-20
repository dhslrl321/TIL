import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  state = {
    pageName : '', // 현재 페이지를 상태 값으로 관리
  };

  componentDidMount(){
    window.onpopstate = event => { // popstate 가 발생하면 페이지를 전환
      this.onChangePage(event.state);
    }
  }

  onChangePage = pageName => { // 버튼이 클릭되면 pageName이라는 상태값을 바꿔주기 위한 메서드
    this.setState({ pageName });
  };

  onLankingClick = () => { // 랭킹 페이지 버튼 클릭
    const pageName = 'lanking';
    window.history.pushState(pageName, '', '/lanking');
    this.onChangePage(pageName);
  }

  onUserClick = () => { // 사용자 페이지 버튼 클릭
    const pageName = 'user';
    window.history.pushState(pageName, '', '/user');
    this.onChangePage(pageName);
  }

  render() {
    const { pageName } = this.state;
    return (
      <div>
        <button className="lanking" onClick={this.onLankingClick}>Lanking</button>
        <button className="user" onClick={this.onUserClick}>User</button>
        {!pageName && <Home />}
        {pageName === 'lanking' && <Lanking />}
        {pageName === 'user' && <User />}
      </div>
    );
  }
}

function Home() {
  return <h2>메인 페이지 입니다. 버튼을 클릭하세요</h2>;
}

function Lanking(){ 
  return (
    <div>
        <h2>랭킹 페이지 입니다.</h2>
        
        <br></br>
        <h4>경험치 랭킹</h4>
        <br></br>
        <ol>
          <li>사용자 3 : 44012</li>
          <li>사용자 1 : 42019</li>
          <li>사용자 5 : 20919</li>
          <li>사용자 4 : 9918</li>
        </ol>
    </div>
  );
}

function User() {
  return (
    <div>
      <h2>사용자 정보 페이지 입니다.</h2><br></br>
      <div>
        <h4>사용자 1</h4><br></br>
        사용자 1 입니다.
      </div>
      <div>
        <h4>사용자 2</h4><br></br>
        사용자 2 입니다.
      </div>
      <div>
        <h4>사용자 3</h4><br></br>
        사용자 3 입니다.
      </div>
    </div>
  );
}

export default App;

