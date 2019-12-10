import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Main/Header';


const Dashboard = (initiate) => (
    <div className="row">
        <Header />
        <ul className="nav nav-pills">
            <li className="disabled"><a href="#list">Exams</a></li>
            <li><Link to='/initiate' onClick={() => initiate}>Initiate Exam</Link></li>
        </ul>
        
        <div id="list" className="panel panel-info">
            <div className="panel-heading">Exams list</div>
            <div className="panel-body articles-list"></div>
        </div>
    </div>
);

export default Dashboard;