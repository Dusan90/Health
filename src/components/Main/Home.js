import React from "react";
import "../../assets/main/main.scss";
// import { Pagination } from 'reactstrap';
import { FaSquare } from "react-icons/fa";
import logo1 from "../../img/LOGOHC-01.svg";
import medical from "../../img/Medical.svg";
import behavior from "../../img/BehavioralHealt.svg";
import dermatology from "../../img/Dermatology.svg";
import MainImg from "../../img/Photo1.jpg";
import Iphone from "../../img/iPhone-X-Template.png";
import phone from "../../img/icon_Phone.svg";
import visits from "../../img/icon_Visits.svg";
import money from "../../img/icon_money.svg";
import presc from "../../img/icon_Prescriptions.svg";
import medical2 from "../../img/Medical2.svg";
import dermatology2 from "../../img/Dermatology2.svg";
import image1 from "../../img/1.svg";
import image2 from "../../img/2.svg";
import image3 from "../../img/3.svg";
import seeDoctor from "../../img/seeadoctor.svg";

const Home = ({ props }) => (
  <div className="row">
    <div className="headers">
      <img src={MainImg} alt="slika" />
      <div className="headersInfo">
        <img src={logo1} alt="logo" />
        <h1>that works for you</h1>
        <h4>
          Free comprehensive care. Talk to a doctor, get treated today.
          <br />
          Available in Serbia.
        </h4>
      </div>
    </div>
    <div className="RowsClients">
      <div className="howItWorks">
        <div className="signUpp">
          <div className="number">
            <div className="sticky_div">How It Works</div>
            <img src={image1} alt="1" />
          </div>
          <div className="signUpDiv">
            <h3>SIGN UP</h3>
            <h5>
              Creating an
              <br /> account takes
              <br /> less then a
              <br /> minute.
            </h5>
          </div>
        </div>
        <div className="startChat">
          <div className="number">
            <img src={image2} alt="2" />
          </div>
          <div className="startChattingDiv">
            <h3>START CHATTING</h3>
            <h5>
              Tell us about your
              <br /> concems and we'll
              <br /> gather more info
              <br /> about yout case.
            </h5>
          </div>
        </div>
        <div className="talkToDoctor">
          <div className="number">
            <img src={image3} alt="3" />
          </div>
          <div className="talkToDoctorDiv">
            <h3>TALK TO A DOCTOR</h3>
            <h5>
              Get connected to a licensed
              <br /> doctor who can diagnose and
              <br /> treat your issues including
              <br /> writing prescriptions.
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div className="treatment">
      <h2>We treat over 50 non-emergency conditions</h2>
      <div className="treatmentIcons">
        <div className="medical">
          <img src={medical} alt="medical" />
          <p>Medical</p>
        </div>
        <div className="behavior">
          <img src={behavior} alt="behavior" />
          <p>
            Behavioral
            <br />
            Healt
          </p>
        </div>
        <div className="dermatology">
          <img src={dermatology} alt="dermatology" />
          <p>Dermatology</p>
        </div>
      </div>
    </div>
    <div className="mindAndBody">
      <img src={Iphone} alt="iphone" />
      <div className="iphoneNandroid">
        <h1>
          We see
          <br />
          the full you
          <br />
          <span>mind and body</span>{" "}
        </h1>
        <p>
          Our approach to care is all about breg
          <br /> down the walls of an office and supporting
          <br /> your health wherever you are.
        </p>
        <p>
          Our team, board-certified physicians
          <br /> and licensed psychiatrists and psychologists
          <br />
          are available on your schedule.
        </p>
        <div className="getIt">
          <img
            src="https://applelaneanimalhospital.com/wp-content/uploads/2019/04/google.png"
            alt=""
          />
          <img
            src="https://banner2.cleanpng.com/20180719/evg/kisspng-app-store-apple-download-logo-app-store-5b500d988880b2.3327280815319730165591.jpg"
            alt=""
          />
        </div>
      </div>
    </div>

    <div className="MainIconInfoDiv">
      <h1>What you get with</h1>
      <img src={logo1} alt="logo" />
      <div className="treatmentIcons">
        <div className="visitAdoctor">
          <img src={phone} alt="phone" />
          <p>
            Visit a doctor,
            <br /> counselor,
            <br /> psychiatrist or
            <br /> dermatologist
            <br /> by mobile app,
            <br /> video or
            <br /> phone.
          </p>
        </div>
        <div className="convenient">
          <img src={visits} alt="visits" />
          <p>
            Visits are
            <br /> convenient,
            <br /> private and
            <br /> secure.
            <br /> Protection of
            <br /> your personal
            <br /> information is
            <br /> our priority.
          </p>
        </div>
        <div className="inconveniance">
          <img src={money} alt="money" />
          <p>
            Avoid the
            <br /> inconvenience
            <br /> and high costs
            <br /> of going to the
            <br /> emergency
            <br /> room or urgent
            <br /> care center.
          </p>
        </div>
        <div className="prescriptions">
          <img src={presc} alt="prescription" />
          <p>
            Prescriptions
            <br /> can be sent
            <br /> directly to your
            <br /> local pharmacy
            <br /> if medically
            <br /> necessary.
          </p>
        </div>
      </div>
    </div>

    <div className="medicalInfo">
      <div className="medicalSpeciality">
        <img src={medical2} alt="medical" />
        <p>Medical</p>
      </div>
      <div className="dotedinfo">
        <p>
          Common cold <FaSquare className="dot" /> Allergies{" "}
          <FaSquare className="dot" /> Constipation <FaSquare className="dot" />{" "}
          Cough <FaSquare className="dot" /> Diarrhea
          <br /> Ear Problems <FaSquare className="dot" /> Fever{" "}
          <FaSquare className="dot" /> Flu <FaSquare className="dot" /> Headache{" "}
          <FaSquare className="dot" /> Insect Bites
          <br /> Nausea <FaSquare className="dot" /> Vomiting{" "}
          <FaSquare className="dot" /> Pink Eye <FaSquare className="dot" />{" "}
          Rash <FaSquare className="dot" />
          Respiratory Problems
          <br /> Sore throat <FaSquare className="dot" /> UTI (Adult Females,
          18+) <FaSquare className="dot" /> and more...
        </p>
      </div>
      <img src={seeDoctor} className="seeDoctor" alt="seeDoctor" />
    </div>

    <div className="behavioralInfo">
      <div className="behavioralSpeciality">
        <img src={behavior} alt="" />
        <p>Behavioral Health</p>
      </div>
      <div className="dotedinfo">
        <p>
          Anxiet <FaSquare className="dot" /> Depression{" "}
          <FaSquare className="dot" /> Bipolar <FaSquare className="dot" />{" "}
          Stress Management <FaSquare className="dot" /> Grief and Loss
          <br /> LGBTQ support <FaSquare className="dot" /> Trauma & PTSD{" "}
          <FaSquare className="dot" /> Relationship issues
          <br /> Panic disorder <FaSquare className="dot" /> Addictions{" "}
          <FaSquare className="dot" /> and more…
        </p>
      </div>
      {/* <button className="seeDoctor">See A Doctor</button> */}
      <img src={seeDoctor} className="seeDoctor" alt="seeDoctor" />
    </div>

    <div className="dermatologyInfo">
      <div className="dermatologySpeciality">
        <img src={dermatology2} alt="" />
        <p>Dermatology</p>
      </div>
      <div className="dotedinfo">
        <p>
          Acne <FaSquare className="dot" /> Rash <FaSquare className="dot" />{" "}
          Spots <FaSquare className="dot" /> Eczema <FaSquare className="dot" />{" "}
          Warts <FaSquare className="dot" /> Rosacea
          <br /> Psoriasis <FaSquare className="dot" /> Hair follicles{" "}
          <FaSquare className="dot" /> Insect bites <FaSquare className="dot" />{" "}
          Alopecia <FaSquare className="dot" /> Cold sores
          <br /> Skin cuts <FaSquare className="dot" /> Abrasions{" "}
          <FaSquare className="dot" /> Moles <FaSquare className="dot" /> Skin
          infections
          <br /> Redness <FaSquare className="dot" /> Bruise{" "}
          <FaSquare className="dot" /> and more…
        </p>
      </div>
      {/* <button className="seeDoctor">See A Doctor</button> */}
      <img src={seeDoctor} className="seeDoctor" alt="seeDoctor" />
    </div>
  </div>
);

export default Home;
