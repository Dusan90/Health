import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Header from '../../components/Main/Header';
import LoginUser from '../../components/Auth/Login';
// import { isAuthenticated, authenticate,  unauthenticate} from '../../utils/auth';
import { userLogin, userLoggedIn } from '../../actions/authActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: '',
            passwordValue: '',
            submitted: false
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
            passwordValue: ''
          });
    }

    componentDidMount() {
        this.redirectUser();
    }

    redirectUser = () => {
        if (this.props.isLoggedIn) {
            this.props.history.push('/dashboard');
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
        console.log(jsonData);
        this.props.dispatch(userLogin(jsonData));
        if (jsonData.access_token) {
            this.props.dispatch(userLoggedIn());
            this.redirectUser();
        }
        return jsonData;
    }

    render() {
        return (
            <div className="container">
                <Header />
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
    const user = state.get('user');
    const isLoggedIn = state.get('isLoggedIn');
    return {
        user,
        isLoggedIn,
    }
  };

export default connect(mapStateToProps)(Login);
