import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Register from '../Register';
import Login from '../Login';
import axios from 'axios';
import "../../assets/main.scss";
import Doctor from '../../components/Main/Doctor';
import Header from '../../components/Main/Header';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          doctors: '',
        };
    }

    register = () => {
        return <Route path="/register" component={Register} />
    }

    login = () => {
        return <Route path="/login" component={Login} />
    }

    handleDoctor = (e) => {
        this.setState({doctors: e.target.value})
    }

    componentDidMount() {
        axios.get('http://0.0.0.0:8000/api/doctor/list')
          .then(response => {
            console.log(response.data);
            const res = response.data.message.map((val) => {
              return {value: val.id, label: val.name}
            });
            console.log(res);
            this.setState({specialities: res });
          })
    }

    render() {
        const {doctors} = this.state
        return (
            <div className="container">
                <Header />
                <Doctor doctors={doctors} handleDoctor={this.handleDoctor} />
            </div>
        )
    }
}

export default Main;
