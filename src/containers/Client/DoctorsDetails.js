import React, { Component } from 'react'
import DoctorDetail from '../../components/Client/DoctorsDetails'
import Nav from "../../components/Main/Navbar";
import Header from "../../components/Main/Header";
import { HamburgerDiv } from "../../components/Main/HamburgerDiv";
import axios from 'axios'

export class DoctorsDetails extends Component {
    constructor(props){
        super(props)
        this.state ={
            doctor: [],
      token: sessionStorage.getItem("accessToken"),
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
    
            this.setState({ doctor: [response.data.data] });
          });
      };
    
      componentDidMount() {
        const id = this.props.match.params.id
        this.doctor(id);
        
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
        <DoctorDetail doctor={this.state.doctor}
          />
            </>
        )
    }
}

export default DoctorsDetails
