import React from 'react'
// import settings from '../../icons/icon_settings_blue.svg'
import '../../assets/updateSettings.scss'
import seen from '../../icons/password-seen.svg'
import hidden from '../../icons/password-hidden.svg'


function UpdateSettings({props, userLogin, handleChange, handleImage1, handleImage2}) {
    return (
        <div className="mainUpdate">
              <div className="iconVideo">
                {/* <img src={settings} alt="img" /> */}
                <h4>Update account</h4>{" "}
              </div>
              <div className="doctor">
                <label htmlFor="Password">New Password</label>
                <div>
                <input id='NewPassword'  type={props.seePass1 ? 'text' : "password"} autoComplete="off" value={props.NewPassword} onChange={handleChange}/>
                <img onClick={handleImage1}  src={props.seePass1 ? seen : hidden } alt="img"/>
                </div>
                <label htmlFor="Password">Confirm new Password</label>
                <div>
                <input id='ConfNewPassword'  value={props.ConfNewPassword} autoComplete="off" onChange={handleChange}  type={props.seePass2 ? 'text' : "password"}/>
                <img onClick={handleImage2}  src={props.seePass2 ? seen : hidden } alt="img"/>
                </div>
              <button onClick={userLogin}>Update</button>
              </div>
           
            </div>
    )
}

export default UpdateSettings
