import React from 'react'
// import settings from '../../icons/icon_settings_blue.svg'
import '../../assets/settings.scss'
import seen from '../../icons/password-seen.svg'
import hidden from '../../icons/password-hidden.svg'

function Settings({props, handleImage, userLogin, handleChange}) {
    return (
        <div className="mainSettings">
              <div className="iconVideo">
                {/* <img src={settings} alt="img" /> */}
                <h4>Settings</h4>{" "}
              </div>
              <div className="doctor">
                <label htmlFor="Email">Email</label>
                <input id='Email' value={props.Email} onChange={handleChange} autoComplete="off"  type="text"/>
                <label htmlFor="Password">Password</label>
                <div className='imageAndInputDiv'>
                <input id='Password' value={props.Password} onChange={handleChange} autoComplete="off"  type={props.seePass ? 'text' : "password"}/>
                <img onClick={handleImage}  src={props.seePass ? seen : hidden } alt="img"/>
                </div>
              <button onClick={userLogin}>Update</button>
              </div>
           
            </div>
    )
}

export default Settings
