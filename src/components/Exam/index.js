import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';


const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  }
};

class ExamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      specialities: [],
      doctors: [],
      subject: '',
      submitted: false
    };
    // this.submit = this.submit.bind(this);
  }

  handleSpeciality = (e) => {
    this.setState({specialities: e.target.value});
  }

  handleDoctor = (e) => {
      this.setState({doctors: e.target.value})
  }

  handleSubject = (e) => {
    this.setState({subject: e.target.value});
  }

  handleSubmit = (e) => {
    return this.props.history.push('/checkout');
  }

  // async submit(ev) {
  //   let {token} = await this.props.stripe.createToken({name: "Name"});
  //   let response = await fetch("/api/charge", {
  //     method: "POST",
  //     headers: {"Content-Type": "text/plain"},
  //     body: token.id
  //   });
  
  //   if (response.ok) this.setState({complete: true});
  // }

  componentDidMount() {
    axios.get('http://0.0.0.0:8000/api/specialities/')
      .then(response => {
        console.log(response.data);
        const res = response.data.message.map((val) => {
          return {value: val.id, label: val.name}
        });
        console.log(res);
        this.setState({specialities: res });
      })
    axios.get('http://0.0.0.0:8000/api/doctor/list')
      .then(response => {
        console.log(response.data , 'aaa');
        const res = response.data.message.map((val) => {
          return {value: val.id, label: val.doctor}
        });
        console.log(res, 'respone');
        this.setState({doctors: res });
      })
  }

  render() {
    if (this.state.complete) return <h1>Submit Completed</h1>;
    const {specialities} = this.state
    const {doctors} = this.state

    return (
      <div className="container">
        <Router>
          <div className="page-header">
            <h1><a href="/">Health Care</a> <small>Submit exam</small></h1>
          </div>

          <div className="mt-5">
            <div className="row mt-5">
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="lastname">Speciality</label>
                <div className="col-sm-10"> 
                  <Select type="text" id="speciality" options={specialities} onChange={this.handleSpeciality}/>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="pwd">Doctor</label>
                <div className="col-sm-10"> 
                  <Select type="text" id="doctor" options={doctors} onChange={this.handleDoctor}/>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="pwd">Subject</label>
                <div className="col-sm-10"> 
                  <input type="text" className="form-control" id="subject" placeholder="Enter subject" value={this.state.subject} onChange={this.handleSubject}/>
                </div>
              </div>
              <div className="text-center col-md-4 col-md-offset-4">
                <Link value={this.state.submitted} to="/checkout" onClick={this.handleSubmit} className="btn btn-success btn-block">Submit Exam</Link>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default ExamForm;