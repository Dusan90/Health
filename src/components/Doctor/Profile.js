import React from "react";
import Nav from "../../components/Main/Navbar";
import Header from "../../components/Main/Header";
import "../../assets/doctor_profile.scss";

const Profile = ({
  doctor,
  prefixValue,
  descriptionValue,
  priceValue,
  submitValue,
  handlePrefix,
  handleDescription,
  handlePrice,
  handleSubmit
}) => {
  return (
    <>
      <Header />
      <Nav />
      {doctor &&
        doctor.map(doctor => {
          return (
            <div
              className="mainprof"
              style={{
                margin: "20px auto",
                display: "flex",
                flexDirection: "column"
              }}
              key={doctor.id}
            >
              <div className="doctor">
                <div className="imginput">
                  <div className="doctor-p">
                    <p></p>
                  </div>
                  <input type="file" name="picture" id="" />
                </div>
                <div className="info">
                  <p>Doctor: {doctor.doctor}</p>
                  <p>Speciality: {doctor.speciality}</p>
                  <p>NPI: {doctor.npi_number}</p>
                  <p>Prefix: {doctor.prefix}</p>
                  <p>Description: {doctor.description}</p>
                  <p>Price: {doctor.email_exam_price}</p>
                </div>
              </div>
              <form className="form">
                <div className="pref-price">
                  <div className="prefix">
                    <input
                      type="text"
                      className="prefix-input"
                      placeholder="Enter prefix"
                      value={prefixValue}
                      onChange={handlePrefix}
                    />
                  </div>
                  <div className="price">
                    <input
                      type="text"
                      className="price-input"
                      placeholder="Enter price"
                      value={priceValue}
                      onChange={handlePrice}
                    />
                  </div>
                </div>
                <div className="description">
                  <textarea
                    type="text"
                    className="description-input"
                    placeholder="Enter description"
                    value={descriptionValue}
                    onChange={handleDescription}
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
              </form>
            </div>
          );
        })}
    </>
  );
};

export default Profile;
