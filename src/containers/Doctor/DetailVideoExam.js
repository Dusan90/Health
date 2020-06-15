import React, { Component } from "react";
import axios from "axios";
// import { connect } from "react-redux";
import DetailVideo from "../../components/Doctor/DetailVideoExam";
import Footer from "../../components/Main/Footer";
const connection = new WebSocket("wss://healthcarebackend.xyz/ws/video");
const options = [
  { value: "Accept", label: "Accept" },
  { value: "Decline", label: "Decline" },
];

class DetailVideoExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      statusValue: "",
      selectedStatus: "",
      token: sessionStorage.getItem("accessToken"),
      id: "",
      connected: false,
      startVideo: false,
      clientsVideoId: "",
      doctorsVideoId: "",
      value: "",
      width: 700,
      height: 500,
      x: -115,
      y: 0,
      hover: false,
      showChat: false,
      video: true,
      audio: true,
    };
  }

  handleConnect = (e) => {
    e.preventDefault();
    this.setState({ connected: true });
    this.testwebsocket();
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

        document
          .getElementById("DoctorStartVideo")
          .addEventListener("click", () => {
            if (this.state.clientsVideoId !== null) {
              peer.signal(this.state.clientsVideoId);
            }
          });

        document.getElementById("send").addEventListener("click", function () {
          var yourMessage = document.getElementById("yourMessage").value;
          peer.send(yourMessage);
        });

        connection.onclose = () => {
          console.error("disconnected");
        };

        connection.onerror = (error) => {
          console.error("failed to connect", error);
        };

        connection.onmessage = (event) => {
          console.log("received", event.data);
          this.setState({ clientsVideoId: event.data });
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
          this.handleDivClose();
        });

        document.querySelector(".icon2").addEventListener("click", () => {
          peer.destroy();
          this.handleDivClose();
        });
        document.querySelector(".iconPhone").addEventListener("click", () => {
          peer.destroy();
          this.handleDivClose();
        });
      },
      function (err) {
        console.error(err);
      }
    );

  handleDivClose = () => {
    this.setState({ startVideo: false });
  };

  cutMic = () => {
    this.setState({ audio: !this.state.audio });
  };

  cutVideo = () => {
    this.setState({ video: !this.state.video });
  };

  showAndHideChat = () => {
    this.setState({ showChat: !this.state.showChat });
  };

  handleDivSize = () => {
    this.setState({
      width: document.body.offsetWidth,
      height: document.body.offsetHeight,
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

  detail = async (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    await axios
      .get(`https://healthcarebackend.xyz/api/web/doctor/${id}`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        this.setState({ exam: this.state.exam.concat(response.data.data) });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let id = this.props.match.params.id;
    this.props.history.push("/dashboard-doctor");

    this.doctorExam(id);
  };

  handleLink = () => {
    this.props.history.push(`/doctor/exam/correspondence/${this.state.id}`);
  };

  handleLinkMessage = () => {
    this.props.history.push(`/doctor/exam/message/${this.state.id}`);
  };

  handleStatus = (statusValue) => {
    this.setState({ statusValue });
    let { value, label } = statusValue;
    this.setState({ selectedStatus: value });
  };

  doctorExam = async (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    const client = await fetch(
      `https://healthcarebackend.xyz/api/web/doctor/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify({
          state: this.state.selectedStatus,
        }),
      }
    );
    const jsonData = await client.json();

    return jsonData;
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({ id: id });
    this.detail(id);
    connection.onopen = () => {
      console.log("connected");
    };
  }

  render() {
    return (
      <>
        <DetailVideo
          exam={this.state.exam}
          status={options}
          handleStatus={this.handleStatus}
          submitValue={this.state.submitValue}
          handleSubmit={this.handleSubmit}
          handleLink={this.handleLink}
          handleLinkMessage={this.handleLinkMessage}
          props={this.state}
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

export default DetailVideoExam;
