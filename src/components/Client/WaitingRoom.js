// import React from "react";
// import "../../assets/client/waitingRoom.scss";
// import Select from "react-select";
// // import CheckoutForm from "../../containers/Client/CheckoutForm";
// // import { Elements, StripeProvider } from "react-stripe-elements";
// // import { FaMicrophoneAltSlash } from "react-icons/fa";
// // import { FaMicrophoneAlt } from "react-icons/fa";
// // import { FaVideoSlash } from "react-icons/fa";
// // import { FaVideo } from "react-icons/fa";
// // import { FaPhoneSlash } from "react-icons/fa";
// // import { FaRegSquare } from "react-icons/fa";
// // import { FaRocketchat } from "react-icons/fa";
// // import { MdClose } from "react-icons/md";
// // import { Rnd } from "react-rnd";
// import RoomIcon from "../../icons/icon_Waiting_Room_blue.svg";
// import arrowAttach from '../../icons/attach_white.svg'

// // import iconWaitingBlue from '../../icons/icon_Waiting_Room_blue.svg'
// import iconVideoBlue from '../../icons/icon_Video_Appointment_blue.svg'
// // import moment from 'moment'
// import mute from '../../icons/videoIcons/mute.svg'
// import unmute from '../../icons/videoIcons/unmute.svg'
// import hangup from '../../icons/videoIcons/hang-up.svg'
// // import call from '../../icons/videoIcons/call.svg'
// import cameraoff from '../../icons/videoIcons/camera-off.svg'
// import cameraon from '../../icons/videoIcons/camera-on.svg'
// import ExtendScreen from '../../icons/videoIcons/Extend-screen.svg'
// import messageSend from '../../icons/newIconsForDesign/massage.svg'


// const WaitingRoom = ({
//   handleSpeciality,
//   handleDoctor,
//   handleSubject,
//   handleSubmit,
//   handleExitQueue,
//   handleVideoStart,
//   handleMessage,
//   props,
//   handleChange,
//   enableTipeing,
//   handleAttach,
//   handleAttach2,
//   iconsMouseOut,
//   iconsMouseOver,
//   handleDragDrop,
//   handleResize,
//   showAndHideChat,
//   handleDivSize,
//   cutVideo,
//   cutMic,
//   // showExtendScreenIcon,
//   resetValue,
//   handleKeyPress,
//   clearFile
// }) => {
//   const disabled = props.credits ? false : true;
//   const disabled2 = props.credits ? true : false;
//   const disabled3 = props.doctorStartedVideo ? false : true;
//   console.log(props.specDoctor);

//   const customStyles = {
//     control: (base, state) => ({
//       ...base,
//       height: "33px",
//       minHeight: '33px',
//       border: "1.7px solid #fa9551",
//       borderRadius: "10px",
//       width: "100%",
//       // marginLeft: "2px",
//       background: props.color && props.specialSP.length === 0 ? 'rgb(245, 192, 192)' : "white",
//       color: "#666666",
//       fontWeight: "500",
//       'div': {
//         display: 'flex',
//         alignSelf: 'center',
//         height: '33px'
//       }
//     }),

//     valueContainer: (provided, state) => ({
//       ...provided,
//       height: '33px',
//       padding: '6px'
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       textAlign: "center",
//       color:
//         state.data.status === "Away"
//           ? "#C7CD00"
//           : state.data.status === "Offline" && "red",
//     }),
//     placeholder: () => ({
//       fontWeight: '500',
//       color: '#666666',
//       heigth: '33px'
//     }),
//     input: (provided, state) => ({
//       ...provided,
//       margin: '0px',
//     }),
//     indicatorSeparator: state => ({
//       display: 'none',
//     }),
//     indicatorsContainer: (provided, state) => ({
//       ...provided,
//       height: '33px',
//       'div': {
//         padding: '5px',
//         alignSelf: 'center',
//         height: '33px'
//       }
//     }),

//     singleValue: () =>({
//     })
//   };
  
//   const customS = {
//     control: (base, state) => ({
//       ...base,
//       height: "33px",
//       minHeight: '33px',
//       border: "1.7px solid #fa9551",
//       borderRadius: "10px",
//       width: "100%",
//       // marginLeft: "2px",
//       background: props.color && !props.doctor_id ? 'rgb(245, 192, 192)' : "white",
//       color: "#666666",
//       fontWeight: "500",
//       'div': {
//         display: 'flex',
//         alignSelf: 'center',
//         height: '33px'
//       }
//     }),

//     valueContainer: (provided, state) => ({
//       ...provided,
//       height: '33px',
//       padding: '6px'
//     }),

