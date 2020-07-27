import React, { Component } from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import './Security.css';
class Security extends Component {
  render() {
    return (
      <BrowserRouter>
        <Link className="category3" to="/roadmap/security/penetration">모의 해킹</Link>
        <Link className="category3" to="/roadmap/security/consultant">보안 컨설턴트</Link>
        <Link className="category3" to="/roadmap/security/solution">보안 솔루션</Link>
        <Link className="category3" to="/roadmap/security/monitor">보안 관제</Link>
        <Switch>
          <Route path="/roadmap/security/penetration">
            <PenetrationExpert />
          </Route>
          <Route path="/roadmap/security/consultant">
            <SecurityConsultant />
          </Route>
          <Route path="/roadmap/security/solution">
            <Solution />
          </Route>
          <Route path="/roadmap/security/monitor">
            <Monitor />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

function PenetrationExpert() {
  return (
    <div className="item">this is 모의 해킹 전문가</div>
  );
}

function SecurityConsultant() {
  return (
    <div className="item">this is 보안 컨설턴트</div>
  );
}

function Solution() {
  return (
    <div className="item">this is 보안 솔루션 개발자</div>
  );
}

function Monitor() {
  return (
    <div className="item">this is w보안 관제</div>
  );
}
export default Security;