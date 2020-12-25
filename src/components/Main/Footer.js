import React from "react";
import "../../assets/main/footer.scss";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { FiPhone } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="mainFooter">
        <ul className="contact">
          <h3>Contact</h3>
          <li>
            <GoMail className="mail" />
            Email: info@masspoint.rs
          </li>
          <li>
            <FiPhone className="phone" /> +381 60 000 4602
          </li>
          <li>
            <FiMapPin className="mapPin" />
            Kralja Milana 4,
            <br /> <span style={{marginLeft: '20px'}}>11000 Belgrade, Serbia</span>
          </li>
        </ul>
        <ul className="company">
          <h3>Company</h3>
          <li>
            <Link className="aboutClass" to="/">
              <span>About Us</span>
            </Link>
          </li>
          <li>
            <Link className="blockClass" to="/">
              <span>Privacy policy</span>
            </Link>
          </li>
          <li>
            <Link className="careersClass" to="/">
              <span>Terms and conditions</span>
            </Link>
          </li>
          <li>
            <Link className="faqClass" to="/">
              <span>FAQs</span>
            </Link>
          </li>
        </ul>

        <ul className="social">
          <h3>Social</h3>
          <div className="socialMedia">
            <div>
              <a href="/#">
                <FaInstagram className="insta" />
              </a>
            </div>
            <div>
              <a href="/#">
                <FaLinkedin className="linkedin" />
              </a>
            </div>
            <div>
              <a href="/#">
                <FaFacebookF className="facebook" />
              </a>
            </div>
            <div>
              <a href="/#">
                <FaTwitter className="twitter" />
              </a>
            </div>
          </div>
          <p>&copy; Copyright 2020 Health Care</p>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
