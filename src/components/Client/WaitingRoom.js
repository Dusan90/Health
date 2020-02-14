import React from "react";
import "../../assets/client/waitingRoom.scss";
import Select from "react-select";
import CheckoutForm from "../../containers/Client/CheckoutForm";
import { Elements, StripeProvider } from "react-stripe-elements";

const WaitingRoom = ({
  specialities,
  subject,
  submitted,
  notes,
  handleSpeciality,
  handleDoctor,
  handleSubject,
  handleSubmit,
  handleMessage,
  specDoctor,
  resetDoctorSelect,
  isClicked,
  credits
}) => {
  const disabled = credits ? false : true;
  return (
    <div className="exam">
      <div className="mainExam">
        <div className="exam-spec">
          <Select
            type="text"
            id="speciality"
            placeholder="Select Speciality..."
            options={specialities}
            onChange={handleSpeciality}
          />
        </div>
        <div className="exam-doc">
          <Select
            type="text"
            id="doctor"
            placeholder="Select Doctor..."
            options={specDoctor}
            onChange={handleDoctor}
            value={specDoctor.length === 0 ? null : [resetDoctorSelect]}
          />
        </div>
        <div className="exam-sub">
          <input
            type="text"
            className="form-control"
            id="subject"
            placeholder="Enter subject"
            value={subject}
            onChange={handleSubject}
          />
        </div>
      </div>
      <div className="queue">
        <div className="exam-mes">
          <textarea
            type="text"
            className="form-control"
            id="exam-notes"
            placeholder="Enter notes"
            value={notes}
            onChange={handleMessage}
          />
        </div>
        <div className="queueInfo">
          <h5>Queue (online)</h5>
          <div className="queueMain">
            <div className="statusQueue">
              <p>Queue status</p>
              <div>
                {credits ? (
                  <h4
                    style={{
                      background: "rgb(119, 228, 119)",
                      color: "green",
                      borderRadius: "5px"
                    }}
                  >
                    In the queue
                  </h4>
                ) : (
                  <h4>Out of queue</h4>
                )}
              </div>
            </div>
            <div className="timeEst">
              <p>Estimated time</p>
              <div>
                <p>min</p>
                <h4>45</h4>
              </div>
            </div>
          </div>
          <button disabled={disabled}>Start video</button>
        </div>
      </div>
      <input type="file" name="" id="" />
      <button value={submitted} className="btn" onClick={handleSubmit}>
        Enter the queue
      </button>
      <div>
        {isClicked ? (
          <StripeProvider apiKey="pk_test_EolntZ7skKXUqmWzbnpuo1zy00ZxWVnWf3">
            <Elements>
              <CheckoutForm />
            </Elements>
          </StripeProvider>
        ) : null}
      </div>
    </div>
  );
};

export default WaitingRoom;
