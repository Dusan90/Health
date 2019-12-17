import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const isDoctor = sessionStorage.getItem('is_doctor')

const Nav = ({ register, login, reset, handleLogout, isLoggedIn, handleDashboardDoctor, handleDashboardClient}) => {
    let dashboardLink = null;
    if (isDoctor === 'true') {
        dashboardLink = <Link to="/dashboard-doctor" onClick={() => handleDashboardDoctor}>Dashboard</Link>;
    } else {
        dashboardLink = <Link to="/dashboard-client" onClick={() => handleDashboardClient}>Dashboard</Link>;
    }
    return (
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
                        <li>{dashboardLink}</li>
                        <li><Link to="/reset" onClick={reset}>Reset password</Link></li>
                        <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li>
                    </ul>    
                    }
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => {
    const user = state.get('user');
    const isLoggedIn = state.get('isLoggedIn');
    return {
        user,
        isLoggedIn,
    }
};

export default connect(mapStateToProps)(Nav);