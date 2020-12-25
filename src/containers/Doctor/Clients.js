import React, { Component } from "react";
import Clients from "../../components/Doctor/Clients";
import axios from "axios";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import HamburgerDiv from "../../components/Main/HamburgerDiv";

export class DoctorsClients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      token: sessionStorage.getItem("accessToken"),
      filteredByName: []
    };
  }

  handleClient = (id) => {
    this.props.history.push(`/doctor/record/${id}`);
  };

  // handleSearch = (e) =>{
  //   this.setState({searchName: e.target.value})
  //   let callFunction = setInterval(() => {
  //     this.handlingSearchByName();
  //     clearInterval(callFunction);
  //   }, 10);
  // }

  // handleSort = (e) => {
  //   if (e.target.value === "nameAZ") {
  //     let AZ = this.state.upcomingandPast.length === 0 ? this.state.clients : this.state.upcomingandPast
  //     let AZSort = AZ.sort((a, b) =>
  //       a.client > b.client ? 1 : a.client < b.client ? -1 : 0
  //     );
  //     this.state.upcomingandPast.length === 0 && this.setState({ clients: AZSort });
  //     this.state.upcomingandPast.length !== 0 && this.setState({ upcomingandPast: AZSort });
  //     this.setState({ clients: AZSort });
  //   } else if (e.target.value === "nameZA") {
  //     let ZA = this.state.upcomingandPast.length === 0 ? this.state.clients : this.state.upcomingandPast
  //     let ZASort = ZA.sort((b, a) =>
  //       b.client > a.client ? -1 : b.client < a.client ? 1 : 0
  //     );
  //     this.state.upcomingandPast.length === 0 && this.setState({ clients: ZASort });
  //     this.state.upcomingandPast.length !== 0 && this.setState({ upcomingandPast: ZASort });
  //   }
  // };

  clients = () => {
    const access_token = "Bearer ".concat(this.state.token);

    axios
      .get("https://healthcarebackend.xyz/api/doctor/clients/", {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response, "examform2");
        if (response.data.data) {
          const res = response.data.data.map((val) => {
            return {
              value: val.id,
              iD: val.client_id,
              label: val.client,
              spec: val.speciality,
              price: val.email_exam_price,
              currency: val.email_currency,
              image: val.image,
              email: val.email
            };
          });
          this.setState({ clients: res });
        }
      })
  };


  // handlingSearchByName = () => {
  //   let searchName = this.state.searchName.toLowerCase().split(" ");
  //   let searchedClient = this.state.clients.filter((ex) => {
  //           const client = ex.client;
  //           const splited = client.split(" ");
  //           console.log(splited);
  //           if (!searchName[1]) {
  //             if (
  //               splited[0].toLowerCase().indexOf(searchName[0]) ===
  //                 searchName[0].indexOf(searchName[0]) ||
  //               splited[1].toLowerCase().indexOf(searchName[0]) ===
  //                 searchName[0].indexOf(searchName[0])
  //             ) {
  //               return ex;
  //             }
  //           } else {
  //             if (
  //               (splited[0].toLowerCase().indexOf(searchName[0]) ===
  //                 searchName[0].indexOf(searchName[0]) &&
  //                 splited[1].toLowerCase().indexOf(searchName[1]) ===
  //                   searchName[1].indexOf(searchName[1])) ||
  //               (splited[0].toLowerCase().indexOf(searchName[1]) ===
  //                 searchName[1].indexOf(searchName[1]) &&
  //                 splited[1].toLowerCase().indexOf(searchName[0]) ===
  //                   searchName[0].indexOf(searchName[0]))
  //             ) {
  //               return ex;
  //             }
  //           }
  //           return null;
  //         })
  //       console.log(searchedClient);
  //   let messageIfEmpty =
  //     searchedClient.length === 0
  //       ? "No Such Client"
  //       : "";
  //   this.setState({
  //     upcomingandPast: searchedClient,
  //     messageIfEmpty,
  //   });
  // };



  componentDidMount() {
    this.clients();
  }

  
  handleDoctor = (e) => {
    console.log(e);
    // const docsSpec = this.state.specialities.filter((spec) => {return spec.label === e.spec})
    // const filterbyDoctor = this.state.filteredBySpec.filter(el => {return el.label === e.label})
    let filteredByName = this.state.clients.filter(el => el.spec === e.label)
    this.setState({ resetDoctorSelect: e,
      // specialSP: docsSpec[0].value,
      // currentSpec: docsSpec[0].label,
      filteredByName: [e]

    });
  };
  render() {
    console.log(this.state.clients);

    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <HamburgerDiv />
        <Clients
          clients={this.state.clients}
          handleClient={this.handleClient}
          handleSort={this.handleSort}
          handleSearch={this.handleSearch}
          props={this.state}
          handleDoctor={this.handleDoctor}
        />
      </>
    );
  }
}

export default DoctorsClients;
