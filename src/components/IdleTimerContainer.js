import React, {Component} from 'react';
import IdleTimer from 'react-idle-timer'
import {  withRouter } from 'react-router-dom';
import trackHistory from '../actions/trackHistory'
import {connect} from 'react-redux'
import {compose, bindActionCreators}  from "redux"


export class IdleTimerContainer extends Component {
    
    constructor(props){
        super(props)
        this.idleTimerRef = React.createRef(null)
    }

    render() {
        this.props && this.props.trackHistory(this.props)
        const onIdle = () =>{
          console.log(this.props.history.push('/logout'));
        }
        return (
            <div>
        <IdleTimer ref={this.idleTimerRef} timeout={7200 * 1000} onIdle={onIdle}></IdleTimer>
            </div>
          )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      { trackHistory: trackHistory},
      dispatch
    );
  };

export default compose( withRouter, connect(null, mapDispatchToProps))(IdleTimerContainer)

