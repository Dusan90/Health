import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Register from '../../containers/Register';
import Login from '../../containers/Login';

class Main extends Component {
    register = () => {
        return <Route path="/register" component={Register} />
    }

    login = () => {
        return <Route path="/login" component={Login} />
    }

    render() {
        return (
            <div className="container">
                <div className="page-header">
                    <h1><a href="/">Health Care</a> <small>Homepage</small></h1>
                </div>
                <div className="row">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">                   
                            <div className="navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="/register" onClick={this.register}>Register</Link></li>
                                    <li><Link to="/login" onClick={this.login}>Login</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div class="panel panel-info" id="single-account">
                    <h2 class="panel-heading"></h2>
                    <div class="row">
                        <h4>Name:</h4>
                        <span>Speciality:</span>
                        <text>Description:</text>
                    </div>

                    <div id="single-article-controls">
                        <Link class="btn btn-default" id="edit-button">View Profile</Link>
                        <Link class="btn btn-danger" id="delete-button">Appoint Consultation</Link>
                    </div>
                </div>
                <div class="span8">
                    <div class="clear">
                        <hr/>
                            <h1>Name</h1>
                            <div class="more label"><a href="#">Read more</a></div> 
                            <div class="tags">
                                <span class="btn-info">energy</span><span class="btn-info"><a href="#">reality</a></span><span class="btn-info"><a href="#">world</a></span>
                            </div>           
                    </div>
                    <div class="clear">
                        <hr/>
                            <h1>Name</h1>
                            <div class="more label"><a href="#">Read more</a></div> 
                            <div class="tags">
                                <span class="btn-info">energy</span><span class="btn-info"><a href="#">reality</a></span><span class="btn-info"><a href="#">world</a></span>
                            </div>           
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;
