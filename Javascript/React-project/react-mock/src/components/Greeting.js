import React, { Component } from 'react'

class Greeting extends Component {

    state = {
        name: this.props.name,
        phone: this.props.phone
    }

    render() {
        return (
            <div> 
                Hello mr. {this.state.name}. welcome to my page<br></br>
                your phone number is {this.state.phone}
            </div>
        );
    }
}

export default Greeting;