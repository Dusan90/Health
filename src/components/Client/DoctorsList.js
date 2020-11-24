import React from 'react'
import doctorImg from '../../icons/icon_my_profile_doctor_blue_23px.svg'
import doctor2Img from '../../icons/icon_doctor_2_blue.svg'
import Select from 'react-select'

import '../../assets/client/doctorsList.scss'


function DoctorsList({handleClient, props, handleSort, handleSortBySpec, handleSpeciality, handleDoctor}) {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "40px",
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      width: "100%",
      // marginLeft: "2px",
      background: "white",
      color: "#666666",
      fontWeight: "600",
    }),
    placeholder: () =>({
      color: '#666666',
      fontWeight: '500'
    })
  };
  const filteredorNot = props.filteredBySpec.length === 0 ? props.doctors : props.filteredBySpec
  console.log(filteredorNot);
    return (
    
             <div className="mainDoctorsDiv">
      <div className="doctorsAbove">
        <img src={doctor2Img} alt="my patients" />
        <h4>Doctors</h4>
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
            placeholder={props.currentSpec ? props.currentSpec : `Select Speciality...`}
            options={props.specialities}
            onChange={handleSpeciality}
          />
        </div>
        <div className="exam-doc">
          <Select
            styles={customStyles}
            type="text"
            id="doctor"
            placeholder="Select Doctor..."
            options={props.specDoctor.length === 0 ? props.doctors : props.specDoctor}
            onChange={handleDoctor}
            value={   props.resetDoctorSelect}
            // value={specDoctor.length === 0 ? null : [resetDoctorSelect]}
          />
        </div>
      </div>
      <div className="row2">
        {filteredorNot.map((doctor) => {
          console.log(doctor);
          return doctor.id === null ? null : (
            <div key={doctor.iD} className="list-group">
              <button
                data-id={doctor.id}
                className="list-group-item"
                onClick={() => handleClient(doctor.iD)}
              >
                {doctor.label}
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
