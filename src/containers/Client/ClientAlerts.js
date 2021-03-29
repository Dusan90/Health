import React, { Component } from 'react'
import ClientsAlertsComp from '../../components/Client/ClientsAlertsComp'
import axios from 'axios'

export class ClientAlerts extends Component {
    constructor(props) {
        super(props);
        this.state = {
          exams: [],
          loading: true,
          messageOnScreen: "",
          token: sessionStorage.getItem("accessToken"),
        };
      }
    
      componentDidMount() {
        // this.handleDoctorProfile();
      }
    
      handleDoctorProfile = async () => {
        const access_token = "Bearer ".concat(this.state.token);
        axios
          .get(`https://healthcarebackend.xyz/api/doctor/profile/`, {
            headers: { Authorization: access_token },
          })
          .then((response) => {
            let current = response.data.data;
            this.peopleInWaitingRoom(current.id);
          });
      };
    
      peopleInWaitingRoom = async (id) => {
        const access_token = "Bearer ".concat(this.state.token);
        axios
          .get(`https://healthcarebackend.xyz/api/queue/${id}/list/`, {
            headers: { Authorization: access_token },
          })
          .then((response) => {
            console.log(response);
            if(response.data.data.queue !== 0){
            const filtered = response.data.data.queue.filter(ex =>{
              return ex.status === 'In the queue'
            })
              this.setState({
                exams: filtered,
                loading: false,
              });
              if(filtered.length === 0){
                  this.setState({messageOnScreen: 'No alerts'})
              }
            }
            else{
              this.setState({messageOnScreen: 'No alerts', exams: [],
            loading: false})
            }
          })
          .catch((err) => {
            console.log(err.response);
            this.setState({messageOnScreen: 'No alerts', exams: [],
            loading: false,})
          });
      };
    //   handleClick = (id, type) => {
    //     if (type === "queue") {
    //       this.props.history.push(`/doctor/processing/video/exam/${id}/#init`);
    //     }
    //   };
    render() {
        return (
            <>
                <ClientsAlertsComp props={this.state} handleClick={this.handleClick}/>
            </>
        )
    }
}

export default ClientAlerts
