import React, { Component } from "react";
import axios from "axios";
// import { connect } from "react-redux";
import DetailVideo from "../../components/Doctor/DetailVideoExam";
import { NotificationManager } from "react-notifications";
import { getJSDocThisTag } from "typescript";
// const connection = new WebSocket("wss://healthcarebackend.xyz/wss/video/");


class DetailVideoExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      statusValue: "",
      selectedStatus: "",
      token: sessionStorage.getItem("accessToken"),
      id: "",
      // connected: false,
      // startVideo: false,
      // clientsVideoId: "",
      // doctorsVideoId: "",
      value: "",
      // width: 700,
      // height: 500,
      // x: 0,
      // y: 0,
      // hover: false,
      // showChat: false,
      // video: true,
      // audio: true,
      // connectedall: false,
      declineReason: "",
      report: '',
      displayReport: false,
      showSaveButton: false,
      page: 1,
      PageonNav: '',
      clientID: '',
      currentFilterClicked: "",
      searchName: "",
      searchType: "",
      messageIfEmpty: "",
      paginatedExams: [],
      searchedUpcomingOrPast: [],
      exams: [],
      selectedFile: ''

    };
  }

  // handleConnect = (e) => {
  //   e.preventDefault();
  //   this.setState({ connected: true });
  //   this.testwebsocket();
  // };

  // handleVideoStart = (e) => {
  //   e.preventDefault();
  //   this.setState({ startVideo: true });
  // };

  // testwebsocket = () =>
  //   navigator.webkitGetUserMedia(
  //     {
  //       video: true,
  //       audio: true,
  //     },
  //     (stream) => {
  //       var Peer = require("simple-peer");
  //       // let id = Math.floor(Math.random() * 0xffffff).toString(16);
  //       // this.setState({ idToPush: id });
  //       var peer = new Peer({
  //         initiator: window.location.hash === `#init`,
  //         trickle: false,
  //         stream: stream,
  //       });

  //       peer.on("signal", (data) => {
  //         let docId = JSON.stringify(data);
  //         this.setState({ doctorsVideoId: docId });
  //         connection.send(this.state.doctorsVideoId);
  //         connection.send(null);
  //       });

  //       document
  //         .getElementById("DoctorStartVideo")
  //         .addEventListener("click", () => {
  //           console.log(this.state.clientsVideoId);
  //           if (this.state.clientsVideoId !== null) {
  //             peer.signal(this.state.clientsVideoId);
  //           }
  //         });

  //       document.getElementById("send").addEventListener("click", function () {
  //         var yourMessage = document.getElementById("yourMessage").value;
  //         peer.send(yourMessage);
  //       });

  //       connection.onclose = () => {
  //         console.error("disconnected");
  //       };

  //       connection.onerror = (error) => {
  //         console.error("failed to connect", error);
  //       };

  //       document.querySelector("form").addEventListener("submit", (event) => {
  //         event.preventDefault();
  //         let message = document.querySelector("#yourMessage").value;
  //         connection.send(message);
  //         document.getElementById(
  //           "messages"
  //         ).innerHTML += `<p style='color:white ; text-align: left ;margin: 5px;display: table; white-space: initial ; background: blue; padding: 10px; border-radius: 10px'>${message}</p>`;
  //         this.setState({ value: "" });
  //       });

  //       peer.on("data", function (data) {
  //         document.getElementById(
  //           "messages"
  //         ).innerHTML += `<p style='color:black ; margin: 5px 0 5px auto; background: gainsboro ;display: table; white-space: initial; padding: 10px; border-radius: 10px'>${data}</p>`;
  //       });

  //       let track = stream.getAudioTracks()[0];
  //       let cutVideo = stream.getVideoTracks()[0];
  //       document.querySelector(".iconMic").addEventListener("click", () => {
  //         track.enabled = !track.enabled;
  //       });

  //       document.querySelector(".iconVideo").addEventListener("click", () => {
  //         cutVideo.enabled = !cutVideo.enabled;
  //       });

  //       document
  //         .querySelector(".iconMicUnmute")
  //         .addEventListener("click", () => {
  //           track.enabled = !track.enabled;
  //         });

  //       document
  //         .querySelector(".iconVideoShow")
  //         .addEventListener("click", () => {
  //           cutVideo.enabled = !cutVideo.enabled;
  //         });

  //       peer.on("stream", (stream) => {
  //         const mediaStream = new MediaStream(stream);
  //         var video = document.createElement("video");
  //         video.classList.add("vid");
  //         var videoChat = document.getElementById("videoChat");
  //         videoChat.appendChild(video);
  //         video.srcObject = mediaStream;
  //         video.play();
  //       });

  //       peer.on("close", () => {
  //         this.handleDivClose();
  //         connection.close();
  //         window.location.reload();
  //       });

  //       document.querySelector(".icon2").addEventListener("click", () => {
  //         peer.destroy();
  //         this.handleDivClose();
  //         connection.close();
  //         window.location.reload();
  //       });
  //       document.querySelector(".iconPhone").addEventListener("click", () => {
  //         peer.destroy();
  //         this.handleDivClose();
  //         connection.close();
  //         window.location.reload();
  //       });
  //     },
  //     function (err) {
  //       console.error(err);
  //     }
  //   );

  // handleDivClose = () => {
  //   this.setState({ startVideo: false });
  // };

  // cutMic = () => {
  //   this.setState({ audio: !this.state.audio });
  // };

  // cutVideo = () => {
  //   this.setState({ video: !this.state.video });
  // };

  // showAndHideChat = () => {
  //   this.setState({ showChat: !this.state.showChat });
  // };

  // handleDivSize = () => {
  //   this.setState({
  //     width: window.screen.width,
  //     height: window.screen.height,
  //     x: 0,
  //     y: 0,
  //   });
  //   if (!document.fullscreenElement) {
  //     document.documentElement.requestFullscreen();
  //   } else {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //       this.setState({ width: 700, height: 500 });
  //     }
  //   }
  // };

  // handleChange = (e) => {
  //   this.setState({ value: e.target.value });
  // };
  // enableTipeing = (e) => {
  //   e.stopPropagation();
  // };

  // iconsMouseOver = () => {
  //   this.setState({ hover: true });
  // };

  // iconsMouseOut = () => {
  //   this.setState({ hover: false });
  // };

  // handleDragDrop = (d) => {
  //   this.setState({ x: d.x, y: d.y });
  // };

  // handleResize = (position, ref) => {
  //   let vide = document.getElementById("videoo");
  //   this.setState({
  //     width: vide.style.width,
  //     height: vide.style.height,
  //     ...position,
  //   });
  // };

  detail = async (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    await axios
      .get(`https://healthcarebackend.xyz/api/web/doctor/${id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response, 'test');
        this.setState({ exam: this.state.exam.concat(response.data.data), 
          clientID: response.data.data.client_id
         });
         this.record(response.data.data.client_id)
         this.clientsExams(response.data.data.client_id)
         let mess = document.getElementById('messageMainText')
         let messageDiv = document.querySelector('.messageDiv')
         console.log(mess);
         if(mess.scrollHeight < 300){
           mess.style.height = `${mess.scrollHeight}px`
           messageDiv.style.height = `${mess.scrollHeight + 60}px` 
         }else{
           mess.style.height = '300px'
         }
      });
  };

  handleSubmit = (value) => {
    if(value !== 'Decline'){
      this.doctorExam( value);
    }
  };

  handleStatus = (statusValue) => {
    this.setState({ statusValue });
    let { value } = statusValue;
    console.log(value);
    this.setState({ selectedStatus: value });
    this.handleSubmit(value);
  };

  doctorExam = async ( value) => {
    // const access_token = "Bearer ".concat(this.state.token);
    // const client = await fetch(
    //   `https://healthcarebackend.xyz/api/web/doctor/${this.state.id}/`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: access_token,
    //     },
    //     body: JSON.stringify({
    //       status: value,
    //       decline_notes: this.state.declineReason,
    //       report: this.state.report,
    //       report_file: this.state.selectedFile
    //     }),
    //   }
    // );

    // const jsonData = await client.json();
    // console.log(jsonData);
    // if (jsonData.success === true) {
    //   if (jsonData.data.status !== "Declined" && jsonData.data.status !== "Finished") {
    //     this.props.history.push("/dashboard-doctor");
    //   }else{
    
    //     NotificationManager.success("Decline reason sent", "Successful!", 2000);
    //     window.location.reload()
    //   }
    // }
    // return jsonData;











    const access_token = "Bearer ".concat(this.state.token);
    let form_data = new FormData();

  form_data.append("status", value);
  form_data.append("decline_notes", this.state.declineReason);
  form_data.append("report", this.state.report);
  form_data.append("report_file", this.state.selectedFile);

  let url = `https://healthcarebackend.xyz/api/web/doctor/${this.state.id}/`;
  
  const data = axios.put(url, form_data, {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: access_token,
    }
  })
  
  
  const jsonData = await data;
  console.log(jsonData)
  if (jsonData.data.success === true) {
    if (jsonData.data.data.status !== "Declined" && jsonData.data.data.status !== "Finished") {
      this.props.history.push("/dashboard-doctor");
    }else{
  
      NotificationManager.success("Decline reason sent", "Successful!", 2000);
      window.location.reload()
    }
  }

  return data;












  };

  UNSAFE_componentWillMount() {
    // let id = this.props.match.params.id;
    // connection.onopen = () => {
    //   console.log("connected");
    //   connection.send(JSON.stringify({ id: id, connectedDoctor: true }));
    // };
    // connection.onmessage = (event) => {
    //   let test = JSON.parse(event.data);

    //   console.log("received doctor", event.data);
    //   if (JSON.parse(test.text)) {
    //     if (
    //       JSON.parse(test.text).id === id &&
    //       JSON.parse(test.text).connectedClient
    //     ) {
    //       this.connectedAll();
    //     }
    //   }
    //   this.setState({ clientsVideoId: test.text });
    // };
  }

  componentWillUnmount() {
    // connection.close();
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({ id: id, PageonNav: 'consultDetail' });
    this.detail(id);
  }

  // connectedAll = () => {
  //   this.setState({ connectedall: true });
  // };

  declineReason = (e)=>{
    this.setState({declineReason: e.target.value})
    if(e.target.scrollHeight < 300){
      e.target.style.height = `${e.target.scrollHeight}px`
    }else{e.target.style.height = '300px'}
    // e.target.style.height = `${e.target.scrollHeight}px`

  }

  saveReason = () =>{
    this.doctorExam(this.state.selectedStatus)
  }

  saveReport= () =>{
    let value = 'Finish'
    this.doctorExam(value)

  }

  // saveReport= async () =>{
  //   const access_token = "Bearer ".concat(this.state.token);
  //   const client = await fetch(
  //     `https://healthcarebackend.xyz/api/doctor/report/${this.state.clientID}/`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: access_token,
  //       },
  //       body: JSON.stringify({
  //         report: this.state.report
  //       }),
  //     }
  //   );

  //   const jsonData = await client.json();
  //   console.log(jsonData);
  //   return jsonData;
  // }

  report= (e) =>{
    this.setState({report: e.target.value})
    if(e.target.scrollHeight < 300){
      e.target.style.height = `${e.target.scrollHeight}px`
    }else{e.target.style.height = '300px'}
    // e.target.style.height = `${e.target.scrollHeight}px`
  }

  // handleReport = () =>{
  //     this.setState({displayReport: true})
  // } 


  handleJoinRoom = () => {
    // let id = uuid();
    // this.props.history.push(`/room/${this.props.match.params.id}`);
    window.open(`/room/${this.props.match.params.id}`);
  };

  handleshowSave = (e, value) =>{
    e.target.value = value
    this.setState({showSaveButton: true})
  }

  onChangeHandler = (e) => {
    this.setState({selectedFile: e.target.files[0]})
    // const propertyValues = Object.values(e.target.files);

    // this.setState({
    //   selectedFile: propertyValues,
    // });
  };

  handlePage = (value) =>{
     this.setState({PageonNav: value})
    let test = setInterval(() => {
      if(value === 'clientDetail'){
          let cronic = document.getElementById('ChronicalConditions')
         
          cronic.style.height = `${cronic.scrollHeight}px`
          console.log(cronic);
          let alerg = document.getElementById('Allergies')
          alerg.style.height = `${alerg.scrollHeight}px`
    
      }
      clearInterval(test)
    }, 200);
  }


















  
  record = (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `https://healthcarebackend.xyz/api/doctor/record/${id}/`
        ,
        {
          headers: { Authorization: access_token },
        }
      )
      .then((response) => {
        console.log(response, "nzm ni ja sta");
        this.handleAll();

        return this.setState({
          record:[ response.data.data],
        });
      })
      // .then(() =>{
      //   let cronic = document.getElementById('ChronicalConditions')
      //   cronic.style.height = `${cronic.scrollHeight}px`
      //   let alerg = document.getElementById('Allergies')
      //   alerg.style.height = `${alerg.scrollHeight}px`
      // })
  };

  clientsExams = (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `https://healthcarebackend.xyz/api/exams/client/${id}/list/`
        ,
        {
          headers: { Authorization: access_token },
        }
      )
      .then((response) => {
        console.log(response, "podaciiii");
        let AllArrays = response.data.data.mail.concat(response.data.data.queue, response.data.data.video)

        return this.setState({
          exams: AllArrays,
        });
      }).then(() =>{
        this.handleAll();
      })
  };


  handleAll = () => {
    let hndlAll = setInterval(() => {
      let all = this.state.exams;

      let resortall = all.sort(
        (a, b) => Date.parse(b.created) - Date.parse(a.created)
      );

      let messageIfEmpty = all.length === 0 ? "No consultations" : "";

      this.setState({
        upcomingOrPast: resortall,
        page: 1,
        messageIfEmpty,
        currentFilterClicked: "all",
        searchedUpcomingOrPast: [],
        filterFiltered: [],
        searchType: "",
        searchName: "",
      });

      this.paginate(1);
      clearInterval(hndlAll);
    }, 10);
  };

  paginate = (page) => {
    if (this.state.searchedUpcomingOrPast.length === 0) {
      let limit = 10;
      let pages = Math.ceil(this.state.upcomingOrPast.length / 10);
      const offset = (page - 1) * limit;
      const newArray = this.state.upcomingOrPast.slice(offset, offset + limit);

      this.setState({
        paginatedExams: newArray,
        loading: false,
        maxPages: pages,
      });
    } else {
      let limit = 10;
      let pages = Math.ceil(this.state.searchedUpcomingOrPast.length / 10);
      const offset = (page - 1) * limit;
      const newArray = this.state.searchedUpcomingOrPast.slice(
        offset,
        offset + limit
      );

      this.setState({
        paginatedExams: newArray,
        loading: false,
        maxPages: pages,
      });
    }
  };

  searchByType = (e) => {
    if (e.target.value === "" && this.state.searchName === "") {
      this.setState({ filterFiltered: [] });
    } else if (e.target.value === "" && this.state.searchName !== "") {
      this.setState({ filterFiltered: [] });
    }
    let letter = e.target.value.toLowerCase();
    this.setState({ searchType: letter });
    let callFunction = setInterval(() => {
      this.handlingSearchByType();
      clearInterval(callFunction);
    }, 10);
  };

  
  handlingSearchByType = () => {
    let searchedClient =
      this.state.filterFiltered.length === 0
        ? this.state.upcomingOrPast.filter((ex) => {
            const examType = ex.exam_type;
            if (
              examType.toLowerCase().indexOf(this.state.searchType) ===
              this.state.searchType.indexOf(this.state.searchType)
            ) {
              return ex;
            } else {
              return null;
            }
          })
        : this.state.filterFiltered.filter((ex) => {
            const examType = ex.exam_type;
            if (
              examType.toLowerCase().indexOf(this.state.searchType) ===
              this.state.searchType.indexOf(this.state.searchType)
            ) {
              return ex;
            } else {
              return null;
            }
          });
    let messageIfEmpty =
      searchedClient.length === 0
        ? "No Such Type"
        : searchedClient.length !== 0 &&
          this.state.messageIfEmpty !== "No Such Type"
        ? this.state.messageIfEmpty
        : "";
    this.state.filterFiltered.length === 0 &&
      this.setState({ filterFiltered: searchedClient });
    this.setState({
      searchedUpcomingOrPast: searchedClient,
      page: 1,
      messageIfEmpty,
    });
    this.paginate(1);
  };

  handleClick = (id, type) => {
    if (type === "mail") {
      this.props.history.push(`/doctor/exam/detail/${id}`);
    } else if (type === "video") {
      this.props.history.push(`/doctor/video/exam/detail/${id}/#init`);
    } else if (type === "queue") {
      this.props.history.push(`/doctor/processing/video/exam/${id}/#init`);
    }
  };

  ResetonSelectChange = () => {
    this.setState({ filterFiltered: [] });
  };

  handlePageChange = (pageNumber) => {
    this.setState({page: pageNumber});
    this.paginate(pageNumber)
  }



























  render() {
    return (
      <>
        <DetailVideo
          exam={this.state.exam}
          handleStatus={this.handleStatus}
          submitValue={this.state.submitValue}
          handleSubmit={this.handleSubmit}
          props={this.state}
          // handleConnect={this.handleConnect}
          // handleVideoStart={this.handleVideoStart}
          // handleChange={this.handleChange}
          // enableTipeing={this.enableTipeing}
          // iconsMouseOut={this.iconsMouseOut}
          // iconsMouseOver={this.iconsMouseOver}
          // handleDragDrop={this.handleDragDrop}
          // handleResize={this.handleResize}
          // showAndHideChat={this.showAndHideChat}
          // handleDivSize={this.handleDivSize}
          // cutMic={this.cutMic}
          // cutVideo={this.cutVideo}
          declineReason={this.declineReason}
          saveReason={this.saveReason}
          saveReport={this.saveReport}
          report={this.report}
          handleJoinRoom={this.handleJoinRoom}
          handleshowSave={this.handleshowSave}
          onChangeHandler={this.onChangeHandler}
          handlePage={this.handlePage}


          handleClick={this.handleClick}
          loading={this.state.loading}
          searchByType={this.searchByType}
          ResetonSelectChange={this.ResetonSelectChange}
          handlePageChange={this.handlePageChange}
          // handleReport={this.handleReport}
           // iconsMouseOut,
  // iconsMouseOver,
  // handleDragDrop,
  // handleResize,
  // showAndHideChat,
  // handleDivSize,
  // cutVideo,
  // cutMic,
  // handleChange,
  // enableTipeing,
  // submitValue,
  // handleSubmit,
  // handleConnect,
  // handleVideoStart,
        />
      </>
    );
  }
}

// const mapStateToProps = state => {
//   const examID = state.getIn(["examReducer", "examID"]);
//   return {
//     examID
//   };
// };

export default DetailVideoExam;
