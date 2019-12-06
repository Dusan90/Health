import React from 'react'

const RegisterUser = ({
    userType,
    emailVal,
    firstNameVal, 
    lastNameVal,
    passwordValue,
    genderValue, 
    addressValue,
    birthDateValue,
    npiNumValue,
    prefixValue,
    specValue,
    submitValue,
    handleUserType,
    handleEmail, 
    handleFirstName,
    handleLastName,
    handlePass,
    handleGender,
    handleAddress,
    handleBirthDate,
    handleNpiNum,
    handlePrefix,
    handleSpec,
    handleSubmit
}) => {

    return (
        <div className="row">
            <form className="form-horizontal">
            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="email" >Email:</label>
                <div className="col-sm-10">
                <input type="email" className="form-control" id="email" placeholder="Enter email" value={emailVal} onChange={handleEmail}/>
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="firstname">First Name:</label>
                <div className="col-sm-10"> 
                <input type="text" className="form-control" id="firstname" placeholder="Enter first name" value={firstNameVal} onChange={handleFirstName}/>
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="lastname">Last Name:</label>
                <div className="col-sm-10"> 
                <input type="text" className="form-control" id="lastname" placeholder="Enter last name" value={lastNameVal} onChange={handleLastName}/>
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
                <div className="col-sm-10"> 
                <input type="password" className="form-control" id="pwd" placeholder="Enter password" value={passwordValue} onChange={handlePass}/>
                </div>
            </div>
            {userType === 'client' && <div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="gender">Gender:</label>
                    <div className="col-sm-10"> 
                    <input type="text" className="form-control" id="gender" placeholder="Enter Gender" value={genderValue} onChange={handleGender}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="address">Address:</label>
                    <div className="col-sm-10"> 
                    <input type="text" className="form-control" id="address" placeholder="Enter address" value={addressValue} onChange={handleAddress}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="birthdate">Birth Date:</label>
                    <div className="col-sm-10"> 
                    <input type="date" className="form-control" id="birthdate" placeholder="Enter birth date" value={birthDateValue} onChange={handleBirthDate}/>
                    </div>
                </div>
            </div>}
            {userType === 'doctor' && <div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="npi">NPI number:</label>
                    <div className="col-sm-10"> 
                    <input type="number" className="form-control" id="npi" placeholder="Enter NPI number" value={npiNumValue} onChange={handleNpiNum}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="prefix">Prefix:</label>
                    <div className="col-sm-10"> 
                    <input type="text" className="form-control" id="prefix" placeholder="Enter prefix" value={prefixValue} onChange={handlePrefix}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="speciality">Speciality:</label>
                    <div className="col-sm-10"> 
                    <input type="text" className="form-control" id="speciality" placeholder="Enter speciality" value={specValue} onChange={handleSpec}/>
                    </div>
                </div>
            </div>
            }
            
            <div className="form-group"> 
                <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default" value={submitValue} onChange={handleSubmit}>Submit</button>
                </div>
            </div>
            </form>

        </div>
    )
}

export default RegisterUser;