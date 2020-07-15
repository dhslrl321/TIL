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
      mode: "welcome",
      welcome: {title: "web", sub:"hello react"},
      data : [
        {id:1, title:"HTML", content:"HTML is Hypertext Markup Language"},
        {id:2, title:"CSS", content:"Css is for style"},
        {id:3, title:"Javascript", content:"Javascript is for dynamic Web"}
      ]
    }
  }
  render() {
    let _title, _sub = null;
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _sub = this.state.welcome.sub;
    }else if(this.state.mode === this.state.data[0].title){
      _title = this.state.data[0].title;
      _sub = this.state.data[0].content;
    }else if(this.state.mode === this.state.data[1].title){
      _title = this.state.data[1].title;
      _sub = this.state.data[1].content;
    }else if(this.state.mode === this.state.data[2].title){
      _title = this.state.data[2].title;
      _sub = this.state.data[2].content;
    }
    return (
      <div>
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}>
          </Subject>
        <TOC data={this.state.data}></TOC>
        <Content title={_title} sub={_sub}></Content>
        {this.state.mode}
      </div>
    );
  }
}

export default App;
