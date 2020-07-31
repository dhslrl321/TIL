import React, { Component } from 'react';

class Subject extends Component {

  render() {
    return (
      <div>
        <h1>
          <a href="/">{this.props.title}</a>
        </h1>

        <div>{this.props.desc}</div>
      </div>
    );
  }
}

export default Subject;