import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Main/Header';
import Nav from '../../components/Main/Navbar';
import '../../assets/message.scss';


const ExamMessage = ({message, handleClick, messageValue, handleMessage, submitValue, handleSubmit}) => (
    <div className="row">
        <Header />
        <Nav />
        <ul className="nav nav-pills">
            <li className="disabled"><a href="#list">Message</a></li>
        </ul>
        <div className="message-box">
        {message.map(message => {
            return(
                <div key={message.message} className="box" onClick={handleClick}>
                    <div className="sender">From: {message.sender}</div>
                    <div className="message">Message: {message.message}</div>
                    <div className="attachment">Attachments: {message.attachments}</div>
                </div>
            )
        })}
        </div>
        <div className="input"> 
            <input type="text" className="form-control" placeholder="message" value={messageValue} onChange={handleMessage}/>
            <button type="submit" className="btn btn-default" value={submitValue} onClick={handleSubmit}>Send</button>
        </div>
    </div>
);

const mapStateToProps = state => {
    const doctor = state.getIn(['doctorReducer', 'doctor']);
    const user = state.getIn(['authReducer', 'user']);
    console.log(doctor, 'doca')
    console.log(user, 'usercina')
    
    return {
        doctor,
        user
    }
  }

export default connect(mapStateToProps)(ExamMessage);