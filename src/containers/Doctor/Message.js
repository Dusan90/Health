import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ExamMessage from '../../components/Doctor/Message';


class DoctorMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: [],
            messageValue: '',
            selectedFile: null,
            token: sessionStorage.getItem('accessToken')
        } 
    }

    client = async () => {
        const access_token = 'Bearer '.concat(this.state.token)
        axios.get(`http://0.0.0.0:8000/api/doctor/exams/${this.props.examID}/message`, { headers: { Authorization: access_token }})
          .then(response => {
              return this.setState({client: response.data.client})
        }).catch(e => {
            console.log(e);
        })
    }

    sendMessage= async () => {    
        const access_token = 'Bearer '.concat(this.state.token)
        // const data = new FormData()
        // data.append('file', this.state.selectedFile, this.state.selectedFile.name)
        const client = await fetch(`http://0.0.0.0:8000/api/doctor/exams/${this.props.examID}/message/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;',
                'Authorization': access_token,
            },
            body: JSON.stringify({
                message: this.state.messageValue,
                attachment: null
            })
        })
        const jsonData = await client.json();
        return jsonData;
    }

    handleMessage = (e) => {
        this.setState({messageValue: e.target.value})
    }

    onChangeHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0],
            loaded: 0,
          })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.sendMessage();
        this.setState({messageValue: ''})
        this.client();
    }

    componentDidMount() {
        this.client()
    }

    render() {
        console.log(this.state.selectedFile, 'mhm')
        return (
            <div className="container">
                <ExamMessage 
                    client={this.state.client} 
                    messageValue={this.state.messageValue}
                    handleMessage={this.handleMessage}
                    submitValue={this.state.submitValue}                
                    handleSubmit={this.handleSubmit}
                    onChangeHandler={this.onChangeHandler}
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

export default connect(mapStateToProps)(DoctorMessage);