import React, { Component } from "react";
import axios from "axios";
import Dashboard from "../../components/Doctor/Dashboard";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import curentDoc from "../../actions/docAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";
import Footer from "../../components/Main/Footer";

class DoctorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      paginatedExams: [],
      record: [],
      token: sessionStorage.getItem("accessToken"),
      pending: [],
      videoPending: [],
      waitingRoom: [],
      openPending: false,
      openVideoPending: false,
      openWaitingRoom: false,
      value: "",
      doc: [],
      doctorCurent: "",
      page: 1,
      maxPages: "",
      loading: true,
      hamburger: false,
      viewAllExams: false
    };
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

  pnd = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://health-care-backend.herokuapp.com/api/doctor/exams/req`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        const res = response.data.data.map(val => {
          return {
            id: val.id,
            client: val.client,
            created: val.created,
            subject: val.subject,
            status: val.status
          };
        });
        let resort = res.sort(
          (a, b) => Date.parse(b.created) - Date.parse(a.created)
        );
        this.setState({
          pending: resort.filter(rest => rest.status === "Pending")
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleUpcoming = () => {
    let lates = this.state.exams;
    let resort = lates.sort(
      (a, b) => Date.parse(b.created) - Date.parse(a.created)
    );
    this.setState({ exams: resort });
    this.paginate(this.state.page);
  };

  handlePast = () => {
    let earl = this.state.exams;
    let sort = earl.sort(
      (a, b) => Date.parse(a.created) - Date.parse(b.created)
    );
    this.setState({ exams: sort });
    this.paginate(this.state.page);
  };

  handleAll = () => {
    this.setState({ viewAllExams: !this.state.viewAllExams });
  };

  handleClick = (id, type) => {
    if (type === "mail") {
      this.props.history.push(`/doctor/exam/detail/${id}`);
    } else if (type === "video") {
      this.props.history.push(`/doctor/video/exam/detail/${id}`);
    }
  };

  handleVideoPendingClick = id => {
    this.props.history.push(`/doctor/video/exam/detail/${id}`);
  };
  paginatedExams = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://health-care-backend.herokuapp.com/api/mail/doctor/`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        this.setState({
          exams: [...this.state.exams.concat(response.data.data)]
        });
        this.paginate(this.state.page);
        this.peopleVideoPending();
      });
  };

  paginate = page => {
    let limit = 5;
    let pages = Math.ceil(this.state.exams.length / 5);
    const offset = (page - 1) * limit;
    const newArray = this.state.exams.slice(offset, offset + limit);

    this.setState({
      paginatedExams: newArray,
      loading: false,
      maxPages: pages
    });
  };

  handleWaitingRoom = id => {
    if (this.state.waitingRoom[0].id === id) {
      this.props.history.push(`/doctor/processing/video/exam/${id}/#init`);
    } else {
      console.log("client is not next in line");
    }
  };

  hnlClick = () => {
    this.setState({ openPending: !this.state.openPending });
  };

  hnlClick2 = () => {
    this.setState({ openVideoPending: !this.state.openVideoPending });
  };

  hnlClick3 = () => {
    this.setState({ openWaitingRoom: !this.state.openWaitingRoom });
  };

  hnlVideoClick = () => {
    this.setState({ openVideoPending: !this.state.openVideoPending });
  };

  hnlWatingClick = () => {
    this.setState({ openWaitingRoom: !this.state.openWaitingRoom });
  };

  escBtn = e => {
    if (e.keyCode === 27) {
      this.setState({
        openPending: false,
        openVideoPending: false,
        openWaitingRoom: false
      });
    }
  };

  handleDoctorProfile = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://health-care-backend.herokuapp.com/api/doctor/profile/`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        let curentDocc = response.data.data.doctor
          .split(" ")
          .map(n => n[0])
          .join(".");
        this.props.curentDoc(curentDocc);
        return this.setState({
          doc: curentDocc,
          doctorCurent: response.data.data
        });
      });
  };

  peopleInWaitingRoom = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://health-care-backend.herokuapp.com/api/queue/doctor/`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        let todaysWaitingRoom = response.data.data.filter(today => {
          return (
            moment(today.created).format("MM/DD/YYYY") ===
            moment(new Date()).format("MM/DD/YYYY")
          );
        });
        this.setState({ waitingRoom: todaysWaitingRoom });
      });
  };

  peopleVideoPending = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://health-care-backend.herokuapp.com/api/web/doctor/list/`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        console.log(response, "videooo-request-list");
        let pending = response.data.data.filter(res => {
          return (
            res.status === "Requested" &&
            moment(res.appointed_date).format("MM/DD/YYYY") >=
              moment(new Date()).format("MM/DD/YYYY")
          );
        });
        let accepted = response.data.data.filter(res => {
          return res.status === "Appointed";
        });

        this.setState({
          videoPending: pending,
          exams: [...this.state.exams.concat(accepted)],
          loading: false
        });
        this.paginate(this.state.page);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleHam = () => {
    this.setState({ hamburger: !this.state.hamburger });
  };

  handleClickMail = id => {
    this.props.history.push(`/doctor/exam/detail/${id}`);
  };

  componentDidMount() {
    this.paginatedExams();
    this.peopleInWaitingRoom();
    // this.peopleVideoPending();
    this.pnd();
    window.addEventListener("keydown", this.escBtn);
    this.handleDoctorProfile();
  }

  render() {
    console.log(this.state.videoPending);

    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav doc={this.state.doc} />
          </div>
        </div>
        <Dashboard
          handleClick={this.handleClick}
          handleClickMail={this.handleClickMail}
          handleClient={this.handleClient}
          hnlClick={this.hnlClick}
          hnlClick2={this.hnlClick2}
          hnlClick3={this.hnlClick3}
          hnlWaitingClick={this.hnlWatingClick}
          props={this}
          handleKeyPress={this.handleKeyPress}
          handleChange={this.handleChange}
          handleClickLeft={this.handleClickLeft}
          handleClickRight={this.handleClickRight}
          loading={this.state.loading}
          hnlVideoClick={this.hnlVideoClick}
          handleWaitingRoom={this.handleWaitingRoom}
          handleVideoPendingClick={this.handleVideoPendingClick}
          handleHam={this.handleHam}
          handleUpcoming={this.handleUpcoming}
          handlePast={this.handlePast}
          handleAll={this.handleAll}
        />
        <Footer />
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ curentDoc: curentDoc }, dispatch);
};

export default connect(null, mapDispatchToProps)(DoctorDashboard);
