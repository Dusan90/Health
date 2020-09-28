import React, { Component } from "react";
import axios from "axios";
import DetailQueue from "../../components/Client/ClientQueueExamDetail";
import Footer from "../../components/Main/Footer";
class ClientQueueExamDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      id: "",
    };
  }

  hanldeClientQueue = async (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/queue/client/${id}/`, {
        headers: { Authorization: access_token },
      })

      .then((response) => {
        console.log(response, "Client, IDDDDDDDD");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  componentDidMount() {
    this.setState({ id: this.props.match.params.id });
    this.hanldeClientQueue(this.props.match.params.id);
  }

  render() {
    return (
      <>
        <DetailQueue
          exam={this.state.exam}
          handleCancel={this.handleCancel}
          props={this.state}
          handleVideoStart={this.handleVideoStart}
          handleChange={this.handleChange}
          enableTipeing={this.enableTipeing}
          iconsMouseOut={this.iconsMouseOut}
          iconsMouseOver={this.iconsMouseOver}
          handleDragDrop={this.handleDragDrop}
          handleResize={this.handleResize}
          showAndHideChat={this.showAndHideChat}
          handleDivSize={this.handleDivSize}
          handleStatus={this.handleStatus}
          cutVideo={this.cutVideo}
          cutMic={this.cutMic}
        />
        <div className="footerr">
          <Footer />
        </div>
      </>
    );
  }
}

export default ClientQueueExamDetail;
