import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Main/Header';
import Nav from '../../components/Main/Navbar';
import '../../assets/correspondence.scss';


const CorrespondenceMessage = ({correspondence, handleClick}) => (
    <div className="row">
        <Header />
        <Nav />
        <ul className="nav nav-pills">
            <li className="disabled"><a href="#list">Correspondence</a></li>
        </ul>
        <table className="correspondence">
            {correspondence.map(message => {
                return(
                    <tbody key={message.id} className="tbody">
                        <tr className="row1" onClick={handleClick}>         
                            <td className="sender">Sender:{message.sender}</td>
                            <td className="message">Message:{message.message}</td>
                            <td className="created">Created:{message.created}</td>       
                            <td className="attachments">Attachments:{message.attachments}</td>              
                        </tr>
                    </tbody>
                )
            })}
        </table>
    </div>
);

const mapStateToProps = state => {
    const doctor = state.getIn(['doctorReducer', 'doctor']);
    const user = state.getIn(['authReducer', 'user']);
    
    return {
        doctor,
        user
    }
  }

export default connect(mapStateToProps)(CorrespondenceMessage);