import React, { Component } from 'react'
import DoctorsLists from '../../components/Client/DoctorsList'
import Nav from "../../components/Main/Navbar";
import Header from "../../components/Main/Header";
import { HamburgerDiv } from "../../components/Main/HamburgerDiv";
import axios from 'axios'

export class DoctorsList extends Component {
    constructor(props){
        super(props)
        this.state ={
            doctors: [],
            speciality: [],
            filteredByspec: [],
      token: sessionStorage.getItem("accessToken"),
        }
    }

    handleClient = (id) => {
        this.props.history.push(`/client/Doctor-detail/${id}`);
      };
    
      handleSort = (e) => {
        if (e.target.value === "nameAZ") {
          let AZ = this.state.filteredByspec;
          let AZSort = AZ.sort((a, b) =>
            a.doctor > b.doctor ? 1 : a.doctor < b.doctor ? -1 : 0
          );
          this.setState({ filteredByspec: AZSort });
        } else if (e.target.value === "nameZA") {
          let ZA = this.state.filteredByspec;
          let ZASort = ZA.sort((b, a) =>
            b.doctor > a.doctor ? -1 : b.doctor < a.doctor ? 1 : 0
          );
          this.setState({ filteredByspec: ZASort });
        }
      };

      handleSortBySpec = (e) =>{
          console.log(e.target.value);
          const filter = this.state.doctors.filter((spec) =>{
              return spec.speciality === e.target.value
          })
          this.setState({filteredByspec: filter})
      }
    
      doctors = () => {
        const access_token = "Bearer ".concat(this.state.token);
    
        axios
          .get("https://healthcarebackend.xyz/api/doctor/list/", {
            headers: { Authorization: access_token },
          })
          .then((response) => {
            console.log(response);
            const speciality = response.data.data.map(spec =>{ return spec.speciality})
            const filteredSpeciality = speciality.filter((e, i, a) => a.indexOf(e) === i) 
            this.setState({ doctors: response.data.data, filteredByspec: response.data.data, speciality: filteredSpeciality });
          });
      };
    
      componentDidMount() {
        this.doctors();
      }
    render() {
        return (
            <>
              <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <HamburgerDiv/>

                <DoctorsLists   
                props={this.state}
          handleClient={this.handleClient}
          handleSort={this.handleSort}
          handleSortBySpec={this.handleSortBySpec}
          />
            </>
        )
    }
}

export default DoctorsList
