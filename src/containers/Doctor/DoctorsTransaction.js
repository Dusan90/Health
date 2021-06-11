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
            accountNumber: ''
        }
    }

    handleChange = (e) => {
        this.setState({ accountNumber: e.target.value })
    }

    handlePage = (value) => {
        this.setState({ page: value })
    }

    saveBankAccountNumber = () => {
        console.log('hello ');
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
                <Transaction props={this.state} handlePage={this.handlePage} saveBankAccountNumber={this.saveBankAccountNumber} />
            </>
        )
    }
}

export default DoctorsTransaction
