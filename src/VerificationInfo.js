import React, { Component } from 'react'
import cLogo from "./icons/c+.svg";


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
    padding: '10px'
    
}
const divh1={
    color: '#00aff0',
    marginBottom: '30px'
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
            <div style={divStyle}>
      <img src={cLogo} style={logo} alt="cLogo" />

                <h1 style={divh1}>Verification Email sent</h1>
                <h5 style={{color: '#00aff0'}}>Click on the link in your verification email to complete registration</h5>
            </div>
        )
    }
}



export default VerificationInfo
