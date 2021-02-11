import React from "react";
import "../../assets/doctors_clients.scss";
import myPatients from "../../icons/My_Patients_blue.svg";
import myClientProfile from "../../icons/newIconsForDesign/client_picture.svg";
import Select from 'react-select'
import { Link } from "@material-ui/core";

function Clients({ handleClient, clients, handleSort, handleSearch, props, handleDoctor, resetFilter }) {
  const options = props.filteredByName.length === 0 ? props.clients : props.rfilteredByName
  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "33px",
      border: "1.7px solid #fa9551",
      borderRadius: "15px",
      width: "100%",
       // marginLeft: "2px",
      background: "white",
      color: "#666666",
      fontWeight: "bold",
    }),
    placeholder: () =>({
      color: '#666666',
      fontWeight: 'bold'
    })
  };
  return (
    <div className="mainClientsDiv">
      <div className="clientsAbove">
        {/* <img src={myPatients} alt="my patients" /> */}
        <h4>Clients List</h4>
      </div>
      <div className="clientsDiv">
      {/* <label>
          Search by name:{" "}
          <input type="text" value={props.searchName} placeholder='Search' onChange={handleSearch}/>
        </label>
        <label>
          Sort by:{" "}
          <select onClick={handleSort}>
            <option value="">Sort it...</option>
            <option value="nameAZ">Name: A-Z</option>
            <option value="nameZA">Name: Z-A</option>
          </select>
        </label> */}
           <div className="exam-doc">
          <Select
            styles={customStyles}
            type="text"
            id="doctor"
            placeholder="Choose Client"
            options={ options}
            onChange={handleDoctor}
            onMenuOpen={resetFilter}
            value={   props.resetDoctorSelect}
            // value={specDoctor.length === 0 ? null : [resetDoctorSelect]}
          />
        </div>
      </div>
      <div className="row2">
        { clients.map((client) => {
          console.log(client);
          return client.iD === null ? null : (
            <div key={client.iD} className="list-group">
              <div
                data-id={client.iD}
                className="list-group-item"
                
              >
                <img src={client.image.includes('default') ? myClientProfile : `https://healthcarebackend.xyz/media/${client.image}`} alt="cliet profile" />
                {/* <p>
                {client.label}
                </p> */}
                <div className='docInfo'>
  <p>
  {client.label}
  </p>
  <h5>Email: <span>{client.email}</span></h5>
  <h5>Phone: <span>{client.phone}</span></h5>
  </div>
                <Link to='#' onClick={() => handleClient(client.iD)} className='Details' >Details</Link>
              </div>
            </div>










          )
          }) }
      </div>
    </div>
  );
}

export default Clients;
