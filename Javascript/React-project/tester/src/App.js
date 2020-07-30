import React, { Component } from 'react';
import TOC from './component/TOC';
import Content from './component/Content';
import Subject from './component/Subject';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "welcome",
      selected_content_id: 2,
      welcome: { title: "welcome", content: "Hello React" },
      subject: { title: "web", sub: "World wide web" },
      content: [
        { id: 1, title: "html", desc: "html is for information" },
        { id: 2, title: "css", desc: "html is for information" },
        { id: 3, title: "javascript", desc: "html is for information" }
      ]
    }
  }

  render() {

    let _title, _desc = null;

    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read') {
      let i = 0;
      while (i < this.state.content.length) {
        let data = this.state.content[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1
      }
    }
    return (
      <div>
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            console.log("변경 전 : ", this.state.mode)
            this.setState({
              mode: "welcome"
            })
            console.log("변경 후 : ", this.state.mode);
          }.bind(this)} />

        <TOC
          data={this.state.content}
          onChangePage={function (id) {
            this.setState({ mode: "read", selected_content_id: Number(id) })
          }.bind(this)} />

        <Content title={_title} desc={_desc} />
      </div>
    );
  }
}

export default App;
