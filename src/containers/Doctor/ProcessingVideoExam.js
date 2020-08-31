import React, { Component } from "react";
import axios from "axios";
// import { connect } from "react-redux";
import Processing from "../../components/Doctor/ProcessingVideoExam";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Footer from "../../components/Main/Footer";

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
    };
  }

  detail = (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/queue/detail/${id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response);
        this.setState({ exam: this.state.exam.concat(response.data.data) });
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
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        var myVideo = document.createElement("video");
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
  };

  testwebsocket = () =>
    navigator.webkitGetUserMedia(
      {
        video: true,
        audio: true,
      },
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
        {
          document.getElementById("DoctorStartVideo") &&
            document
              .getElementById("DoctorStartVideo")
              .addEventListener("click", () => {
                if (this.state.clientsVideoId !== null) {
                  peer.signal(this.state.clientsVideoId);
                  var myVid = document.getElementById("myVid");
                  myVid.style.cssText =
                    "position: absolute; right: 0; bottom: -100px; width: 150px;";
                }
              });
        }

        document.getElementById("send").addEventListener("click", function () {
          var yourMessage = document.getElementById("yourMessage").value;
          peer.send(yourMessage);
        });

        connection.onclose = () => {
          console.error("disconnected");
          this.props.history.push("/dashboard-doctor");
          window.location.reload();
        };

        connection.onerror = (error) => {
          console.error("failed to connect", error);
        };

        document.querySelector("form").addEventListener("submit", (event) => {
          event.preventDefault();
          let message = document.querySelector("#yourMessage").value;
          connection.send(message);
          document.getElementById(
            "messages"
          ).innerHTML += `<p style='color:white ; text-align: left ;margin: 5px;display: table; white-space: initial ; background: blue; padding: 10px; border-radius: 10px'>${message}</p>`;
          this.setState({ value: "" });
        });

        peer.on("data", function (data) {
          document.getElementById(
            "messages"
          ).innerHTML += `<p style='color:black ; margin: 5px 0 5px auto; background: gainsboro ;display: table; white-space: initial; padding: 10px; border-radius: 10px'>${data}</p>`;
        });

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
          peer.destroy();
          this.handleDivClose();
          connection.close();
        });

        document.querySelector(".icon2").addEventListener("click", () => {
          peer.destroy();
          this.handleDivClose();
          connection.close();
        });
        document.querySelector(".iconPhone").addEventListener("click", () => {
          peer.destroy();
          this.handleDivClose();
          connection.close();
        });
      },
      function (err) {
        console.error(err);
      }
    );

  handleChange = (e) => {
    this.setState({ value: e.target.value });
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
    connection.close();
  }

  // statusSelecting = async (value) => {
  //   const access_token = "Bearer ".concat(this.state.token);
  //   console.log(value, "selected");
  //   const client = await fetch(
  //     `https://healthcarebackend.xyz/api/web/doctor/${id}/`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: access_token,
  //       },
  //       body: JSON.stringify({
  //         status: value,
  //       }),
  //     }
  //   );

  //   const jsonData = await client.json();
  //   console.log(jsonData);
  //   if (jsonData.success === true) {
  //     this.detail(this.props.match.params.id);
  //     let status = this.state.exam.map((exam) => {
  //       return exam.exam.status;
  //     });
  //     if (status === "Accept") {
  //       this.state.connectedall && this.handleConnect();
  //     }
  //   }
  //   return jsonData;
  // };

  componentDidMount() {
    let id = this.props.match.params.id;

    this.detail(id);
    connection.onopen = () => {
      console.log("connected");
      connection.send(JSON.stringify({ id: id, connectedDoctor: true }));
    };
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
        }
      }
      this.setState({ clientsVideoId: test.text });
    };
  }

  connectedAll = () => {
    this.setState({ connectedall: true });
    this.state.selectedStatus === "Accept" && this.handleConnect();
  };

  handleStatus = (statusValue) => {
    this.setState({ statusValue });
    let { value, label } = statusValue;
    console.log(value, label);
    this.setState({ selectedStatus: value });
    // this.handleCancel(value);
    this.state.connectedall && value === "Accept" && this.handleConnect();
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
        />
        <div className="footerr">
          <Footer />
        </div>
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

export default ProcessingVideoExam;
