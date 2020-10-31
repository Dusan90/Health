import React from "react";

import "../../assets/doctor_profile.scss";
import Select from "react-select";
import doctorImg from '../../icons/icon_my_profile_doctor_blue_23px.svg'
import arrowAttach from '../../icons/attach_white.svg'


const Profile = ({
  doctor,
  handleSubmit,
  handleSelect,
  handleSelect2,
  handleSelect3,
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
      fontWeight: 500,
      display: "flex",
      background: 'white',
      marginLeft: '20px',
    }),
    option: () =>({
      height: '30px',
      alignItems: 'center',
      padding: '5px 0 0 0',
      "&:hover": {
        background: '#fa9551'
      }
    }),
    placeholder: (provided, state) => ({
      ...provided,
      display: 'none'
    // state.isFocused || state.isSelected || state.selectProps.inputValue || state.value
    // ? 'none'
    // : 'block',
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
                <label htmlFor="lastName">E-mail</label>
                <input placeholder={doctor.user.email} disabled={true} id='Email' onChange={handleChange} type="text"/>
                <label >Working Hours:</label>
                <div className='workHoursDiv'>
                  <input type="time" id='TimeStart' value={props.TimeStart} onChange={handleChange} />
                  <p>-</p>
                  <input type="time" id='TimeEnd' value={props.TimeEnd}  onChange={handleChange} />
                </div>
                <button 
                  onClick={handleSubmit}
                  className="saveChanges">Save</button>
              </div>
            </div>
            <div className="form">
              <div className="pricing">
                <p>Pricing</p>
              
              </div>
              <div className='emailVisit'>
                <label htmlFor="EmailVisit">Email</label>
                <input type="number" onChange={handleChange} id='EmailVisit' value={props.EmailVisit} placeholder={doctor.email_exam_price}/>
                <Select
                      type="text"
                      className="select-option"
                      styles={customStyles}
                      value={selectValue}
                      options={status}
                      placeholder='Select'
                      onChange={handleSelect}
                    />
              </div>
              <div className='videoVisit'>
                <label htmlFor="videoVisit">Video</label>
                <input type="number" onChange={handleChange} id='VideoVisit' value={props.VideoVisit} placeholder={doctor.web_exam_price}/>
                <Select
                      type="text"
                      className="select-option"
                      styles={customStyles}
                      value={selectValue}
                      options={status}
                      placeholder='Select'
                      onChange={handleSelect2}
                    />
              </div>
              <div className='videoFollowUp'>
                <label htmlFor="videoFollowUp">Video follow up</label>
                <input type="number" onChange={handleChange} id='VideoFollowUp' value={props.VideoFollowUp} placeholder={doctor.web_exam_follow_price}/>
                <Select
                      type="text"
                      className="select-option"
                      styles={customStyles}
                      value={selectValue}
                      options={status}
                      placeholder='Select'
                      onChange={handleSelect3}
                    />
              </div>
              <div  className="allergies">
                <div className='Nameing'>
                  <p> Biography{" "}</p>
                  <p style={{marginRight: '47px'}}>Picture</p>
                </div>
              
               <div className='textAndProfile'>
                <textarea
                // style={{height: !doctor.image ? '178px' : '138px'}}
                  type="text"
                  className="address-input"
                  onChange={handleChange}
                  id='Biography'
                  placeholder={doctor.biography}
                />
                
            <div className='profilePic'>
              <div className="upload-btn-wrapper">
            <button className="btn">
              {/* <img src={arrowAttach} alt="attach" /> */}
              {doctor.image !== "/media/default.jpg" ?
              <img className='docImage' src={ `https://healthcarebackend.xyz${doctor.image}`} alt='#' /> :
              <p>+</p>
              }
            </button>
            <input type="file" name="myfile" onChange={addAttach}  />
          </div>
              </div>
               </div>
              </div>
 
            
            </div>
          </div>
        );
      })}

    </>
  );
};

export default Profile;
