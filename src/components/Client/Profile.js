import React from "react";
// import SideNavbar from '../../containers/Home/SideNav';
import "../../assets/client/profile.scss";
import clientIcon from '../../icons/icon_my_profile_client_blue_23px.svg'
import arrowAttach from '../../icons/attach_white.svg'

const Profile = ({
  client,
  handleSubmit,
  handleGenderRadio,
  props,
  attachInput,
  handleChange,
  handleImage,
  handleRemoveImage
}) => (
  <>
    {client &&
      client.map(client => {
        console.log(client);
        return (
          <div key={client.id} className="mainClien">
            <div className="newVideo">
          <img src={clientIcon} alt="video img" />
          <p>My profile</p>
        </div>
            <div className="client">
              <div className="client-p">
                <label htmlFor="firstName">First Name</label>
                <input 
                  onFocus={ (e) => {e.target.value = client.user.first_name}}
                  onBlur={ (e) => {e.target.value = ''}}
                placeholder={client.user.first_name} id='FirstName' onChange={handleChange} type="text"/>
                <label htmlFor="lastName">Last Name</label>
                <input
                 onFocus={ (e) => {e.target.value = client.user.last_name}}
                 onBlur={ (e) => {e.target.value = ''}}
                placeholder={client.user.last_name} id='LastName' onChange={handleChange} type="text"/>
                <label htmlFor="address">Address</label>
                <input 
                 onFocus={ (e) => {e.target.value = client.address}}
                 onBlur={ (e) => {e.target.value = ''}}
                placeholder={client.address} onChange={handleChange} id='Address' type="text"/>
                <label htmlFor="address">E-mail</label>
                <input placeholder={client.user.email} disabled={true} onChange={handleChange} id='Email' type="text"/>
                <label htmlFor="Phone">Phone number</label>
                <input
                  onFocus={ (e) => {e.target.value = client.user.phone}}
                  onBlur={ (e) => {e.target.value = ''}}
                  autoComplete='nope'
                placeholder={client.user.phone ? client.user.phone : '11 22 33 44'} onChange={handleChange} id='PhoneNum' type="number"/>
                <label htmlFor="birth">Date of birth</label>
                <input
                 onFocus={ (e) => {e.target.value = client.birth_date}}
                 onBlur={ (e) => {e.target.value = ''}}
                placeholder={client.birth_date} onChange={handleChange} id='BirthDate' type="text"/>
               
                <button 
                  onClick={handleSubmit}
                  className="saveChanges">Save</button>
              </div>
            </div>
            <div className="form">
              <div className="conditions">
                Chronical conditions:{" "}
                <textarea
                  type="text"
                  onFocus={ (e) => {e.target.defaultValue = client.chronical_conditions}}
                  onBlur={ (e) => {e.target.defaultValue = ''}}
                  className="address-input"
                  placeholder={client.chronical_conditions}
                  onChange={handleChange} id='ChronicalConditions'
                />
              </div>
              <div  className="allergies">
               Allergies:{" "}
                <textarea
                style={{height: !client.image ? '178px' : '138px'}}
                  type="text"
                  onFocus={ (e) => {e.target.defaultValue = client.allergies}}
                  onBlur={ (e) => {e.target.defaultValue = ''}}
                  className="address-input"
                  placeholder={client.allergies}
                  onChange={handleChange} id='Allergies'
                />
              </div>
              <div className='checkboxDiv'>
                <div className='check'>
                <input type="checkbox" name="Male" id="Male" checked={props.gender === 'M' && true}  onChange={() => handleGenderRadio("M")}/>
                <label className='Male' value='Male' htmlFor="Male" >Male</label>
                <input type="checkbox" value="Female" checked={props.gender === 'F' && true} name="Female" id="Female"  onChange={() => handleGenderRadio("F")}/>
                <label htmlFor="Female">Female</label>
                </div>
                <div className='profilePic'>
                {client.image !== "/media/default.jpg" && <li onClick={handleRemoveImage} href='#'>Remove picture</li>}

                
              <div className="upload-btn-wrapper">
            {/* <button className="btn"> */}
                {client.image === "/media/default.jpg" && <li href='#'>Add picture</li>}
            {/* {client.image !== "/media/default.jpg" ?
              <img className='docImage' src={ `https://healthcarebackend.xyz${client.image}`} alt='#' /> :
              <p>+</p>
              } */}
            {/* </button> */}
            <input type="file" name="myfile" onChange={attachInput} />
          </div>
          <img className='cliImage' onClick={(e) => handleImage(e)} src={client.image !== "/media/default.jpg" ? `https://healthcarebackend.xyz${client.image}` : null} alt='#' />
            
                
              </div>
                </div>
         
            
            </div>
          </div>
        );
      })}
  </>
);

export default Profile;
