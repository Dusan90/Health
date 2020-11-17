import React, { Component } from 'react'
import cLogo from "./icons/c+.svg";
import Header from "./components/Main/Header";
import Nav from "./components/Main/Navbar";


const divStyle ={
    width: "37%",
    margin: '120px auto 0px auto',
    height: "500px",
    backgroundColor: "#f2f2f2",
    borderRadius: '15px',
    position: 'relative',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
    
}
const divh1={
    color: '#00aff0',
    marginBottom: '30px',
    fontWeight: '700'
}
const logo ={
    position: "absolute",
    width: "110px",
    right: "-30px",
    top: "-25px"
}

const buttonDiv = {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly'
}

const buttonStyle = {
    backgroundColor: 'rgb(0,175,240)',
    width: '100px',
    height: '35px',
    borderRadius: '10px',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600'

}
export class LogOutQuestion extends Component {
    constructor(props){
        super(props)
        this.state={}
    }

    logOut = () =>{
        this.props.history.push('/logout')
    }

    goBack = () =>{
        if(sessionStorage.getItem('is_doctor') === 'true'){
            this.props.history.push("/dashboard-doctor");
        }else{
        this.props.history.push("/dashboard-client");

        }
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
            <div style={divStyle}>
      <img src={cLogo} style={logo} alt="cLogo" />

                <h1 style={divh1}>Log out?</h1>
                <div style={buttonDiv}>
                    <button style={buttonStyle} onClick={this.logOut}>Yes</button>
                    <button style={buttonStyle} onClick={this.goBack}>No</button>
                </div>
            </div>
            </>
        )
    }
}



export default LogOutQuestion
