import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
// import Spinner from "../../img/loading-gif-png-5-original.gif";
import { NotificationManager } from "react-notifications";

const CLIENT = {
  sandbox: "sb",
  // production: "xxxxxxxxx",
};

const CLIENT_ID = CLIENT.sandbox;
// process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM,
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }
  createOrder = (data, actions) => {
    if (this.props.amount !== 0) {
      return actions.order.create({
        purchase_units: [
          {
            description: +"Exam Price",
            amount: {
              currency_code: "EUR",
              value: this.props.amount,
            },
          },
        ],
      });
    } else {
      NotificationManager.error("Doctor did not set his price", "Faild", 3000);
    }
  };

  onApprove = (data, actions) => {
    if (this.props.amount !== 0) {
      actions.order.capture().then((details) => {
        const paymentData = {
          payerID: data.payerID,
          orderID: data.orderID,
        };
        console.log("Payment Approved: ", paymentData);
        this.setState({ showButtons: false, paid: true });
      });
    }
  };

  render() {
    console.log(this.props);

    const { showButtons, paid } = this.state;
    const style = {
      size: "small",
      color: "gold",
      shape: "pill",
      label: "checkout",
      // tagline: "false",
      layout: "horizontal",
      tagline: "true",
      commit: "true",
    };

    return (
      <div
        className="main"
        style={{ margin: "40px auto 0 auto", width: "300px" }}
      >
        {showButtons && (
          <div>
            <PayPalButton
              style={style}
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
          </div>
        )}

        {paid && (
          <div className="main">
            <h2 style={{ color: "#4092c2" }}>
              Congrats!{" "}
              <span role="img" aria-label="emoji">
                {" "}
                😉
              </span>
            </h2>
          </div>
        )}
      </div>
    );
  }
}

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=EUR`
)(PaypalButton);
