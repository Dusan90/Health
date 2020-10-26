import React from 'react'
import doctorImg from '../../icons/icon_my_profile_doctor_blue_23px.svg'
import doctor2Img from '../../icons/icon_doctor_2_blue.svg'

import '../../assets/client/doctorsList.scss'


function DoctorsList({handleClient, props, handleSort, handleSortBySpec}) {
    return (
    
             <div className="mainDoctorsDiv">
      <div className="doctorsAbove">
        <img src={doctor2Img} alt="my patients" />
        <h4>Doctors</h4>
      </div>
      <div className="doctorsDiv">
      <label>
          Speciality:{" "}
          <select onChange={handleSortBySpec}>
            <option value="">Choose</option>
            {props.speciality.map((spec, index) => <option value={spec} key={index}>{spec}</option>)
            }
        
          </select>
        </label>
        <label>
          Sort by:{" "}
          <select onClick={handleSort}>
            <option value="">Sort it...</option>
            <option value="nameAZ">Name: A-Z</option>
            <option value="nameZA">Name: Z-A</option>
          </select>
        </label>
      </div>
      <div className="row2">
        {props.filteredByspec.map((doctor) => {
          return doctor.id === null ? null : (
            <div key={doctor.id} className="list-group">
              <button
                data-id={doctor.id}
                className="list-group-item"
                onClick={() => handleClient(doctor.id)}
              >
                {doctor.doctor}
                <img src={doctor.image === "/media/default.jpg" ? doctorImg : `https://healthcarebackend.xyz${doctor.image}`} alt="cliet profile" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
    )
}

export default DoctorsList
