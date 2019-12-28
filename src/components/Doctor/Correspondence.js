import React from 'react';
import Header from '../../components/Main/Header';
import Nav from '../../components/Main/Navbar';


const Correspondence = ({correspondence, handleClick, messageValue, handleMessage, submitValue, handleSubmit}) => (
    <div className="row">
        <Header />
        <Nav />
        <ul className="nav nav-pills">
            <li className="disabled"><a href="#list">Correspondence</a></li>
        </ul>
        
        {correspondence.map(message => {
            return(
                <div key={message.message} className="panel panel-info" onClick={handleClick}>
                    <div className="rounded-pill"> 
                        <div>
                            <p>sender: {message.sender}</p>
                            <p>message: {message.message}</p>
                            <p>attachments: {message.attachments}</p>
                        </div>
                    </div>
                </div>
            )
        })}
        <div className="col-sm-10"> 
            <input type="text" className="form-control" placeholder="message" value={messageValue} onChange={handleMessage}/>
            <button type="submit" className="btn btn-default" value={submitValue} onClick={handleSubmit}>Send</button>
        </div>
    </div>
);

export default Correspondence;