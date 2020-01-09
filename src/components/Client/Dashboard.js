import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/client/dashboard.scss';


const Dashboard = ({initiate, exams, handleClick}) => (
    <div className="row">
        <ul className="nav nav-pills">
            <li className="disabled"><a href="#list">Exams</a></li>
            <li><Link to='/initiate' onClick={() => initiate}>Initiate Exam</Link></li>
        </ul>
        
        <table className="table2">
            <thead className="client-head">
                <tr className="client-row">
                    <th className="client-doctor">Doctor</th>
                    <th className="client-subject">Subject</th>
                    <th className="client-status">Status</th>
                </tr>    
            </thead>
            {exams.map(exam => {
                return(
                <tbody key={exam.exam} className="client-body">
                    <tr key={exam.exam} data-id={exam.exam} className="list-group" onClick={handleClick.bind(this)}>         
                        <td className="client-doctor">{exam.doctor}</td>
                        <td className="client-subject">{exam.subject}</td>
                        <td className="client-status">{exam.status}</td>                 
                    </tr>
                </tbody>
                )}
            )}
        </table>
    </div>
);

export default Dashboard;