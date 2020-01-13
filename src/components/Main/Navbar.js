import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../assets/main/navbar.scss';


const Nav = ({ register, login, handleLogout, isLoggedIn, handleDashboardDoctor, handleDashboardClient, handleDoctorProfile, handleClientProfile}) => {
    let dashboardLink = null;
    let profileLink = null;
    const isDoctor = sessionStorage.getItem('is_doctor')
    if (isDoctor === 'true') {
        dashboardLink = <Link to="/dashboard-doctor" classNane="doc-dash" onClick={() => handleDashboardDoctor}>Dashboard</Link>;
        profileLink = <Link to="/doctor/profile" classNane="doc-profile" onClick={handleDoctorProfile}>Profile</Link>;
    } else {
        dashboardLink = <Link to="/dashboard-client" classNane="cli-dash" onClick={() => handleDashboardClient}>Dashboard</Link>;
        profileLink = <Link to="/client/profile" classNane="cli-profile" onClick={handleClientProfile}>Profile</Link>;
    }
    return (
        <nav className="nav">        
            {!isLoggedIn &&
            <ul className="nav navbar-nav navbar-right">
                <li className="li-reg"><Link to="/register" onClick={register} className="register">Sign Up</Link></li>
                <li className="li-log"><Link to="/login" onClick={login} className="login">Log In</Link></li>
            </ul> 
            }
            {isLoggedIn && 
            <ul className="nav navbar-nav navbar-right">
                <li>{dashboardLink}</li>
                <li>{profileLink}</li>
                <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li>
            </ul>    
            }
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