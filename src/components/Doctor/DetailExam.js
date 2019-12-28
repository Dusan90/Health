import React from 'react';
import Header from '../../components/Main/Header';
import Nav from '../../components/Main/Navbar';
import Select from 'react-select';
import { Link } from 'react-router-dom';

const Dashboard = ({exam, status, handleStatus, statusValue, submitValue, handleSubmit, handleLink}) => (
    
    <div className="row">
        <Header />
        <Nav />
        <ul className="nav nav-pills">
            <li className="disabled"><a href="#list">Detail Exam</a></li>
        </ul>
        {exam.map(exam => {
            return (
                <div key={exam.id} className="panel panel-info" style={{height: "250px"}}>
                    <div className="rounded-pill"> 
                        <div>
                            <p>Client: {exam.client}</p>
                            <p>Speciality: {exam.speciality}</p>
                            <p>Created: {exam.created}</p>
                            <p>Subject: {exam.subject}</p>
                            <p>Status: {exam.status}</p>
                            {!(exam.status === 'Accepted') &&
                            <div className="col-sm-10">    
                                <Select type="text" value={statusValue} options={status} onChange={handleStatus}/>
                                <button type="submit" className="btn btn-default" value={submitValue} onClick={handleSubmit}>Send</button>  
                            </div>
                            }
                            <Link to="/doctor/exam/correspondence" onClick={handleLink}>Messages</Link>
                        </div>
                        
                    </div>
                </div>

            )})
        }
    </div>
);

export default Dashboard;