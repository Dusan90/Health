import React, { Component } from 'react';
import '../../App.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: 'client',
            emailValue: '',
            firstNameVal: '',
            lastNameVal: '',
            passwordValue: '',
            genderValue: '',
            addressValue: '',
            birthDateValue: '',
            npiNum: '',
            prefixValue: '',
            specValue: ''
        }
        
    }

    handleUserType = (userType) => {
        this.setState({userType});
    }

    handleEmail = (e) => {
        this.setState({emailValue: e.target.value});
    }

    handleFirstName = (e) => {
        this.setState({firstNameVal: e.target.value});
    }

    handleLastName = (e) => {
        this.setState({lastNameVal: e.target.value});
    }

    handlePass = (e) => {
        this.setState({passwordValue: e.target.value});
    }

    handleSubmit = (e) => {
        this.userRegister();
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {
            console.log('sss')
        }
    }

    userRegister = async () => {
        const data = await fetch('http://0.0.0.0:8000/api/auth/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email: this.state.emailValue,
                firstName: this.state.firstNameVal,
                lastName: this.state.lastNameVal,
                password: this.state.passwordValue,
            })
        });

        const jsonData = await data.json();
        console.log(jsonData);
        return jsonData;
    }
    

    render() {
        return (
            <div className="container">

                <div className="page-header">
                    <h1><a href="/">Health Care</a> <small>Registration</small></h1>
                </div>

                <div className="row">
                    <form className="form-horizontal">
                    <input type="radio" name="userType" value="client" checked={this.state.userType === 'client' ? true : false} onChange={() => this.handleUserType('client')} style={{marginRight: 1 + 'em'}} />
                    <input type="radio" name="userType" value="doctor" checked={this.state.userType === 'doctor' ? true : false} onChange={() => this.handleUserType('doctor')} style={{marginBottom: 2 + 'em'}} />
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="email" >Email:</label>
                        <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" placeholder="Enter email" value={this.state.emailVal} onChange={this.handleEmail}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="firstname">First Name:</label>
                        <div className="col-sm-10"> 
                        <input type="text" className="form-control" id="firstname" placeholder="Enter first name" value={this.state.firstNameVal} onChange={this.firstNameVal}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="lastname">Last Name:</label>
                        <div className="col-sm-10"> 
                        <input type="text" className="form-control" id="lastname" placeholder="Enter last name" value={this.state.lastNameVal} onChange={this.lastNameVal}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
                        <div className="col-sm-10"> 
                        <input type="password" className="form-control" id="pwd" placeholder="Enter password" value={this.state.passwordValue} onChange={this.passwordValue}/>
                        </div>
                    </div>
                    {this.state.userType === 'client' && <div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="gender">Gender:</label>
                            <div className="col-sm-10"> 
                            <input type="text" className="form-control" id="gender" placeholder="Enter Gender" value={this.state.genderValue} onChange={this.genderValue}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="address">Address:</label>
                            <div className="col-sm-10"> 
                            <input type="text" className="form-control" id="address" placeholder="Enter address" value={this.state.addressValue} onChange={this.addressValue}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="birthdate">Birth Date:</label>
                            <div className="col-sm-10"> 
                            <input type="date" className="form-control" id="birthdate" placeholder="Enter birth date" value={this.state.birthDateValue} onChange={this.birthDateValue}/>
                            </div>
                        </div>
                    </div>}
                    {this.state.userType === 'doctor' && <div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="npi">NPI number:</label>
                            <div className="col-sm-10"> 
                            <input type="number" className="form-control" id="npi" placeholder="Enter NPI number" value={this.state.npiNum} onChange={this.npiNum}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="prefix">Prefix:</label>
                            <div className="col-sm-10"> 
                            <input type="text" className="form-control" id="prefix" placeholder="Enter prefix" value={this.state.prefixValue} onChange={this.prefixValue}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="speciality">Speciality:</label>
                            <div className="col-sm-10"> 
                            <input type="text" className="form-control" id="speciality" placeholder="Enter speciality" value={this.state.specValue} onChange={this.specValue}/>
                            </div>
                        </div>
                    </div>
                    }
                    
                    <div className="form-group"> 
                        <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default" value={this.state.submitValue} onChange={this.submitValue}>Submit</button>
                        </div>
                    </div>
                    </form>

                </div>
            </div>
        );
    }
}

export default Register