import React, {Component} from 'react';

class UserGreeting extends Component {

    constructor(props){
        super(props);
        this.state {
            names : this.props.firstName + this.props.lastName;
        }
    }

    render() {
        return (
            <section>
                <div>{this.state.names}</div>
            </section>
        );
    }
}

export default UserGreeting;