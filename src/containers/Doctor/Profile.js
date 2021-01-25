import React, { Component } from "react";
import axios from "axios";
import Profile from "../../components/Doctor/Profile";
import Nav from "../../components/Main/Navbar";
import Header from "../../components/Main/Header";
// import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { HamburgerDiv } from "../../components/Main/HamburgerDiv";
// import moment from 'moment'

const options = [
  { value: "RSD", label: "RSD" },
  { value: "EUR", label: "EUR" },
  { value: "USD", label: "USD" },
];

const days = [
  { value: "0", label: "Monday" },
  { value: "1", label: "Tuesday" },
  { value: "2", label: "Wednesday" },
  { value: "3", label: "Thursday" },
  { value: "4", label: "Friday" },
  { value: "5", label: "Saturday" },
  { value: "6", label: "Sunday" },
  // { value: "Everyday", label: "Everyday" },
  // { value: "Mon-Fri", label: "Mon-Fri" },
]

class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: [],
      selectEmail: "",
      selectVideo: "",
      selectVideoFollow: "",
      selectWaitingRoom: '',
      token: sessionStorage.getItem("accessToken"),
      FirstName: '',
      LastName: '',
      PhoneNum: '',
      TimeStart: '',
      TimeEnd: '',
      EmailVisit: '',
      VideoVisit: '',
      VideoFollowUp: '',
      Biography: '',
      attach: '',
      currentStatus: '',
      Email: '',
      Organization: '',
      specialities: [],
      specialSP: '',
      showDeleteImage: false,
      // gender: ''
      page: '',
      WaitingRoom: '',
      EmailVisitChecked: '',
      VideoVisitChecked: '',
      VideoVisitFollowUp: '',
      WaitingRoomVisit: '',
      // howManySlots: 1,
      daysInArray: [],
      // daysInArray: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Everyday","Mon-Fri"],
      daysAndTime: [],
      // convertedDays: []
      selectForDays: '',
      plusClicked: false,
      daysAndTimeAndDays: '',
      idForPut: ''
    };
  }

  

  handleSelect = (statusValue) => {
    let { value } = statusValue;
    this.setState({ selectEmail: value });
  };

  handleSelect2 = (statusValue) => {
    let { value } = statusValue;
    this.setState({ selectVideo: value });
  };

  handleSelect3 = (statusValue) => {
    let { value } = statusValue;
    this.setState({ selectVideoFollow: value });
  };

  handleSelect4 = (statusValue) => {
    let { value } = statusValue;
    this.setState({ selectWaitingRoom: value });
  };

  handleSelectForDays = (statusValue) => {
    console.log(statusValue);
    let { value } = statusValue;
    this.setState({ selectForDays: JSON.parse(value), plusClicked: true });
  };

  handleSubmitForWorkingHours = async (e) =>{
    if(!this.state.daysAndTime.includes(this.state.selectForDays)){
      console.log('nema ga u redu i on ovde odradi POST', this.state.daysAndTime, this.state.selectForDays);
      let form_data = new FormData();
  
      form_data.append("day", this.state.selectForDays);
      form_data.append("start_hour", this.state.TimeStart);
      form_data.append("end_hour", this.state.TimeEnd);
  
      const access_token = "Bearer ".concat(this.state.token);
      let url = 'https://healthcarebackend.xyz/api/doctor/schedule/';
      
      const data = axios.post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: access_token,
        }
      })
  
      console.log('submiting');
       
      const jsonData = await data;
      console.log(jsonData, "profile changed");
      if(jsonData.data.success){
        this.setState({plusClicked: false})
        NotificationManager.success("Profile Updated!", "Successful!", 2000);
        this.handleWorkingHowrs();
      }
    }else{
      let idOfDay = this.state.daysAndTimeAndDays.filter(ex => {
        if(ex.day === this.state.selectForDays){
          return ex
        }
      }) 
      console.log('ima ga u redu i on ovde odradi PUT', idOfDay);

      this.ChangePutDayInArray(idOfDay[0]['id'])
    }
  }

  handleWorkingHowrs = () =>{
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        "https://healthcarebackend.xyz/api/doctor/schedule/list/"
        ,
        {
          headers: { Authorization: access_token },
        }
      )
      .then((response) => {
        console.log(response, "novi podaciiii");
        let daysAndTimeAndDays = response.data.data.map(ex =>{
          return ex
        })
        let daysAndTimeIDS = response.data.data.map(ex =>{
          return ex.day
        })
        // let convertedDays = response.data.data.map(ex =>{
        //   if(ex.day === 0){
        //       let conDay = Object.assign(ex, { convertDay: 'Monday' });
        //       return conDay
        //   }
        //   else if(ex.day === 1){
        //     let conDay = Object.assign(ex, { convertDay: 'Tuesday' });
        //       return conDay
        //   }
        //   else if(ex.day === 2){
        //     let conDay = Object.assign(ex, { convertDay: 'Wednesday' });
        //     return conDay 
        //   }
        //   else if(ex.day === 3){
        //     let conDay = Object.assign(ex, { convertDay: 'Thursday' });
        //     return conDay 
        //   }
        //   else if(ex.day === 4){
        //     let conDay = Object.assign(ex, { convertDay: 'Friday' });
        //     return conDay 
        //   }
        //   else if(ex.day === 5){
        //     let conDay = Object.assign(ex, { convertDay: 'Saturday' });
        //     return conDay 
        //   }
        //   else if(ex.day === 6){
        //     let conDay = Object.assign(ex, { convertDay: 'Sunday' });
        //     return conDay 
        // }
        // })
        this.setState({daysInArray: daysAndTimeIDS, daysAndTime: daysAndTimeIDS, daysAndTimeAndDays })
      }).catch(() =>{
        this.setState({daysInArray: [], daysAndTime: [], daysAndTimeAndDays: []})
      })
      // this.deleteDayInArray(0)
  }

  deleteDayInArray = async (id) =>{
    const access_token = "Bearer ".concat(this.state.token);
    let data = axios.delete(`https://healthcarebackend.xyz/api/doctor/schedule/${id}/`, {
      headers: {
        Authorization: access_token
      },
    });
    const jsonData = await data
    jsonData.data.success && this.handleWorkingHowrs()
    console.log(jsonData);
   
    // jsonData.data && window.location.reload()
  }

  ChangePutDayInArray = async (id) =>{
    console.log('radi li? ');
    let form_data = new FormData();
    form_data.append("start_hour", this.state.TimeStart);
    form_data.append("end_hour", this.state.TimeEnd);

    const access_token = "Bearer ".concat(this.state.token);
    let url = `https://healthcarebackend.xyz/api/doctor/schedule/${id}/`;
    
    const data = axios.put(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: access_token,
      }
    })

    console.log('submiting');
     
    const jsonData = await data;
    console.log(jsonData, "profile changed");
    if(jsonData.data.success){
      this.setState({plusClicked: false})
      NotificationManager.success("Profile Updated!", "Successful!", 2000);
      this.handleWorkingHowrs();
    }
  }

  

  handleSubmit = async (e) => {
    e.preventDefault();
    if((this.state.EmailVisit && !this.state.selectEmail) || (this.state.VideoVisit && !this.state.selectVideo) || (this.state.VideoFollowUp && !this.state.selectVideoFollow)){
      NotificationManager.error("Please enter currency", "Failed!", 2000);
    }else{
      let form_data = new FormData();
  form_data.append("user.first_name", this.state.FirstName);
  form_data.append("user.last_name", this.state.LastName);
  form_data.append("user.phone", this.state.PhoneNum);
  form_data.append("biography", this.state.Biography);
  form_data.append("email_exam_price", this.state.EmailVisit);
  form_data.append("web_exam_price", this.state.VideoVisit);
  form_data.append("web_exam_follow_price", this.state.VideoFollowUp);
  form_data.append("waiting_room_price", this.state.WaitingRoom);
  form_data.append("image", this.state.attach);
  form_data.append("status", '');
  form_data.append("start_hour", this.state.TimeStart);
  form_data.append("end_hour", this.state.TimeEnd);
  form_data.append("email_currency", this.state.selectEmail);
  form_data.append("web_currency", this.state.selectVideo);
  form_data.append("web_follow_up_currency", this.state.selectVideoFollow);
  form_data.append("waiting_room_currency", this.state.selectWaitingRoom);
  form_data.append("organization", this.state.Organization);
  form_data.append("speciality", this.state.specialSP);
  form_data.append("email_exam_status", this.state.EmailVisitChecked);
  form_data.append("web_exam_status", this.state.VideoVisitChecked);
  form_data.append("waiting_room_status", this.state.WaitingRoomVisit);
  form_data.append("web_exam_follow_status", this.state.VideoVisitFollowUp);
  // form_data.append("gender", this.state.gender);
  
  const access_token = "Bearer ".concat(this.state.token);
  let url = 'https://healthcarebackend.xyz/api/doctor/profile/';
  
  const data = axios.put(url, form_data, {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: access_token,
    }
  })
  
  
      console.log('submiting');
     
      const jsonData = await data;
      console.log(jsonData, "profile changed");
      if(jsonData.data.success){
        NotificationManager.success("Profile Updated!", "Successful!", 2000);
        this.handleDoctorProfile();
        // window.location.reload()
      }

    }
  };

  handleDoctorProfile = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/profile/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response, "doc profileee");
        let selectEmail = response.data.data.email_currency ? response.data.data.email_currency : 'USD'
        let selectVideo = response.data.data.web_currency ? response.data.data.web_currency : 'USD'
        let selectVideoFollow = response.data.data.web_follow_up_currency ? response.data.data.web_follow_up_currency : 'USD'
        // let start = response.data.data.start_hour ? response.data.data.start_hour.slice(0, -3) : ""
        // const testTime =  Number(start.split(':')[0]) * 60 * 60 * 1000 + Number(start.split(':')[1]) * 60 * 1000;
        // let end = response.data.data.end_hour ? response.data.data.end_hour.slice(0, -3) : ""
        // const testTimeEnd = Number(end.split(':')[0]) * 60 * 60 * 1000 + Number(end.split(':')[1]) * 60 * 1000;


         this.setState({ doctor: [response.data.data], 
          currentStatus: response.data.data.status, 
          // TimeStart: start, 
          // TimeEnd: end,
          selectEmail,
          selectVideo,
          selectVideoFollow,
          specialSP: response.data.data.speciality,
          EmailVisitChecked: response.data.data.email_exam_status,
          VideoVisitChecked: response.data.data.web_exam_status,
          VideoVisitFollowUp: response.data.data.web_exam_follow_status,
          WaitingRoomVisit: response.data.data.waiting_room_status
          // gender: response.data.data.gender
        });
      });
  };

  componentDidMount() {
    this.handleDoctorProfile();
    axios
    .get("https://healthcarebackend.xyz/api/specialities/")
    .then((response) => {
      console.log(response, "examform");

      const res = response.data.data.map((val) => {
        return { value: val.id, iD: val.speciality_id, label: val.name };
      });
      this.setState({ specialities: res, page: 'DocProfile' });
    });
    this.handleWorkingHowrs()
  }

  handleSpeciality = (e) => {
    console.log(e);
    this.setState({
      specialSP: e.value,
      selectedSpec: e.label,
      resetDoctorSelect: null,
    });
  };

  handleChange = (e) =>{
    console.log(e);
    this.setState({[e.target.id]: e.target.value})
  } 

  handleChangeBiography = (e) =>{
    this.setState({Biography: e.target.innerHTML})
  }

  handleChangeTime = (e,day) =>{
    console.log(e, day);
    console.log(this.state.daysAndTimeAndDays);
    let idForPut = this.state.daysAndTimeAndDays.length !== 0 && this.state.daysAndTimeAndDays.filter(ex => ex.day === day)[0] && this.state.daysAndTimeAndDays.filter(ex => ex.day === day)[0]['day']
    this.setState({TimeStart: e, plusClicked: true })
    if(idForPut){
      this.setState({selectForDays: idForPut})
    }
  }

  handleChangeTimeEnd = (e, day) =>{
    console.log(e, day);
    let idForPut = this.state.daysAndTimeAndDays.length !== 0 && this.state.daysAndTimeAndDays.filter(ex => ex.day === day)[0] && this.state.daysAndTimeAndDays.filter(ex => ex.day === day)[0]['day']
    this.setState({TimeEnd: e, plusClicked: true})
    if(idForPut){
      this.setState({selectForDays: idForPut})
    }
  }

  addAttach= (e) =>{
    this.setState({attach: e.target.files[0]})
    var output = document.querySelector('.docImage');
    output.src = URL.createObjectURL(e.target.files[0]);
  }

  deletePicture = async () =>{
    const access_token = "Bearer ".concat(this.state.token);

    let data = axios.delete("https://healthcarebackend.xyz/api/doctor/image/", {
      headers: {
        Authorization: access_token
      },
      data: {
        // image: ''
      }
    });
    const jsonData = await data
    console.log(jsonData);
    jsonData.data && window.location.reload()
  }

  handleDeleteImageShow = () =>{
    this.setState({showDeleteImage: !this.state.showDeleteImage})
  }

  // handleGenderRadio =(value) =>{
  //   this.setState({gender: value})
  // }

  handlePage = (value) =>{
    this.setState({page: value})
  }

  handleServiceRadio = (e) =>{
    console.log(e.target.checked);
    if(e.target.checked){
      this.setState({[e.target.id]: "True"})
    }else if(!e.target.checked){
      this.setState({[e.target.id]: "False"})

    }
  }

  handlePlusImg = () =>{
    // console.log('test plusa');
    // if(this.state.howManySlots !== 7 ){
    //   this.setState({howManySlots: this.state.howManySlots + 1})
    // }
    if(this.state.daysInArray.length < 7 && !this.state.plusClicked){
    const daysInArray = [0, 1, 2, 3, 4, 5, 6]
    let sorted = this.state.daysInArray.sort((a,b) => a - b)
    let missing = daysInArray.filter((i => a => a !== sorted[i] || !++i)(0));
   console.log(missing, 'sta se desava ovde');
      this.setState({daysInArray: [...this.state.daysInArray, missing[0]], plusClicked: true})
      // this.state.daysInArray.push(missing[0])
    }
  }

  handleMinusImage = (e, id) =>{
    console.log(e.target.parentElement);
    const id_of_element = parseInt(e.target.parentElement.id)

    const filter_day = this.state.daysInArray.filter(ex =>{
      return ex !== id_of_element
    })
    this.setState({daysInArray: filter_day})
    this.deleteDayInArray(id)
    // e.target.parentElement.style.display = 'none'
    // this.setState({howManySlots: this.state.howManySlots - 1})
  }

  render() {
    console.log(this.state.selectForDays);
    console.log(this.state.daysAndTimeAndDays);
    console.log(this.state.daysAndTime.includes(this.state.selectForDays))
    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <HamburgerDiv/>
        <Profile
          status={options}
          doctor={this.state.doctor}
          handleSubmit={this.handleSubmit}
          handleSelect={this.handleSelect}
          handleSelect2={this.handleSelect2}
          handleSelect3={this.handleSelect3}
          handleSelect4={this.handleSelect4}
          props={this.state}
          handleChange={this.handleChange}
          addAttach={this.addAttach}
          handleSpeciality={this.handleSpeciality}
          handleChangeBiography= {this.handleChangeBiography}
          deletePicture={this.deletePicture}
          handleDeleteImageShow={this.handleDeleteImageShow}
          // handleGenderRadio={this.handleGenderRadio}
          handlePage={this.handlePage}
          handleServiceRadio={this.handleServiceRadio}
          days={days}
          handlePlusImg={this.handlePlusImg}
          handleMinusImage={this.handleMinusImage}
          handleSubmitForWorkingHours={this.handleSubmitForWorkingHours}
          handleSelectForDays={this.handleSelectForDays}
          handleChangeTime={this.handleChangeTime}
          handleChangeTimeEnd={this.handleChangeTimeEnd}
        />
      </>
    );
  }
}

// const mapStateToProps = state => {
//   const doctor = state.getIn(["doctorReducer", "doctor"]);

//   return {
//     doctor
//   };
// };

export default DoctorProfile;
