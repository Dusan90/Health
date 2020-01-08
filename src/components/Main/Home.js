import React from 'react';
import Header from '../../components/Main/Header';
import Nav from '../../components/Main/Navbar';
import "../../assets/main.scss";

const Home = ({ doctors, handleDoctor, handleConsultation }) => (
    <div className="container">
        <div className="row">
            <Header />
            <Nav />
            {doctors.map(obj => {
                return (
                    <div key={obj.id} className="panel panel-info">
                        <div className="rounded-pill"> 
                            <div>
                                <p>Doctor: {obj.doctor}</p>
                                <p>Speciality: {obj.speciality}</p>
                                <p>Price: {obj.price}</p>
                                <button className="btn btn-info" data-id={obj.id} onClick={handleDoctor.bind(this)}>View Profile</button>
                                <button className="btn btn-warning" onClick={handleConsultation}>Consultation</button>      
                            </div>
                        </div>
                    </div>
                )})
            }
        </div>
    </div>
);

export default Home;