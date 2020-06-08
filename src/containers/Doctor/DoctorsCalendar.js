import React, { Component } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Footer from "../../components/Main/Footer";
import axios from "axios";
// import moment from "moment";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
} from "@syncfusion/ej2-react-schedule";

export class DoctorsCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("accessToken"),
      exams: [],
    };
    // this.data = [
    //   {
    //     Id: 2,
    //     Subject: "Meeting",
    //     StartTime: new Date(2018, 1, 15, 10, 0),
    //     EndTime: new Date(2018, 1, 15, 12, 30),
    //     IsAllDay: false,
    //     Status: "Completed",
    //     Priority: "High",
    //   },
    // ];
  }

  componentDidMount() {
    this.peopleVideoPending();
  }

  peopleVideoPending = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    await axios
      .get(`https://healthcarebackend.xyz/api/web/doctor/list/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response.data.data);

        let accepted = response.data.data.filter((res) => {
          return res.status === "Appointed";
        });
        const newObject = accepted.map((obj) => {
          return {
            client: obj.client,
            startTime: obj.appointed_date,
            endTime: obj.appointed_date,
            id: obj.id,
          };
        });

        this.setState({
          exams: [...this.state.exams.concat(newObject)],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    console.log(this.state.exams);

    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <div style={{ width: "60%", margin: "100px auto 58px auto" }}>
          <ScheduleComponent
            currentView="Day"
            selectedDate={new Date()}
            eventSettings={{
              dataSource: this.state.exams,
              fields: {
                id: "id",
                subject: { name: "client" },
                startTime: { name: "startTime" },
                endTime: { name: "endTime" },
              },
            }}
          >
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
          </ScheduleComponent>
        </div>
        <Footer />
      </>
    );
  }
}

export default DoctorsCalendar;
