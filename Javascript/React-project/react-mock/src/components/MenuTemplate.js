import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Carrer from './MenuTemplate/Carrer';
import Forum from './MenuTemplate/Forum';
import Roadmap from './MenuTemplate/Roadmap';
import People from './MenuTemplate/People';


class MenuTemplate extends Component {
  render() {
    return (
      <header>
        <BrowserRouter>
          <Link to="/roadmap">로드맵</Link>
          <Link to="/carrer">커리어 업</Link>
          <Link to="/forum">포럼</Link>
          <Link to="/people">People</Link>

          <Switch>
            <Route path="/roadmap">
              <Roadamp />
            </Route>

            <Route path="/carrer">
              <Carrer />

            </Route>
            <Route path="/forum">
              <Forum />
            </Route>
            <Route path="/people">
              <People />
            </Route>
          </Switch>
        </BrowserRouter>
      </header>
    );
  }
}

export default MenuTemplate;