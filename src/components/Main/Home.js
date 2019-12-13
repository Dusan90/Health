import React from 'react';

const Doctor = ({ doctors, handleDoctor }) => (
    <div className="panel panel-info" id="single-account">
        <div className="row">
            <h4 type="text" className="name" onChange={handleDoctor}>{doctors}</h4>
            <span type="text" className="speciality">Speciality:</span>
        </div>

        <div className="profile">
            <button className="btn btn-info" id="view-button">View Profile</button>             
        </div>
        <div className="consultation">
            <button className="btn btn-warning">Consultation</button>              
        </div>
    </div>
);

export default Doctor;