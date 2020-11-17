// import React, { Component } from "react";
// import axios from "axios";
// import Nav from "../../components/Main/Navbar";
// import Header from "../../components/Main/Header";
// import Footer from "../../components/Main/Footer";

// export class activate extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       id: this.props.match.params.id,
//       message: "",
//     };
//   }

//   getResponse = () => {
//     axios
//       .get(`http://healthcarebackend.xyz/api/auth/activate/${this.state.id}`, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         this.setState({ message: response.data.message });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   componentDidMount() {
//     this.getResponse();
//   }
//   render() {
//     const H1style = {
//       marginTop: "20%",
//       color: "#4092c2",
//     };
//     return (
//       <>
//         <div className="header">
//           <div>
//             <Header />
//             <Nav />
//           </div>
//         </div>
//         <div>
//           <h3 style={H1style}>{this.state.message}</h3>
//         </div>
//         <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
//           <Footer />
//         </div>
//       </>
//     );
//   }
// }

// export default activate;

import React, { Component } from 'react'
import cLogo from "../../icons/c+.svg";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import axios from 'axios'


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

  
export class activate extends Component {
    constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      message: "",
    };
  }

  componentDidMount() {
    this.getResponse();
  }

    getResponse = () => {
    axios
      .get(`http://healthcarebackend.xyz/api/auth/activate/${this.state.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if(!response.data.success){
          this.setState({ message: response.data.message });
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
            <div style={divStyle}>
      <img src={cLogo} style={logo} alt="cLogo" />

                <h1 style={divh1}>{!this.state.message && 'Email confirmed!'}</h1>
                <h3 style={{color: '#00aff0'}}>{this.state.message ? this.state.message : "Click on Log in to access your account"}</h3>
            </div>
            </>
        )
    }
}



export default activate
