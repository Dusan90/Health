import React from "react";
import "../../assets/main/main.scss";
// import { Pagination } from 'reactstrap';

const Home = ({ doctors, handleDoctor, handleConsultation }) => (
  <div className="row">
    {doctors.map(obj => {
      return (
        <div key={obj.id} className="doctor-panel">
          <div className="doc-panel">
            <p>Doctor: {obj.doctor}</p>
            <p>Speciality: {obj.speciality}</p>
            <p>Price: {obj.price}</p>
          </div>
          <div className="doc-profile">
            <button
              className="btn btn-info"
              data-id={obj.id}
              onClick={handleDoctor.bind(this)}
            >
              View Profile
            </button>
          </div>
          <div className="doc-consultation">
            <button className="btn btn-warning" onClick={handleConsultation}>
              Consultation
            </button>
          </div>
        </div>
      );
    })}
  </div>
);

export default Home;
