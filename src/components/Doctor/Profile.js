import React from "react";

import "../../assets/doctor_profile.scss";
import Select from "react-select";
import doctorImg from '../../icons/icon_my_profile_doctor_blue_23px.svg'
import arrowAttach from '../../icons/attach_white.svg'
import addImage from '../../icons/newIconsForDesign/add-picture.svg'
import plus from '../../icons/newIconsForDesign/plus.svg'



const Profile = ({
  doctor,
  days,
  handleSubmit,
  handleSelect,
  handleSelect2,
  handleSelect3,
  handleSelect4,
  status,
  selectValue,
  props,
  handleChange,
  addAttach,
  handleSpeciality,
  handleChangeBiography,
  deletePicture,
  handleDeleteImageShow,
  handlePage,
  handleServiceRadio
  // handleGenderRadio
  
}) => {
  const customStyles = {
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: '85px',
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      height: "33px",
      fontWeight: 500,
      display: "flex",
      background: 'white',
      marginLeft: '10px',
      marginRight: '20px',
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
      width: '100%',
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      height: "33px",
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

  const customStyles3 = {
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: '185px',
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      height: "33px",
      fontWeight: 500,
      display: "flex",
      background: 'white',
      marginRight: '40px',
      fontSize: '14px',
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
  return (
    <>
  

{doctor &&
      doctor.map(doctor => {
        console.log(doctor);
        return (
          <div key={doctor.id} className="mainDoctor">
            <div className="newVideo">
          <div className='profileDoc' style={{borderBottom: props.page === 'DocProfile' && '4px solid #fa9551' }} onClick={() =>{handlePage('DocProfile')}}>
          <h4 style={{fontWeight: props.page === 'DocProfile' && 'bold' }}>Doctor profile</h4>
          </div>
          <div className='profileDoc' style={{borderBottom: props.page === 'Services' && '4px solid #fa9551' }} onClick={() =>{handlePage('Services')}} >
          <h4 style={{fontWeight: props.page === 'Services' && 'bold' }}>Services</h4>
          </div>
          <div className='profileDoc' style={{borderBottom: props.page === 'WorkHours' && '4px solid #fa9551' }} onClick={() =>{handlePage('WorkHours')}}>
          <h4 style={{fontWeight: props.page === 'WorkHours' && 'bold' }}>Working Hours</h4>
          </div>
        </div>
        <div style={{display: props.page !== 'DocProfile' ? 'none' : 'flex', width: '100%'}}>
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
            <label htmlFor="picture">Picture</label>
            <div className="imageAndGender">
            <div className='profilePic'>
              <div className="upload-btn-wrapper" onMouseEnter={handleDeleteImageShow} onMouseLeave={handleDeleteImageShow}>
            <button className="btn">
              {/* <img src={arrowAttach} alt="attach" /> */}
            <img className='docImage' src={doctor.image.includes('default') ? addImage : `https://healthcarebackend.xyz${doctor.image}`} alt="profile" />

             {/* {doctor.image !== "/media/default.jpg" ?
              <img className='docImage' src={ `https://healthcarebackend.xyz${doctor.image}`} alt='#' /> :
              <p>+</p>
              } */}
            </button>
            <input type="file" name="myfile" onChange={addAttach}  />
            <button className="deleteImage" style={{display: props.showDeleteImage && !doctor.image.includes('default') ? "block" : "none"}}  onClick={deletePicture}> X</button>

          </div>
              </div>
              {/* <div className='Gender'>
                <div className="male">
              <input type="checkbox" name="Male" id="Male" checked={props.gender === 'Male' && true}  onChange={() => handleGenderRadio("Male")}/>
                <label className='Male' value='Male' htmlFor="Male" >Male</label>
                </div>
                <div className='female'>
                <input type="checkbox" value="Female" checked={props.gender === 'Female' && true} name="Female" id="Female"  onChange={() => handleGenderRadio("Female")}/>
                <label htmlFor="Female">Female</label>
                </div>
              </div> */}
            </div>

            <div  className="allergies">
                <div className='Nameing'>
                  <p> Biography{" "}</p>
                </div>
              
               <div className='textAndProfile' >
                <textarea
                  type="text"
                  className="address-input"
                  onChange={handleChange}
                  onFocus={ (e) => {e.target.defaultValue = doctor.biography}}
                  onBlur={ (e) => {e.target.defaultValue = ''}}
                  id='Biography'
                  placeholder={doctor.biography}
                />   
               </div>
              </div>
             
                <label style={{marginTop: '15px'}} htmlFor="speciality">Speciality</label>
<div className="exam-spec">
          <Select
            type="text"
            styles={customStyles2}
            isSearchable={false}
            id="speciality"
            placeholder={doctor.spec_name}
            options={props.specialities}
            onChange={handleSpeciality}
          />
        </div>            
            </div>
            </div>
            <div className='Services' style={{display: props.page !== 'Services' && 'none'}}>
              <div className='mainEmailVisit' style={{opacity: props.EmailVisitChecked === 'True' && 1}}>
               <div className='emailVisit'>
                <label htmlFor="EmailVisit">Email consultation</label>
                <input type="number"
                    // onFocus={ (e) => {e.target.value = doctor.email_exam_price}}
                    // onBlur={ (e) => {e.target.value = ''}}
                    disabled={props.EmailVisitChecked !== 'True' && true}
                onChange={handleChange} id='EmailVisit' value={props.EmailVisit} placeholder={doctor.email_exam_price}/>
                <Select
                      type="text"
                      className="select-option"
                      styles={customStyles}
                      value={selectValue}
                      isDisabled={props.EmailVisitChecked !== 'True' && true}
                      options={status}
                      placeholder={doctor.email_currency ? doctor.email_currency : 'USD'}
                      onChange={handleSelect}
                    />
              </div> 
                <input type="checkbox" checked={props.EmailVisitChecked === 'True' && true}  name="EmailVisitChecked" id="EmailVisitChecked" onChange={(e) => handleServiceRadio(e)}/>
                <label htmlFor="EmailVisitChecked"></label>
              </div>
              <div className='mainVideoVisit'  style={{opacity: props.VideoVisitChecked === 'True' && 1}}>
               <div className='videoVisit'>
                <label htmlFor="videoVisit">Video consultation</label>
                <input type="number"
                // onFocus={ (e) => {e.target.value = doctor.web_exam_price}}
                // onBlur={ (e) => {e.target.value = ''}}
                disabled={props.VideoVisitChecked !== 'True' && true}
                onChange={handleChange} id='VideoVisit' value={props.VideoVisit} placeholder={doctor.web_exam_price}/>
                <Select
                      type="text"
                      className="select-option"
                      styles={customStyles}
                      value={selectValue}
                      isDisabled={props.VideoVisitChecked !== 'True' && true}

                      options={status}
                      placeholder={doctor.web_currency ? doctor.web_currency : 'USD'}
                      onChange={handleSelect2}
                    />
              </div> 
              <input type="checkbox" checked={props.VideoVisitChecked === 'True' && true} name="VideoVisitChecked" id="VideoVisitChecked" onChange={(e) => handleServiceRadio(e)}/>
              <label htmlFor="VideoVisitChecked"></label>
              </div>
              <div className="mainVideoFollowUp" style={{opacity: props.VideoVisitFollowUp === 'True' && 1}}>
               <div className='videoFollowUp'>
                <label htmlFor="videoFollowUp">Video follow up</label>
                <input type="number"
                  //  onFocus={ (e) => {e.target.value = doctor.web_exam_follow_price}}
                  //  onBlur={ (e) => {e.target.value = ''}}
                   disabled={props.VideoVisitFollowUp !== 'True' && true}
                   
                onChange={handleChange} id='VideoFollowUp' value={props.VideoFollowUp} placeholder={doctor.web_exam_follow_price}/>
                <Select
                      type="text"
                      className="select-option"
                      styles={customStyles}
                      value={selectValue}
                      options={status}
                      isDisabled={props.VideoVisitFollowUp !== 'True' && true}

                      placeholder={doctor.web_follow_up_currency ? doctor.web_follow_up_currency : 'USD' }
                      onChange={handleSelect3}
                    />
              </div>
              <input type="checkbox" checked={props.VideoVisitFollowUp === 'True' && true} name="VideoVisitFollowUp" id="VideoVisitFollowUp" onChange={(e) => handleServiceRadio(e)}/>
              <label htmlFor="VideoVisitFollowUp"></label>
              </div>
              <div className="mainWaitingRoomVisit" style={{opacity: props.WaitingRoomVisit === 'True' && 1}}>
              <div className='WaitingRoomVisit'>
                <label htmlFor="WaitingRoomVisit">Waiting room</label>
                <input type="number"
                  //  onFocus={ (e) => {e.target.value = doctor.waiting_room_price}}
                  //  onBlur={ (e) => {e.target.value = ''}}
                   disabled={props.WaitingRoomVisit !== 'True' && true}
                onChange={handleChange} id='WaitingRoom' value={props.WaitingRoom} placeholder={doctor.waiting_room_price}
                />
                <Select
                      type="text"
                      className="select-option"
                      styles={customStyles}
                      value={selectValue}
                      options={status}
                      isDisabled={doctor.waiting_room_status !== 'True' && true}

                      placeholder={props.WaitingRoomVisit ? doctor.waiting_room_currency : 'USD' }
                      onChange={handleSelect4}
                    />
              </div>
              <input type="checkbox" checked={props.WaitingRoomVisit === 'True' && true} name="WaitingRoomVisit" id="WaitingRoomVisit" onChange={(e) => handleServiceRadio(e)}/>
              <label htmlFor="WaitingRoomVisit"></label>
              
              </div>
              <button 
                  onClick={handleSubmit}
                  className="saveChanges">Save</button>
            </div>
            <div className='mainWorkHours' style={{display: props.page !== 'WorkHours' && 'none'}}>
                <div className='workHoursDiv'>
                <Select
                      type="text"
                      className="select-option"
                      styles={customStyles3}
                      value={selectValue}
                      options={days}
                      // placeholder={doctor.web_follow_up_currency ? doctor.web_follow_up_currency : 'USD' }
                      onChange={handleSelect3}
                    />
                  <input type="time" id='TimeStart' value={props.TimeStart} onChange={handleChange} />
                  <p>-</p>
                  <input type="time" id='TimeEnd' value={props.TimeEnd}  onChange={handleChange} />
                </div>
                <img src={plus} alt="plus"/>
                <button 
                  onClick={handleSubmit}
                  className="saveChanges">Save</button>
            </div>
          </div>
        );
      })}

    </>
  );
};

export default Profile;
