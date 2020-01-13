import React from 'react';
import Nav from '../../components/Main/Navbar';
import Header from '../../components/Main/Header';
import "../../assets/doctor_profile.scss";

const Profile = ({doctor, prefixValue, descriptionValue, priceValue, submitValue, handlePrefix, handleDescription, handlePrice, handleSubmit}) => (
    <div className="row">
        <Header />
        <Nav />
        <ul className="nav nav-pills">
            <li className="disabled"><a href="#list">Profile</a></li>
        </ul>
        {doctor && doctor.map(doctor => {
                return(
                    <div key={doctor.id} className="doctor">
                        <div className="doctor-p"> 
                            <p>Doctor: {doctor.doctor}</p>
                            <p>Speciality: {doctor.speciality}</p>
                            <p>NPI: {doctor.npi_number}</p>
                            <p>Prefix: {doctor.prefix}</p>
                            <p>Description: {doctor.description}</p>
                            <p>Price: {doctor.email_exam_price}</p>
                        </div>
                    
                        <div className="form">
                            <div className="prefix">
                                <input type="text" className="prefix-input" placeholder="Enter prefix" value={prefixValue} onChange={handlePrefix}/>
                            </div>
                            <div className="description"> 
                                <textarea type="text" className="description-input" placeholder="Enter description" cols="40" rows="7" value={descriptionValue} onChange={handleDescription}/>
                            </div>     
                            <div className="price"> 
                                <input type="text" className="price-input" placeholder="Enter price" value={priceValue} onChange={handlePrice}/>
                            </div>
                            <div className="submit">
                                <button type="submit" className="btn btn-primary" value={submitValue} onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }             
    </div>
);

export default Profile;