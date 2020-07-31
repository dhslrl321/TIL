import React, { Component } from 'react';

class Content extends Component {

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </div>
    );
  }
}
export default Content;