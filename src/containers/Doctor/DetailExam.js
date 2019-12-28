import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Dashboard from '../../components/Doctor/DetailExam';

const options = [
    { value: 'Accept', label: 'Accept' },
    { value: 'Decline', label: 'Decline' },
];

const token = sessionStorage.getItem('accessToken')
const access_token = 'Bearer '.concat(token)

class DetailExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exam: [],
            statusValue: '',
            selectedStatus: ''
        } 
    }

    detail = () => {
        axios.get(`http://0.0.0.0:8000/api/doctor/exams/${this.props.examID}/`, { headers: { Authorization: access_token }})
          .then(response => {
            this.setState({exam: Object.values(response.data)})
          })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.doctorExam();
    }

    handleLink = (e) => {
        this.props.history.push("/doctor/exam/correspondence")
    }

    handleStatus = statusValue => {
        this.setState({statusValue})
        let {value, label} = statusValue;
        console.log(value, label);
        this.setState({selectedStatus: value});
    }

    doctorExam = async () => {    
        const client = await fetch(`http://0.0.0.0:8000/api/doctor/exams/${this.props.examID}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
            },
            body: JSON.stringify({
                state: this.state.selectedStatus,
            })
        });
        const jsonData = await client.json();
        console.log(jsonData);
        return jsonData;
    }

    componentDidMount() {
        this.detail()
    }

    render() {
        return (
            <div className="container">
                <Dashboard 
                    exam={this.state.exam} 
                    status={options} 
                    handleStatus={this.handleStatus}
                    submitValue={this.state.submitValue}
                    handleSubmit={this.handleSubmit}
                    handleLink={this.handleLink}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const examID = state.getIn(['examReducer', 'examID']);
    console.log(examID, 'da')
    return {
        examID,
    }
  }

export default connect(mapStateToProps)(DetailExam);