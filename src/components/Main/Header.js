import React, { Fragment, useState, useEffect } from "react";
import "../../assets/main/header.scss";
import logo1 from "../../img/logo.svg";
import { popUpFalse } from "../../actions/popUpAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, useHistory, useLocation } from "react-router-dom";

const Header =
  sessionStorage.getItem("is_doctor") === "false"
    ? (props) => {
        let [timer, setTimer] = useState(60);
        const history = useHistory();
        const location = useLocation();

        useEffect(() => {
          if (location.pathname === "/client/waiting-room") {
            props.popUpFalse();
          }
        }, []);

        useEffect(() => {
          if (props.popUp) {
            startTimer();
          }
        }, [props.popUp]);

        const startTimer = () => {
          const timerStart = setInterval(() => {
            if (timer === 0) {
              clearInterval(timerStart);
              history.push({
                pathname: "/client/waiting-room",
                state: { detail: "exitQueue" },
              });
            } else {
              setTimer(timer--);
            }
          }, 1000);
        };

        const handleConnectingButton = () => {
          if (location.pathname !== "/client/waiting-room") {
            history.push("/client/waiting-room");
            props.popUpFalse();
            window.location.reload()
              //   props.popUpFalse();
              //   window.location.reload()
              // }else{
              }
        };
        return (
          <Fragment>
            {/* {props.popUp && startTimer()} */}
            {/* <Link to="/"> */}
              <img src={logo1} alt="logo" />
            {/* </Link> */}
            {props.popUp && (
              <Fragment>
                <div className="duca1"></div>
                <div className="duca">
                  <h4>
                    0:{timer < 10 && "0"}
                    {timer}
                  </h4>
                  <h1>Your video consultation is ready</h1>
                  <div className="buttons">
                    <button onClick={() => handleConnectingButton()}>
                      Connect
                    </button>
                    <button
                      style={{ background: "darkgray" }}
                      onClick={() => {
                        history.push({
                          pathname: "/client/waiting-room",
                          state: { detail: "exitQueue" },
                        });
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </Fragment>
             )} 
          </Fragment>
        );
      }
    : () => {
        return (
          <Fragment>
            {/* <Link to="/"> */}
              <img src={logo1} alt="logo" />
            {/* </Link> */}
          </Fragment>
        );
      };

const mapStateToProps = (state) => {
  const popUp = state.getIn(["popUpReducer", "popUp"]);
  console.log(popUp);
  return {
    popUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ popUpFalse: popUpFalse }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
