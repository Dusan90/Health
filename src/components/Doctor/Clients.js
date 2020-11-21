import React from "react";
import "../../assets/doctors_clients.scss";
import myPatients from "../../icons/My_Patients_blue.svg";
import myClientProfile from "../../icons/icon_my_profile_client_blue_23px.svg";
import Select from 'react-select'

function Clients({ handleClient, clients, handleSort, handleSearch, props, handleDoctor }) {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "40px",
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      width: "100%",
      flex: 1,
      // marginLeft: "2px",
      background: "white",
      color: "#666666",
      fontWeight: "600",
    }),
    placeholder: () =>({
      color: 'black',
      fontWeight: '550'
    })
  };
  return (
    <div className="mainClientsDiv">
      <div className="clientsAbove">
        <img src={myPatients} alt="my patients" />
        <h4>Clients</h4>
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
            placeholder="Select Client..."
            options={ props.clients}
            onChange={handleDoctor}
            value={   props.resetDoctorSelect}
            // value={specDoctor.length === 0 ? null : [resetDoctorSelect]}
          />
        </div>
      </div>
      <div className="row2">
        { clients.map((client) => {
          return client.iD === null ? null : (
            <div key={client.iD} className="list-group">
              <button
                data-id={client.iD}
                className="list-group-item"
                onClick={() => handleClient(client.iD)}
              >
                {client.label}
                <img src={client.image === "default.jpg" ? myClientProfile : `http://healthcarebackend.xyz/media/${client.image}`} alt="cliet profile" />
              </button>
            </div>
          )
          }) }
      </div>
    </div>
  );
}

export default Clients;
