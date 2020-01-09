import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Record from '../../components/Doctor/Record';
import Header from '../../components/Main/Header';
import Nav from '../../components/Main/Navbar';

class ClientRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            record: [],
            token: sessionStorage.getItem('accessToken')
        } 
    }

    record = () => {
        const access_token = 'Bearer '.concat(this.state.token)
        axios.get(`http://0.0.0.0:8000/api/doctor/record/${this.props.clientID}/`, { headers: { Authorization: access_token }})
        .then(response => {
            return this.setState({record: Object.values(response.data)})
        })
    }

    componentDidMount() {
        this.record()
    }

    render() {
        return (
            <div className="container">
                <Header />
                <Nav />
                <Record record={this.state.record}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const clientID = state.getIn(['clientReducer', 'clientID']);
    return {
        clientID,
    }
  }

export default connect(mapStateToProps)(ClientRecord);