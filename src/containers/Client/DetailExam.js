import React, { Component } from "react";
import axios from "axios";
import Detail from "../../components/Client/DetailExam";
import { NotificationManager } from "react-notifications";

class ClientDetailExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      statusValue: "",
      selectedStatus: "",
      token: sessionStorage.getItem("accessToken"),
      id: this.props.match.params.id,
      correspondence: [],
      lastInArray: null,
      replyClicked: false,
      messageValue: "",
      selectedFile: '',
      doctor: '',
      client: ''
    };
    this.socket = new WebSocket(
      `wss://healthcarebackend.xyz/ws/message/${this.props.match.params.id}/`
    );
  }

  handleStatus = (statusValue) => {
    this.setState({ statusValue });
    let { value, label } = statusValue;
    console.log(value, label);
    this.setState({ selectedStatus: value });
    this.handleCancel(value);
  };

  handleCancel = async (value) => {
    const access_token = "Bearer ".concat(this.state.token);
    const doctor = await fetch(
      `https://healthcarebackend.xyz/api/client/exams/${this.state.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify({
          status: value,
        }),
      }
    );
    const jsonData = await doctor.json();
    // this.toRefund();
    console.log(jsonData);
    jsonData.success &&  this.props.history.push("/dashboard-client");
    return jsonData;
  };

  detail = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/client/exams/${this.state.id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response, "detailex");

        this.setState({ exam: [response.data.data], doctor: response.data.data.doctor });
        let mess = document.getElementById('messageMainText')
        let messageDiv = document.querySelector('.messageDiv')
    let square = document.getElementById('imageDiv1')

        console.log(mess.scrollHeight);
        if(mess.scrollHeight > 100){
          mess.style.height = `${mess.scrollHeight}px`
          messageDiv.style.height = `${mess.scrollHeight + 60}px` 
          square.style.display = 'block'
        }
        // else{
        //   mess.style.height = '300px'
        // }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  handleExtendDiv = () =>{
    let mess = document.getElementById('messageMainText')
    let messageDiv = document.querySelector('.messageDiv')
    // let square = document.getElementById('imageDiv1')
    console.log(mess);
      if(mess.clientHeight > 100){
        mess.style.height = '100px'
        messageDiv.style.height = `${120}px`
      }
      else{
        mess.style.height = `${mess.scrollHeight}px`
        messageDiv.style.height = `${mess.scrollHeight + 60}px` 
      }
}

  componentWillUnmount() {
    this.socket.close();
    
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.detail();
    this.correspondence(id);

    this.socket.onopen = () => {
      console.log("connected");
    };
    this.socket.onmessage = (event) => {
      let parsedEvent = JSON.parse(event.data);
      console.log(parsedEvent);
      if (parsedEvent.exam_id === parseInt(id)) {
        // window.location.reload()
        this.detail(id);
        this.correspondence(id);
      }
      console.log(parsedEvent);
    };
    const access_token = "Bearer ".concat(this.state.token);

    axios
      .get(`https://healthcarebackend.xyz/api/client/profile/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        let name = `${response.data.data.user.first_name} ${response.data.data.user.last_name}`
        this.connect(response.data.data.id);
        return this.setState({ client: name });
      })

      
  }

  connect = (id) => {
    const wss = new WebSocket(
      `wss://healthcarebackend.xyz/ws/dashboard/client/${id}/`
    );

    wss.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected to test socket");
    };
    wss.onmessage = (e) => {
      // listen to data sent from the websocket server
      const message = JSON.parse(e.data);
      console.log(message);
      if(message.id === JSON.parse(this.state.id) && message.exam_type === "mail" ){
        console.log('da li se ovo pokrece nekako');
        this.detail(this.state.id);
        this.correspondence(this.state.id);
      }
      

    };
  };

  handleMessage = (e) => {
    let text = document.querySelector('.messageTextInput')
    text.style.height = ''
    text.style.height = `${text.scrollHeight}px`
    this.setState({ messageValue: e.target.value });
  };

  handleReplyClick = () => {
    this.setState({ replyClicked: !this.state.replyClicked });
  };

  newMessage = () => {
    this.setState({ replyClicked: true });
  };

  onChangeHandler = (e) => {
    console.log(e);
    // const propertyValues = Object.values(e.target.files);

    // this.setState({
    //   selectedFile: propertyValues,
    // });
    this.setState({selectedFile: e.target.files[0]})
  };

  handleSubmitSend = (e) => {
    if (this.state.messageValue) {
      this.sendMessage();
      this.setState({ messageValue: "", replyClicked: false });
    } else {
      NotificationManager.error("Empty Fields", "Failed!", 2000);
    }
  };

  clearFile = () =>{
    this.setState({selectedFile: ''})
    document.getElementById('useForCleaning').value = ''
  }

  sendMessage = async () => {

    let form_data = new FormData();
    form_data.append("message", this.state.messageValue);
    form_data.append("attachment", this.state.selectedFile);
    
    const access_token = "Bearer ".concat(this.state.token);
    let url =  `https://healthcarebackend.xyz/api/client/exams/${this.state.id}/message/`;
    
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
      this.detail(this.state.id);
      this.correspondence(this.state.id);
      this.setState({selectedFile: ''})
    }
  
    return data;

    // const access_token = "Bearer ".concat(this.state.token);
    // const client = await fetch(
    //   `https://healthcarebackend.xyz/api/client/exams/${this.state.id}/message/`,
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
    //   this.detail(this.state.id);
    //   this.correspondence(this.state.id);
    // }
    // console.log(jsonData);
    // console.log(client);

    // return jsonData;
  };

  correspondence = async (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    await axios 
      .get(`https://healthcarebackend.xyz/api/client/exams/${id}/messages/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response, "correspondence");

        const res = response.data.data.map((val) => {
          return {
            id: val.id,
            sender: val.sender,
            created: val.created,
            message: val.message,
            attachment: val.attachment,
          };
        });

        let resort = res.sort(
          (a, b) => Date.parse(a.created) - Date.parse(b.created)
        );
        // let lastIn = response.data.data.reverse();
        this.setState({
          correspondence: resort,
          lastInArray: res[res.length - 1],
        });
      }).then(() =>{
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
                console.log(ex.clientHeight)
                if(ex.clientHeight > 100){
                  ex.style.height = '100px'
                }else{
                  ex.style.height = `${ex.scrollHeight}px`
                }
              }
          
            }
 
          })

        }
        // else{
        // // let textar = document.querySelector('.message')
        // let textar = document.getElementsByClassName("message")
        // console.log('da li se pokrece ovo', textar, textar[0].scrollHeight);
        // if(textar[0].scrollHeight > 100){
        //   textar[0].style.height = `${textar[0].scrollHeight}px`
        //   let parentOfElement = textar[0].parentElement.previousSibling
        //   let div = parentOfElement.lastChild
        //   div.style.display = 'block'
      
        //   div.onclick = function() { 
        //     console.log(textar[0].clientHeight)
        //     if(textar[0].clientHeight > 100){
        //       textar[0].style.height = '100px'
        //     }else{
        //       textar[0].style.height = `${textar[0].scrollHeight}px`
        //     }
        //   }
        // }
        // }
      }
  }

  render() {
    console.log(this.state.id);
    return (
      <>
        <Detail
          exam={this.state.exam}
          props={this.state}
          handleStatus={this.handleStatus}
          onChangeHandler={this.onChangeHandler}
          handleMessage={this.handleMessage}
          newMessage={this.newMessage}
          handleReplyClick={this.handleReplyClick}
          handleSubmitSend={this.handleSubmitSend}
          handleExtendDiv={this.handleExtendDiv}
          clearFile={this.clearFile}
        />
      </>
    );
  }
}

export default ClientDetailExam;
