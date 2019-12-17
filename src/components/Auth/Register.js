import React from 'react'
import Select from 'react-select';

const RegisterUser = ({
    userType,
    emailValue,
    firstNameValue, 
    lastNameValue,
    passwordValue,
    addressValue,
    birthDateValue,
    npiNumValue,
    prefixValue,
    genderOptions,
    genderValue,
    specOptions,
    specValue,
    submitValue,
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
                <input type="email" className="form-control" id="email" placeholder="Enter email" value={emailValue} onChange={handleEmail}/>
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-2">First Name:</label>
                <div className="col-sm-10"> 
                <input type="text" className="form-control" id="firstname" placeholder="Enter first name" value={firstNameValue} onChange={handleFirstName}/>
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-2">Last Name:</label>
                <div className="col-sm-10"> 
                <input type="text" className="form-control" id="lastname" placeholder="Enter last name" value={lastNameValue} onChange={handleLastName}/>
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
                    <label className="control-label col-sm-2">Gender:</label>
                    <div className="col-sm-10"> 
                        <Select type="text" id="gender" value={genderValue} options={genderOptions} onChange={handleGender}/>
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
                    <input type="text" pattern="[0-9]*" className="form-control" id="npi" placeholder="Enter NPI number" value={npiNumValue} onChange={handleNpiNum}/>
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
                        <Select type="text" id="speciality" value={specValue} options={specOptions} onChange={handleSpec}/>
                    </div>
                </div>
            </div>
            }
            
            <div className="form-group"> 
                <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default" value={submitValue} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            </form>

        </div>
    )
}

export default RegisterUser;