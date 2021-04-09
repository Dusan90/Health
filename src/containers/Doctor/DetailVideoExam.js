import React, { Component } from "react";
import axios from "axios";
import DetailVideo from "../../components/Doctor/DetailVideoExam";
import { NotificationManager } from "react-notifications";
// const connection = new WebSocket("wss://healthcarebackend.xyz/wss/video/");


class DetailVideoExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      statusValue: "",
      selectedStatus: "",
      token: sessionStorage.getItem("accessToken"),
      id: "",
      value: "",
      declineReason: "",
      report: '',
      displayReport: false,
      showSaveButton: false,
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
      selectedFile: ''

    };
    this.socket = new WebSocket(
      `wss://healthcarebackend.xyz/ws/message/${this.props.match.params.id}/`
    );
  }

  detail = async (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    await axios
      .get(`https://healthcarebackend.xyz/api/web/doctor/${id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response, 'test');
        this.setState({ exam: this.state.exam.concat(response.data.data), 
          clientID: response.data.data.client_id
         });
         this.record(response.data.data.client_id)
         this.clientsExams(response.data.data.client_id)
         let mess = document.getElementById('messageMainText')
         let messageDiv = document.querySelector('.messageDiv')
        let square = document.getElementById('imageDiv1')

         console.log(mess);
         if(mess.scrollHeight > 100){
           mess.style.height = `${mess.scrollHeight}px`
           messageDiv.style.height = `${mess.scrollHeight + 60}px` 
           square.style.display = 'block'
         }

         if(response.data.data.report){
          let textare = document.querySelector('.reportTextForExtend')
          console.log(textare.scrollHeight);
          if(textare.scrollHeight <= 130){
            let divsquare = document.getElementById('imageDiv2')
            divsquare.style.display = 'none'
          }
        }else{
          let divsquare = document.getElementById('imageDiv2')
          divsquare.style.display = 'none'
        }

        if(response.data.data.decline_notes){
          let textare = document.querySelector('.reasonTextForExtend')
          console.log(textare.scrollHeight);
          if(textare.scrollHeight <= 130){
            let divsquare = document.getElementById('imageDiv3')
            divsquare.style.display = 'none'
          }
        }else{
          let divsquare = document.getElementById('imageDiv3')
          divsquare.style.display = 'none'
        }
        //  else{
        //    mess.style.height = '300px'
        //  }
      });
  };

  handleSubmit = (value) => {
    if(value !== 'Decline'){
      this.doctorExam( value);
    }
  };

  extendreport= (e) =>{
    console.log(e.target);
    // const textar = document.getElementById('textarea')
    let textar = document.querySelector('.reportTextForExtend')
    console.log(textar.scrollHeight, textar.clientHeight);
    if(textar.clientHeight === 130){
      textar.style.height = `${textar.scrollHeight}px`
    }else {
      textar.style.height = '130px'
    }
  }

  extendreport2= (e) =>{
    console.log(e.target);
    // const textar = document.getElementById('textarea')
    let textar = document.querySelector('.reasonTextForExtend')
    console.log(textar.scrollHeight, textar.clientHeight);
    if(textar.clientHeight === 130){
      textar.style.height = `${textar.scrollHeight}px`
    }else {
      textar.style.height = '130px'
    }
  }

  clearFile=() =>{
    this.setState({selectedFile: ''})
    document.getElementById('useForCleaning').value = ''
  }

  handleStatus = (statusValue) => {
    this.setState({ statusValue });
    let { value } = statusValue;
    console.log(value);
    this.setState({ selectedStatus: value });
    this.handleSubmit(value);
  };

  doctorExam = async ( value) => {

    const access_token = "Bearer ".concat(this.state.token);
    let form_data = new FormData();

  form_data.append("status", value);
  form_data.append("decline_notes", this.state.declineReason);
  form_data.append("report", this.state.report);
  form_data.append("report_file", this.state.selectedFile);

  let url = `https://healthcarebackend.xyz/api/web/doctor/${this.state.id}/`;
  
  const data = axios.put(url, form_data, {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: access_token,
    }
  })
  
  
  const jsonData = await data;
  console.log(jsonData)
  if (jsonData.data.success === true) { 
    this.socket.send({
      exam_id: this.state.id,
      changedStatus: true,
    }) 
      window.location.reload()
  }

  return data;

  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({ id: id, PageonNav: 'consultDetail' });
    this.detail(id);
    this.socket.onopen = () => {
      console.log("connected");
    };
    this.socket.onmessage = (event) => {
      let parsedEvent = JSON.parse(event.data);
      console.log(parsedEvent);
      if (parsedEvent.exam_id === parseInt(id)) {
        // window.location.reload()
        this.detail(id);
      }
    };
  }

  declineReason = (e)=>{
    this.setState({declineReason: e.target.value})
    if(e.target.scrollHeight < 300){
      e.target.style.height = `${e.target.scrollHeight}px`
    }else{e.target.style.height = '300px'}
    // e.target.style.height = `${e.target.scrollHeight}px`

  }

  saveReason = () =>{
    this.doctorExam(this.state.selectedStatus)
  }

  saveReport= () =>{
    let value = 'Finish'
    this.doctorExam(value)

  }

  report= (e) =>{
    this.setState({report: e.target.value})
    if(e.target.scrollHeight < 300){
      e.target.style.height = `${e.target.scrollHeight}px`
    }else{e.target.style.height = '300px'}
    // e.target.style.height = `${e.target.scrollHeight}px`
  }


  handleJoinRoom = (uid) => {    
    this.props.history.push({pathname: `/room/${this.props.match.params.id}`,
    state: uid});
  };

  handleshowSave = (e, value) =>{
    e.target.value = value
    this.setState({showSaveButton: true})
  }

  onChangeHandler = (e) => {
    this.setState({selectedFile: e.target.files[0]})
  };

  handlePage = (value) =>{
     this.setState({PageonNav: value})
    let test = setInterval(() => {
      if(value === 'clientDetail'){
          let cronic = document.getElementById('ChronicalConditions')
         
          cronic.style.height = `${cronic.scrollHeight}px`
          console.log(cronic);
          let alerg = document.getElementById('Allergies')
          alerg.style.height = `${alerg.scrollHeight}px`
    
      }else if(value === 'consultDetail'){
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
                //   mess.style.height = '300px'
                // }
      
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
            }
                // ex.scrollHeight === ex.clientHeight ? ex.style.height = '100px' : ex.clientHeight === 300 ? ex.style.height = '100px' : ex.scrollHeight < 300 ? ex.style.height = `${ex.scrollHeight}px` : ex.style.height = '300px' }
              }
            })
            let textare = document.querySelector('.reportTextForExtend')
    if(textare.scrollHeight <= 130){
      let divsquare = document.getElementById('imageDiv2')
      divsquare.style.display = 'none'
    }

    let textarereason = document.querySelector('.reportTextForExtend')
    if(textarereason.scrollHeight <= 130){
      let divsquare = document.getElementById('imageDiv3')
      divsquare.style.display = 'none'
    }
          
      }
      clearInterval(test)
    }, 200);
  }

  handleExtendDiv = () =>{
    let mess = document.getElementById('messageMainText')
    let messageDiv = document.querySelector('.messageDiv')
    // let square = document.getElementById('imageDiv1')
    console.log(mess);
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
      this.props.history.push(`/doctor/exam/detail/${id}`);
    } else if (type === "video") {
      this.props.history.push(`/doctor/video/exam/detail/${id}/`);
      window.location.reload()
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

  componentWillUnmount() {
    this.socket.close();
  }












  render() {
    return (
      <>
        <DetailVideo
          exam={this.state.exam}
          handleStatus={this.handleStatus}
          submitValue={this.state.submitValue}
          handleSubmit={this.handleSubmit}
          props={this.state}
          extendreport={this.extendreport}
          extendreport2={this.extendreport2}
          declineReason={this.declineReason}
          saveReason={this.saveReason}
          saveReport={this.saveReport}
          report={this.report}
          handleJoinRoom={this.handleJoinRoom}
          handleshowSave={this.handleshowSave}
          onChangeHandler={this.onChangeHandler}
          handlePage={this.handlePage}
          clearFile={this.clearFile}


          handleClick={this.handleClick}
          loading={this.state.loading}
          searchByType={this.searchByType}
          ResetonSelectChange={this.ResetonSelectChange}
          handlePageChange={this.handlePageChange}
          handleExtendDiv={this.handleExtendDiv}
        />
      </>
    );
  }
}


export default DetailVideoExam;
