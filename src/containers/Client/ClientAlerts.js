import React, { Component } from 'react'
import ClientsAlertsComp from '../../components/Client/ClientsAlertsComp'
import axios from 'axios'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NotificationManager } from "react-notifications";
import { connectToWebSocket } from "../../actions/connectToWebSocketAction";


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
        this.handleDoctorProfile();
       
      }
    
      handleDoctorProfile = async () => {
        const access_token = "Bearer ".concat(this.state.token);
        axios
          .get(`https://healthcarebackend.xyz/api/client/profile/`, {
            headers: { Authorization: access_token },
          })
          .then((response) => {
            let current = response.data.data;
            setTimeout(() => {
              this.connect(current.id) 
             });
            this.peopleInWaitingRoom(current.id);
          });
      };
    
      peopleInWaitingRoom = async () => {
        const access_token = "Bearer ".concat(this.state.token);
        axios
          .get(`https://healthcarebackend.xyz/api/client/notifications/`, {
            headers: { Authorization: access_token },
          })
          .then((response) => {
            console.log(response);
            this.setState({exams: response.data.data, loading: false})
          })
          .catch((err) => {
            console.log(err.response);
            this.setState({messageOnScreen: 'No alerts', exams: [],
            loading: false,})
          });
      };
  
      handleClick = async (id, type) => {

        if (type === "mail") {
          this.props.history.push(`/client/exam/detail/${id}`);
        } else if (type === "video") {
          this.props.history.push(`/client/video/exam/detail/${id}`);
      };
    }

      handleDelete = async (id) =>{
        const access_token = "Bearer ".concat(this.state.token);
        let data = axios.delete(`https://healthcarebackend.xyz/api/client/notifications/${id}/`, {
        headers: {
          Authorization: access_token
        }
      })
      const jsonData = await data
      console.log(jsonData);
      this.peopleInWaitingRoom();
      }

      connect = () => {
        if(!sessionStorage.getItem('socketConnected')){
          this.props.connectToWebSocket(new WebSocket(
            `wss://healthcarebackend.xyz/ws/dashboard/client/${this.state.id}/`
          ))
          this.props.connection.onopen = () => {
            console.log("connected to port");
            sessionStorage.setItem('socketConnected', 'true');
      
          };
        }
          this.props.connection.onmessage = (e) => {
            console.log(e.data);
            if (JSON.parse(e.data).modified) {
              NotificationManager.error("Exam modified", "New Alert!", 2000);
              this.peopleInWaitingRoom();
            }
      }}
    render() {
        return (
            <>
                <ClientsAlertsComp props={this.state} handleClick={this.handleClick} handleDelete={this.handleDelete}/>
            </>
        )
    }
}

const mapStateToProps = (state) => {
  const connection = state.getIn(["connectToWebSocketReducer", "connection"]);
  return {
    connection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ connectToWebSocket: connectToWebSocket }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientAlerts)
