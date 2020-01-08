import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ExamMessage from '../../components/Doctor/Message';
import {doctor} from '../../actions/examActions';

const token = sessionStorage.getItem('accessToken')
const access_token = 'Bearer '.concat(token)

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: [],
            messageValue: ''
        } 
    }

    message = () => {
        axios.get(`http://0.0.0.0:8000/api/doctor/exams/${this.props.examID}/message`, { headers: { Authorization: access_token }})
          .then(response => {
              console.log(response.data)
              return this.setState({message: Object.values(response.data)})
        }) 
    }

    sendMessage= async () => {    
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
        this.message();
    }

    componentDidMount() {
        this.message()
    }

    render() {
        return (
            <div className="container">
                <ExamMessage 
                    message={this.state.message} 
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

export default connect(mapStateToProps)(Message);