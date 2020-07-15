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
      welcome: {title:"welcome", desc:"hello React!!"},
      data : [
        {id:1, title:"HTML", content:"HTML is Hypertext Markup Language"},
        {id:2, title:"CSS", content:"Css is for style"},
        {id:3, title:"Javascript", content:"Javascript is for dynamic Web"}
      ]
    }
  }
  render() {
    let _title = null;
    let _sub = null
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _sub = this.state.welcome.desc;
    }else if(this.state.mode === 'read'){
      _title = this.state.data[0].title;
      _sub = this.state.data[0].desc;
    }
    return (
      <div>
        <Subject
          title={_title}
          sub={_sub}>
          </Subject>
        <TOC data={this.state.data}></TOC>
        <Content title="HTML" sub="Html is HyperTextmarkupLanguage..."></Content>
      </div>
    );
  }
}

export default App;
