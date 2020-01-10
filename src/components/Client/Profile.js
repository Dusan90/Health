import React from 'react';
import Nav from '../../components/Main/Navbar';
import Header from '../../components/Main/Header';
import "../../assets/client/profile.scss";

const Profile = ({client, addressValue, handleAddress, submitValue, handleSubmit}) => (
    <div className="row">
        <Header />
        <Nav />
        <ul className="nav nav-pills">
            <li className="disabled"><a href="#list">Profile</a></li>
        </ul>
        {client && client.map(client => {
                return(
                    <div key={client.id} className="client">
                        <div className="client-p"> 
                            <p>Name: {client.name}</p>
                            <p>Address: {client.address}</p>
                            <p>Gender: {client.gender}</p>
                            <p>Birth Date: {client.birth_date}</p>
                        </div>
                    
                        <div className="form">
                            <div className="address">
                                <input type="text" className="address-input" placeholder="Enter address" value={addressValue} onChange={handleAddress}/>
                            </div>
                            <div className="submit">
                                <button type="submit" className="btn" value={submitValue} onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }             
    </div>
);

export default Profile;