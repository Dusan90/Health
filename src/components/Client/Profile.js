import React from "react";
// import SideNavbar from '../../containers/Home/SideNav';
import "../../assets/client/profile.scss";
import clientIcon from '../../icons/icon_my_profile_client_blue_23px.svg'
import arrowAttach from '../../icons/attach_white.svg'

const Profile = ({
  client,
  addressValue,
  handleAddress,
  handleSubmit,
  handleGenderRadio,
  props
}) => (
  <>
    {client &&
      client.map(client => {
        const splited = client.user.split(" ");
        return (
          <div key={client.id} className="mainClien">
            <div className="newVideo">
          <img src={clientIcon} alt="video img" />
          <p>My profile</p>
        </div>
            <div className="client">
              <div className="client-p">
                <label htmlFor="firstName">First Name</label>
                <input placeholder={splited[0]} type="text"/>
                <label htmlFor="lastName">Last Name</label>
                <input placeholder={splited[1]} type="text"/>
                <label htmlFor="address">Address</label>

                <input placeholder={client.address} type="text"/>
                <label htmlFor="Phone">Phone number</label>
                <input placeholder={client.phone ? client.phone : '11 22 33 44'} type="number"/>
                <label htmlFor="birth">Date of birth</label>
                <input placeholder={client.birth_date} type="text"/>
                <div className='checkboxDiv'>
                <input type="checkbox" name="Male" id="Male" checked={props.gender === 'M' && true}  onChange={() => handleGenderRadio("M")}/>
                <label className='Male' value='Male' htmlFor="Male" >Male</label>
                <input type="checkbox" value="Female" checked={props.gender === 'F' && true} name="Female" id="Female"  onChange={() => handleGenderRadio("F")}/>
                <label htmlFor="Female">Female</label>
                </div>
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
                  className="address-input"
                />
              </div>
              <div  className="allergies">
               Allergies:{" "}
                <textarea
                style={{height: !client.image ? '178px' : '138px'}}
                  type="text"
                  className="address-input"
                />
              </div>
        { !client.image ? 
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

export default Profile;
