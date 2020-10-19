import React from 'react'
import settings from '../../icons/icon_settings_blue.svg'
import '../../assets/client/updateSettings.scss'


function UpdateSettings({props, userLogin, handleChange}) {
    return (
        <div className="mainUpdateClient">
              <div className="iconVideo">
                <img src={settings} alt="img" />
                <p>Update account</p>{" "}
              </div>
              <div className="doctor">
                <label htmlFor="Email">Email</label>
                <input id='Email' placeholder="John" value={props.Email} onChange={handleChange}  type="text"/>
                <label htmlFor="Password">Password</label>
                <input id='Password' placeholder="**********" value={props.Password} onChange={handleChange}  type="password"/>
                <label htmlFor="Password">New Password</label>
                <input id='NewPassword' placeholder="**********" value={props.NewPassword} onChange={handleChange}  type="password"/>
                <label htmlFor="Password">Confirm new Password</label>
                <input id='ConfNewPassword' placeholder="**********" value={props.ConfNewPassword} onChange={handleChange}  type="password"/>
              </div>
              <button onClick={userLogin}>Update</button>
           
            </div>
    )
}

export default UpdateSettings
