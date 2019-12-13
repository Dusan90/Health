import React, { Component } from 'react';
import axios from 'axios';
import "../../assets/main.scss";
import Doctor from '../../components/Main/Home';
import Header from '../../components/Main/Header';
import Nav from '../../components/Main/Navbar';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          doctors: '',
        };
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
                <Nav />
                <Doctor doctors={doctors} handleDoctor={this.handleDoctor} />
            </div>
        )
    }
}

export default Main;
