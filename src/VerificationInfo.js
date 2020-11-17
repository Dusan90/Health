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
export class VerificationInfo extends Component {
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

                <h1 style={divh1}>Verification Email sent</h1>
                <h3 style={{color: '#00aff0'}}>Click on the link in your verification email to complete registration</h3>
            </div>
            </>
        )
    }
}



export default VerificationInfo
