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
  addAttach,
  handleSpeciality,
  handleChangeBiography
  
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
      // position: "relative",
      'div': {
        display: 'flex',
        alignSelf: 'center'
      }
    }),
    option: () =>({
      height: '30px',
      alignSelf: 'center',
      padding: '5px 0 0 0',
      "&:hover": {
        background: '#fa9551'
      }
    }),
    placeholder: (provided, state) => ({
      ...provided,
 
       display: state.isFocused || state.isSelected || state.selectProps.inputValue || state.value ? 'none' : 'block',
    })
  } 

  const customStyles2 = {
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: '90%',
      border: "2px solid #fa9551",
      borderRadius: "10px",
      height: "40px",
      fontWeight: 700,
      display: "flex",
      background: 'white',
      margin: "2px 0 20px 0",
      // position: "relative",
      'div': {
        display: 'flex',
        alignSelf: 'center'
      }
    }),
    option: () =>({
      height: '30px',
      alignSelf: 'center',
      padding: '5px 0 0 0',
      "&:hover": {
        background: '#fa9551'
      }
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "#969696",
      
       display: state.isFocused || state.isSelected || state.selectProps.inputValue || state.value ? 'none' : 'block',
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
                <input
                     onFocus={ (e) => {e.target.value = doctor.user.first_name}}
                     onBlur={ (e) => {e.target.value = ''}}
                placeholder={doctor.user.first_name} id='FirstName' onChange={handleChange} type="text"/>
                <label htmlFor="lastName">Last Name</label>
                <input placeholder={doctor.user.last_name}
                   onFocus={ (e) => {e.target.value = doctor.user.last_name}}
                   onBlur={ (e) => {e.target.value = ''}}
                id='LastName' onChange={handleChange} type="text"/>
                <label htmlFor="Phone">Phone number</label>
                <input 
                  onFocus={ (e) => {e.target.value = doctor.user.phone}}
                  onBlur={ (e) => {e.target.value = ''}}
                placeholder={doctor.user.phone ? doctor.user.phone : '11 22 33 44'} autoComplete='nope' onChange={handleChange} id='PhoneNum' type="number"/>
                <label htmlFor="lastName">E-mail</label>
                <input
                placeholder={doctor.user.email} disabled={true} id='Email' onChange={handleChange} type="text"/>
               

    <label htmlFor="speciality">Speciality</label>
<div className="exam-spec">
          <Select
            type="text"
            styles={customStyles2}
            isSearchable={false}
            id="speciality"
            placeholder={props.currentSpec ? props.currentSpec : doctor.speciality}
            options={props.specialities}
            onChange={handleSpeciality}
          />
        </div>





                 <label htmlFor="Phone">Organization</label>
                <input 
                  onFocus={ (e) => {e.target.value = doctor.organization}}
                  onBlur={ (e) => {e.target.value = ''}}
                placeholder={doctor.organization ? doctor.organization : ''} autoComplete='nope' onChange={handleChange} id='Organization' type="text"/>
                <button 
                  onClick={handleSubmit}
                  className="saveChanges">Save</button>
              </div>
            </div>
            <div className="form">
            <div  className="allergies">
                <div className='Nameing'>
                  <p> Biography{" "}</p>
                </div>
              
               <div className='textAndProfile' >
                {/* <textarea
                // style={{height: !doctor.image ? '178px' : '138px'}}
                  type="text"
                  className="address-input"
                  onChange={handleChange}
                  onFocus={ (e) => {e.target.defaultValue = doctor.biography}}
                  onBlur={ (e) => {e.target.defaultValue = ''}}
                  id='Biography'
                  placeholder={doctor.biography}
                /> */}
                
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
              <div contentEditable="true" 
                className="changeDiv"
                onInput={handleChangeBiography}
                onFocus={ (e) => {e.target.style.color = '#666666'}}
                id='Biography'
                value={doctor.biography}
            >{doctor.biography}</div>



          
               </div>
              </div>
             
              <div className='emailVisit'>
                <label htmlFor="EmailVisit">Email</label>
                <input type="number"
                    onFocus={ (e) => {e.target.value = doctor.email_exam_price}}
                    onBlur={ (e) => {e.target.value = ''}}
                onChange={handleChange} id='EmailVisit' value={props.EmailVisit} placeholder={doctor.email_exam_price}/>
                <Select
                      type="text"
                      className="select-option"
                      styles={customStyles}
                      value={selectValue}
                      options={status}
                      placeholder={doctor.email_currency ? doctor.email_currency : 'USD'}
                      onChange={handleSelect}
                    />
              </div>
              <div className='videoVisit'>
                <label htmlFor="videoVisit">Video</label>
                <input type="number"
                onFocus={ (e) => {e.target.value = doctor.web_exam_price}}
                onBlur={ (e) => {e.target.value = ''}}
                onChange={handleChange} id='VideoVisit' value={props.VideoVisit} placeholder={doctor.web_exam_price}/>
                <Select
                      type="text"
                      className="select-option"
                      styles={customStyles}
                      value={selectValue}
                      options={status}
                      placeholder={doctor.web_currency ? doctor.web_currency : 'USD'}
                      onChange={handleSelect2}
                    />
              </div>
              <div className='videoFollowUp'>
                <label htmlFor="videoFollowUp">Video follow up</label>
                <input type="number"
                   onFocus={ (e) => {e.target.value = doctor.web_exam_follow_price}}
                   onBlur={ (e) => {e.target.value = ''}}
                onChange={handleChange} id='VideoFollowUp' value={props.VideoFollowUp} placeholder={doctor.web_exam_follow_price}/>
                <Select
                      type="text"
                      className="select-option"
                      styles={customStyles}
                      value={selectValue}
                      options={status}
                      placeholder={doctor.web_follow_up_currency ? doctor.web_follow_up_currency : 'USD' }
                      onChange={handleSelect3}
                    />
              </div>
               <label >Working Hours:</label>
                <div className='workHoursDiv'>
                  <input type="time" id='TimeStart' value={props.TimeStart} onChange={handleChange} />
                  <p>-</p>
                  <input type="time" id='TimeEnd' value={props.TimeEnd}  onChange={handleChange} />
                </div>
              {/* <div  className="allergies">
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
                  onFocus={ (e) => {e.target.defaultValue = doctor.biography}}
                  onBlur={ (e) => {e.target.defaultValue = ''}}
                  id='Biography'
                  placeholder={doctor.biography}
                />
                
            <div className='profilePic'>
              <div className="upload-btn-wrapper">
            <button className="btn">
              {/* <img src={arrowAttach} alt="attach" /> */}
              {/* {doctor.image !== "/media/default.jpg" ?
              <img className='docImage' src={ `https://healthcarebackend.xyz${doctor.image}`} alt='#' /> :
              <p>+</p>
              }
            </button>
            <input type="file" name="myfile" onChange={addAttach}  />
          </div>
              </div>
               </div>
              </div> */} 
 
            
            </div>
          </div>
        );
      })}

    </>
  );
};

export default Profile;
