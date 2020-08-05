import React, { Component } from "react";
import axios from "axios";
import DetailVideo from "../../components/Client/ClientVideoExamDetail";
import Footer from "../../components/Main/Footer";

const connection = new WebSocket("wss://healthcarebackend.xyz/ws/video/");
var Peer = require("simple-peer");

class ClientVideoExamDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      statusValue: "",
      selectedStatus: "",
      token: sessionStorage.getItem("accessToken"),
      id: this.props.match.params.id,
      appointedDate: "",
      YourNumber: null,
      doctorsVideoId: null,
      startVideo: false,
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

  handleVideoStart = (e) => {
    e.preventDefault();
    this.setState({ startVideo: true });
  };

  handleCancel = async () => {
    this.props.history.push("/dashboard-client");
    const access_token = "Bearer ".concat(this.state.token);
    let clientCancel = await fetch(
      `https://healthcarebackend.xyz/api/web/client/${this.state.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify({
          status: "Cancel",
        }),
      }
    );
    let jsonData = await clientCancel.json();
    console.log(jsonData);

    if (jsonData.success === true) {
      console.log("true");
    }

    return jsonData;
    // const access_token = "Bearer ".concat(this.state.token);
    // const doctor = await fetch(
    //   `https://healthcarebackend.xyz/api/web/client/${this.state.id}/`,
    //   {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: access_token,
    //     },
    //   }
    // );
    // const jsonData = await doctor.json();
    // // this.toRefund();

    // return jsonData;
  };

  detail = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/web/client/${this.state.id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          exam: this.state.exam.concat(response.data.data),
          appointedDate: response.data.data.appointed_date,
        });
      });
  };

  componentDidMount() {
    this.detail();
  }

  componentWillUnmount() {
    connection.close();
    window.location.reload();
  }

  UNSAFE_componentWillMount() {
    let id = this.props.match.params.id;

    connection.onopen = () => {
      console.log("connected");
      if (id) {
        connection.send(
          JSON.stringify({
            id: id,
            connectedClient: true,
          })
        );
      }
    };
    connection.onmessage = (event) => {
      let test = JSON.parse(event.data);
      console.log("received client", event.data);

      if (
        !this.state.doctorsVideoId &&
        JSON.parse(test.text).id !== id &&
        test.text !== "undefined"
      ) {
        this.setState({ doctorsVideoId: test.text });
        console.log(this.state.doctorsVideoId, "doctorrrr");
        this.socketStart();
      } else if (JSON.parse(test.text)) {
        if (
          JSON.parse(test.text).id === id &&
          JSON.parse(test.text).connectedDoctor
        ) {
          connection.send(
            JSON.stringify({
              id: id,
              connectedClient: true,
            })
          );
        }
      }
    };
  }

  socketStart = () =>
    navigator.webkitGetUserMedia(
      {
        video: true,
        audio: true,
      },
      (stream) => {
        // let id = Math.floor(Math.random() * 0xffffff).toString(16);
        // this.setState({ idToPush: id });
        var peer = new Peer({
          // initiator: window.location.hash === `#init`,
          trickle: false,
          stream: stream,
        });

        peer.on("signal", (data) => {
          let docId = JSON.stringify(data);
          connection.send(docId);
        });

        document.getElementById("StartVideo").addEventListener("click", () => {
          peer.signal(this.state.doctorsVideoId);
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
          window.location.reload();
        });

        document.querySelector(".icon2").addEventListener("click", () => {
          peer.destroy();
          this.handleDivClose();
          connection.close();
          window.location.reload();
        });
        document.querySelector(".iconPhone").addEventListener("click", () => {
          peer.destroy();
          this.handleDivClose();
          connection.close();
          window.location.reload();
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

  handleDivClose = () => {
    this.setState({ startVideo: false });
  };

  cutMic = () => {
    this.setState({ audio: !this.state.audio });
  };

  cutVideo = () => {
    this.setState({ video: !this.state.video });
  };

  render() {
    return (
      <>
        <DetailVideo
          exam={this.state.exam}
          handleCancel={this.handleCancel}
          props={this.state}
          handleVideoStart={this.handleVideoStart}
          handleChange={this.handleChange}
          enableTipeing={this.enableTipeing}
          iconsMouseOut={this.iconsMouseOut}
          iconsMouseOver={this.iconsMouseOver}
          handleDragDrop={this.handleDragDrop}
          handleResize={this.handleResize}
          showAndHideChat={this.showAndHideChat}
          handleDivSize={this.handleDivSize}
          cutVideo={this.cutVideo}
          cutMic={this.cutMic}
        />
        <div className="footerr">
          <Footer />
        </div>
      </>
    );
  }
}

export default ClientVideoExamDetail;
