import React, { Component } from 'react';
import './App.css';
import Subject from './components/Subject'
import Content from './components/Content'
import TOC from './components/TOC'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      subject: { title: "Web", sub:"world wide web"},
      data : [
        {id:1, title:"HTML", content:"HTML is Hypertext Markup Language"},
        {id:2, title:"CSS", content:"Css is for style"},
        {id:3, title:"Javascript", content:"Javascript is for dynamic Web"}
      ]
    }
  }
  render() {
    return (
      <div>
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}>
          </Subject>
        <TOC data={this.state.data}></TOC>
        <Content title="HTML" sub="Html is HyperTextmarkupLanguage..."></Content>
      </div>
    );
  }
}

export default App;
