import React from "react";
import "../../assets/doctors_clients.scss";
import myPatients from "../../icons/My_Patients_blue.svg";
import myClientProfile from "../../icons/icon_my_profile_client_blue_23px.svg";

function Clients({ handleClient, clients, handleSort }) {
  return (
    <div className="mainClientsDiv">
      <div className="clientsAbove">
        <img src={myPatients} alt="my patients" />
        <h4>Clients</h4>
      </div>
      <div className="clientsDiv">
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
        {clients.map((client) => {
          return client.id === null ? null : (
            <div key={client.id} className="list-group">
              <button
                data-id={client.id}
                className="list-group-item"
                onClick={() => handleClient(client.id)}
              >
                {client.client}
                <img src={myClientProfile} alt="cliet profile" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Clients;
