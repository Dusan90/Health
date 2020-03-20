import React, { Component } from "react";
import Home from "../../components/Main/Home";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Footer from "../../components/Main/Footer";

class Main extends Component {
  constructor(props) {
    super(props);
    // this.state = {};
  }

  handleDashboardDoctor = () => {
    this.props.history.push("/dashboard-doctor");
  };

  handleDashboardClient = () => {
    this.props.history.push("/dashboard-client");
  };

  handleClients = () => {
    this.props.history.push("/doctors-clients");
  };

  render() {
    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <Home handleClients={this.handleClients} props={this.state} />
        <Footer />
      </>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     doctor: state.doctor
//   };
// };

export default Main;
