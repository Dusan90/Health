import React from 'react'
import Nav from './Navbar'

const Header = () => {
    return (
        <div className="page-header">
            <h1><a href="/">Health Care</a> <small>Homepage</small></h1>
            <div className="row">
                <Nav />
            </div>
        </div>
    )
}

export default Header;



