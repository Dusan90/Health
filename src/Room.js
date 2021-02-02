import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import './assets/main/room.scss'
import styled from "styled-components";
import { FaMicrophoneAltSlash } from "react-icons/fa";
// import { FaMicrophoneAlt } from "react-icons/fa";
import { FaVideoSlash } from "react-icons/fa";
// import { FaVideo } from "react-icons/fa";
import { FaPhoneSlash } from "react-icons/fa";
import Header from "./components/Main/Header";
import Nav from "./components/Main/Navbar";
import { HamburgerDiv } from "./components/Main/HamburgerDiv";
import mute from './icons/videoIcons/mute.svg'
import unmute from './icons/videoIcons/unmute.svg'
import hangup from './icons/videoIcons/hang-up.svg'
import cameraoff from './icons/videoIcons/camera-off.svg'
import cameraon from './icons/videoIcons/camera-on.svg'



import * as mediasoupClient from "mediasoup-client";

// import {
//   types,
//   version,
//   detectDevice,
//   Device,
//   parseScalabilityMode,
// } from "mediasoup-client";

const handlerName = mediasoupClient.detectDevice();

if (handlerName) {
  console.log("detected handler: %s", handlerName);
} else {
  console.warn("no suitable handler found for current browser/device");
}

const Container = styled.div`
  padding: 5px 15px;
  margin: 110px auto 20px 360px;
  border-radius: 15px;
  display: flex;
  height: 650px;
  width: calc(100% - 480px);
  flex-wrap: wrap;
  background: #f2f2f2
`;

const StyledVideo = styled.video`
  height: 300px;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [mic, setMic] = useState(false);
  const [video, setVideo] = useState(false);

  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = props.match.params.roomID;

  useEffect(() => {
    socketRef.current = io.connect("wss://localhost:3000");
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        let track = stream.getAudioTracks()[0];
        let cutVideo = stream.getVideoTracks()[0];
        document.querySelector(".iconMic").addEventListener("click", () => {
          track.enabled = !track.enabled;
        });

        document.querySelector(".iconMicUnmute").addEventListener("click", () => {
          track.enabled = !track.enabled;
        });

        document.querySelector(".iconVideo").addEventListener("click", () => {
          cutVideo.enabled = !cutVideo.enabled;
        });

        document.querySelector(".iconVideoShow").addEventListener("click", () => {
          cutVideo.enabled = !cutVideo.enabled;
        });
      });

    document.querySelector(".iconPhone").addEventListener("click", () => {
      // peer.destroy();
      window.close();
    });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function cutMic() {
      setMic(!mic)
  }
  function cutVideo() {
      setVideo(!video)
  }

  console.log(peers);

  return (
    <>
    <div className="header">
    <div>
      <Header />
      <Nav />
    </div>
  </div>
  <HamburgerDiv />
    <Container>
      <div className='topBarDiv'><h4>Video Consultation Room</h4></div>
      <div
        style={{
          position: "relative",
          width: "70%",
          height: "540px",
          objectFit: 'cover'
        }}
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseOut={() => {
          setHovered(false);
        }}
      >
        <StyledVideo muted ref={userVideo} autoPlay playsInline />
        
      </div>
      <div className="MainIconsDiv">
                  <img src={mute}
                    className="iconMic"
                  alt="img" style={{ display: mic ? "none" : "block" }}
                onClick={cutMic}/>
                  <img src={unmute}
                   className="iconMicUnmute"
                  alt="img" style={{ display: !mic ? "none" : "block" }}
                onClick={cutMic}/>
                  {/* <img src={call} alt="img" style={{display: 'none' }}/> */}
                  <img src={hangup} alt="img" className="iconPhone"/>
                  <img src={cameraoff}
                  className="iconVideo"
                   alt="img" style={{ display: video ? "none" : "block" }}
                onClick={cutVideo}/>
                  <img src={cameraon} alt="img" 
                className="iconVideoShow"
                style={{ display: !video ? "none" : "block" }}
                onClick={cutVideo}/>
      </div> 
      {peers.map((peer, index) => {
        if (peer.readable) {
          return <Video key={index} peer={peer} />;
        }
      })}
         
    </Container>
    </>
  );
};

export default Room;
