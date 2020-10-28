import React from "react";
import "../../assets/doctors_clients.scss";
import myPatients from "../../icons/My_Patients_blue.svg";
import myClientProfile from "../../icons/icon_my_profile_client_blue_23px.svg";

function Clients({ handleClient, clients, handleSort, handleSearch, props }) {
  return (
    <div className="mainClientsDiv">
      <div className="clientsAbove">
        <img src={myPatients} alt="my patients" />
        <h4>Clients</h4>
      </div>
      <div className="clientsDiv">
      <label>
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
        </label>
      </div>
      <div className="row2">
        {props.messageIfEmpty === '' && props.upcomingandPast.length === 0 ? clients.map((client) => {
          return client.client_id === null ? null : (
            <div key={client.client_id} className="list-group">
              <button
                data-id={client.client_id}
                className="list-group-item"
                onClick={() => handleClient(client.client_id)}
              >
                {client.client}
                <img src={client.image === "default.jpg" ? myClientProfile : `https://healthcarebackend.xyz/media/${client.image}`} alt="cliet profile" />
              </button>
            </div>
          );
          }) : props.messageIfEmpty === '' && props.upcomingandPast.length !== 0 ? props.upcomingandPast.map((client) => {
            return client.client_id === null ? null : (
              <div key={client.client_id} className="list-group">
                <button
                  data-id={client.client_id}
                  className="list-group-item"
                  onClick={() => handleClient(client.client_id)}
                >
                  {client.client}
                  <img src={client.image === "default.jpg" ? myClientProfile : `https://healthcarebackend.xyz/media/${client.image}`} alt="cliet profile" />
                </button>
              </div>
            )
}) :  <h4 style={{color: '#666666'}}>{props.messageIfEmpty}</h4>}
      </div>
    </div>
  );
}

export default Clients;
