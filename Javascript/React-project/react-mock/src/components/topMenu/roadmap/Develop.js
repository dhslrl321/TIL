import React, { Component } from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
class Develop extends Component {
  render() {
    return (
      <BrowserRouter>
        <Link to="web-designer">웹 디자이너</Link>
        <Link to="web-front">웹 프론트엔드</Link>
        <Link to="web-back">웹 백엔드</Link>
        <Link to="ai-tf">인공지능(텐서플로우)</Link>
        <Link to="iot">IOT 개발자</Link>
        <Switch>
          <Route path="web-designer">
            <WebDesigner />
          </Route>
          <Route path="web-front">
            <WebFront />
          </Route>
          <Route path="web-back">
            <WebBack />
          </Route>
          <Route path="ai-tf">
            <AI_TF />
          </Route>
          <Route path="iot">
            <IOTDev />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

function WebDesigner() {
  return (
    <div>this is web designer</div>
  );
}

function WebFront() {
  return (
    <div>this is web frontend</div>
  );
}

function WebBack() {
  return (
    <div>this is web backEnd</div>
  );
}

function AI_TF() {
  return (
    <div>this is web ai tensorflow</div>
  );
}
function IOTDev() {
  return (
    <div>this is web iot developer</div>
  );
}
export default Develop;