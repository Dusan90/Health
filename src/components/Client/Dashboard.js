import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Main/Header';
import Nav from '../../components/Main/Navbar';


const Dashboard = (initiate) => (
    <div className="row">
        <Header />
        <Nav />
        <ul className="nav nav-pills">
            <li className="disabled"><a href="#list">Exams</a></li>
            <li><Link to='/initiate' onClick={() => initiate}>Initiate Exam</Link></li>
        </ul>
        
        <div id="list" className="panel panel-info">
            <div className="panel-heading">Exam list</div>
            <div className="panel-body exam-list">
            </div>
        </div>
    </div>
);

export default Dashboard;