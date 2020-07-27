import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Develop from './Develop';
import './Roadmap.css';

class Roadmap extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Link to="/roadmap/develop">개발</Link>
          <Link to="/roadmap/security">보안</Link>

          <Switch className="category1">
            <Route path="/roadmap/develop">
              <Develop />
            </Route>
            <Route path="/roadmap/security">

            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default Roadmap;