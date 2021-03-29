import React from 'react'
import doctorImg from '../../icons/newIconsForDesign/doctor_picture.svg'
// import doctor2Img from '../../icons/icon_doctor_2_blue.svg'
import Select from 'react-select'
import {Link} from 'react-router-dom'

import '../../assets/client/doctorsList.scss'


function DoctorsList({handleClient, props, handleSort, handleSortBySpec, handleSpeciality, handleDoctor, resetFilter}) {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "33px",
      border: "1.7px solid #fa9551",
      borderRadius: "15px",
      width: "100%",
      // marginLeft: "2px",
      background: "white",
      color: "#666666",
      fontWeight: "bold",
    }),
    placeholder: () =>({
      color: '#666666',
      fontWeight: 'bold'
    })
  };
  const filteredorNot = props.filteredBySpec.length === 0 ? props.doctors : props.filteredBySpec
  console.log(filteredorNot);
    return (
    
             <div className="mainDoctorsDiv">
      <div className="doctorsAbove">
        {/* <img src={doctor2Img} alt="my patients" /> */}
        <h4>Doctors list</h4>
      </div>
      <div className="doctorsDiv">
      {/* <label>
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
        </label> */}
          <div className="exam-spec">
          <Select
            type="text"
            styles={customStyles}
            id="speciality"
            placeholder={props.currentSpec ? props.currentSpec : `Select Speciality`}
            options={props.specialities}
            onChange={handleSpeciality}
          />
        </div>
        <div className="exam-doc">
          <Select
            styles={customStyles}
            type="text"
            id="doctor"
            placeholder="Choose Doctor"
            options={props.specDoctor.length === 0 ? props.doctors : props.specDoctor}
            onChange={handleDoctor}
            onMenuOpen={resetFilter}
            value={ props.resetDoctorSelect}
            // value={specDoctor.length === 0 ? null : [resetDoctorSelect]}
          />
        </div>
      </div>
      <div className="row2">
        {filteredorNot.map((doctor) => {
          console.log(doctor);
          return doctor.id === null ? null : (
            <div key={doctor.iD} className="list-group">
              <div
                data-id={doctor.id}
                className="list-group-item"
                // onClick={() => handleClient(doctor.iD)}
              >
                <img src={doctor.image.includes('default') ? doctorImg : `https://healthcarebackend.xyz${doctor.image}`} alt="cliet profile" />
                <div className='docInfo'>
                <p>
                {doctor.label}
                </p>
                <h5>Speciality: <span>{doctor.spec}</span></h5>
                <h5>Organization: <span>{doctor.organization}</span></h5>
                </div>
                <Link to='#' onClick={() => handleClient(doctor.iD)} className='Details' >Details</Link>
              </div>
            </div>











          );
        })}
      </div>
    </div>
    )
}

export default DoctorsList
