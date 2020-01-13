import React from 'react';
import '../../assets/main/footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="page-footer">
            <Link to="/" className="footer-name-link">Health Care</Link>
        </footer>
    )
}

export default Footer;
