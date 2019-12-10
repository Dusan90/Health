import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({ register, login, reset, logout, isLoggedIn }) => (
    <nav className="navbar navbar-default">
        <div className="container-fluid">                   
            <div className="navbar-collapse" id="bs-example-navbar-collapse-1">
                {!isLoggedIn &&
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/register" onClick={register}>Register</Link></li>
                    <li><Link to="/login" onClick={login}>Login</Link></li>
                </ul> 
                }
                {isLoggedIn &&
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/reset" onClick={reset}>Reset password</Link></li>
                    <li><Link to="/logout" onClick={logout}>Logout</Link></li>
                </ul>    
                }  
            </div>
        </div>
    </nav>
)

const mapStateToProps = state => {
    const user = state.get('user');
    const isLoggedIn = state.get('isLoggedIn');
    return {
        user,
        isLoggedIn,
    }
  };

export default connect(mapStateToProps)(Nav);