import React, { Component } from 'react';
import SideNav from '../../components/Main/SideNav';

class SideNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNav: false
        } 
        
    }

    openNavClick = e => {
        e.preventDefault()
        this.openNav()
      }

    closeNavClick = e => {
        e.preventDefault()
        this.closeNav()
    }

    openNav = () => {
        this.setState({
        showNav: true
        })
        document.addEventListener("keydown", this.handleEscKey)
    }

    closeNav = () => {
        this.setState({
        showNav: false
        })
        document.removeEventListener("keydown", this.handleEscKey)
    }

    handleEscKey = e => {
        if (e.key === "Escape") {
        this.closeNav()
        }
    }

    render() {
        const { showNav } = this.state
        let navCoverStyle = { width: showNav ? "100%" : "0" }
        let sideNavStyle = { width: showNav ? "250px" : "0" }

        return (
            <SideNav openNavClick={this.openNavClick} navCoverStyle={navCoverStyle} sideNavStyle={sideNavStyle}/>
       
        )
    }
}

export default SideNavbar;
    