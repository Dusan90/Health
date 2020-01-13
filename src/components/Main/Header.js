import React from 'react';
import '../../assets/main/header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <h3 className="name">
            <Link to="/" className="name-link">Health Care</Link>
        </h3>
    )
}

export default Header;



