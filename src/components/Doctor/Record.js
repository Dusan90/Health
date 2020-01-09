import React from 'react';
import '../../assets/record.scss';


const Record = ({record}) => (
    <div className="row">
        <ul className="nav nav-pills">
            <li className="disabled"><a href="#list">Record</a></li>
        </ul>
        <div className="box">
            {record.map(data => {
                return (     
                    <div key={data.id} className="record-box">
                        <p>Client: {data.client}</p>
                        <p>Speciality: {data.speciality}</p>
                        <p>Details: {data.details}</p>
                        <p>Teraphy history: {data.teraphy_history}</p>
                        <p>Medical conditions: {data.medical_conditions}</p>
                    </div>
                )
            })}
        </div>
    </div>
);

export default Record;