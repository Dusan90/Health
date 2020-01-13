import React from 'react';
import '../../assets/main/sideNav.scss';


const SideNav = ({ openNavClick, navCoverClick, closeNavClick, navCoverStyle, sideNavStyle }) => {
    return (
        <div className="side">
            <span onClick={openNavClick} className="open-nav">&#9776;</span>
            <div onClick={navCoverClick} className="nav-cover" style={navCoverStyle}></div>
            <div className="side-nav" style={sideNavStyle}>
                <a href="/" onClick={closeNavClick} className="close-nav">&times;</a>
                <a href="/dashboard">Dashboard</a>
                <a href="/">Services</a>
                <a href="/">Clients</a>
                <a href="/">Contact</a>
            </div>
        </div>
      
    )
}


export default SideNav;