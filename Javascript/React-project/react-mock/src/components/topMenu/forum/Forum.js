import React, { Component } from 'react';
import axios from 'axios';


class Forum extends Component {

  state = {
    data: ''
  }
  getTestJson = () => {
    const { data } = await axios.get("http://localhost:8080/api/board").then
    this.setState({
      data: data
    })
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