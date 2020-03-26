import React from "react";
import "../../assets/main/header.scss";
import logo1 from "../../img/LOGOHC-01.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to="/">
      <img src={logo1} alt="logo" />
    </Link>
  );
};

export default Header;
