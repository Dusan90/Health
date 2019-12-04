import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Dashboard extends Component {

    initiate = () => {
        return this.props.history.push('/initiate');
    }

    render() {
        return (
            <div className="container">
                <Router>
                    <div className="page-header">
                    <h1><a href="/" >Health Care</a> <small>Dashboard</small></h1>
                    </div>

                    <div className="row">

                        <nav className="navbar navbar-default">
                            <div className="container-fluid">
                            <div className="navbar-header">
                                <p className="navbar-brand" to={this.dashboard}>Dashboard</p>
                            </div>

                            <form className="navbar-form navbar-left">
                                <div className="input-group">
                                <input type="text" className="form-control" placeholder="Doctor..."/>
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button">Search</button>
                                </span>
                                </div>
                            </form>
                        
                            <div className="navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav navbar-right">
                                <li><p >Reset password</p></li>
                                <li><p>Logout</p></li>
                                </ul>
                            </div>

                            </div>
                        </nav>

                        <ul className="nav nav-pills">
                            <li className="disabled"><a href="#list">Exams</a></li>
                            <li><Link to="/initiate" onClick={this.initiate}>Initiate Exam</Link></li>
                        </ul>
                        
                        <div id="list" className="panel panel-info">
                            <div className="panel-heading">Exams list</div>
                            <div className="panel-body articles-list"></div>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Dashboard;
