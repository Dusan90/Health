import React, { Component } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Footer from "../../components/Main/Footer";
import { AiFillBug } from "react-icons/ai";

export class NotFound extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props, "bug props");
    // if (this.props.location.pathname !== this.props.match.params.path &&) {
    return (
      <div>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <div className="mainNotFoundDiv">
          <div className="bug">
            <AiFillBug />
            <h1>404</h1>
          </div>
          <h1>Page not found</h1>
          <h3>
            We're sorry, the page you requested could not be found.
            <br /> Please go back to the homepage.{" "}
          </h3>
        </div>
        <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
          <Footer />
        </div>
      </div>
    );
    // } else {
    //   return null;
    // }
  }
}

export default NotFound;
