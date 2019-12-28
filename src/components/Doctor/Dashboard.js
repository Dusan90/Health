import React from 'react';


const Dashboard = ({exams, handleClick}) => (
    <div className="row">
        <ul className="nav nav-pills">
            <li className="disabled"><a href="#list">Exams</a></li>
        </ul>
        
        {exams.map(exam => {
            return(
                <div key={exam.exam} data-id={exam.exam} className="panel panel-info" onClick={handleClick.bind(this)}>
                    <div className="rounded-pill"> 
                        <div>
                            <p>Client: {exam.client}</p>
                            <p>Speciality: {exam.speciality}</p>
                            <p>Subject: {exam.subject}</p>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
);

export default Dashboard;