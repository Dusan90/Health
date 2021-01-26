import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Processing from "../../components/Doctor/ProcessingVideoExam";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import HamburgerDiv from '../../components/Main/HamburgerDiv'



const connection = new WebSocket("wss://healthcarebackend.xyz/ws/video/");
class ProcessingVideoExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      token: sessionStorage.getItem("accessToken"),
      connected: false,
      doctorsVideoId: "",
      clientsVideoId: "null",
      startVideo: false,
      value: "",
      width: 700,
      height: 500,
      x: 0,
      y: 0,
      hover: false,
      showChat: false,
      video: true,
      audio: true,
      connectedall: false,
      selectedStatus: "",
      connection: "",
      clientStatus: "",
      // showExtendScreen: false,
      extended: false,
      displayReport: false,
      declineReason: '',
      report: '',
      showSaveButton: false,
      PageonNav: '',
      page: 1,
      exams: [],
      record: null,
      id: this.props.match.params.id,
      currentFilterClicked: "",
      searchName: "",
      searchType: "",
      messageIfEmpty: "",
      paginatedExams: [],
      searchedUpcomingOrPast: [],
      clientID: '',
      selectedFile: ''
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.statusChanged === parseInt(this.props.match.params.id)) {
      this.detail(this.props.match.params.id);
    }
  }

  detail = (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/queue/detail/${id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          exam: [response.data.data],
          clientID: response.data.data.record.id,
          clientStatus: response.data.data.exam.status,
        });
        let mess = document.getElementById('messageMainText')
        let messageDiv = document.querySelector('.messageDiv')
        console.log(mess);
        if(mess.scrollHeight < 300){
          mess.style.height = `${mess.scrollHeight}px`
          messageDiv.style.height = `${mess.scrollHeight + 60}px` 
        }else{
          mess.style.height = '300px'
        }
        this.record();
    this.clientsExams()
      })
      .catch((error) => {
        error.response && error.response.data.message === "Bad request"
          ? this.props.history.push("/dashboard-doctor")
          : console.log(error.response);
      });
  };

  handleConnect = () => {
    // e.preventDefault();
    // this.setState({
    //   connected: true,
    //   //  startVideo: true
    // });
    this.testwebsocket();

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        var myVideo = document.createElement("video");
        let cutMYVideo = stream.getVideoTracks()[0];
        document.querySelector(".iconVideoShow").addEventListener("click", () => {  
            cutMYVideo.enabled = !cutMYVideo.enabled;
        });
        document.querySelector(".iconVideo").addEventListener("click", () => {  
          cutMYVideo.enabled = !cutMYVideo.enabled;
      });
        myVideo.id = "myVid";
        var videoChat = document.getElementById("videoChat");
        videoChat.appendChild(myVideo);
        myVideo.srcObject = stream;
        myVideo.play();
      });
  };

  handleVideoStart = (e) => {
    e.preventDefault();
    this.setState({ startVideo: true });
    connection.send(JSON.stringify("doctor is started video"));
  };

  testwebsocket = () => {
      
    navigator.mediaDevices.getUserMedia(
      {
        video: this.state.video,
        audio: this.state.audio,
      }).then(
      (stream) => {
        var Peer = require("simple-peer");
        // let id = Math.floor(Math.random() * 0xffffff).toString(16);
        // this.setState({ idToPush: id });
        var peer = new Peer({
          initiator: window.location.hash === `#init`,
          trickle: false,
          stream: stream,
        });

        peer.on("signal", (data) => {
          let docId = JSON.stringify(data);
          this.setState({ doctorsVideoId: docId });
          connection.send(this.state.doctorsVideoId);
          connection.send(null);
        });

        document.getElementById("DoctorStartVideo") &&
          document
            .getElementById("DoctorStartVideo")
            .addEventListener("click", () => {
              if (this.state.clientsVideoId !== null) {
                peer.signal(this.state.clientsVideoId);
                var myVid = document.getElementById("myVid");
                myVid.style.cssText =
                  "position: absolute; left: 45px; top: 40px; height: 140px; width: 170px; z-index: 20";
              }
            });

        document.getElementById("send").addEventListener("click", function () {
          var yourMessage = document.getElementById("yourMessage").value;
          peer.send(yourMessage);
        
          let message = document.querySelector("#yourMessage").value;
          connection.send(message);
          document.getElementById(
            "messages"
          ).innerHTML += `<p style='color: #666666  ;margin: 20px 0 5px auto;display: table; padding: 8px 5px; white-space: initial ; background: #e6e6e6; border-radius: 10px'><span>Doctor:</span>${message}</p>`;
          var objDiv = document.getElementById("messages");
          objDiv.scrollTop = objDiv.scrollHeight;
        });

        connection.onclose = () => {
          console.error("disconnected");
          // this.props.history.push("/dashboard-doctor");
          window.location.reload();
        };

        connection.onerror = (error) => {
          console.error("failed to connect", error);
        };

//         document.querySelector("form").addEventListener("submit", (event) => {
//           event.preventDefault();
//           let message = document.querySelector("#yourMessage").value;
//           connection.send(message);
//           document.getElementById(
//             "messages"
//           ).innerHTML += `<p style='color: #666666  ;margin: 5px auto 5px 0;display: table; white-space: initial ; background: #e6e6e6; border-radius: 10px'><span>Doctor:</span>${message}</p>`;
//           this.setState({ value: "" });
//           var objDiv = document.getElementById("messages");
// objDiv.scrollTop = objDiv.scrollHeight;
//         });

        peer.on("data", function (data) {
          document.getElementById(
            "messages"
          ).innerHTML += `<p style='color: #666666 ; margin: 20px auto 5px 0; background: #e6e6e6 ;display: table; padding: 8px 5px; white-space: initial; border-radius: 10px'><span>Client:</span>${data}</p>`;
          var objDiv = document.getElementById("messages");
          objDiv.scrollTop = objDiv.scrollHeight;
        });

        peer._pc.onconnectionstatechange = function(event) {
          console.log('status je promenje', event);
          if(event.currentTarget.connectionState === 'disconnected' || event.currentTarget.connectionState === "failed"){
            window.location.reload()
          }
        }

        let track = stream.getAudioTracks()[0];
        let cutVideo = stream.getVideoTracks()[0];
        document.querySelector(".iconMic").addEventListener("click", () => {
          track.enabled = !track.enabled;
        });

        document.querySelector(".iconVideo").addEventListener("click", () => {
          cutVideo.enabled = !cutVideo.enabled;
        });

        document
          .querySelector(".iconMicUnmute")
          .addEventListener("click", () => {
            track.enabled = !track.enabled;
          });

        document
          .querySelector(".iconVideoShow")
          .addEventListener("click", () => {
            cutVideo.enabled = !cutVideo.enabled;
          });

        peer.on("stream", (stream) => {
          const mediaStream = new MediaStream(stream);
          var video = document.createElement("video");
          video.classList.add("vid");
          var videoChat = document.getElementById("videoChat");
          videoChat.appendChild(video);
          video.srcObject = mediaStream;
          video.play();

        });

        peer.on("close", () => {
          // peer.destroy();
          this.handleDivClose();
          window.location.reload();
          // connection.close();
        });

        // document.querySelector(".icon2").addEventListener("click", () => {
        //   // peer.destroy();
        //   connection.send(JSON.stringify("Cancel Video From Doctor"));
        //   this.handleDivClose();
        //   window.location.reload();
        //   // connection.close();
        // });
        document.querySelector(".iconPhone").addEventListener("click", () => {
          // peer.destroy();
          // connection.close();
          connection.send(JSON.stringify("Cancel Video From Doctor"));
          window.location.reload();
          this.handleDivClose();
        });
      },
      function (err) {
        console.error(err);
      }
    )}

  handleChange = (e) => {    
    this.setState({ value: e.target.value });
    let inputMessage = document.querySelector(".inputMessage")
    if(e.target.value === ''){
      e.target.style.height = "30px";
    inputMessage.style.height = '30px'
    }else{
      e.target.style.height = "30px";
      inputMessage.style.height = '30px'
      e.target.clientHeight < e.target.scrollHeight && (e.target.style.height = (5 + e.target.scrollHeight)+"px")
      e.target.clientHeight < e.target.scrollHeight && (inputMessage.style.height = (5 + e.target.scrollHeight)+"px")
    }
  };
  enableTipeing = (e) => {
    e.stopPropagation();
  };

  iconsMouseOver = () => {
    this.setState({ hover: true });
  };

  iconsMouseOut = () => {
    this.setState({ hover: false });
  };

  handleDragDrop = (d) => {
    this.setState({ x: d.x, y: d.y });
  };

  handleResize = (position, ref) => {
    let vide = document.getElementById("videoo");
    this.setState({
      width: vide.style.width,
      height: vide.style.height,
      ...position,
    });
  };

  showAndHideChat = () => {
    this.setState({ showChat: !this.state.showChat });
  };

  handleDivSize = () => {
    this.setState({
      width: window.screen.width,
      height: window.screen.height,
      x: 0,
      y: 0,
    });
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        this.setState({ width: 700, height: 500 });
      }
    }
  };

  handleDivClose = () => {
    this.setState({ startVideo: false });
  };

  cutMic = () => {
    this.setState({ audio: !this.state.audio });
  };

  cutVideo = () => {
    this.setState({ video: !this.state.video });
  };

  componentWillUnmount() {
    // this.state.connection && connection.send(JSON.stringify("Cancel Video From Doctor"));
    // this._isMounted = false;
    // connection.close();
    window.location.reload()
    // this.handleDivClose();
  }

  statusSelecting = async (value) => {
    // const access_token = "Bearer ".concat(this.state.token);
    // const client = await fetch(
    //   `https://healthcarebackend.xyz/api/queue/detail/${this.props.match.params.id}/`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: access_token,
    //     },
    //     body: JSON.stringify({
    //       status: value,
    //       decline_notes: this.state.declineReason,
    //       report: this.state.report
    //     }),
    //   }
    // );

    // const jsonData = await client.json();
    // console.log(jsonData);
    // if (jsonData.success === true) {
    //   this.detail(this.props.match.params.id);
    //   jsonData.data.exam.status === "Accepted" &&
    //     this.state.connectedall &&
    //     this.handleConnect();
    //   jsonData.data.exam.status === "Finished" && window.location.reload();
    //   connection.send(
    //     JSON.stringify({
    //       id: this.props.match.params.id,
    //       status: jsonData.data.exam.status,
    //     })
    //   );
    // }
    // return jsonData;







    
    const access_token = "Bearer ".concat(this.state.token);
    let form_data = new FormData();

  form_data.append("status", value);
  form_data.append("decline_notes", this.state.declineReason);
  form_data.append("report", this.state.report);
  form_data.append("report_file", this.state.selectedFile);

  let url = `https://healthcarebackend.xyz/api/queue/detail/${this.props.match.params.id}/`;
  
  const data = axios.put(url, form_data, {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: access_token,
    }
  })
  
  
  const jsonData = await data;
  console.log(jsonData)
  if (jsonData.data.success === true) {
    this.detail(this.props.match.params.id);
    jsonData.data.data.exam.status === "Accepted" &&
      this.state.connectedall &&
      this.handleConnect();
    jsonData.data.data.exam.status === "Finished" && window.location.reload();
    connection.send(
      JSON.stringify({
        id: this.props.match.params.id,
        status: jsonData.data.data.exam.status,
      })
    );
  }

  return data;







  };
  

  componentDidMount() {
    
    let id = this.props.match.params.id;
    this.setState({PageonNav: 'consultDetail'})
    
    // let isItconnected = setInterval(() => {
    //   if (!this.state.connection && this.state.clientStatus === "Accepted") {
        // window.location.reload();
        console.log(connection.readyState, 'connection status');
        connection.readyState === 1 && connection.send(JSON.stringify({ id: id, connectedDoctor: true }));
        connection.onopen = () => {
      console.log("connected");
      this.setState({ connection: connection });
      connection.send(JSON.stringify({ id: id, connectedDoctor: true }));
    };
    //   }
    //   clearInterval(isItconnected);
    // }, 2000);

    this.detail(id);
    connection.onmessage = (event) => {
      let test = JSON.parse(event.data);
      console.log(test, "testonja");
      console.log("received doctor", event.data);
      if (
        JSON.parse(test.text) !== null &&
        JSON.parse(test.text).startingVideo
      ) {
        this.setState({ connected: true });
      } else if (JSON.parse(test.text)) {
        if (
          JSON.parse(test.text).id === parseInt(id) &&
          JSON.parse(test.text).connectedClient
        ) {
          this.connectedAll();
        } else if (JSON.parse(test.text) === "Cancel Video From Client") {
          this.handleDivClose();
          window.location.reload();
        }
      }
      this.setState({ clientsVideoId: test.text });
    };
    
  }

  connectedAll = () => {
    this.setState({ connectedall: true });
    this.state.clientStatus === "Accepted" && this.handleConnect();
  };

  handleStatus = (statusValue) => {
    this.setState({ statusValue });
    let { value, label } = statusValue;
    console.log(value, label);
    this.setState({ selectedStatus: value });
    // this.handleCancel(value);
    if(value !== 'Decline'){
      this.statusSelecting(value);
    }
  };

  // showExtendScreenIcon=()=>{
  //   this.setState({showExtendScreen: !this.state.showExtendScreen})
  // }

  extendScr= () =>{
    this.setState({extended: !this.state.extended})
    // let vidToBeChanged = document.querySelector('.vid')
  }

  declineReason = (e)=>{
    this.setState({declineReason: e.target.value})
    if(e.target.scrollHeight < 300){
      e.target.style.height = `${e.target.scrollHeight}px`
    }else{e.target.style.height = '300px'}
    // e.target.style.height = `${e.target.scrollHeight}px`

  }

  saveReason = () =>{
    this.statusSelecting(this.state.selectedStatus)
  }

  report= (e) =>{
    this.setState({report: e.target.value})
    if(e.target.scrollHeight < 300){
      e.target.style.height = `${e.target.scrollHeight}px`
    }else{e.target.style.height = '300px'}
    // e.target.style.height = `${e.target.scrollHeight}px`
  }

  saveReport= () =>{
    this.statusSelecting("Finish")

  }

  // handleReport = () =>{
  //   console.log('hy');
  //     this.setState({displayReport: true})
  // } 

  resetValue = () =>{
    this.setState({value: ''})
    let inputMessage = document.querySelector(".inputMessage")
    let yourMessage = document.getElementById("yourMessage")
    yourMessage.style.height = "30px";
  inputMessage.style.height = '30px'
  console.log('jel radi ovo');
  }

  handleKeyPress = (e) =>{
    if(e.key === "Enter"){
      e.preventDefault()
      document.getElementById('send').click()
      this.resetValue()
    }
  }

  handleshowSave = (e, value) =>{
    e.target.value = value
    this.setState({showSaveButton: true})
  }

  onChangeHandler = (e) => {
    // const propertyValues = Object.values(e.target.files);

    // this.setState({
    //   selectedFile: propertyValues,
    // });
    this.setState({selectedFile: e.target.files[0]})
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
    }, 100);
  }














































  record = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `https://healthcarebackend.xyz/api/doctor/record/${this.state.clientID}/`
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

  clientsExams = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `https://healthcarebackend.xyz/api/exams/client/${this.state.clientID}/list/`
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
    console.log(this.state.selectedFile);
    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <HamburgerDiv/>
        <Processing
          handleStatus={this.handleStatus}
          handleConnect={this.handleConnect}
          handleVideoStart={this.handleVideoStart}
          handleChange={this.handleChange}
          enableTipeing={this.enableTipeing}
          iconsMouseOut={this.iconsMouseOut}
          iconsMouseOver={this.iconsMouseOver}
          handleDragDrop={this.handleDragDrop}
          handleResize={this.handleResize}
          showAndHideChat={this.showAndHideChat}
          handleDivSize={this.handleDivSize}
          cutMic={this.cutMic}
          cutVideo={this.cutVideo}
          props={this.state}
          redirectThis={this}
          // showExtendScreenIcon={this.showExtendScreenIcon}
          extendScr={this.extendScr}
          declineReason={this.declineReason}
          saveReason={this.saveReason}
          report={this.report}
          saveReport={this.saveReport}
          // handleReport={this.handleReport}
          resetValue={this.resetValue}
          handleKeyPress={this.handleKeyPress}
          handleshowSave={this.handleshowSave}
          onChangeHandler={this.onChangeHandler}
          handlePage={this.handlePage}
          
          
          
          handleClick={this.handleClick}
          loading={this.state.loading}
          searchByType={this.searchByType}
          ResetonSelectChange={this.ResetonSelectChange}
          handlePageChange={this.handlePageChange}
        />

      </>
    );
  }
}

const mapStateToProps = (state) => {
  const statusChanged = state.getIn(["doctorStatusWRReducer", "statusChanged"]);
  return {
    statusChanged,
  };
};

export default connect(mapStateToProps)(ProcessingVideoExam);
