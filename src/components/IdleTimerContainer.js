import React, {Component} from 'react';
import IdleTimer from 'react-idle-timer'
import {  withRouter } from 'react-router-dom';

export class IdleTimerContainer extends Component {
    
    constructor(props){
        super(props)
        this.idleTimerRef = React.createRef(null)
    }

    render() {
        console.log(this.props);
        const onIdle = () =>{
        
            this.props.history.push('/logout')
        }
        return (
            <div>
        <IdleTimer ref={this.idleTimerRef} timeout={3600 * 1000} onIdle={onIdle}></IdleTimer>
            </div>
          )
    }
}

export default withRouter(IdleTimerContainer)

