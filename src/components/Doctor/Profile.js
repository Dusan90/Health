import React from "react";

import "../../assets/doctor_profile.scss";
import Select from "react-select";
import doctorImg from '../../icons/icon_my_profile_doctor_blue_23px.svg'
import arrowAttach from '../../icons/attach_white.svg'


const Profile = ({
  doctor,
  prefixValue,
  descriptionValue,
  priceValue,
  priceWebValue,
  submitValue,
  handlePrefix,
  handleDescription,
  handlePrice,
  handleWebPrice,
  handleSubmit,
  handleSelect,
  status,
  selectValue,
  props
  
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
      {/* {doctor &&
        doctor.map((doctor) => {
          return (
            <div className="mainprof" key={doctor.id}>
              <div className="iconVideo">
                <img src={doctorImg} alt="img" />
                <p>Doctor profile</p>{" "}
              </div>
              <div className="doctorPr">
                <div className="imginput">
                  <div className="doctor-p">
                    <p></p>
                  </div>
                  <input type="file" name="picture" id="" />
                </div>
                <div className="info">
                  <p><span>Doctor:</span>  {doctor.doctor}</p>
                  <p><span>Email:</span>  {doctor.email}</p>
                  <p><span>Speciality:</span>  {doctor.speciality}</p>
                  <p><span> NPI:</span>  {doctor.npi_number}</p>
                  <p><span>Prefix:</span>  {doctor.prefix}</p>
                  <p><span>Description:</span>  {doctor.description}</p>
                  <p><span>Email exam price: </span>  {doctor.email_exam_price} €</p>
                  <p><span>Web exam price:</span>  {doctor.web_exam_price} €</p>
                  <p><span>Availability:</span>  {doctor.status}</p>
                </div>
              </div>
              <form className="form">
                <div className="pref-price">
                  <div className="prefix">
                    <input
                      type="text"
                      className="prefix-input"
                      placeholder="Enter prefix"
                      value={prefixValue}
                      onChange={handlePrefix}
                    />
                  </div>
                  <div className="select" style={{ width: "200px" }}>
                    <Select
                      type="text"
                      className="select-option"
                      styles={customStyles}
                      value={selectValue}
                      options={status}
                      onChange={handleSelect}
                    />
                  </div>
                  <div className="price">
                    <input
                      type="text"
                      className="price-input"
                      placeholder="Enter mail price"
                      value={priceValue}
                      onChange={handlePrice}
                    />
                  </div>
                  <div className="price">
                    <input
                      type="text"
                      className="price-input"
                      placeholder="Enter web price"
                      value={priceWebValue}
                      onChange={handleWebPrice}
                    />
                  </div>
                </div>
                <div className="description">
                  <textarea
                    type="text"
                    className="description-input"
                    placeholder="Enter description"
                    value={descriptionValue}
                    onChange={handleDescription}
                  />
                </div>

                <div className="submit">
                  <button
                    type="submit"
                    className="btn"
                    value={submitValue}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          );
        })} */}

{doctor &&
      doctor.map(doctor => {
        const splited = doctor.doctor.split(" ");
        return (
          <div key={doctor.id} className="mainDoctor">
            <div className="newVideo">
          <img src={doctorImg} alt="video img" />
          <p>Doctor profile</p>
        </div>
            <div className="doctor">
              <div className="doctor-p">
                <label htmlFor="firstName">First Name</label>
                <input placeholder={splited[0]} type="text"/>
                <label htmlFor="lastName">Last Name</label>
                <input placeholder={splited[1]} type="text"/>
                <label htmlFor="Phone">Phone number</label>
                <input placeholder={doctor.phone ? doctor.phone : '11 22 33 44'} type="number"/>
                <label >Working Hours</label>
                <div className='workHoursDiv'>
                  <input type="time" placeholder='HH:MM'/>
                  <p>-</p>
                  <input type="time" placeholder="HH:MM"/>
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
                <input type="number" placeholder='Enter price'/>
              </div>
              <div className='videoVisit'>
                <label htmlFor="videoVisit">Video</label>
                <input type="number" placeholder='Enter price'/>
              </div>
              <div className='videoFollowUp'>
                <label htmlFor="videoFollowUp">Video follow up</label>
                <input type="number" placeholder='Enter price'/>
              </div>
              <div  className="allergies">
               Biography:{" "}
                <textarea
                style={{height: !doctor.image ? '178px' : '138px'}}
                  type="text"
                  className="address-input"
                />
              </div>
        { !doctor.image ? 
             <div className='profilePic'>
                <p style={{margin: "0 20px 0 0"}}>Upload profile picture</p>
              <div className="upload-btn-wrapper">
            <button className="btn">
              <img src={arrowAttach} alt="attach" />
            </button>
            <input type="file" name="myfile" />
          </div>

              </div> :   <div className='profilePic'>
              <div className="upload-btn-wrapper">
            <button className="btn">
              <img src={arrowAttach} alt="attach" />
            </button>
            <input type="file" name="myfile" />
          </div>
                <p style={{margin: "0 40px 0 20px"}} >Upload profile picture</p>
                
              </div>}
            
            </div>
          </div>
        );
      })}

    </>
  );
};

export default Profile;
