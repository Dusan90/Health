import React, { Component } from 'react'
import DoctorsLists from '../../components/Client/DoctorsList'
import Nav from "../../components/Main/Navbar";
import Header from "../../components/Main/Header";
import { HamburgerDiv } from "../../components/Main/HamburgerDiv";
import axios from 'axios'
import { NotificationManager } from "react-notifications";
import { doctor } from '../../actions/examActions';


export class DoctorsList extends Component {
    constructor(props){
        super(props)
        this.state ={
            doctors: [],
            speciality: [],
            specialities: '',
            specDoctor: [],
            filteredBySpec: [],
      token: sessionStorage.getItem("accessToken"),
        }
    }

    handleClient = (id) => {
        this.props.history.push(`/client/Doctor-detail/${id}`);
      };
    
      // handleSort = (e) => {
      //   if (e.target.value === "nameAZ") {
      //     let AZ = this.state.filteredByspec;
      //     let AZSort = AZ.sort((a, b) =>
      //       a.doctor > b.doctor ? 1 : a.doctor < b.doctor ? -1 : 0
      //     );
      //     this.setState({ filteredByspec: AZSort });
      //   } else if (e.target.value === "nameZA") {
      //     let ZA = this.state.filteredByspec;
      //     let ZASort = ZA.sort((b, a) =>
      //       b.doctor > a.doctor ? -1 : b.doctor < a.doctor ? 1 : 0
      //     );
      //     this.setState({ filteredByspec: ZASort });
      //   }
      // };

      // handleSortBySpec = (e) =>{
      //     console.log(e.target.value);
      //     const filter = this.state.doctors.filter((spec) =>{
      //         return spec.speciality === e.target.value
      //     })
      //     this.setState({filteredByspec: filter})
      // }
    
      // doctors = () => {
      //   const access_token = "Bearer ".concat(this.state.token);
    
      //   axios
      //     .get("https://healthcarebackend.xyz/api/doctor/list/", {
      //       headers: { Authorization: access_token },
      //     })
      //     .then((response) => {
      //       console.log(response);
      //       const speciality = response.data.data.map(spec =>{ return spec.speciality})
      //       const filteredSpeciality = speciality.filter((e, i, a) => a.indexOf(e) === i) 
      //       this.setState({ doctors: response.data.data, filteredByspec: response.data.data, speciality: filteredSpeciality });
      //     });
      // };
    
      // componentDidMount() {
      //   this.doctors();
      // }

      componentDidMount() {
        axios
          .get("https://healthcarebackend.xyz/api/specialities/")
          .then((response) => {
            console.log(response, "examform");
    
            const res = response.data.data.map((val) => {
              return { value: val.id, iD: val.speciality_id, label: val.name };
            });
            this.setState({ specialities: res });
          });
          axios
          .get("https://healthcarebackend.xyz/api/doctor/list/")
          .then((response) => {
            console.log(response, "examform2");
            if (response.data.data) {
              const res = response.data.data.map((val) => {
                return {
                  value: val.id,
                  iD: val.id,
                  label: val.doctor,
                  spec: val.speciality,
                  price: val.email_exam_price,
                  currency: val.email_currency,
                  image: val.image
                };
              });
              this.setState({ doctors: res });
            } else {
              NotificationManager.warning(
                `${response.data.message}`,
                "Failed!",
                2000
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      

      handleSpeciality = (e) => {
        console.log(e);
        let filteredDoctors = this.state.doctors.filter(
          (doctor) => doctor.spec === e.label
        );
        let filteredBySpec = this.state.doctors.filter(el => el.spec === e.label)
        this.setState({
          specialSP: e.value,
          specDoctor: filteredDoctors,
          resetDoctorSelect: null,
          filteredBySpec
        });
      };

      handleDoctor = (e) => {
        console.log(e);
        const docsSpec = this.state.specialities.filter((spec) => {return spec.label === e.spec})
        const filterbyDoctor = this.state.filteredBySpec.filter(el => {return el.label === e.label})
        console.log(docsSpec);
        this.setState({ resetDoctorSelect: e,
          specialSP: docsSpec[0].value,
          currentSpec: docsSpec[0].label,
          filteredBySpec: [e]
    
        });
      };
    render() {
      console.log(this.state.doctors);
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
          handleSpeciality={this.handleSpeciality}
          handleDoctor={this.handleDoctor}
          />
            </>
        )
    }
}

export default DoctorsList
