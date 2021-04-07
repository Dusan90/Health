import React, { useEffect, useState } from "react";
import {useLocation, useParams, useHistory} from 'react-router-dom'
import './assets/main/room.scss'
import Header from "./components/Main/Header";
import Nav from "./components/Main/Navbar";
import { HamburgerDiv } from "./components/Main/HamburgerDiv";
import mute from './icons/videoIcons/mute.svg'
import unmute from './icons/videoIcons/unmute.svg'
import hangup from './icons/videoIcons/hang-up.svg'
import cameraoff from './icons/videoIcons/camera-off.svg'
import cameraon from './icons/videoIcons/camera-on.svg'
import messageSend from './icons/newIconsForDesign/massage.svg'

import Peer from 'peerjs'



const Room = (props) => {
  const [mic, setMic] = useState(false);
  const [video, setVideo] = useState(false);
  const [value, setValue] = useState('')
 
  const doctor = sessionStorage.getItem("is_doctor")

  const location = useLocation()
  const params = useParams()
  const history = useHistory()


  if(doctor === 'true'){
  let peer = new Peer(location.state);

    peer.on('open', function(uid) {
      var connectedFirst = false
      console.log('My peer ID is: ' + uid);
      setTimeout(() => {
        var conn = !connectedFirst && peer.connect(params.roomID);
        conn && conn.on('open', function(){ 
            testFunction()
            const hangUp = document.querySelector(".iconPhone")
            hangUp && hangUp.addEventListener("click", () => {
              conn.close()
          });
       conn.on('close', function(){
        document.querySelector(".iconPhone").click()
      })

                const sendButton = document.getElementById("send")
                sendButton && sendButton.addEventListener("click", function () {
                  let message = document.querySelector("#yourMessage").value;
                  conn.send(message);
                  document.getElementById(
                    "messages"
                  ).innerHTML += `<p style='color: #666666  ;margin: 20px 0 5px auto;display: table; padding: 8px 5px; white-space: initial ; background: #e6e6e6; border-radius: 10px'><span>Doctor:</span>${message}</p>`;
                  var objDiv = document.getElementById("messages");
                  objDiv.scrollTop = objDiv.scrollHeight;
                });
  
                conn.on('data', function(data){ 
                    console.log(data);
                  document.getElementById(
                  "messages"
                ).innerHTML += `<p style='color: #666666 ; margin: 20px auto 5px 0; background: #e6e6e6 ;display: table; padding: 8px 5px; white-space: initial; border-radius: 10px'><span>Client:</span>${data}</p>`;
                var objDiv = document.getElementById("messages");
                objDiv.scrollTop = objDiv.scrollHeight; });
        })
      },500);
    



      peer.on('connection', function(conn) {
        connectedFirst = true
        conn.on('open', function(){
          testFunction()
          const hangUp = document.querySelector(".iconPhone")
          hangUp && hangUp.addEventListener("click", () => {
            conn.close()
        });
        conn.on('close', function(){
          document.querySelector(".iconPhone").click()
        })


            const sendButton = document.getElementById("send")
              sendButton && sendButton.addEventListener("click", function () {
 
              
                let message = document.querySelector("#yourMessage").value;
                conn.send(message);
                document.getElementById(
                  "messages"
                ).innerHTML += `<p style='color: #666666  ;margin: 20px 0 5px auto;display: table; padding: 8px 5px; white-space: initial ; background: #e6e6e6; border-radius: 10px'><span>Doctor:</span>${message}</p>`;
                var objDiv = document.getElementById("messages");
                objDiv.scrollTop = objDiv.scrollHeight;
              });

            conn.on('data', function(data) {
              console.log(data);
                document.getElementById(
                  "messages"
                ).innerHTML += `<p style='color: #666666 ; margin: 20px auto 5px 0; background: #e6e6e6 ;display: table; padding: 8px 5px; white-space: initial; border-radius: 10px'><span>Client:</span>${data}</p>`;
                var objDiv = document.getElementById("messages");
                objDiv.scrollTop = objDiv.scrollHeight;

            });
          })

          peer.on('call', (call) => {
            navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
              
              let cutMYVideo = stream.getVideoTracks()[0];
              let track = stream.getAudioTracks()[0];
              document.querySelector(".iconVideoShow").addEventListener("click", () => {  
                  cutMYVideo.enabled = !cutMYVideo.enabled;
              });
              document.querySelector(".iconVideo").addEventListener("click", () => {  
                cutMYVideo.enabled = !cutMYVideo.enabled;
            });
            document.querySelector(".iconMic").addEventListener("click", () => {
              track.enabled = !track.enabled;
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



              call.answer(stream);
              
              var video = document.querySelector('.vid')


              call.on('stream', (remoteStream) => {
                  video.srcObject = remoteStream;
              var playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                    
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }
              });
              const hangUp = document.querySelector(".iconPhone")
              hangUp && hangUp.addEventListener("click", () => {
                functionCaller(stream, peer, call)
            });
            }, (err) => {
              console.log('Failed to get local stream', err);
            });
          });
              

          });



          const testFunction = () =>{
            setTimeout(() => {
         console.log('ovde se video pokrene ikako je status true', connectedFirst);
 
         !connectedFirst && navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
          

                   let cutMYVideo = stream.getVideoTracks()[0];
                   let track = stream.getAudioTracks()[0];
                   document.querySelector(".iconVideoShow").addEventListener("click", () => {  
                       cutMYVideo.enabled = !cutMYVideo.enabled;
                   });
                   document.querySelector(".iconVideo").addEventListener("click", () => {  
                     cutMYVideo.enabled = !cutMYVideo.enabled;
                 });
                 document.querySelector(".iconMic").addEventListener("click", () => {
                  track.enabled = !track.enabled;
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
     
     
                   const call = peer.call(params.roomID, stream);
                
                   var video = document.querySelector('.vid')
                  
                   call.on('stream', (remoteStream) => {
                     video.srcObject = remoteStream;
                     var playPromise = video.play();
                      
     
                       if (playPromise !== undefined) {
                           playPromise.then(() => {
                     
                           })
                           .catch(error => {
                               console.log(error);
                           });
                       }
                   });
                   const hangUp = document.querySelector(".iconPhone")
                   hangUp && hangUp.addEventListener("click", () => {
                    functionCaller(stream, peer, call)

                 });
                 }, (err) => {
                   console.log('Failed to get local stream', err);
                 });
           }, 500);
          }
        });
      

 
  }else{
    var peer = new Peer(params.roomID);


    peer.on('open', function(id) {
      var connectedFirst = false

      console.log('My peer ID is: ' + id);
      setTimeout(() => {
        var conn = !connectedFirst && peer.connect(location.state);
        conn && conn.on('open', function(){
          testFunctionClient() 
          const hangUp = document.querySelector(".iconPhone")
          hangUp && hangUp.addEventListener("click", () => {
            conn.close()
        });
        conn.on('close', function(){
          document.querySelector(".iconPhone").click()
        })



          const sendButton = document.getElementById("send")
          sendButton && sendButton.addEventListener("click", function () {
          
            let message = document.querySelector("#yourMessage").value;
            conn.send(message);
            document.getElementById(
              "messages"
            ).innerHTML += `<p style='color: #666666  ;margin: 20px 0 5px auto;display: table; padding: 8px 5px; white-space: initial ; background: #e6e6e6; border-radius: 10px'><span>Client:</span>${message}</p>`;
            var objDiv = document.getElementById("messages");
            objDiv.scrollTop = objDiv.scrollHeight;
          });
  
          conn.on('data', function(data){ 
            console.log(data);
                document.getElementById(
            "messages"
          ).innerHTML += `<p style='color: #666666 ; margin: 20px auto 5px 0; background: #e6e6e6 ;display: table; padding: 8px 5px; white-space: initial; border-radius: 10px'><span>Doctor:</span>${data}</p>`;
          var objDiv = document.getElementById("messages");
          objDiv.scrollTop = objDiv.scrollHeight; });
  
        })
      }, 500);


 

    peer.on('connection', function(conn) {
      connectedFirst = true
      conn.on('open', function(){
        testFunctionClient()
        const hangUp = document.querySelector(".iconPhone")
        hangUp && hangUp.addEventListener("click", () => {
          conn.close()
          
      });
      conn.on('close', function(){
        document.querySelector(".iconPhone").click()
      })


        const sendButton = document.getElementById("send")
        sendButton && sendButton.addEventListener("click", function () {
        
        
          let message = document.querySelector("#yourMessage").value;
          conn.send(message);
          document.getElementById(
            "messages"
          ).innerHTML += `<p style='color: #666666  ;margin: 20px 0 5px auto;display: table; padding: 8px 5px; white-space: initial ; background: #e6e6e6; border-radius: 10px'><span>Client:</span>${message}</p>`;
          var objDiv = document.getElementById("messages");
          objDiv.scrollTop = objDiv.scrollHeight;
        });
          conn.on('data', function(data) {
            console.log(data);
            document.getElementById(
              "messages"
            ).innerHTML += `<p style='color: #666666 ; margin: 20px auto 5px 0; background: #e6e6e6 ;display: table; padding: 8px 5px; white-space: initial; border-radius: 10px'><span>Doctor:</span>${data}</p>`;
            var objDiv = document.getElementById("messages");
            objDiv.scrollTop = objDiv.scrollHeight;
      })
          });



          peer.on('call', (call) => {
              navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {

                let cutMYVideo = stream.getVideoTracks()[0];
                let track = stream.getAudioTracks()[0];
                document.querySelector(".iconVideoShow").addEventListener("click", () => {  
                    cutMYVideo.enabled = !cutMYVideo.enabled;
                });
                document.querySelector(".iconVideo").addEventListener("click", () => {  
                  cutMYVideo.enabled = !cutMYVideo.enabled;
              });
              document.querySelector(".iconMic").addEventListener("click", () => {
                track.enabled = !track.enabled;
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



                call.answer(stream); 
               
                var video = document.querySelector('.vid')


                call.on('stream', (remoteStream) => {
                    video.srcObject = remoteStream;
                var playPromise = video.play();
                
                  if (playPromise !== undefined) {
                      playPromise.then(() => {
                    
                      })
                      .catch(error => {
                          console.log(error);
                      });
                  }
                });
                const hangUp = document.querySelector(".iconPhone")
                hangUp && hangUp.addEventListener("click", () => {
                  functionCaller(stream, peer, call)
              });

              }, (err) => {
                console.log('Failed to get local stream', err);
              });
            });
         });

          
        const testFunctionClient = () =>{
          setTimeout(() => {
           console.log('ovde se video pokrene ikako je status true', connectedFirst);
           !connectedFirst &&  navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
           
             
               let cutMYVideo = stream.getVideoTracks()[0];
               let track = stream.getAudioTracks()[0];
               document.querySelector(".iconVideoShow").addEventListener("click", () => {  
                   cutMYVideo.enabled = !cutMYVideo.enabled;
               });
               document.querySelector(".iconVideo").addEventListener("click", () => {  
                 cutMYVideo.enabled = !cutMYVideo.enabled;
             });
             document.querySelector(".iconMic").addEventListener("click", () => {
              track.enabled = !track.enabled;
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
   
   
   
   
               const call = peer.call(location.state, stream);
              var video = document.querySelector('.vid')

              
               call.on('stream', (remoteStream) => {
                 video.srcObject = remoteStream;
                 var playPromise = video.play();
   
                   if (playPromise !== undefined) {
                       playPromise.then(() => {
                   
                       })
                       .catch(error => {
                           console.log(error);
                       });
                   }
               });
               const hangUp = document.querySelector(".iconPhone")
               hangUp && hangUp.addEventListener("click", () => {
                 functionCaller(stream, peer, call)
             });
             }, (err) => {
               console.log('Failed to get local stream', err);
             });
       }, 500);
        }


        });
      
  }

  const functionCaller =(stream, peer, call) =>{
    stream && stream.getTracks().forEach(track => track.stop())
    call && call.close()
    peer && peer.destroy()
    peer && peer.disconnect()
  }


  
  const resetValue = () =>{
    setValue('')
    let inputMessage = document.querySelector(".inputMessage")
    let yourMessage = document.getElementById("yourMessage")
    yourMessage.style.height = "30px";
  inputMessage.style.height = '30px'
  }

  const handleKeyPress = (e) =>{
    if(e.key === "Enter"){
      e.preventDefault()
      document.getElementById('send').click()
      resetValue()
    }
  }

  const enableTipeing = (e) => {
    e.stopPropagation();
  };

  const handleChange = (e) => {    
    setValue(e.target.value);
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


  useEffect(() => {
   
  
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          let cutMYVideo = stream.getVideoTracks()[0];
          document.querySelector(".iconVideoShow").addEventListener("click", () => {  
              cutMYVideo.enabled = !cutMYVideo.enabled;
          });
          document.querySelector(".iconVideo").addEventListener("click", () => {  
            cutMYVideo.enabled = !cutMYVideo.enabled;
        });
          var myVideo = document.createElement("video");
          myVideo.id = "myVid";
          var videoChat = document.getElementById("videoChat");
          videoChat.appendChild(myVideo);
          myVideo.srcObject = stream;
          myVideo.play();
          var myVid = document.getElementById("myVid");
          myVid.style.cssText =
          "position: absolute; left: 45px; top: 40px; height: 140px; width: 170px; z-index: 20";
  
          const hangUp = document.querySelector(".iconPhone")
          hangUp && hangUp.addEventListener("click", () => {
            functionCaller()
            stream.getTracks().forEach(track => track.stop())
            if(doctor === 'true'){
              history.push(`/doctor/video/exam/detail/${params.roomID}`)
            }else{
              history.push(`/client/video/exam/detail/${params.roomID}`)
            }
            
        });

        });
  }, []);

  useEffect(() => {
    return () => {
      window.addEventListener('unload', function(ev) {
        ev.preventDefault()
        document.querySelector(".iconPhone").click()
      });
    }
  }, [])

  useEffect(() => {
    return () =>{
      if(window.location.pathname !== `room/${params.roomID}`){
      document.querySelector(".iconPhone").click()
      }
    }
  }, [])

  function cutMic() {
      setMic(!mic)
  }
  function cutVideo() {
      setVideo(!video)
  }

  return (
    <>
    <div className="header">
    <div>
      <Header />
      <Nav />
    </div>
  </div>
  <HamburgerDiv />
  <div className="detailExam"  style={{
          // display: props.startVideo ? "block" : "none",
          padding: "0px 15px",
          height: '550px',
          marginBottom: '20px'
        }}>
            <div className="iconVideooCall">
                <h4>Video call</h4>{" "}
              </div>
              <div className="detail2">
              <div id='videoChat'
              
              >
                <video className='vid'></video>
                </div>
                <div className='detailInfo2' id='detailInfo2'>
                <div className='MainDivForChat'>
                  <p>Chat</p>
                  <form
            autoComplete="off"
            action=""
            id="form"
          >
            <pre id="messages"></pre>
            <div className="inputMessage">
              <textarea
                type="text"
                placeholder="Type a message"
                id="yourMessage"
                value={value}
                onChange={handleChange}
                onMouseDown={enableTipeing}
                onKeyPress={(e) => {handleKeyPress(e)}}
              ></textarea>
            </div>
          </form>
                  </div>  
              <button id="send" onClick={resetValue}>
              <img src={messageSend} alt="sendimg"/>
              </button>

                </div>
               

           
              </div>
              <div className="MainIconsDiv">
                  <img src={mute}
                    className="iconMic"
                  alt="img" style={{ display: !mic ? "none" : "block" }}
                onClick={cutMic}/>
                  <img src={unmute}
                   className="iconMicUnmute"
                  alt="img" style={{ display: mic ? "none" : "block" }}
                onClick={cutMic}/>
                  {/* <img src={call} alt="img" style={{display: 'none' }}/> */}
                  <img src={hangup} alt="img" className="iconPhone"/>
                  <img src={cameraoff}
                  className="iconVideo"
                   alt="img" style={{ display: !video ? "none" : "block" }}
                onClick={cutVideo}/>
                  <img src={cameraon} alt="img" 
                className="iconVideoShow"
                style={{ display: video ? "none" : "block" }}
                onClick={cutVideo}/>
                  </div>  
       
            </div>
    </>
  );
  
};

export default Room;
