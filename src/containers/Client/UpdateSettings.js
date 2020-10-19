import React, { Component } from 'react'
import Nav from "../../components/Main/Navbar";
import Header from "../../components/Main/Header";
import Update from '../../components/Client/UpdateSettings';
import { HamburgerDiv } from '../../components/Main/HamburgerDiv';
import { NotificationManager } from "react-notifications";



export class UpdateSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
          seePass: false,
          Email: '',
          Password: '',
          NewPassword: '',
          ConfNewPassword: '',
      token: sessionStorage.getItem("accessToken"),

        };
      }

      handleChange= (e) =>{
          this.setState({[e.target.id]: e.target.value})
      }

      componentDidMount() {
          if(!this.props.location.state){
            this.props.history.push('/client-settings')
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
            password: this.state.Password,
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
          <Update props={this.state} userLogin={this.userLogin} handleChange={this.handleChange}/>
          </>
        )
    }
}

export default UpdateSettings
