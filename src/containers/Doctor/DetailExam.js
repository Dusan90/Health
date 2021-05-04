import React, { Component } from "react";
import axios from "axios";
// import { connect } from "react-redux";
import Detail from "../../components/Doctor/DetailExam";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { connectToWebSocket } from "../../actions/connectToWebSocketAction";

class DetailExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      statusValue: "",
      selectedStatus: "",
      token: sessionStorage.getItem("accessToken"),
      id: "",
      correspondence: [],
      lastInArray: null,
      replyClicked: false,
      messageValue: "",
      selectedFile: '',
      doctor: '',
      declineReason: '',
      report: "",
      page: 1,
      PageonNav: '',
      clientID: '',
      currentFilterClicked: "",
      searchName: "",
      searchType: "",
      messageIfEmpty: "",
      paginatedExams: [],
      searchedUpcomingOrPast: [],
      exams: [],
    };
    this.socket = new WebSocket(
      `wss://healthcarebackend.xyz/ws/message/${this.props.match.params.id}/`
    );
  }

  handleMessage = (e) => {
    let text = document.querySelector('.messageTextInput')
    text.style.height = ''
    text.style.height = `${text.scrollHeight}px`
    this.setState({ messageValue: e.target.value });
  };

  detail = (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/exams/${id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response, 'current');
        this.setState({ exam: [response.data.data],
            clientID: response.data.data.client_id,
             doctor: response.data.data.doctor });
             this.record(response.data.data.client_id);
             this.clientsExams(response.data.data.client_id)
        let mess = document.getElementById('messageMainText')
        let messageDiv = document.querySelector('.messageDiv')
        let square = document.getElementById('imageDiv1')
        console.log(mess);
        if(mess.scrollHeight > 100){
          mess.style.height = `${mess.scrollHeight}px`
          messageDiv.style.height = `${mess.scrollHeight + 60}px`
          square.style.display= 'block'
        }
        // else{
        //   mess.style.height = '100px'
        // }
      });
  };

  handleSubmit = (value) => {
    let id = this.props.match.params.id;
    if(value !== 'Decline'){
      this.doctorExam(id, value);
    }
  };

  handleReplyClick = () => {
    this.setState({ replyClicked: !this.state.replyClicked });
  };

  newMessage = () => {
    this.setState({ replyClicked: true });
  };

  handleStatus = (statusValue) => {
    this.setState({ statusValue });
    let { value } = statusValue;
    this.setState({ selectedStatus: value });
    this.handleSubmit(value);
  };

  onChangeHandler = (e) => {
    console.log(e.target.files[0]);
    this.setState({selectedFile: e.target.files[0]})
    // const propertyValues = Object.values(e.target.files);
    // console.log(propertyValues);
    // this.setState({
    //   selectedFile: propertyValues,
    // });
  };

  clearFile = () =>{
    this.setState({selectedFile: ''})
    document.getElementById('useForCleaning').value = ''
  }

  doctorExam = async (id, value) => {
    console.log(id, value);
    const access_token = "Bearer ".concat(this.state.token);
    const client = await fetch(
      `https://healthcarebackend.xyz/api/doctor/exams/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify({
          status: value,
          decline_notes: this.state.declineReason,
          report: this.state.report
        }),
      }
    );
    const jsonData = await client.json();
    console.log(jsonData);
    if(jsonData.success){
      this.socket.send({
       exam_id: this.state.id,
       changedStatus: true,
     })
     window.location.reload()
    }

    return jsonData;
  };

  componentWillUnmount() {
    this.socket.close();
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({ id: id, PageonNav: 'consultDetail' });
    this.detail(id);
    this.correspondence(id);
    this.socket.onopen = () => {
      console.log("connected");
    };
    this.socket.onmessage = (event) => {
      let parsedEvent = JSON.parse(event.data);
      console.log(parsedEvent);
      if (parsedEvent.exam_id === parseInt(id)) {
        // window.location.reload()
        this.detail(this.state.id);
    this.correspondence(this.state.id);
      }
    };

    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/profile/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        let current = response.data.data;
        // this.peopleInWaitingRoom(current.id);

        this.connect();
      });
  }


  connect = () => {
    if(!sessionStorage.getItem('socketConnected')){
      this.props.connectToWebSocket(new WebSocket(
        `wss://healthcarebackend.xyz/ws/dashboard/doctor/${this.state.id}/`
      ))
      this.props.connection.onopen = () => {
        console.log("connected to port");
        sessionStorage.setItem('socketConnected', 'true');
  
      };
    }
      this.props.connection.onmessage = (e) => {
        console.log(e);
           const message = JSON.parse(e.data);
        if (JSON.parse(e.data).modified) {
          NotificationManager.error("Exam modified", "New Alert!", 2000);
        }
        if(message.id === JSON.parse(this.state.id) && message.exam_type === "mail" ){
          this.detail(this.state.id)
      }}
  };

  

  handleSubmitSend = (e) => {
    if (this.state.messageValue) {
      this.sendMessage();
      this.setState({ messageValue: "", replyClicked: false });
    } else {
      NotificationManager.error("Empty Fields", "Failed!", 2000);
    }
    // this.props.history.push(`/doctor/exam/correspondence/${this.state.id}`);
  };

  sendMessage = async () => {
    let form_data = new FormData();
    form_data.append("message", this.state.messageValue);
    form_data.append("attachment", this.state.selectedFile);
  
    
    const access_token = "Bearer ".concat(this.state.token);
    let url =  `https://healthcarebackend.xyz/api/doctor/exams/${this.state.id}/message/`;
    
    const data = axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: access_token,
      }
    })
    
    const jsonData = await data;
    console.log(jsonData);
    if(jsonData.data.success){
     NotificationManager.success("Message Sent", "Successful!", 2000);
      this.socket.send({
        exam_id: this.state.id,
        message: this.state.messageValue,
      });
      // window.location.reload()
      this.detail(this.state.id);
      this.correspondence(this.state.id);
      this.setState({selectedFile: ''})
    }
  
    return data;
    // const access_token = "Bearer ".concat(this.state.token);
    // // const data = new FormData()
    // // data.append('file', this.state.selectedFile, this.state.selectedFile.name)
    // const client = await fetch(
    //   `https://healthcarebackend.xyz/api/doctor/exams/${this.state.id}/message/`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json;",
    //       Authorization: access_token,
    //     },
    //     body: JSON.stringify({
    //       message: this.state.messageValue,
    //       attachment: this.state.selectedFile,
    //     }),
    //   }
    // );
    // const jsonData = await client.json();
    // if (jsonData.success) {
    //   // this.correspondence(this.state.id);
    //   NotificationManager.success("Message Sent", "Successful!", 2000);
    //   this.socket.send({
    //     exam_id: this.state.id,
    //     message: this.state.messageValue,
    //   });
    //   // window.location.reload()
    //   this.detail(this.state.id);
    //   this.correspondence(this.state.id);
    // }

    // return jsonData;
  };

  correspondence = (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/exams/${id}/messages/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response)
        const res = response.data.data.map((val) => {
          return {
            id: val.id,
            sender: val.sender,
            created: val.created,
            message: val.message,
            attachment: val.attachment,
          };
        });
        // let lastIn = response.data.data.reverse();

        let resort = res.sort(
          (a, b) => Date.parse(a.created) - Date.parse(b.created)
        );

        this.setState({
          correspondence: resort,
          lastInArray: res[res.length - 1],
        });
        // var sender_obj = this.state.correspondence[0].sender;
        // this.props.dispatch(doctor(sender_obj));
      })
      .then(() =>{
        setTimeout(() => {
          this.handleresizeing()
        }, 200);
      })
      .catch((error) => {
        console.log(error.response);
      
      });
  };

  handleresizeing = () =>{
    if(this.state.correspondence.length){
      let textar = [...document.querySelectorAll('.message')]
      console.log(textar);
      if(textar && textar.length !== 0){
        textar.map(ex =>{
        
          if(ex.scrollHeight > 100){
            ex.style.height = `${ex.scrollHeight}px`
          // }
          // if (ex.clientHeight < ex.scrollHeight){
            let parentOfElement = ex.parentElement.previousSibling
            let div = parentOfElement.lastChild
            div.style.display = 'block'
        
            div.onclick = function() { 
              if(ex.clientHeight > 100){
                ex.style.height = '100px'
              }else{
                ex.style.height = `${ex.scrollHeight}px`
              }
            }
            // ex.scrollHeight === ex.clientHeight ? ex.style.height = '100px' : ex.clientHeight === 300 ? ex.style.height = '100px' : ex.scrollHeight < 300 ? ex.style.height = `${ex.scrollHeight}px` : ex.style.height = '300px' }
          }
        })
      }
    }
  }

  declineReason = (e)=>{
    this.setState({declineReason: e.target.value})
    if(e.target.scrollHeight < 300){
      e.target.style.height = `${e.target.scrollHeight}px`
    }else{e.target.style.height = '300px'}
    
  }

  saveReason = () =>{
    let id = this.props.match.params.id;
    this.doctorExam(id, this.state.selectedStatus)
  }

  // report= (e) =>{
  //   this.setState({report: e.target.value})
  //   e.target.style.height = '300px'
  //   // e.target.style.height = `${e.target.scrollHeight}px`
  // }

  // saveReport= () =>{
  //   let id = this.props.match.params.id;
  //   let value = 'Finish'
  //   this.doctorExam(id, value)

  // }

  // handleReport = () =>{
  //   console.log('hy');
  //     this.setState({displayReport: true})

  // } 

  resetValue = () =>{
    this.setState({value: ''})
    let inputMessage = document.querySelector(".inputMessage")
    let yourMessage = document.getElementById("yourMessage")
    yourMessage.style.height = "30px";
  inputMessage.style.height = '30px'
  }

  handlePage = (value) =>{
    this.setState({PageonNav: value})
    let test = setInterval(() => {
      if(value === 'consultDetail'){
          let mess = document.getElementById('messageMainText')
          let messageDiv = document.querySelector('.messageDiv')
          let square = document.getElementById('imageDiv1')
          if(mess.scrollHeight > 100){
            mess.style.height = `${mess.scrollHeight}px`
            messageDiv.style.height = `${mess.scrollHeight + 60}px`
            square.style.display= 'block'
          }
          // else{
          //   mess.style.height = '300px'
          // }
      }

      let textar = [...document.querySelectorAll('.message')]
      textar.map(ex =>{
        if(ex.scrollHeight > 100){
          ex.style.height = `${ex.scrollHeight}px`
          let parentOfElement = ex.parentElement.previousSibling
          let div = parentOfElement.lastChild
          div.style.display = 'block'
      
          div.onclick = function() { 
            if(ex.clientHeight > 100){
              ex.style.height = '100px'
            }else{
              ex.style.height = `${ex.scrollHeight}px`
            }
          // ex.scrollHeight === ex.clientHeight ? ex.style.height = '100px' : ex.clientHeight === 300 ? ex.style.height = '100px' : ex.scrollHeight < 300 ? ex.style.height = `${ex.scrollHeight}px` : ex.style.height = '300px' }
        }
      }
      })
      clearInterval(test)
    }, 200);
    
  }
 
  handleExtendDiv = () =>{
          let mess = document.getElementById('messageMainText')
          let messageDiv = document.querySelector('.messageDiv')
          // let square = document.getElementById('imageDiv1')
          console.log(mess.scrollHeight, mess.clientHeight);

            if(mess.clientHeight > 100){
              mess.style.height = '100px'
              messageDiv.style.height = `${160}px`
            }else{
              mess.style.height = `${mess.scrollHeight}px`
              messageDiv.style.height = `${mess.scrollHeight + 60}px`
            }
      }























  record = (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `https://healthcarebackend.xyz/api/doctor/record/${id}/`
        ,
        {
          headers: { Authorization: access_token },
        }
      )
      .then((response) => {
        console.log(response, "nzm ni ja sta");
        this.handleAll();

        return this.setState({
          record:[ response.data.data],
        });
      })
      // .then(() =>{
      //   let cronic = document.getElementById('ChronicalConditions')
      //   cronic.style.height = `${cronic.scrollHeight}px`
      //   let alerg = document.getElementById('Allergies')
      //   alerg.style.height = `${alerg.scrollHeight}px`
      // })
  };

  clientsExams = (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `https://healthcarebackend.xyz/api/exams/client/${id}/list/`
        ,
        {
          headers: { Authorization: access_token },
        }
      )
      .then((res) => {
        console.log(res, "podaciiii");
        const filteredMail = res.data.data.mail.length !== 0 ? res.data.data.mail.filter(ex =>  ex.transaction['status'] !== 'Pending') : []
        const filteredVideo = res.data.data.video.length !== 0 ? res.data.data.video.filter(ex =>  ex.transaction['status'] !== 'Pending') : []
        // const filteredQueue = res.data.data.queue.length !== 0 ? res.data.data.queue.filter(ex =>  ex.transaction['status'] !== 'Pending') : []
        let AllArrays = filteredMail.concat(filteredVideo)

        return this.setState({
          exams: AllArrays,
        });
      }).then(() =>{
        this.handleAll();
      })
  };


  handleAll = () => {
    let hndlAll = setInterval(() => {
      let all = this.state.exams;

      let resortall = all.sort(
        (a, b) => Date.parse(b.created) - Date.parse(a.created)
      );

      let messageIfEmpty = all.length === 0 ? "No consultations" : "";

      this.setState({
        upcomingOrPast: resortall,
        page: 1,
        messageIfEmpty,
        currentFilterClicked: "all",
        searchedUpcomingOrPast: [],
        filterFiltered: [],
        searchType: "",
        searchName: "",
      });

      this.paginate(1);
      clearInterval(hndlAll);
    }, 10);
  };

  paginate = (page) => {
    if (this.state.searchedUpcomingOrPast.length === 0) {
      let limit = 10;
      let pages = Math.ceil(this.state.upcomingOrPast.length / 10);
      const offset = (page - 1) * limit;
      const newArray = this.state.upcomingOrPast.slice(offset, offset + limit);

      this.setState({
        paginatedExams: newArray,
        loading: false,
        maxPages: pages,
      });
    } else {
      let limit = 10;
      let pages = Math.ceil(this.state.searchedUpcomingOrPast.length / 10);
      const offset = (page - 1) * limit;
      const newArray = this.state.searchedUpcomingOrPast.slice(
        offset,
        offset + limit
      );

      this.setState({
        paginatedExams: newArray,
        loading: false,
        maxPages: pages,
      });
    }
  };

  searchByType = (e) => {
    if (e.target.value === "" && this.state.searchName === "") {
      this.setState({ filterFiltered: [] });
    } else if (e.target.value === "" && this.state.searchName !== "") {
      this.setState({ filterFiltered: [] });
    }
    let letter = e.target.value.toLowerCase();
    this.setState({ searchType: letter });
    let callFunction = setInterval(() => {
      this.handlingSearchByType();
      clearInterval(callFunction);
    }, 10);
  };

  
  handlingSearchByType = () => {
    let searchedClient =
      this.state.filterFiltered.length === 0
        ? this.state.upcomingOrPast.filter((ex) => {
            const examType = ex.exam_type;
            if (
              examType.toLowerCase().indexOf(this.state.searchType) ===
              this.state.searchType.indexOf(this.state.searchType)
            ) {
              return ex;
            } else {
              return null;
            }
          })
        : this.state.filterFiltered.filter((ex) => {
            const examType = ex.exam_type;
            if (
              examType.toLowerCase().indexOf(this.state.searchType) ===
              this.state.searchType.indexOf(this.state.searchType)
            ) {
              return ex;
            } else {
              return null;
            }
          });
    let messageIfEmpty =
      searchedClient.length === 0
        ? "No Such Type"
        : searchedClient.length !== 0 &&
          this.state.messageIfEmpty !== "No Such Type"
        ? this.state.messageIfEmpty
        : "";
    this.state.filterFiltered.length === 0 &&
      this.setState({ filterFiltered: searchedClient });
    this.setState({
      searchedUpcomingOrPast: searchedClient,
      page: 1,
      messageIfEmpty,
    });
    this.paginate(1);
  };

  handleClick = (id, type) => {
    if (type === "mail") {
      this.props.history.push(`/doctor/exam/detail/${id}/`);
      window.location.reload()
    } else if (type === "video") {
      this.props.history.push(`/doctor/video/exam/detail/${id}/#init`);
    } else if (type === "queue") {
      this.props.history.push(`/doctor/processing/video/exam/${id}/#init`);
    }
  };

  ResetonSelectChange = () => {
    this.setState({ filterFiltered: [] });
  };

  handlePageChange = (pageNumber) => {
    this.setState({page: pageNumber});
    this.paginate(pageNumber)
  }








  

  render() {
    return (
      <>
        <Detail
          exam={this.state.exam}
          handleStatus={this.handleStatus}
          handleReplyClick={this.handleReplyClick}
          handleSubmitSend={this.handleSubmitSend}
          props={this.state}
          onChangeHandler={this.onChangeHandler}
          handleMessage={this.handleMessage}
          newMessage={this.newMessage}
          declineReason={this.declineReason}
          saveReason={this.saveReason}
          // report={this.report}
          // saveReport={this.saveReport}
          // handleReport={this.handleReport}
          resetValue={this.resetValue}
          extendTextArea={this.extendTextArea}
          handlePage={this.handlePage}


          handleClick={this.handleClick}
          loading={this.state.loading}
          searchByType={this.searchByType}
          ResetonSelectChange={this.ResetonSelectChange}
          handlePageChange={this.handlePageChange}
          handleExtendDiv={this.handleExtendDiv}
          clearFile={this.clearFile}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const connection = state.getIn(["connectToWebSocketReducer", "connection"]);
  return {
    connection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ connectToWebSocket: connectToWebSocket }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailExam);
