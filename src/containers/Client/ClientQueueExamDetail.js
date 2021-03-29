// import React, { Component } from "react";
// import axios from "axios";
// import DetailQueue from "../../components/Client/ClientQueueExamDetail";
// class ClientQueueExamDetail extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       exam: [],
//       id: "",
//       token: sessionStorage.getItem("accessToken"),
//     };
//   }

//   hanldeClientQueue = async (id) => {
//     const access_token = "Bearer ".concat(this.state.token);
//     axios
//       .get(`https://healthcarebackend.xyz/api/queue/client/${id}/detail/`, {
//         headers: { Authorization: access_token },
//       })

//       .then((response) => {
//         console.log(response, "queue");
//         this.setState({ exam: [response.data.data] });
//         let mess = document.getElementById('messageMainText')
//         let messageDiv = document.querySelector('.messageDiv')
//         let queue = document.getElementById('imageDiv1')
//         console.log(mess);
//         if(mess.scrollHeight > 100){
//           mess.style.height = `${mess.scrollHeight}px`
//           messageDiv.style.height = `${mess.scrollHeight + 60}px` 
//           queue.style.display = 'block'
//         }
//         if(response.data.data.exam.report){
//           let textare = document.querySelector('.reportTextForExtend')
//           console.log(textare.scrollHeight);
//           if(textare.scrollHeight <= 150){
//             let divsquare = document.getElementById('imageDiv2')
//             divsquare.style.display = 'none'
//           }
//         }else{ 
//           let divsquare = document.getElementById('imageDiv2')
//           divsquare.style.display = 'none'
//         }

//         if(response.data.data.exam.decline_notes){
//           let textare = document.querySelector('.reasonTextForExtend')
//           console.log(textare.scrollHeight);
//           if(textare.scrollHeight <= 150){
//             let divsquare = document.getElementById('imageDiv3')
//             divsquare.style.display = 'none'
//           }
//         }else{
//           let divsquare = document.getElementById('imageDiv3')
//           divsquare.style.display = 'none'
//         }
//         // else{
//         //   mess.style.height = '300px'
//         // }
//       })
//       .catch((error) => {
//         console.log(error.response);
//       });
//   };

//   handleExtendDiv = () =>{
//     let mess = document.getElementById('messageMainText')
//     let messageDiv = document.querySelector('.messageDiv')
//     let square = document.getElementById('imageDiv1')
//     console.log(mess);
//       if(mess.clientHeight > 100){
//         mess.style.height = '100px'
//         messageDiv.style.height = `${160}px`
//       }else{
//         mess.style.height = `${mess.scrollHeight}px`
//         messageDiv.style.height = `${mess.scrollHeight + 60}px`
//       }
// }

// extendreport= (e) =>{
//   console.log(e.target);
//   // const textar = document.getElementById('textarea')
//   let textar = document.querySelector('.reportTextForExtend')
//   console.log(textar.scrollHeight, textar.clientHeight);
//   if(textar.clientHeight === 150){
//     textar.style.height = `${textar.scrollHeight}px`
//   }else {
//     textar.style.height = '150px'
//   }
// }

// extendreport2= (e) =>{
//   console.log(e.target);
//   // const textar = document.getElementById('textarea')
//   let textar = document.querySelector('.reasonTextForExtend')
//   console.log(textar.scrollHeight, textar.clientHeight);
//   if(textar.clientHeight === 150){
//     textar.style.height = `${textar.scrollHeight}px`
//   }else {
//     textar.style.height = '150px'
//   }
// }

//   componentDidMount() {
//     this.setState({ id: this.props.match.params.id });
//     this.hanldeClientQueue(this.props.match.params.id);
//   }

//   render() {
//     return (
//       <>

//         <DetailQueue exam={this.state.exam} 
//         props={this.state} 
//         handleExtendDiv={this.handleExtendDiv}
//         extendreport={this.extendreport}
//         extendreport2={this.extendreport2} />
       
//       </>
//     );
//   }
// }

// export default ClientQueueExamDetail;
