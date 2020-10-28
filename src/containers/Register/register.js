import React, { Component } from "react";
import "../../App.css";
import Header from "../../components/Main/Header";
import RegisterUser from "../../components/Auth/Register";
import Nav from "../../components/Main/Navbar";
import axios from "axios";
import { NotificationManager } from "react-notifications";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "client",
      emailValue: "",
      firstNameValue: "",
      lastNameValue: "",
      passwordValue: "",
      confPasswordValue: "",
      addressValue: "",
      birthDateValue: "",
      EmailPrice: 0,
      WebPrice: 0,
      prefixValue: "",
      specOptions: [],
      specValue: "",
      selectedGenderValue: "",
      selectedSpecValue: "",
      phoneNumber: "",
    };
  }

  handleUserType = (userType) => {
    this.setState({ userType });
  };

  handleEmail = (e) => {
    this.setState({ emailValue: e.target.value });
  };

  handleFirstName = (e) => {
    this.setState({ firstNameValue: e.target.value });
  };

  handleLastName = (e) => {
    this.setState({ lastNameValue: e.target.value });
  };

  handlePass = (e) => {
    this.setState({ passwordValue: e.target.value });
  };

  handleConfPass = (e) => {
    this.setState({ confPasswordValue: e.target.value });
  };

  handleAddress = (e) => {
    this.setState({ addressValue: e.target.value });
  };

  handleBirthDate = (e) => {
    this.setState({ birthDateValue: e.target.value });
  };

  handleEmailPrice = (e) => {
    this.setState({ EmailPrice: e.target.value });
  };

  handleWebPrice = (e) => {
    this.setState({ WebPrice: e.target.value });
  };

  handlePrefix = (e) => {
    this.setState({ prefixValue: e.target.value });
  };

  handlePhoneNumber = (e) => {
    this.setState({phoneNumber: e.target.value})
  }

  handleSpec = (specValue) => {
    this.setState({ specValue });
    let { value } = specValue;
    this.setState({ selectedSpecValue: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.userType === "client" &&
      this.state.emailValue &&
      this.state.firstNameValue &&
      this.state.lastNameValue &&
      this.state.passwordValue &&
      this.state.selectedGenderValue &&
      this.state.addressValue &&
      this.state.birthDateValue &&
      this.state.confPasswordValue && 
      this.state.phoneNumber
    ) {
      this.userRegister();
    } else if (
      this.state.userType === "doctor" &&
      this.state.emailValue &&
      this.state.firstNameValue &&
      this.state.lastNameValue &&
      this.state.passwordValue &&
      this.state.prefixValue &&
      this.state.selectedSpecValue
    ) {
      this.userRegister();
    } else {
      NotificationManager.error("All Fields Are Required", "Failed!", 2000);
    }
  };

  componentDidMount() {
    axios
      .get("https://healthcarebackend.xyz/api/specialities/")
      .then((response) => {
        const res = response.data.data.map((val) => {
          return { value: val.id, label: val.name };
        });
        this.setState({ specOptions: res });
      });
  }

  userRegister = async () => {
    if (this.state.userType === "client") {
      if (this.state.confPasswordValue === this.state.passwordValue) {
        const client = await fetch(
          "https://healthcarebackend.xyz/api/auth/register/client/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.state.emailValue,
              first_name: this.state.firstNameValue,
              last_name: this.state.lastNameValue,
              password: this.state.passwordValue,
              client: {
                gender: this.state.selectedGenderValue,
                address: this.state.addressValue,
                birth_date: this.state.birthDateValue,
                phone: this.state.phoneNumber
              },
            }),
          }
        );
        this.props.history.push("/login");
        
        const jsonData = await client.json();
        jsonData.success &&  NotificationManager.error(
          "An email for confirmation will be sent shortly",
          "Successful!",
          4000
        );
        return jsonData;
      } else {
        NotificationManager.error(
          "Confirm password does not match",
          "Failed!",
          4000
        );
      }
    } else if (this.state.userType === "doctor") {
      const doctor = await fetch(
        "https://healthcarebackend.xyz/api/auth/register/doctor/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.state.emailValue,
            first_name: this.state.firstNameValue,
            last_name: this.state.lastNameValue,
            password: this.state.passwordValue,
            doctor: {
              email_exam_price: this.state.EmailPrice,
              web_exam_price: this.state.WebPrice,
              prefix: this.state.prefixValue,
              speciality: this.state.selectedSpecValue,
            },
          }),
        }
      );

      const jsonData = await doctor.json();
      console.log(jsonData);

      if (jsonData.success) {
        this.props.history.push("/login");
        NotificationManager.success(
          "An email for confirmation will be sent shortly",
          "Successful!",
          4000
        );
      } else {
        NotificationManager.error(`${jsonData.error}`, "Faild!", 4000);
      }
      return jsonData;
    }
  };

  handleGenderRadio = (value) => {
    this.setState({ selectedGenderValue: value });
  };

  changeTextToDate = () => {
    document.getElementById("birthdate").type = "date";
  };

  render() {
    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>

        <RegisterUser
          props={this.state}
          userType={this.state.userType}
          emailValue={this.state.emailValue}
          firstNameValue={this.state.firstNameValue}
          lastNameValue={this.state.lastNameValue}
          passwordValue={this.state.passwordValue}
          addressValue={this.state.addressValue}
          birthDateValue={this.state.birthDateValue}
          EmailPrice={this.state.EmailPrice}
          WebPrice={this.state.WebPrice}
          prefixValue={this.state.prefixValue}
          specValue={this.state.specValue}
          specOptions={this.state.specOptions}
          submitValue={this.state.submitValue}
          handleEmail={this.handleEmail}
          handleFirstName={this.handleFirstName}
          handleLastName={this.handleLastName}
          handlePass={this.handlePass}
          handleAddress={this.handleAddress}
          handleBirthDate={this.handleBirthDate}
          handleEmailPrice={this.handleEmailPrice}
          handleWebPrice={this.handleWebPrice}
          handlePrefix={this.handlePrefix}
          handleSpec={this.handleSpec}
          handleSubmit={this.handleSubmit}
          handleGenderRadio={this.handleGenderRadio}
          changeTextToDate={this.changeTextToDate}
          handleUserType={this.handleUserType}
          handleConfPass={this.handleConfPass}
          handlePhoneNumber={this.handlePhoneNumber}

        />
      </>
    );
  }
}

export default Register;
