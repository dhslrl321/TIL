import React, { Component } from 'react'

class Subject extends Component { 
    render() {
      return (
        <header>
          <h1><a href="/" onClick={function(e){
            this.setState({
              mode:"welcome"
            })
          }.bind(this)}>{this.props.title}</a></h1>
        
          {this.props.sub}
        </header>
      );
    }
  }
export default Subject;