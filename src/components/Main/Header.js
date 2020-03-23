import React from "react";
import "../../assets/main/header.scss";
import logo from "../../img/output-onlinepngtools.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to="/">
      <img src={logo} alt="logo" />
    </Link>
  );
};

export default Header;
