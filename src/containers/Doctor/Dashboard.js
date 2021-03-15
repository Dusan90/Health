import React, { Component } from "react";
import axios from "axios";
import Dashboard from "../../components/Doctor/Dashboard";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import curentDoc from "../../actions/docAction";
import { statusChangeWR } from "../../actions/doctorStatusWR";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";
import { NotificationManager } from "react-notifications";
import HamburgerDiv from "../../components/Main/HamburgerDiv";

class DoctorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      paginatedExams: [],
      upcomingOrPast: [],
      searchedUpcomingOrPast: [],
      filterFiltered: [],
      record: [],
      token: sessionStorage.getItem("accessToken"),
      pending: [],
      videoPending: [],
      waitingRoom: [],
      openWaitingRoom: false,
      value: "",
      doctorCurent: "",
      page: 1,
      maxPages: "",
      loading: true,
      hamburger: false,
      numOfMessages: 0,
      messageIfEmpty: "",
      currentFilterClicked: "",
      mail: [],
      searchName: "",
      searchClient: false,
      searchByTypeClick: false,
      searchType: "",
      firstLoad: true
    };
  }

  // handleClickLeft = () => {
  //   if (this.state.page !== 1) {
  //     this.setState({ page: this.state.page - 1 });
  //     let test = setInterval(() => {
  //       this.paginate(this.state.page);
  //       clearInterval(test);
  //     }, 10);
  //   }
  // };
  // handleClickRight = () => {
  //   if (this.state.page !== this.state.maxPages) {
  //     this.setState({ page: this.state.page + 1 });
  //     let test = setInterval(() => {
  //       this.paginate(this.state.page);
  //       clearInterval(test);
  //     }, 10);
  //   }
  // };

  pnd = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/exams/req/`, {
        headers: { Authorization: access_token },
      })
      .then((res) => {
        const filteredMail = res.data.data.length !== 0 ? res.data.data.filter(ex =>  ex.transaction['status'] !== 'Pending') : []
        let resort = filteredMail.sort(
          (a, b) => Date.parse(b.created) - Date.parse(a.created)
        );
        this.setState({
          pending: resort.filter((rest) => rest.status === "Pending"),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleUpcoming = () => {
    let upcomingset = setInterval(() => {
      let upcoming = this.state.exams.filter((upco) => {
        return (
          upco.status === "Appointed" ||
          upco.status === "Accepted" ||
          upco.status === "Pending" ||
          upco.status === "In the queue"
        );
      });

      let resort = upcoming.sort(
        (a, b) => Date.parse(b.created) - Date.parse(a.created)
      );

      let messageIfEmpty =
        upcoming.length === 0 ? "No consultations to show" : "";

      this.setState({
        upcomingOrPast: resort,
        page: 1,
        messageIfEmpty,
        currentFilterClicked: "upcoming",
        searchedUpcomingOrPast: [],
        filterFiltered: [],
        searchType: "",
        searchName: "",
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
      let sort = past.sort(
        (a, b) => Date.parse(b.created) - Date.parse(a.created)
      );

      let messageIfEmpty = past.length === 0 ? "No consultations to show" : "";

      this.setState({
        upcomingOrPast: sort,
        page: 1,
        messageIfEmpty,
        currentFilterClicked: "past",
        searchedUpcomingOrPast: [],
        filterFiltered: [],
        searchType: "",
        searchName: "",
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

      let messageIfEmpty = all.length === 0 ? "No consultations to show" : "";

      this.setState({
        upcomingOrPast: resortall,
        page: 1,
        messageIfEmpty,
        currentFilterClicked: "all",
        searchedUpcomingOrPast: [],
        filterFiltered: [],
        searchType: "",
        searchName: "",
      });

      this.paginate(1);
      clearInterval(hndlAll);
    }, 10);
  };

  handleClick = (id, type) => {
    if (type === "mail") {
      this.props.history.push(`/doctor/exam/detail/${id}`);
    } else if (type === "video") {
      this.props.history.push(`/doctor/video/exam/detail/${id}/#init`);
    } else if (type === "queue") {
      this.props.history.push(`/doctor/processing/video/exam/${id}/#init`);
    }
  };

  handleVideoPendingClick = (id) => {
    this.props.history.push(`/doctor/video/exam/detail/${id}`);
  };
  paginatedExams = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/exams/doctor/`, {
        headers: { Authorization: access_token },
      })
      .then((res) => {
        console.log(res);
        if (
          res.data.data.mail.length !== 0 ||
          res.data.data.video.length !== 0
        ) {
          const filteredMail = res.data.data.mail.length !== 0 ? res.data.data.mail.filter(ex =>  ex.transaction['status'] !== 'Pending') : []
          const filteredVideo = res.data.data.video.length !== 0 ? res.data.data.video.filter(ex =>  ex.transaction['status'] !== 'Pending') : []
          let combineExams = filteredMail.concat(filteredVideo);
          this.setState({
            exams: combineExams,
          });

          let pending = filteredVideo.filter((res) => {
            return (
              res.status === "Pending" &&
              moment(res.appointed_date).format("MM/DD/YYYY") >=
                moment(new Date()).format("MM/DD/YYYY")
            );
          });
          let accepted = filteredVideo.filter((res) => {
            return res.status === "Appointed";
          });
          let nowON = accepted.filter((now) => {
            if (
              moment(new Date()).format("MM/DD/YYYYTHH:mm aa") >
                moment(now.appointed_date).format("MM/DD/YYYYTHH:mm aa") &&
              moment(new Date()).format("MM/DD/YYYYTHH:mm aa") <
                moment(now.appointed_date)
                  .add(30, "minutes")
                  .format("MM/DD/YYYYTHH:mm aa")
            ) {
              return now;
            } else {
              return null;
            }
          });
          this.setState({
            videoPending: pending,
            loading: false,
            numOfMessages: nowON.length,
          });
        }
      })
      .then(() => {
        this.peopleInWaitingRoom(this.state.doctorCurent.id);
        this.handleAll();
        this.paginate(this.state.page);
        // this.getUnreadMessages(this.state.doctorCurent.id);
      })
      .catch((error) => {
        console.log(error.response, "error");
        this.setState({ loading: false });
      });
  };

  paginate = (page) => {
    if (this.state.searchedUpcomingOrPast.length === 0) {
      let limit = 10;
      let pages = Math.ceil(this.state.upcomingOrPast.length / 10);
      const offset = (page - 1) * limit;
      const newArray = this.state.upcomingOrPast.slice(offset, offset + limit);
      const sorted = newArray.sort( (a,b) => a.created - b.created)
      this.setState({
        paginatedExams: sorted,
        loading: false,
        maxPages: pages,
      });
    } else {
      let limit = 10;
      let pages = Math.ceil(this.state.searchedUpcomingOrPast.length / 10);
      const offset = (page - 1) * limit;
      const newArray = this.state.searchedUpcomingOrPast.slice(
        offset,
        offset + limit
      );
      const sorted = newArray.sort( (a,b) => a.created - b.created)


      this.setState({
        paginatedExams: sorted,
        loading: false,
        maxPages: pages,
      });
    }
  };

  handleWaitingRoom = (id) => {
    // if (this.state.waitingRoom[0].id === id) {
      this.props.history.push(`/doctor/processing/video/exam/${id}/#init`);
    // } else {
    //   NotificationManager.error(`Client is not next in line`, "Failed!", 3000);
    // }
  };

  hnlClick = () => {
    this.props.history.push("/doctors-email-list");
  };

  hnlVideoClick = () => {
    this.props.history.push("/doctors-video-list");
  };

  hnlWaitingClick = () => {
    this.props.history.push("/doctors-queue-list");
  };

  handleDoctorProfile = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/profile/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {

        let current = response.data.data;
        console.log(current)
        // this.peopleInWaitingRoom(current.id);
        this.connecSocket(current.id);

        this.props.curentDoc(current);
        this.paginatedExams();
        return this.setState({
        doctorCurent: current,
        });
      })
  };

  peopleInWaitingRoom = async (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/queue/${id}/list/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        response.data.data.queue.forEach((e) => {
          if (
            moment(e.created).format("YYYY-MM-DD") !== moment(new Date()).format("YYYY-MM-DD") &&
            e.status === "In the queue"
          ) {
            this.changeStatusOfPastExams(e.id);
          }
        });
        const filteredqueue = response.data.data.queue.length !== 0 ? response.data.data.queue.filter(ex =>  ex.transaction['status'] !== 'Pending') : []

        let filterCanceled = filteredqueue.filter((ex) => {
          return ex.status === "Accepted" || ex.status === "In the queue";
          // return ex.status !== "Canceled" && ex.status !== "Declined";
        });
        this.setState({
          waitingRoom: filterCanceled,
          exams: [...this.state.exams.concat(filteredqueue)],
        });
      })
      .then(() => {
        this.handleAll();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  changeStatusOfPastExams = async (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    const client = await fetch(
      `https://healthcarebackend.xyz/api/queue/${id}/detail/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify({
          status: "Decline",
          decline_notes: '',
          report: '',
          report_file: null
        }),
      }
    );
    const jsonData = await client.json();
    return jsonData;
  };

  handleClickMail = (id) => {
    this.props.history.push(`/doctor/exam/detail/${id}`);
  };

  hnlMyConsultations = () => {
    this.handleAll();
    this.setState({ hamburger: false });
  };

  componentDidMount() {
    this.handleDoctorProfile();
    this.pnd();
  }
  
  componentWillUnmount(){
    if(window.location.pathname === "/login"){
      this.props.history.push('/logOutQuestion')
    }
  }

  connecSocket = (id) => {
    const webs = new WebSocket(
      `wss://healthcarebackend.xyz/ws/dashboard/doctor/${id}/`
    );

    webs.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected to port");
    };
    webs.onmessage = (event) => {
      console.log(event);
      if (JSON.parse(event.data).statu !== "In the queue") {
        this.props.statusChangeWR(JSON.parse(event.data).id);
      }
      this.messagesNumber();
    };
    webs.onclose = () => {
      console.error("disconected");
    };
  };

  messagesNumber = () => {
    this.paginatedExams();
    this.pnd();
  };

  // getUnreadMessages = async (id) => {
  //   const access_token = "Bearer ".concat(this.state.token);
  //   axios
  //     .get(`https://healthcarebackend.xyz/api/exams/doctor/${id}/`, {
  //       headers: { Authorization: access_token },
  //     })
  //     .then((response) => {
  //       console.log(response, 'messages');
  //       console.log(this.state.doctorCurent)
  //       const unreadMessages = response.data.data.filter((ex) => {
  //         if (ex.messages.length !== 0) {
  //           // const sortedActivities = ex.messages.sort((a, b) => a.created - b.created)
  //           return (
  //             // sortedActivities[sortedActivities.length - 1].sender !==
  //             ex.messages[0].sender_id !==
  //             this.state.doctorCurent.id 
  //           );
  //         } else {
  //           return ex;
  //         }
  //       });
  //       const unreadIds = unreadMessages.map((ex) => ex.exam.id);
  //       this.setState({ mail: unreadIds });
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // };

  handleClientSearch = () => {
    this.setState({ searchClient: !this.state.searchClient });
  };
  handleTypeSearch = () => {
    this.setState({ searchByTypeClick: !this.state.searchByTypeClick });
  };
  searchByName = (e) => {
    if (e.target.value === "" && this.state.searchType === "") {
      this.setState({ filterFiltered: [] });
    } else if (e.target.value === "" && this.state.searchName !== "") {
      this.setState({ filterFiltered: [] });
      let callBFunction = setInterval(() => {
        this.handlingSearchByType();
        clearInterval(callBFunction);
      }, 10);
    }
    this.setState({ searchName: e.target.value });
    let callFunction = setInterval(() => {
      this.handlingSearchByName();
      clearInterval(callFunction);
    }, 10);
  };

  handlingSearchByName = () => {
    let searchName = this.state.searchName.toLowerCase().split(" ");
    let searchedClient =
      this.state.filterFiltered.length === 0
        ? this.state.upcomingOrPast.filter((ex) => {
            const client = ex.client;
            const splited = client.split(" ");
            if (!searchName[1]) {
              if (
                splited[0].toLowerCase().indexOf(searchName[0]) ===
                  searchName[0].indexOf(searchName[0]) ||
                splited[1].toLowerCase().indexOf(searchName[0]) ===
                  searchName[0].indexOf(searchName[0])
              ) {
                return ex;
              }
            } else {
              if (
                (splited[0].toLowerCase().indexOf(searchName[0]) ===
                  searchName[0].indexOf(searchName[0]) &&
                  splited[1].toLowerCase().indexOf(searchName[1]) ===
                    searchName[1].indexOf(searchName[1])) ||
                (splited[0].toLowerCase().indexOf(searchName[1]) ===
                  searchName[1].indexOf(searchName[1]) &&
                  splited[1].toLowerCase().indexOf(searchName[0]) ===
                    searchName[0].indexOf(searchName[0]))
              ) {
                return ex;
              }
            }
            return null;
          })
        : this.state.filterFiltered.filter((ex) => {
            const client = ex.client;
            const splited = client.split(" ");
            if (!searchName[1]) {
              if (
                splited[0].toLowerCase().indexOf(searchName[0]) ===
                  searchName[0].indexOf(searchName[0]) ||
                splited[1].toLowerCase().indexOf(searchName[0]) ===
                  searchName[0].indexOf(searchName[0])
              ) {
                return ex;
              }
            } else {
              if (
                (splited[0].toLowerCase().indexOf(searchName[0]) ===
                  searchName[0].indexOf(searchName[0]) &&
                  splited[1].toLowerCase().indexOf(searchName[1]) ===
                    searchName[1].indexOf(searchName[1])) ||
                (splited[0].toLowerCase().indexOf(searchName[1]) ===
                  searchName[1].indexOf(searchName[1]) &&
                  splited[1].toLowerCase().indexOf(searchName[0]) ===
                    searchName[0].indexOf(searchName[0]))
              ) {
                return ex;
              }
            }
            return null;
          });
    let messageIfEmpty =
      searchedClient.length === 0
        ? "No Such Client"
        : searchedClient.length !== 0 &&
          this.state.messageIfEmpty !== "No Such Client"
        ? this.state.messageIfEmpty
        : "";
    this.state.filterFiltered.length === 0 &&
      this.setState({ filterFiltered: searchedClient });
    this.setState({
      searchedUpcomingOrPast: searchedClient,
      page: 1,
      messageIfEmpty,
    });
    this.paginate(1);
  };

  ResetonSelectChange = () => {
    this.setState({ filterFiltered: [] });
    let callBFunction = setInterval(() => {
      this.handlingSearchByName();
      clearInterval(callBFunction);
    }, 10);
  };

  searchByType = (e) => {
    if (e.target.value === "" && this.state.searchName === "") {
      this.setState({ filterFiltered: [] });
    } else if (e.target.value === "" && this.state.searchName !== "") {
      this.setState({ filterFiltered: [] });
      let callBFunction = setInterval(() => {
        this.handlingSearchByName();
        clearInterval(callBFunction);
      }, 10);
    }
    let letter = e.target.value.toLowerCase();
    this.setState({ searchType: letter });
    let callFunction = setInterval(() => {
      this.handlingSearchByType();
      clearInterval(callFunction);
    }, 10);
  };

  handlingSearchByType = () => {
    let searchedClient =
      this.state.filterFiltered.length === 0
        ? this.state.upcomingOrPast.filter((ex) => {
            const examType = ex.exam_type;
            if (
              examType.toLowerCase().indexOf(this.state.searchType) ===
              this.state.searchType.indexOf(this.state.searchType)
            ) {
              return ex;
            } else {
              return null;
            }
          })
        : this.state.filterFiltered.filter((ex) => {
            const examType = ex.exam_type;
            if (
              examType.toLowerCase().indexOf(this.state.searchType) ===
              this.state.searchType.indexOf(this.state.searchType)
            ) {
              return ex;
            } else {
              return null;
            }
          });
    let messageIfEmpty =
      searchedClient.length === 0
        ? "No Such Type"
        : searchedClient.length !== 0 &&
          this.state.messageIfEmpty !== "No Such Type"
        ? this.state.messageIfEmpty
        : "";
    this.state.filterFiltered.length === 0 &&
      this.setState({ filterFiltered: searchedClient });
    this.setState({
      searchedUpcomingOrPast: searchedClient,
      page: 1,
      messageIfEmpty,
    });
    this.paginate(1);
  };

  handlePageChange = (pageNumber) => {
    this.setState({page: pageNumber});
    this.paginate(pageNumber)
  }
  render() {
    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <HamburgerDiv props={this} />
        <Dashboard
          handleClick={this.handleClick}
          handleClickMail={this.handleClickMail}
          handleClient={this.handleClient}
          hnlClick={this.hnlClick}
          hnlClick2={this.hnlClick2}
          hnlClick3={this.hnlClick3}
          hnlWaitingClick={this.hnlWaitingClick}
          props={this}
          handleKeyPress={this.handleKeyPress}
          handleChange={this.handleChange}
          handleClickLeft={this.handleClickLeft}
          handleClickRight={this.handleClickRight}
          loading={this.state.loading}
          hnlVideoClick={this.hnlVideoClick}
          handleWaitingRoom={this.handleWaitingRoom}
          handleVideoPendingClick={this.handleVideoPendingClick}
          handleUpcoming={this.handleUpcoming}
          handlePast={this.handlePast}
          handleAll={this.handleAll}
          hnlMyConsultations={this.hnlMyConsultations}
          handleClientSearch={this.handleClientSearch}
          handleTypeSearch={this.handleTypeSearch}
          searchByType={this.searchByType}
          searchByName={this.searchByName}
          ResetonSelectChange={this.ResetonSelectChange}
          handlePageChange={this.handlePageChange}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { curentDoc: curentDoc, statusChangeWR: statusChangeWR },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(DoctorDashboard);
