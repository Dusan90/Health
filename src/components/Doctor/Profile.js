import React from "react";

import "../../assets/doctor_profile.scss";
import Select from "react-select";
import doctorImg from '../../icons/icon_my_profile_doctor_blue_23px.svg'
import arrowAttach from '../../icons/attach_white.svg'


const Profile = ({
  doctor,
  handleSubmit,
  handleSelect,
  status,
  selectValue,
  props,
  handleChange,
  addAttach
  
}) => {
  const customStyles = {
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 100,
      border: "2px solid #fa9551",
      borderRadius: "10px",
      height: "40px",
      fontWeight: 600,
      display: "flex",
      background: 'white'

    }),
    option: () =>({
      height: '30px',
      alignItems: 'center',
      "&:hover": {
        background: '#fa9551'
      }
    })
  } 
  return (
    <>
  

{doctor &&
      doctor.map(doctor => {
        return (
          <div key={doctor.id} className="mainDoctor">
            <div className="newVideo">
          <img src={doctorImg} alt="video img" />
          <p>Doctor profile</p>
        </div>
            <div className="doctor">
              <div className="doctor-p">
                <label htmlFor="firstName">First Name</label>
                <input placeholder={doctor.user.first_name} id='FirstName' onChange={handleChange} type="text"/>
                <label htmlFor="lastName">Last Name</label>
                <input placeholder={doctor.user.last_name} id='LastName' onChange={handleChange} type="text"/>
                <label htmlFor="Phone">Phone number</label>
                <input placeholder={doctor.user.phone ? doctor.user.phone : '11 22 33 44'} onChange={handleChange} id='PhoneNum' type="number"/>
                <label >Working Hours</label>
                <div className='workHoursDiv'>
                  <input type="time" id='TimeStart' onChange={handleChange} placeholder='HH:MM'/>
                  <p>-</p>
                  <input type="time" id='TimeEnd' onChange={handleChange} placeholder="HH:MM"/>
                </div>
                <button 
                  onClick={handleSubmit}
                  className="saveChanges">Save</button>
              </div>
            </div>
            <div className="form">
              <div className="pricing">
                <label htmlFor="pricing">Pricing</label>
                <Select
                      type="text"
                      className="select-option"
                      styles={customStyles}
                      value={selectValue}
                      options={status}
                      onChange={handleSelect}
                    />
              </div>
              <div className='emailVisit'>
                <label htmlFor="EmailVisit">Email visit</label>
                <input type="number" onChange={handleChange} id='EmailVisit' placeholder={doctor.email_exam_price}/>
              </div>
              <div className='videoVisit'>
                <label htmlFor="videoVisit">Video</label>
                <input type="number" onChange={handleChange} id='VideoVisit' placeholder={doctor.web_exam_price}/>
              </div>
              <div className='videoFollowUp'>
                <label htmlFor="videoFollowUp">Video follow up</label>
                <input type="number" onChange={handleChange} id='VideoFollowUp' placeholder={doctor.web_exam_follow_price}/>
              </div>
              <div  className="allergies">
               Biography:{" "}
                <textarea
                style={{height: !doctor.image ? '178px' : '138px'}}
                  type="text"
                  className="address-input"
                  onChange={handleChange}
                  id='Biography'
                  placeholder={doctor.biography}
                />
              </div>
 
            <div className='profilePic'>
              <div className="upload-btn-wrapper">
            <button className="btn">
              <img src={arrowAttach} alt="attach" />
            </button>
            <input type="file" name="myfile" onChange={addAttach}  />
          </div>
                <p style={{margin: "0 40px 0 20px"}} >Upload profile picture</p>
                <img className='docImage' src={doctor.image !== "/media/default.jpg" ? `https://healthcarebackend.xyz${doctor.image}` : doctorImg} alt='#' />
              </div>
            
            </div>
          </div>
        );
      })}

    </>
  );
};

export default Profile;
