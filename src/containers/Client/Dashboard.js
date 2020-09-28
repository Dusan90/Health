import React, { Component } from "react";
import axios from "axios";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Dashboard from "../../components/Client/Dashboard";
import Footer from "../../components/Main/Footer";
import curentDoc from "../../actions/docAction";
import { popUp } from "../../actions/popUpAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class ClientDashboard extends Component {
  _isMounted = false;
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
      messageIfEmpty: "",
      currentFilterClicked: "",
      mail: [],
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

  componentDidMount() {
    this._isMounted = true;
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/client/profile/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        this.connect(response.data.data.id);
        this.props.curentDoc(response.data.data.user);
        return this.setState({ client: response.data.data });
      })
      .then(() => {
        this.paginatedExams();
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

  connect = (id) => {
    const ws = new WebSocket(
      `wss://healthcarebackend.xyz/ws/dashboard/client/${id}/`
    );

    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected to dashboard socket");
    };
    ws.onmessage = (e) => {
      console.log(e);
      // listen to data sent from the websocket server
      const message = JSON.parse(e.data);
      message.status === "Accepted" &&
        message.exam_type === "queue" &&
        this.props.popUp();

      let socketExam = this.state.exams.filter((exam) => {
        return exam.id === message.id;
      });
      if (socketExam.length !== 0) {
        this.paginatedExams();
      }
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
    };
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClick = (id, type) => {
    if (type === "mail") {
      this.props.history.push(`/client/exam/detail/${id}`);
    } else if (type === "video") {
      this.props.history.push(`/client/video/exam/detail/${id}`);
    } else if (type === "queue") {
      this.props.history.push(`/client/queue/exam/detail/${id}`);
    }
  };

  handleUpcoming = () => {
    let upcomingset = setInterval(() => {
      let upcoming = this.state.exams.filter((upco) => {
        return (
          upco.status === "Appointed" ||
          upco.status === "Accepted" ||
          upco.status === "Pending"
        );
      });

      let resort = upcoming.sort(
        (a, b) => Date.parse(b.created) - Date.parse(a.created)
      );

      let messageIfEmpty =
        upcoming.length === 0 ? "No upcoming consultations" : "";

      this.setState({
        upcomingOrPast: resort,
        page: 1,
        messageIfEmpty,
        currentFilterClicked: "upcoming",
      });

      this.paginate(1);
      clearInterval(upcomingset);
    }, 10);
  };

  handlePast = () => {
    let pastset = setInterval(() => {
      let past = this.state.exams.filter((pas) => {
        return (
          pas.status === "Declined" ||
          pas.status === "Finished" ||
          pas.status === "Canceled"
        );
      });

      console.log(past, "past");
      let sort = past.sort(
        (a, b) => Date.parse(b.created) - Date.parse(a.created)
      );

      let messageIfEmpty = past.length === 0 ? "No past consultations" : "";

      this.setState({
        upcomingOrPast: sort,
        page: 1,
        messageIfEmpty,
        currentFilterClicked: "past",
      });
      this.paginate(1);
      clearInterval(pastset);
    }, 10);
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
      });

      this.paginate(1);
      clearInterval(hndlAll);
    }, 10);
  };

  paginatedExams = async () => {
    const access_token = "Bearer ".concat(this.state.token);

    axios
      .get(`https://healthcarebackend.xyz/api/exams/client/`, {
        headers: { Authorization: access_token },
      })
      .then((res) => {
        if (
          res.data.data.mail.length !== 0 ||
          res.data.data.video.length !== 0
        ) {
          let combineExams = res.data.data.mail.concat(res.data.data.video);
          this.setState({
            exams: combineExams,
          });
        }
      })
      .then(() => {
        this.WaitingRoomList();
      })
      .catch((error) => {
        console.log(error.response, "error");
        this.setState({ loading: false });
      });
  };

  WaitingRoomList = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/queue/${this.state.client.id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        this.setState({
          exams: [...this.state.exams.concat(response.data.data.queue)],
        });
        this.handleUpcoming();
        this.paginate(this.state.page);
        this.getUnreadMessages(this.state.client.id);
      })
      .catch((err) => {
        console.log(err.response);
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
    this.setState({ hamburger: false });
    this.handleAll();
  };

  getUnreadMessages = async (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/exams/client/${id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        const unreadMessages = response.data.data.filter((ex) => {
          if (ex.messages.length !== 0) {
            return (
              ex.messages[ex.messages.length - 1].sender !==
              `${this.state.client.user}`
            );
          } else {
            return null;
          }
        });
        const unreadIds = unreadMessages.map((ex) => ex.exam.id);
        this.setState({ mail: unreadIds });
      })
      .catch((err) => {
        console.log(err.response);
      });
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
  return bindActionCreators({ curentDoc: curentDoc, popUp: popUp }, dispatch);
};

export default connect(null, mapDispatchToProps)(ClientDashboard);
