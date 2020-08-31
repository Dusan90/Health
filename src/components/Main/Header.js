import React, { Fragment, useState, useEffect } from "react";
import "../../assets/main/header.scss";
import logo1 from "../../img/LOGOHC-01.svg";
import { Link, useHistory, useLocation } from "react-router-dom";

const Header = () => {
  let [timer, setTimer] = useState(60);
  let [connecting, Setconnecting] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // const socket = new WebSocket("tamonekiurl");
    // socket.onopen(() => {
    //   console.log("connected to header socket");
    // });
    // socket.onmessage((event) => {
    //   console.log(event);
    // });
    if (location.pathname === "/client/waiting-room") {
      Setconnecting(false);
    }
    // startTimer();
  }, []);

  // const startTimer = () => {
  //   const timerStart = setInterval(() => {
  //     if (timer === 0) {
  //       clearInterval(timerStart);
  //       history.push({
  //         pathname: "/client/waiting-room",
  //         state: { detail: "exitQueue" },
  //       });
  //     } else {
  //       setTimer(timer--);
  //     }
  //   }, 1000);
  // };

  const handleConnectingButton = () => {
    history.push("/client/waiting-room");
    return Setconnecting(true);
  };
  return (
    <Fragment>
      <Link to="/">
        <img src={logo1} alt="logo" />
      </Link>
      {sessionStorage.getItem("is_doctor") === "false" && connecting && (
        <Fragment>
          <div className="duca1"></div>
          <div className="duca">
            <h4>
              0:{timer < 10 && "0"}
              {timer}
            </h4>
            <h1>Your WR video consultation is ready</h1>
            <div className="buttons">
              <button onClick={() => handleConnectingButton()}>Connect</button>
              <button
                style={{ background: "lightcoral" }}
                onClick={() => {
                  history.push({
                    pathname: "/client/waiting-room",
                    state: { detail: "exitQueue" },
                  });
                }}
              >
                Exit queue
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Header;
