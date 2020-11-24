import React, { Component } from 'react'
import Nav from "../../components/Main/Navbar";
import Header from "../../components/Main/Header";
import Update from '../../components/Doctor/UpdateSettings';
import { HamburgerDiv } from '../../components/Main/HamburgerDiv';
import { NotificationManager } from "react-notifications";


export class UpdateSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
          NewPassword: '',
          ConfNewPassword: '',
          seePass1: false,
          seePass2: false,
      token: sessionStorage.getItem("accessToken"),

        };
      }

      handleChange= (e) =>{
          this.setState({[e.target.id]: e.target.value})
      }

      handleImage1=()=>{
        this.setState({seePass1: !this.state.seePass1})
      }
      handleImage2=()=>{
        this.setState({seePass2: !this.state.seePass2})

      }

      componentDidMount() {
          if(!this.props.location.state){
            this.props.history.push('/doctors-settings')
          }
      }

      userLogin = async () => {
        const access_token = "Bearer ".concat(this.state.token);
        const data = await fetch("https://healthcarebackend.xyz/api/auth/password-change/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: access_token 
          },
          body: JSON.stringify({
new_password: this.state.NewPassword,
confirm_password: this.state.ConfNewPassword
          }),
        });
    
        const jsonData = await data.json();
        console.log(jsonData);  
        if(jsonData.success === false ){
      NotificationManager.error(`${jsonData.error}`, "Failed!", 2000);

        }else if(jsonData.success === true){
      NotificationManager.success(`${jsonData.message}`, "Successful!", 2000);
          this.props.history.push('/doctors-settings')
        }
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
          <HamburgerDiv/>
          <Update props={this.state} userLogin={this.userLogin} handleImage1={this.handleImage1} handleImage2={this.handleImage2} handleChange={this.handleChange}/>
          </>
        )
    }
}

export default UpdateSettings
