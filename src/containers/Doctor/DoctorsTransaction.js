import React, { Component } from 'react'
import Transaction from '../../components/Doctor/DoctorsTransaction'
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import '../../assets/doctorsTransactions.scss'

export class DoctorsTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'bankAccount',
        }
    }

    handlePage = (value) => {
        this.setState({ page: value })
    }
    render() {
        return (
            <>
                <div className="header">
                    <div>
                        <Header />
                        <Nav />
                    </div>
                </div>
                <Transaction props={this.state} handlePage={this.handlePage} />
            </>
        )
    }
}

export default DoctorsTransaction