//     placeholder: () => ({
//       fontWeight: '500',
//       color: '#666666',
//     }),

//     input: (provided, state) => ({
//       ...provided,
//       margin: '0px',
//     }),
//     indicatorSeparator: state => ({
//       display: 'none',
//     }),
//     indicatorsContainer: (provided, state) => ({
//       ...provided,
//       height: '33px',
//       'div': {
//         padding: '5px',
//         alignSelf: 'center',
//         height: '33px'
//       }
//     }),

//     singleValue: () =>({
//     })
//   };
//   return (
//     <>
//     <div className="exam" style={{ display: !props.startVideo ? "block" : "none",}}>
//       <div className="mainExam">
//         <div className="newVideo">
//           {/* <img src={RoomIcon} alt="video img" /> */}
//           <h4>Waiting room</h4>
//         </div>
//         <div className="exam-spec">
//           <Select
//             type="text"
//             id="speciality"
//             placeholder={
//               props.currentClient
//                 ? props.currentClient.speciality : 
//                 props.currentSpec ? props.currentSpec
//                 : "Select Speciality..."
//             }
//             options={props.specialities}
//             isDisabled={disabled2}
//             styles={customStyles}
//             onChange={handleSpeciality}
//           />
//         </div>
//         <div className="exam-doc">
//           <Select
//             style
//             styles={ customS}
//             type="text"
//             id="doctor"
//             placeholder={
//               props.currentClient
//                 ? props.currentClient.doctor_name
//                 : "Select Doctor..."
//             }
//             options={props.specDoctor.length === 0 ? props.doctors : props.specDoctor }
//             getOptionLabel={(option) => `${option.label}: (${option.status})`}
//             // isOptionDisabled={(option) =>
//             //   option.status !== "Available" ? true : false
//             // }
//             isDisabled={disabled2}
//             onChange={handleDoctor}

//             value={
//               props.resetDoctorSelect
//             //   props.specDoctor.length === 0 ? null : [props.resetDoctorSelect]
//             }
//           />
//         </div>
//         <div className="exam-sub">
//           <input
//             type="text"
//             className="form-control"
//             id="subject"
//             maxLength='35'
//             style={{background: props.color && !props.subject ? 'rgb(245, 192, 192)' : "white"}}
//             placeholder="Enter subject"
//             value={
//               props.currentClient ? props.currentClient.subject : props.subject
//             }
//             onChange={handleSubject}
//           />
//         </div>
//       </div>
//       <div className="queue">
//         <div className="exam-mes"
//         style={{background: props.color && !props.notes ? 'rgb(245, 192, 192)' : "white"}}
//         >
//           <textarea
//             type="text"
//             className="form-control"
//             id="exam-notes"
//             placeholder="Enter notes"
//             style={{background: props.color && !props.notes ? 'rgb(245, 192, 192)' : "white"}}

//             value={
//               props.currentClient ? props.currentClient.notes : props.notes
//             }
//             onChange={handleMessage}
//           />

//            <div className='mainDivForFile'>
//           <div className="upload-btn-wrapper">
//             <button className="btn">
//               <div className='attachDiv'><p>Add file</p></div>
//             </button>
//             <input type="file" id='useForCleaning' name="myfile" onChange={handleAttach} multiple />
//           </div>
//           {props.attachment && <div className='fileForDownload'><p>{props.attachment.name.substring(props.attachment.name.lastIndexOf('/') + 1)}</p><a onClick={clearFile} className='deleteB'>X</a></div>}
//           {/* {props.attachment && props.attachment.map(ex => <div key={ex.size} className='fileForDownload'><p >{ex.name}</p></div>)} */}

//           </div>
//         </div>
//         <div className="queueInfo">
//           <div className="queueMain">
//             <div className="statusQueue">
//               <p>Queue status</p>
//               <div>
//                 {props.credits && props.YourNumber === 0 ? (
//                   <h4
//                     style={{
//                       border: "1.7px solid #fa9551",
//                       color: "#fa9551",
//                       borderRadius: "10px",
//                     }}
//                   >
//                     Be Ready
//                   </h4>
//                 ) : props.credits ? (
//                   <h4
//                     style={{
//                       border: "1.7px solid green",
//                       color: "green",
//                       borderRadius: "10px",
//                     }}
//                   >
//                     In the queue
//                   </h4>
//                 ) : (
//                   <h4 style={{ border:" 1.7px solid red" ,
//                     borderRadius: "10px",
//                     color: "red"
//                   }}>Out of queue</h4>
//                 )}
//               </div>
//             </div>
//             <div className="timeEst">
//               <p>People before you</p>
//               <div>
//                 <p>Num</p>
//                 <h4>
//                   {!props.credits
//                     ? props.peopleInQueue.length
//                     : props.YourNumber}
//                 </h4>
//               </div>
//             </div>
//           </div>
//           {props.YourNumber === 0 && !props.doctorsVideoId && props.credits ? (
//             <p>Be ready, Waiting from Doctors connection...</p>
//           ) : null}
//         <div className='startandexit'>

