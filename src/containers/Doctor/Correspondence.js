import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Dashboard from '../../components/Doctor/Correspondence';

const token = sessionStorage.getItem('accessToken')
const access_token = 'Bearer '.concat(token)

class Correspondence extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correspondence: [],
            messageValue: ''
        } 
    }

    correspondence = () => {
        axios.get(`http://0.0.0.0:8000/api/doctor/exams/${this.props.examID}/message`, { headers: { Authorization: access_token }})
          .then(response => {
            console.log(response.data)
            const res = response.data.message.map((val) => {
                return {id: val.id, sender: val.sender, message: val.message, attachment: val.attachment}
            });
            this.setState({correspondence: res})
          })
    }

    sendMessage= async () => {    
        const client = await fetch(`http://0.0.0.0:8000/api/doctor/exams/${this.props.examID}/message/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
            },
            body: JSON.stringify({
                message: this.state.messageValue,
                attachment: null,
            })
        });
        const jsonData = await client.json();
        console.log(jsonData);
        return jsonData;
    }

    handleMessage = (e) => {
        this.setState({messageValue: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.sendMessage();
        this.setState({messageValue: ''})
        this.correspondence();
    }

    componentDidMount() {
        this.correspondence()
    }

    render() {
        return (
            <div className="container">
                <Dashboard 
                    correspondence={this.state.correspondence} 
                    messageValue={this.state.messageValue}
                    handleMessage={this.handleMessage}
                    submitValue={this.state.submitValue}                
                    handleSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const examID = state.getIn(['examReducer', 'examID']);
    return {
        examID,
    }
  }

export default connect(mapStateToProps)(Correspondence);