import React, { Component } from "react";
import axios from "axios";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Dashboard from "../../components/Client/Dashboard";
import Footer from "../../components/Main/Footer";
import curentDoc from "../../actions/docAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class ClientDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      paginatedExams: [],
      upcomingOrPast: [],
      token: sessionStorage.getItem("accessToken"),
      dataFromServer: "",
      loading: true,
      page: 1,
      maxPages: "",
      hamburger: false,
      client: "",
      viewAllExams: false,
    };
  }

  initiate = () => {
    this.props.history.push("/initiate");
  };
  waitingRoom = () => {
    this.props.history.push("/client/waiting-room");
  };
  VideoReq = () => {
    this.props.history.push("/client/video-request");
  };

  escBtn = (e) => {
    if (e.keyCode === 27) {
      this.setState({
        viewAllExams: false,
      });
    }
  };

  componentDidMount() {
    this.connect();
    window.addEventListener("keydown", this.escBtn);
    this.paginatedExams();
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/client/profile/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        this.props.curentDoc(response.data.data.user);
        return this.setState({ client: response.data.data });
      });
  }

  handleClickLeft = () => {
    if (this.state.page !== 1) {
      this.setState({ page: this.state.page - 1 });
      let test = setInterval(() => {
        this.paginate(this.state.page);
        clearInterval(test);
      }, 10);
    }
  };
  handleClickRight = () => {
    if (this.state.page !== this.state.maxPages) {
      this.setState({ page: this.state.page + 1 });
      let test = setInterval(() => {
        this.paginate(this.state.page);
        clearInterval(test);
      }, 10);
    }
  };

  connect = () => {
    var ws = new WebSocket("wss://healthcarebackend.xyz/ws/exam/status/");
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };
    ws.onmessage = (e) => {
      // listen to data sent from the websocket server
      const message = JSON.parse(e.data);
      console.log(message, "socket message");

      this.state.exams.map((exam) => {
        if (exam.id === message.id && exam.exam_type === "mail") {
          exam.status = message.status;
          this.paginatedExams();
        } else if (exam.id === message.id && exam.exam_type === "video") {
          exam.status = message.status;
          this.paginatedExams();
        } else {
          return console.log("Does not exist.");
        }
      });
    };
    ws.onclose = (e) => {
      console.log(`Socket is closed`);
    };
    ws.onerror = (err) => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      ws.close();
    };
  };

  handleClick = (id, type) => {
    if (type === "mail") {
      this.props.history.push(`/client/exam/detail/${id}`);
    } else if (type === "video") {
      this.props.history.push(`/client/video/exam/detail/${id}`);
    }
  };

  handleUpcoming = () => {
    // let lates = this.state.exams;
    // let resort = lates.sort(
    //   (a, b) => Date.parse(b.created) - Date.parse(a.created)
    // );
    let upcomingset = setInterval(() => {
      let upcoming = this.state.exams.filter((upco) => {
        return (
          new Date(upco.appointed_date) > new Date() ||
          new Date(upco.created) > new Date()
        );
      });

      let resort = upcoming.sort(
        (a, b) => Date.parse(a.appointed_date) - Date.parse(b.appointed_date)
      );

      this.setState({ upcomingOrPast: resort, page: 1 });

      this.paginate(1);
      clearInterval(upcomingset);
    }, 10);
  };

  handlePast = () => {
    // let earl = this.state.exams;
    // let sort = earl.sort(
    //   (a, b) => Date.parse(a.created) - Date.parse(b.created)
    // );
    let pastset = setInterval(() => {
      let past = this.state.exams.filter((pas) => {
        if (pas.appointed_date) {
          return new Date(pas.appointed_date) < new Date();
        } else {
          return new Date(pas.created) < new Date();
        }
      });
      let sort = past.sort(
        (a, b) => Date.parse(b.created) - Date.parse(a.created)
      );
      this.setState({ upcomingOrPast: sort, page: 1 });
      this.paginate(1);
      clearInterval(pastset);
    }, 10);
  };

  handleAll = () => {
    this.setState({ viewAllExams: !this.state.viewAllExams });
  };

  videoReqStatus = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/web/client/list/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        if (
          response.data.data !== undefined &&
          response.data.data.length !== 0
        ) {
          // const filterOutCanceled = response.data.data.filter((fil_cancel) => {
          //   return (
          //     fil_cancel.status !== "Canceled" &&
          //     fil_cancel.status !== "Declined"
          //   );
          // });

          this.setState({
            exams: [...this.state.exams.concat(response.data.data)],
          });
          this.handleUpcoming();
          this.paginate(this.state.page);
        } else {
          return null;
        }
      });
  };

  paginatedExams = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/mail/client/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        if (response.data.data.length !== 0) {
          // const filterOutCanceled = response.data.data.filter((fil_cancel) => {
          //   return (
          //     fil_cancel.status !== "Canceled" &&
          //     fil_cancel.status !== "Declined"
          //   );
          // });

          this.setState({
            exams: [...this.state.exams.concat(response.data.data)],
          });
          this.videoReqStatus();
          this.handleUpcoming();
          this.paginate(this.state.page);
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  paginate = (page) => {
    let limit = 5;
    let pages = Math.ceil(this.state.upcomingOrPast.length / 5);
    const offset = (page - 1) * limit;
    const newArray = this.state.upcomingOrPast.slice(offset, offset + limit);

    this.setState({
      paginatedExams: newArray,
      loading: false,
      maxPages: pages,
    });
  };

  handleHam = () => {
    this.setState({ hamburger: !this.state.hamburger });
  };

  hnlMyConsultations = () => {
    this.setState({ hamburger: false, viewAllExams: true });
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
        <Dashboard
          initiate={this.initiate}
          waitingRoom={this.waitingRoom}
          handleClick={this.handleClick}
          handleUpcoming={this.handleUpcoming}
          handlePast={this.handlePast}
          handleAll={this.handleAll}
          handleClickLeft={this.handleClickLeft}
          handleClickRight={this.handleClickRight}
          props={this}
          VideoReq={this.VideoReq}
          handleHam={this.handleHam}
          hnlMyConsultations={this.hnlMyConsultations}
        />
        <Footer />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ curentDoc: curentDoc }, dispatch);
};

export default connect(null, mapDispatchToProps)(ClientDashboard);
