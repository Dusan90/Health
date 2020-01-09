import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CorrespondenceMessage from '../../components/Doctor/Correspondence';
import {doctor} from '../../actions/examActions';

const token = sessionStorage.getItem('accessToken')


class Correspondence extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correspondence: [],
            messageValue: '', 
            token: sessionStorage.getItem('accessToken')
        } 
    }

    correspondence = () => {
        const access_token = 'Bearer '.concat(this.state.token)
        axios.get(`http://0.0.0.0:8000/api/doctor/exams/${this.props.examID}/messages`, { headers: { Authorization: access_token }})
          .then(response => {
            const res = response.data.message.map((val) => {
                return {sender: val.sender, created: val.created, message: val.message, attachment: val.attachment}
            });
            this.setState({correspondence: res})
            var sender_obj = this.state.correspondence[0].sender      
            this.props.dispatch(doctor(sender_obj))
        }) 
    }

    sendMessage= async () => {   
        const access_token = 'Bearer '.concat(this.state.token) 
        const client = await fetch(`http://0.0.0.0:8000/api/doctor/exams/${this.props.examID}/messages/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token,
            },
            body: JSON.stringify({
                message: this.state.messageValue,
                attachment: null,
            })
        });
        const jsonData = await client.json();
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
                <CorrespondenceMessage 
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