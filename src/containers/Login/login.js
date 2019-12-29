import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header from '../../components/Main/Header';
import LoginUser from '../../components/Auth/Login';
import Nav from '../../components/Main/Navbar';
import { userLogin, userLoggedIn } from '../../actions/authActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: '',
            passwordValue: '',
            submitted: false,
            is_doctor: false
        } 
    }

    handleEmail = (e) => {
        this.setState({emailValue: e.target.value});
    }

    handlePassword = (e) => {
        this.setState({passwordValue: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.userLogin();
        this.setState({
            emailValue: '',
            passwordValue: '',
        });
    }

    redirectUser = () => {
        if (this.props.isLoggedIn) {
            if (this.state.is_doctor) {  
                this.props.history.push('/dashboard-doctor');
            }else{
                this.props.history.push('/dashboard-client');
            }
        }else{
            this.props.history.push('/login');
        }
    }

    userLogin = async () => {
        const data = await fetch('http://0.0.0.0:8000/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email: this.state.emailValue,
                password: this.state.passwordValue,
            })
        });

        const jsonData = await data.json();
        if (jsonData.is_doctor){
            this.setState({is_doctor: true});
        }else{
            this.setState({is_doctor: false});
        }
        this.props.dispatch(userLogin(jsonData));
        if (jsonData.data.access_token) {
            sessionStorage.setItem('accessToken', jsonData.data.access_token)
            sessionStorage.setItem('expiresIn', jsonData.data.expires_in)
            sessionStorage.setItem('is_doctor', jsonData.is_doctor)
            localStorage.setItem('refreshToken', jsonData.data.refresh_token)
            this.props.dispatch(userLoggedIn());
        }
        console.log(jsonData)
        this.redirectUser();
        return jsonData;
    }

    render() {
        return (
            <div className="container">
                <Header />
                <Nav />
                <LoginUser 
                    emailValue={this.state.emailValue}
                    passwordValue={this.state.passwordValue}
                    submitted={this.state.submitted}
                    handleEmail={this.handleEmail}
                    handlePassword={this.handlePassword}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const user = state.getIn(['authReducer', 'user']);
    const isLoggedIn = state.getIn(['authReducer', 'isLoggedIn']);
    console.log(isLoggedIn)
    return {
        user,
        isLoggedIn,
    }
  };

export default connect(mapStateToProps)(Login);
