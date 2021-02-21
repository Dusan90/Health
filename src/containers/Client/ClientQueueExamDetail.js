import React, { Component } from "react";
import axios from "axios";
import DetailQueue from "../../components/Client/ClientQueueExamDetail";
class ClientQueueExamDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      id: "",
      token: sessionStorage.getItem("accessToken"),
    };
  }

  hanldeClientQueue = async (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/queue/client/${id}/detail/`, {
        headers: { Authorization: access_token },
      })

      .then((response) => {
        console.log(response, "queue");
        this.setState({ exam: [response.data.data] });
        let mess = document.getElementById('messageMainText')
        let messageDiv = document.querySelector('.messageDiv')
        let queue = document.getElementById('imageDiv1')
        console.log(mess);
        if(mess.scrollHeight > 100){
          mess.style.height = `${mess.scrollHeight}px`
          messageDiv.style.height = `${mess.scrollHeight + 60}px` 
          queue.style.display = 'block'
        }
        // else{
        //   mess.style.height = '300px'
        // }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  handleExtendDiv = () =>{
    let mess = document.getElementById('messageMainText')
    let messageDiv = document.querySelector('.messageDiv')
    let square = document.getElementById('imageDiv1')
    console.log(mess);
      if(mess.clientHeight > 100){
        mess.style.height = '100px'
        messageDiv.style.height = `${160}px`
      }else{
        mess.style.height = `${mess.scrollHeight}px`
        messageDiv.style.height = `${mess.scrollHeight + 60}px`
      }
}

  componentDidMount() {
    this.setState({ id: this.props.match.params.id });
    this.hanldeClientQueue(this.props.match.params.id);
  }

  render() {
    return (
      <>

        <DetailQueue exam={this.state.exam} props={this.state} handleExtendDiv={this.handleExtendDiv} />
       
      </>
    );
  }
}

export default ClientQueueExamDetail;
