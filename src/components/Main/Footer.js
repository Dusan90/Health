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
            Email: healthcare@info.com
          </li>
          <li>
            <FiPhone className="phone" /> +391 64 000 000
          </li>
          <li>
            <FiMapPin className="mapPin" />
            Kralja Milana 4,
            <br /> 11000 Belgrade, Serbia
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
              <span>Blog</span>
            </Link>
          </li>
          <li>
            <Link className="careersClass" to="/">
              <span>Careers</span>
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
