import React, {Component} from 'react';

class UserGreeting extends Component {

    constructor(props){
        super(props);
        this.state = {
            name : "",
            names : this.props.firstName + this.props.lastName
        }
    }

    toFullSencentence(){
        this.setState(this.state.names + "입니다");
    }

    render() {
        this.setState((state, props) => {
            name : this.state.names + "입니다"
        });
        return (
            <section>
                <div>{this.state.names}</div>
            </section>
        );
    }
}

export default UserGreeting;