import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const isDoctor = sessionStorage.getItem('is_doctor')

const Nav = ({ register, login, handleLogout, isLoggedIn, handleDashboardDoctor, handleDashboardClient, handleDoctorProfile, handleClientProfile}) => {
    let dashboardLink = null;
    let profileLink = null;
    if (isDoctor === 'true') {
        dashboardLink = <Link to="/dashboard-doctor" onClick={() => handleDashboardDoctor}>Dashboard</Link>;
        profileLink = <Link to="/doctor/profile" onClick={handleDoctorProfile}>Profile</Link>;
    } else {
        dashboardLink = <Link to="/dashboard-client" onClick={() => handleDashboardClient}>Dashboard</Link>;
        profileLink = <Link to="/client/profile" onClick={handleClientProfile}>Profile</Link>;
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
                        <li>{profileLink}</li>
                        <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li>
                    </ul>    
                    }
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => {
    const user = state.getIn(['authReducer', 'user']);
    const isLoggedIn = state.getIn(['authReducer', 'isLoggedIn']);
    return {
        user,
        isLoggedIn,
    }
};

export default connect(mapStateToProps)(Nav);