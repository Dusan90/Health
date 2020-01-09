import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const InitiateExam = ({specialities, doctors, subject, submitted, handleSpeciality, handleDoctor, handleSubject, handleSubmit }) => (
    <div className="mt-5">
        <div className="row mt-5">
            <div className="form-group">
                <div className="col-sm-10"> 
                    <Select type="text" id="speciality" placeholder="Select Speciality..." options={specialities} onChange={handleSpeciality}/>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-10"> 
                    <Select type="text" id="doctor" placeholder="Select Doctor..." options={doctors} onChange={handleDoctor}/>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-10"> 
                    <input type="text" className="form-control" id="subject" placeholder="Enter subject" value={subject} onChange={handleSubject}/>
                </div>
            </div>
            <div className="text-center col-md-4 col-md-offset-4">
                <Link value={submitted} to="/checkout" onClick={handleSubmit} className="btn btn-success btn-block">Submit Exam</Link>
            </div>
        </div>
    </div>
);

export default InitiateExam;