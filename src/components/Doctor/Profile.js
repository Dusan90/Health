import React from 'react';
import Nav from '../../components/Main/Navbar';
import Header from '../../components/Main/Header';

const Profile = ({doctor, prefixValue, descriptionValue, priceValue, submitValue, handlePrefix, handleDescription, handlePrice, handleSubmit}) => (
    <div className="row">
        <Header />
        <Nav />
        <ul className="nav nav-pills">
            <li className="disabled"><a href="#list">Profile</a></li>
        </ul>
        {doctor && doctor.map(doctor => {
                return(
                    <div key={doctor.id} className="panel panel-info" style={{height: "180px"}}>
                        <div className="rounded-pill"> 
                            <div>
                                <p>Doctor: {doctor.doctor}</p>
                                <p>Speciality: {doctor.speciality}</p>
                                <p>NPI: {doctor.npi_number}</p>
                                <p>Prefix: {doctor.prefix}</p>
                                <p>Description: {doctor.description}</p>
                                <p>Price: {doctor.email_exam_price}</p>
                            </div>
                        </div>
                    
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="npi">Prefix:</label>
                            <div className="col-sm-30"> 
                                <input type="text" pattern="[0-9]*" className="form-control" id="prefix" placeholder="Enter prefix" value={prefixValue} onChange={handlePrefix}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="prefix">Description:</label>
                            <div className="col-sm-30"> 
                                <input type="text" className="form-control" id="description" placeholder="Enter description" value={descriptionValue} onChange={handleDescription}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="price">Price:</label>
                            <div className="col-sm-30"> 
                                <input type="text" id="price" value={priceValue} onChange={handlePrice}/>
                            </div>
                        </div>
                        <div className="form-group"> 
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-default" value={submitValue} onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }             
    </div>
);

export default Profile;