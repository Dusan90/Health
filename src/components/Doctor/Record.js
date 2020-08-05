import React from "react";
import "../../assets/record.scss";

const Record = ({
  record,
  props,
  handleReport,
  handleTests,
  handleDiagnose,
  handlePrescribtionDate,
  handleMedicationName,
  handleMedicationNotes,
  submitValue,
  handleSubmit,
}) => (
  <div className="mainRecord">
    {record ? (
      <div className="record-box-out">
        <p>
          <span>Client:</span> {record.client}
        </p>
        <p>
          <span>Allergies:</span> {record.allergies}
        </p>
        <p>
          <span>Teraphy history:</span> {record.teraphy_history}
        </p>
        <p>
          <span>Medical conditions:</span> {record.medical_conditions}
        </p>
      </div>
    ) : (
      <p style={{ margin: "30px auto", color: "rgb(0, 191, 255)" }}>
        No Records
      </p>
    )}
    <div className="box">
      {record && record.report.length !== 0
        ? record.report.map((ex) => {
            return (
              <div key={ex.id} className="record-box">
                <p>
                  <span>Doctor:</span> {ex.name}
                </p>
                <p>
                  <span>Speciality:</span> {ex.spec_name}
                </p>
                <p>
                  <span>Diagnose:</span> {ex.diagnose}
                </p>
                <p>
                  <span>Report:</span> {ex.report}
                </p>
                <p>
                  <span>Tests:</span> {ex.tests}
                </p>
                <p>
                  <span>Medication Name:</span> {ex.medication_name}
                </p>
                <p>
                  <span>Prescribing Date:</span>{" "}
                  {ex.medication_prescribing_date}
                </p>
                <p>
                  <span>Medication Notes:</span> {ex.medication_notes}
                </p>
              </div>
            );
          })
        : null}
    </div>
    <div className="r-form">
      <div className="details">
        <input
          type="text"
          className="d-details"
          placeholder="Enter Report"
          value={props.report}
          onChange={handleReport}
        />
      </div>
      <div className="teraphy-history">
        <input
          type="text"
          className="d-teraphy"
          placeholder="Enter Tests"
          value={props.tests}
          onChange={handleTests}
        />
      </div>
      <div className="teraphy-history">
        <input
          type="text"
          className="d-teraphy"
          placeholder="Enter Medication Name"
          value={props.medicationName}
          onChange={handleMedicationName}
        />
      </div>
      <div className="teraphy-history">
        <input
          type="text"
          className="d-teraphy"
          placeholder="Enter Medication Notes"
          value={props.medicationNotes}
          onChange={handleMedicationNotes}
        />
      </div>
      <div className="teraphy-history">
        <input
          type="date"
          className="d-teraphy"
          placeholder="Enter Prescription Date"
          value={props.prescribingDate}
          onChange={handlePrescribtionDate}
        />
      </div>
      <div className="medical-con">
        <input
          type="text"
          className="d-medical"
          placeholder="Enter Diagnose"
          value={props.diagnose}
          onChange={handleDiagnose}
        />
      </div>
      <div className="submit">
        <button
          type="submit"
          className="btn"
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
