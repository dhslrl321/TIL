import React, { Component } from 'react';
import TOC from './component/TOC';
import Content from './component/Content';
import Subject from "./component/Subject";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      homeTitle: "React",
      homeDesc: "Hello This is jang",
      contents: [
        { id: 0, title: "HTML", desc: "HTML is Hypertext Markup Language" },
        { id: 1, title: "CSS", desc: "CSS is Cascading Style Sheet" },
        { id: 2, title: "Javascript", desc: "Javascript is a Language that executed by browser" }
      ],
      selectedContentId: 0,
      handleChangePage: this.handleChangePage.bind(this)
    }
  }

  handleChangePage = (id) => {
    this.setState({ selectedContentId: id })
  }

  render() {
    const content = this.state.contents[this.state.selectedContentId];

    return (
      <div>
        <Subject title={this.state.homeTitle} desc={this.state.homeDesc} />
        <TOC
          contents={this.state.contents}
          handleChangePage={this.handleChangePage} />
        <Content title={content.title} desc={content.desc} />
      </div >
    );
  }
}

export default App;
