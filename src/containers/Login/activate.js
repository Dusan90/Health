import React, { Component } from "react";
import axios from "axios";
import Nav from "../../components/Main/Navbar";
import Header from "../../components/Main/Header";
import Footer from "../../components/Main/Footer";

export class activate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      message: "",
    };
  }

  getResponse = () => {
    axios
      .get(`http://healthcarebackend.xyz/api/auth/activate/${this.state.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ message: response.data.message });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getResponse();
  }
  render() {
    const H1style = {
      marginTop: "20%",
      color: "#4092c2",
    };
    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <div>
          <h3 style={H1style}>{this.state.message}</h3>
        </div>
        <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
          <Footer />
        </div>
      </>
    );
  }
}

export default activate;
