import React, { Component } from 'react';
import axios from 'axios';


class Forum extends Component {

  state = {
    data: ''
  }

  componentDidMount() {
    this.getTestJson();
  }
  render() {
    const { data } = this.state;
    return (
      <div> {data.data}</div>
    );
  }
}

export default Forum;