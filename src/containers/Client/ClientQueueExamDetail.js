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
      token: sessionStorage.getItem("accessToken"),
    };
  }

  hanldeClientQueue = async (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/queue/client/detail/${id}/`, {
        headers: { Authorization: access_token },
      })

      .then((response) => {
        console.log(response, "queue");
        this.setState({ exam: [response.data.data] });
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
        <DetailQueue exam={this.state.exam} />
        <div className="footerr">
          <Footer />
        </div>
      </>
    );
  }
}

export default ClientQueueExamDetail;
