import React from 'react';
import '../../assets/main/sideNav.scss';


const SideNav = ({ openNavClick, navCoverClick, closeNavClick, navCoverStyle, sideNavStyle }) => {
    return (
        <React.Fragment>
            <span onClick={openNavClick} class="open-nav">&#9776;</span>
            <div
                onClick={navCoverClick}
                class="nav-cover"
                style={navCoverStyle}
            />
            <div name="side-nav" class="side-nav" style={sideNavStyle}>
                <a href="/" onClick={closeNavClick} class="close-nav">&times;</a>
                <a href="/">About</a>
                <a href="/">Services</a>
                <a href="/">Clients</a>
                <a href="/">Contact</a>
            </div>
      </React.Fragment>
    )
}


export default SideNav;