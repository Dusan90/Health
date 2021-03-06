import React, { Component } from 'react'
import DoctorDetail from '../../components/Client/DoctorsDetails'
import Nav from "../../components/Main/Navbar";
import Header from "../../components/Main/Header";
// import { HamburgerDiv } from "../../components/Main/HamburgerDiv";
import axios from 'axios'

export class DoctorsDetails extends Component {
    constructor(props){
        super(props)
        this.state ={
            doctor: [],
            startW: '',
            endW: '',
      token: sessionStorage.getItem("accessToken"),
      workingHoursArray: []
        }
    }

    doctor = (id) => {
        const access_token = "Bearer ".concat(this.state.token);
    
        axios
          .get(`https://healthcarebackend.xyz/api/client/doc/${id}/`, {
            headers: { Authorization: access_token },
          })
          .then((response) => {
            console.log(response.data.data);
            let start = response.data.data.start_hour ? response.data.data.start_hour.slice(0, -3) : ""
  let end = response.data.data.end_hour ? response.data.data.end_hour.slice(0, -3) : ""

    
            this.setState({ doctor: [response.data.data], startW: start, endW: end });
          }).then(() =>{
            const bioText = document.querySelector('.bioText')
            bioText.style.height = `${bioText.scrollHeight}px`
          })
      };
    
      componentDidMount() {
        const id = this.props.match.params.id
        this.doctor(id);
        this.workingHoursForDoctor(id)
      }

      workingHoursForDoctor = (id) =>{
        const access_token = "Bearer ".concat(this.state.token);
        
        axios
          .get(`https://healthcarebackend.xyz/api/client/schedule/${id}/`, {
            headers: { Authorization: access_token },
          })
          .then((response) => {
            console.log(response, 'noviapinovitesssssssssssssssssttttttttttttt');
            const sorted = response.data.data.sort((a,b) => a.day-b.day)
            this.setState({workingHoursArray: sorted})
          })
      }
    render() {
      console.log(this);
        return (
            <>
                     <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        {/* <HamburgerDiv/> */}
        <DoctorDetail doctor={this.state.doctor} props={this.state} main={this}
          />
            </>
        )
    }
}

export default DoctorsDetails
