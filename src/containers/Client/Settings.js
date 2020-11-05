import React, { Component } from 'react'
import Nav from "../../components/Main/Navbar";
import Header from "../../components/Main/Header";
import Setting from '../../components/Client/Settings';
import { HamburgerDiv } from '../../components/Main/HamburgerDiv';
import { NotificationManager } from "react-notifications";


export class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
          seePass: false,
          Email: '',
          Password: ''
        };
      }
      handleImage = () =>{
          this.setState({seePass: !this.state.seePass})

      }

      handleChange= (e) =>{
          this.setState({[e.target.id]: e.target.value})
      }

      userLogin = async () => {
        const data = await fetch("http://healthcarebackend.xyz/api/auth/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.state.Email,
            password: this.state.Password,
          }),
        });
    
        const jsonData = await data.json();
        console.log(jsonData);
        if(jsonData.password){
          NotificationManager.error(`${jsonData.password[0]}`, "Failed!", 3000);
        }else if(jsonData.email){
          NotificationManager.error(`${jsonData.email[0]}`, "Failed!", 3000);
        }else if(jsonData.success === false){
          NotificationManager.error('Invalid credentials', "Failed!", 3000);
        }else if(jsonData.success === true){
            this.props.history.push({
                pathname: '/client-update',
                state: { detail: 'client found' }
              })
        }    
      };
    render() {
        console.log(this.state.Password);
        return (
            <>
            <div className="header">
            <div>
              <Header />
              <Nav />
            </div>
          </div>
          <HamburgerDiv/>
          <Setting props={this.state} handleImage={this.handleImage} userLogin={this.userLogin} handleChange={this.handleChange}/>
          </>
        )
    }
}

export default Settings
