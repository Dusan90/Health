import React, { Component } from 'react';
import '../../App.css';
import Header from '../../components/Main/Header';
import RegisterUser from '../../components/Auth/Register';
import Nav from '../../components/Main/Navbar';

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
            npiNumValue: '',
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

    handleGender = (e) => {
        this.setState({genderValue: e.target.value});
    }

    handleAddress = (e) => {
        this.setState({addressValue: e.target.value});
    }

    handleBirthDate = (e) => {
        this.setState({birthDateValue: e.target.value});
    }

    handleNpiNum = (e) => {
        this.setState({npiNumValue: e.target.value});
    }

    handlePrefix = (e) => {
        this.setState({prefixValue: e.target.value});
    }

    handleSpec = (e) => {
        this.setState({specValue: e.target.value});
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
                <Header />
                <Nav />
                <input type="radio" name="userType" value="client" checked={this.state.userType === 'client' ? true : false} onChange={() => this.handleUserType('client')} style={{marginRight: 1 + 'em'}} />
                <input type="radio" name="userType" value="doctor" checked={this.state.userType === 'doctor' ? true : false} onChange={() => this.handleUserType('doctor')} style={{marginBottom: 2 + 'em'}} />
                <RegisterUser 
                    userType={this.state.userType}
                    emailVal={this.state.emailVal}
                    firstNameVal={this.state.firstNameVal}
                    lastNameVal={this.state.lastNameVal}
                    passwordValue={this.state.passwordValue}
                    genderValue={this.state.genderValue}
                    addressValue={this.state.addressValue}
                    birthDateValue={this.state.birthDateValue}
                    npiNumValue={this.state.npiNumValue}
                    prefixValue={this.state.prefixValue}
                    specValue={this.state.specValue}
                    submitValue={this.state.submitValue}
                    handleUserType={this.handleUserType}
                    handleEmail={this.handleEmail}
                    handleFirstName={this.handleFirstName}
                    handleLastName={this.handleLastName}
                    handlePass={this.handlePass}
                    handleGender={this.handleGender}
                    handleAddress={this.handleAddress}
                    handleBirthDate={this.handleBirthDate}
                    handleNpiNum={this.handleNpiNum}
                    handlePrefix={this.handlePrefix}
                    handleSpec={this.handleSpec}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

export default Register;