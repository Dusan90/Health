import React from 'react'
import Nav from './Navbar'

const Header = ({ register, login }) => {
    return (
        <div className="page-header">
            <h1><a href="/">Health Care</a> <small>Homepage</small></h1>
            <div className="row">
                <Nav register={register} login={login} />
            </div>
        </div>
    )
}

export default Header;



