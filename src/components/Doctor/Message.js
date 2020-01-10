import React from 'react';
import Header from '../../components/Main/Header';
import Nav from '../../components/Main/Navbar';
import '../../assets/message.scss';


const ExamMessage = ({client, messageValue, handleMessage, submitValue, handleSubmit, onChangeHandler}) => (
    <div className="row">
        <Header />
        <Nav />
        <ul className="nav-doctor">
            <h6 href="#list">New Message</h6>
        </ul>
        {client &&
        <h5 className="client-form">To: {client}</h5>
        }
        <div className="input"> 
            <textarea type="text" className="form-control" placeholder="message" value={messageValue} onChange={handleMessage}/>
            <input type="file" name="file" onChange={onChangeHandler}/>
            <button type="submit" className="btn btn-primary btn-md" value={submitValue} onClick={handleSubmit}>Send</button>
        </div>
    </div>
);


export default ExamMessage;