import React, { Component } from "react";
import {
  CardElement,
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "react-stripe-elements";
import { connect } from "react-redux";
import { compose } from "redux";
import "../../assets/client/checkout.scss";
import { NotificationManager } from "react-notifications";
import { Redirect } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import { FaPaypal } from "react-icons/fa";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      selectedCard: false,
      selectedPal: false,
    };
  }

  submit = async (ev) => {
    ev.preventDefault();
    const price = parseInt(this.props.doctor.price, 10);
    const cardElement = this.props.elements.getElement("card");
    const { paymentMethod } = await this.props.stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (paymentMethod === undefined) {
      NotificationManager.error("Faild to Checkout", "Faild!", 2000);
    } else if (paymentMethod !== undefined) {
      const response = await fetch(
        "https://health-care-backend.herokuapp.com/api/charge/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payment_method_id: paymentMethod.id,
            amount: price,
          }),
        }
      );
      // await handleServerResponse(await response.json())
      const data = await response.json();
      console.log(data);

      if (data.message === "Payment completed") {
        this.setState({ complete: true });
        NotificationManager.success("Checkout Completed", "Successful!", 2000);
      }
    }
  };

  // handleServerResponse = async (response) => {
  //   if (response.error) {
  //     // Show error from server on payment form
  //   } else if (response.requires_action) {
  //     // Use Stripe.js to handle the required card action
  //     const { error: errorAction, paymentIntent } =
  //       await this.props.stripe.handleCardAction(response.payment_intent_client_secret);

  //     if (errorAction) {
  //       // Show error from Stripe.js in payment form
  //     } else {
  //       // The card action has been handled
  //       // The PaymentIntent can be confirmed again on the server
  //       const serverResponse = await fetch('/pay', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ payment_intent_id: paymentIntent.id })
  //       });
  //       handleServerResponse(await serverResponse.json());
  //     }
  //   } else {
  //     // Show success message
  //   }
  // }

  handleSelect = () => {
    this.setState({ selectedCard: true, selectedPal: false });
  };

  handleSelectPal = () => {
    this.setState({ selectedCard: false, selectedPal: true });
  };

  handleReady = (element) => {
    this.setState({ cardElement: element });
  };

  render() {
    const createOptions = (fontSize, padding) => {
      return {
        style: {
          base: {
            fontSize,
            color: "#4092c2",
            letterSpacing: "0.025em",
            "::placeholder": {
              color: "#4092c2",
              fontSize: "12px",
              fontWeight: 700,
            },
            padding,
          },
          invalid: {
            color: "#9e2146",
          },
        },
      };
    };
    if (this.state.complete) {
      return <Redirect to="/dashboard-client" />;
    }
    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <div className="mainCardDiv">
          <h1>Payment</h1>
          <p>Choose payment method below</p>
          <div className="payWay">
            <div
              className="cardIcon"
              style={{
                border: this.state.selectedCard ? "2px solid #4092c2" : "none",
              }}
              onClick={this.handleSelect}
            >
              <FaCreditCard className="icon" />
            </div>
            <div
              className="paypalIcon"
              style={{
                border: this.state.selectedPal ? "2px solid #4092c2" : "none",
              }}
              onClick={this.handleSelectPal}
            >
              <FaPaypal className="icon" />
            </div>
          </div>
          <div className="mainBillDiv">
            <div className="billingInfo">
              <h1>Billing Info</h1>
              <label htmlFor="fullName">
                FULL NAME
                <br />
                <input id="fullName" placeholder="John Doe" type="text" />
              </label>
            </div>
            <div className="creditCardInfo">
              <h1>Credit Card Info</h1>
              {/* <label htmlFor="">
              CARD NUMBER
              <br />
              <CardElement className="CardElement" onReady={this.handleReady} />
            </label> */}
              <form>
                <label>
                  CARD NUMBER
                  <CardNumberElement
                    className="CardElement"
                    onReady={this.handleReady}
                    {...createOptions(this.props.fontSize)}
                  />
                </label>
                <label>
                  EXPIRE DATE
                  <CardExpiryElement
                    className="CardElement"
                    onReady={this.handleReady}
                    {...createOptions(this.props.fontSize)}
                  />
                </label>
                <label>
                  CVC
                  <CardCvcElement
                    className="CardElement cvc"
                    onReady={this.handleReady}
                    {...createOptions(this.props.fontSize)}
                  />
                </label>
                <button className="btn-checkout" onClick={this.submit}>
                  {" "}
                  Submit{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const doctor = state.getIn(["doctorReducer", "doctor"]);
  return {
    doctor,
  };
};

export default compose(connect(mapStateToProps), injectStripe)(CheckoutForm);