//           <button
//         value={props.submitted}
//         disabled={disabled2}
//         className="send"
//         onClick={handleSubmit}
//       >
//         Enter queue
//       </button>
//           {/* <button onClick={handleVideoStart}>video</button> */}
//           <button
//             className="exitQueue"
//             onClick={handleExitQueue}
//             disabled={disabled}
//           >
//             Exit queue
//           </button>
//         </div>
//         {props.messageIfFinished && <p className='IfFinished'>{props.messageIfFinished}</p>  }
//         </div>
//       </div>
//       <div className='divAndAttach'>
//       {/* <input type="file" name="" id="file" /> */}
//       <button
//             id="StartVideo"
//             className='startThatChat'
//             disabled={disabled3}
//             style={{visibility: 'hidden'}}
//             onClick={handleVideoStart}
//           >
//             Start video
//           </button>
//       </div>
//       <div>
//       </div>
//     </div>

// <div className="detailExam"  style={{
//   display: props.startVideo ? "block" : "none",
//   padding: "0px 15px",
//   height: '550px',
//   marginBottom: '20px'

// }}>
//     <div className="iconVideooCall">
//         {/* <img src={iconVideoBlue} alt="email" /> */}
//         <p>Video call</p>{" "}
//       </div>
//       <div className="detail2">
//       <div id='videoChat' 
//       // onMouseEnter={showExtendScreenIcon} onMouseLeave={showExtendScreenIcon}
//       >
//         {/* <img src={ExtendScreen} style={{display: !props.showExtendScreen && 'none'}} className="extendScreen" alt="screen icon"/> */}

//         {/* <div id='videoo' >nesto tamo</div> */}

//         </div>
//         <div className='detailInfo2' id='detailInfo2'>
//         {/* <p className='ClientP'>
//           <span>Doctor:</span> {props.currentClient.doctor_name}
//         </p>  */}
//         <div className='MainDivForChat'>
//           <p>Chat</p>
//           <form
//     autoComplete="off"
//     action=""
//     id="form"
//   >
//     <pre id="messages"></pre>
//     <div className="inputMessage">
//       <textarea
//       style={{textIndent: props.attachment2 && '110px'}}
//         type="text"
//         placeholder="Type a message"
//         id="yourMessage"
//        value={props.value}
//         onChange={handleChange}
//         onMouseDown={enableTipeing}
//         onKeyPress={(e) =>{handleKeyPress(e)}}
//       ></textarea>
//     {props.attachment2 && <div className='fileForDownload'><p>{props.attachment2.name.substring(props.attachment2.name.lastIndexOf('/') + 1)}</p></div>}

//     </div>
//   </form>
//     </div> 
//     {/* <div className='mainDivForFile'>
//     <div className="upload-btn-wrapper">
//       <button className="btn">
//         <div className='attachDiv'><img src={arrowAttach} alt="slika"/></div>
//       </button>
//       <input type="file" name="myfile" onChange={handleAttach2} multiple />
//     </div> */}
//     {/* {{props.attachment && props.attachment.map(ex => <div key={ex.size} className='fileForDownload'><p >{ex.name}</p></div>)} */}

//     {/* </div>  */}
      
//       <button id="send" onClick={resetValue}>
//         <img src={messageSend} alt="messageImg"/>
//       </button>
//         </div>
     

   
//       </div>
//       <div className="MainIconsDiv">
//           <img src={mute}
//             className="iconMic"
//           alt="img" style={{ display: props.audio ? "none" : "block" }}
//         onClick={cutMic}/>
//           <img src={unmute}
//            className="iconMicUnmute"
//           alt="img" style={{ display: !props.audio ? "none" : "block" }}
//         onClick={cutMic}/>
//           {/* <img src={call} alt="img" style={{display: 'none' }}/> */}
//           <img src={hangup} alt="img" className="iconPhone"/>
//           <img src={cameraoff}
//           className="iconVideo"
//            alt="img" style={{ display: props.video ? "none" : "block" }}
//         onClick={cutVideo}/>
//           <img src={cameraon} alt="img" 
//         className="iconVideoShow"
//         style={{ display: !props.video ? "none" : "block" }}
//         onClick={cutVideo}/>
//           </div>  

//     </div>
//     </>
//   );
// };



// export default WaitingRoom;
