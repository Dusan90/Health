import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from 'immutable';
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

                <div className="page-header">
                    <h1><a href="/">Health Care</a> <small>Login</small></h1>
                </div>
                
                <div className="row">

                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="email" placeholder="Enter email" value={this.state.emailValue} onChange={this.handleEmail}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
                        <div className="col-sm-10"> 
                            <input type="password" className="form-control" id="pwd" placeholder="Enter password" value={this.state.passwordValue} onChange={this.handlePassword}/>
                        </div>
                    </div>
                    <div className="form-group"> 
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default" value={this.state.submitted} onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </form>

                </div>

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
