import React, { Component } from 'react';
import '../../App.css';
import Header from '../../components/Main/Header';
import RegisterUser from '../../components/Auth/Register';
import Nav from '../../components/Main/Navbar';
import axios from 'axios';

const options = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },
];

const style = {
    position: "relative",
    margin: "5px",
    left: "1px",
    top: "200px"
  };

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: 'client',
            emailValue: '',
            firstNameValue: '',
            lastNameValue: '',
            passwordValue: '',
            addressValue: '',
            birthDateValue: '',
            npiNumValue: '',
            prefixValue: '',
            specOptions: [],
            specValue: '',
            genderValue: '',
            selectedGenderValue: '',
            selectedSpecValue: ''
        }
        
    }

    handleUserType = (userType) => {
        this.setState({userType});
    }

    handleEmail = (e) => {
        this.setState({emailValue: e.target.value});
    }

    handleFirstName = (e) => {
        this.setState({firstNameValue: e.target.value});
    }

    handleLastName = (e) => {
        this.setState({lastNameValue: e.target.value});
    }

    handlePass = (e) => {
        this.setState({passwordValue: e.target.value});
    }

    handleGender = genderValue => {
        this.setState({genderValue})
        let {value, label} = genderValue;
        console.log(value, label);
        this.setState({selectedGenderValue: value});
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

    handleSpec = specValue => {
        this.setState({specValue});
        let {value, label} = specValue;
        console.log(value, label);
        this.setState({selectedSpecValue: value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.userRegister();
    }

    componentDidMount() {
        axios.get('http://0.0.0.0:8000/api/specialities/')
        .then(response => {
            console.log(response.data);
            const res = response.data.message.map((val) => {
                return {value: val.id, label: val.name}
            });
            console.log(res);
            this.setState({ specOptions: res });
        })
    }

    userRegister = async () => {
        if (this.state.userType === 'client') {
            const client = await fetch('http://0.0.0.0:8000/api/auth/register/client/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.emailValue,
                    first_name: this.state.firstNameValue,
                    last_name: this.state.lastNameValue,
                    password: this.state.passwordValue,
                    client: {
                        gender: this.state.selectedGenderValue,
                        address: this.state.addressValue,
                        birth_date: this.state.birthDateValue
                    }   
                })
            });
            this.props.history.push('/login');
            const jsonData = await client.json();
            console.log(jsonData);
            return jsonData;
        } else if (this.state.userType === 'doctor') {
            const doctor = await fetch('http://0.0.0.0:8000/api/auth/register/doctor/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.emailValue,
                    first_name: this.state.firstNameValue,
                    last_name: this.state.lastNameValue,
                    password: this.state.passwordValue,
                    doctor: {
                        npi_number: this.state.npiNumValue,
                        prefix: this.state.prefixValue,
                        speciality: this.state.selectedSpecValue
                    }
                    
                })
            });
            this.props.history.push('/login');
            const jsonData = await doctor.json();
            console.log(jsonData);
            return jsonData;
        }
    }
    

    render() {
        return (
            <div className="container">  
                <Header />
                <Nav />
                <input type="radio" name="userType" value="client" checked={this.state.userType === 'client' ? true : false} onChange={() => this.handleUserType('client')} style={style} />
                <input type="radio" name="userType" value="doctor" checked={this.state.userType === 'doctor' ? true : false} onChange={() => this.handleUserType('doctor')} style={style} />
                <RegisterUser 
                    userType={this.state.userType}
                    emailValue={this.state.emailValue}
                    firstNameValue={this.state.firstNameValue}
                    lastNameValue={this.state.lastNameValue}
                    passwordValue={this.state.passwordValue}
                    genderValue={this.state.genderValue}
                    genderOptions={options}
                    addressValue={this.state.addressValue}
                    birthDateValue={this.state.birthDateValue}
                    npiNumValue={this.state.npiNumValue}
                    prefixValue={this.state.prefixValue}
                    specValue={this.state.specValue}
                    specOptions={this.state.specOptions}
                    submitValue={this.state.submitValue}
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


// const mapStateToProps = state => {
//     const user = state.get('user');
//     const isLoggedIn = state.get('isLoggedIn');
//     return {
//         user,
//         isLoggedIn,
//     }
//   };

  export default Register;