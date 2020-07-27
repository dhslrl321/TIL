import React, { Component } from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import './Develop.css';
class Develop extends Component {
  render() {
    return (
      <BrowserRouter>
        <Link className="category3" to="/roadmap/develop/web-designer">웹 디자이너</Link>
        <Link className="category3" to="/roadmap/develop/web-front">웹 프론트엔드</Link>
        <Link className="category3" to="/roadmap/develop/web-back">웹 백엔드</Link>
        <Link className="category3" to="/roadmap/develop/ai-tf">인공지능(텐서플로우)</Link>
        <Link className="category3" to="/roadmap/develop/iot">IOT 개발자</Link>
        <Switch>
          <Route path="/roadmap/develop/web-designer">
            <WebDesigner />
          </Route>
          <Route path="/roadmap/develop/web-front">
            <WebFront />
          </Route>
          <Route path="/roadmap/develop/web-back">
            <WebBack />
          </Route>
          <Route path="/roadmap/develop/ai-tf">
            <AI_TF />
          </Route>
          <Route path="/roadmap/develop/iot">
            <IOTDev />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

function WebDesigner() {
  return (
    <div className="item">this is web designer</div>
  );
}

function WebFront() {
  return (
    <div className="item">this is web frontend</div>
  );
}

function WebBack() {
  return (
    <div className="item">this is web backEnd</div>
  );
}

function AI_TF() {
  return (
    <div className="item">this is web ai tensorflow</div>
  );
}
function IOTDev() {
  return (
    <div className="item">this is web iot developer</div>
  );
}
export default Develop;