import React, { Component } from 'react';
import UserGreeting from './UserGreeting';

class GreetingTemplate extends Component {


    render(){
        return (
            <div>
                <UserGreeting firstName="Jang" lastName="won ik"></UserGreeting>
                <UserGreeting firstName="Heo" lastName="Hye jin"></UserGreeting>
            </div>
        );
    }
}

export default GreetingTemplate;