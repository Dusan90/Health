import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { FaMicrophoneAltSlash } from "react-icons/fa";
// import { FaMicrophoneAlt } from "react-icons/fa";
import { FaVideoSlash } from "react-icons/fa";
// import { FaVideo } from "react-icons/fa";
import { FaPhoneSlash } from "react-icons/fa";

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
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
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

        document.querySelector(".iconVideo").addEventListener("click", () => {
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

  console.log(peers);

  return (
    <Container>
      <div
        style={{
          position: "relative",
          width: "50%",
          height: "300px",
        }}
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseOut={() => {
          setHovered(false);
        }}
      >
        <StyledVideo muted ref={userVideo} autoPlay playsInline />
        <div
          style={{
            display: hovered ? "flex" : "none",
            position: "absolute",
            zIndex: "5",
            width: "100%",
            top: "80%",
            justifyContent: "space-around",
          }}
        >
          <button
            style={{
              fontSize: "40px",
              width: "50px",
              height: "50px",
              color: "white",
              borderRadius: "50%",
              background: "transparent",
              border: "1px solid white",
            }}
            className="iconMic"
          >
            <FaMicrophoneAltSlash />
          </button>
          <button
            style={{
              fontSize: "40px",
              width: "50px",
              color: "white",
              border: "1px solid white",
              height: "50px",
              borderRadius: "50%",
              background: "transparent",
            }}
            className="iconPhone"
          >
            <FaPhoneSlash />
          </button>
          <button
            style={{
              fontSize: "40px",
              width: "50px",
              color: "white",
              border: "1px solid white",
              height: "50px",
              borderRadius: "50%",
              background: "transparent",
            }}
            className="iconVideo"
          >
            <FaVideoSlash />
          </button>
        </div>
      </div>
      {peers.map((peer, index) => {
        if (peer.readable) {
          return <Video key={index} peer={peer} />;
        }
      })}
    </Container>
  );
};

export default Room;
