import React from "react";
import "../../assets/record.scss";

const Record = ({
  record,
  props,
  handleDetails,
  handleTerpahy,
  handleCondition,
  submitValue,
  handleSubmit
}) => (
  <div className="row">
    <div className="box">
      {record.map(data => {
        console.log(data);

        return (
          <div key={data.id} className="record-box">
            <p>Client: {data.client}</p>
            <p>Speciality: {data.speciality}</p>
            <p>Details: {data.details}</p>
            <p>Teraphy history: {data.teraphy_history}</p>
            <p>Medical conditions: {data.medical_conditions}</p>
          </div>
        );
      })}
    </div>
    <div className="r-form">
      <div className="details">
        <input
          type="text"
          className="d-details"
          placeholder="Enter details"
          value={props.details}
          onChange={handleDetails}
        />
      </div>
      <div className="teraphy-history">
        <input
          type="text"
          className="d-teraphy"
          placeholder="Enter teraphy"
          value={props.teraphy}
          onChange={handleTerpahy}
        />
      </div>
      <div className="medical-con">
        <input
          type="text"
          className="d-medical"
          placeholder="Enter condition"
          value={props.condition}
          onChange={handleCondition}
        />
      </div>
      <div className="submit">
        <button
          type="submit"
          className="btn btn-primary"
          value={submitValue}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  </div>
);

export default Record;
