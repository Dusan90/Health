import React from "react";
import "../../assets/main/main.scss";
// import { Pagination } from 'reactstrap';
import logo1 from "../../icons/c+.svg";
import MainImg from "../../icons/C-doctor_photo.jpg";
import iconsingUp from '../../icons/icon_sign-up.svg'
import requestConsultation from '../../icons/icon_Request-consultation.svg'
import iconPayment from '../../icons/icon_Payment.svg'
import iconDashboard from '../../icons/icon_Dashboard.svg'
import iconConsult from '../../icons/icon_Consult-with-doctor.svg'

const Home = ({ props }) => (
  <div className="row">
    <div className="headers">
      <img src={MainImg} alt="slika" />
      <div className="headersInfo">
        <img src={logo1} alt="logo" />
        <h1>Online consultation service</h1>
        <h4>
          Secure. Simple. Comfortable.
          
        </h4>
      </div>
      <div className="MainDivInfo">
        <div className='firstDivInfo'>
        <p className='iconAbove1'>1</p>
        <h1 className='signUp'>SIGN UP</h1>
        <p>Create account
          <br/>
          whether you are
          <br/>
          Doctor or a Client
        </p>
        <img src={iconsingUp} alt="logo"/>
        </div>
        <div className='secondDivInfo'>
        <p className='iconAbove2'>2</p>
        <h1 className='requestConsu'>REQUEST
          <br/>
          CONSULTATION
        </h1>
        <p>Choose available
          <br/>
          physician. Request
          <br/>
          email consultation,
          <br/>
          make video
          <br/>
          appointment or use
          <br/>
          virtual waiting room
        </p>
        <img src={requestConsultation} alt="logo"/>
        </div>
        <div className='thirdDivInfo'>
        <p className='iconAbove3'>3</p>
        <h1 className='conswithD'>CONSULT WITH
          <br/>
          DOCTOR
        </h1>
        <p>Once doctor accepts
          <br/>
          client request, use
          <br/>
          email or video for your
          <br/>
          consultation
        </p>
        <img src={iconConsult} alt="logo"/>
        </div>

        <div className='fourthDivInfo'>
        <p className='iconAbove4'>4</p>
        <h1 className='securePay'>SECURE
          <br/>
          PAYMENT
        </h1>
        <p>Make secure payment
          <br/>
        with your credit card
          <br/>
        or Pay-pal
        </p>
        <img src={iconPayment} className='payment' alt="logo"/>
        </div>

        <div className='fifthDivInfo'>
        <p className='iconAbove5'>5</p>
        <h1 className='clientDash'>CLIENT
          <br/>
          DASHBOARD
        </h1>
        <p>
          All client information is
          <br/>
          in one place. You can
          <br/>
          access your profile,
          <br/>
          check consultation
          <br/>
          history and see alerts
          <br/>
          for ongoing
          <br/>
          consultations.
        </p>
        <img src={iconDashboard} alt="logo"/>
        </div>
        
      </div>
    </div>
     </div>
);

export default Home;
