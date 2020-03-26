import React, { Component } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Footer from "../../components/Main/Footer";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda
} from "@syncfusion/ej2-react-schedule";

export class DoctorsCalendar extends Component {
  render() {
    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <div style={{ width: "60%", margin: "100px auto 58px auto" }}>
          <ScheduleComponent currentView="Month" selectedDate={new Date()}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
          </ScheduleComponent>
        </div>
        <Footer />
      </>
    );
  }
}

export default DoctorsCalendar;
