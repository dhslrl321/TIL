import React, { Component } from 'react';

class TOC extends Component {

  render() {
    let list = [];
    let contents = this.props.contents;

    contents.forEach(content => {
      list.push(
        <li key={content.id}>
          <a
            href={"/content/" + content.title}
            onClick={(e) => {
              e.preventDefault();
              this.props.handleChangePage(content.id);
            }}>
            {content.title}
          </a>
        </li>);
    })
    return (
      <div>
        {list}
      </div>
    );
  }
}

export default TOC;