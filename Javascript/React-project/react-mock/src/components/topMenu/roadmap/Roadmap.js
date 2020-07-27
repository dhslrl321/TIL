import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Develop from './Develop';
import Security from './Security';
import './Roadmap.css';

class Roadmap extends Component {

  render() {
    return (
      <div className="category1">
        <BrowserRouter>
          <Link className="category1" to="/roadmap/develop">개발</Link>
          <Link className="category1" to="/roadmap/security">보안</Link>

          <Switch>
            <Route path="/roadmap/develop">
              <br></br><Develop />
            </Route>
            <Route path="/roadmap/security">
              <br></br><Security />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default Roadmap;