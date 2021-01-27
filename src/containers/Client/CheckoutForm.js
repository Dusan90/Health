import React, { Component } from "react";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
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
import PaypalButton from "./PaypalCheckout";
import HamburgerDiv from "../../components/Main/HamburgerDiv";
import Loading from "../../icons/c+.svg";


class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      selectedCard: true,
      selectedPal: false,
      token: null,
      cardNumber: false,
      cardCvc: false,
      cardExpiry: false,
      loading: false,
      name: '',
      color: '',
      token: sessionStorage.getItem("accessToken"),
    };
  }

  // handleToken = (token, addresses) => {
  //   console.log(token, addresses);
  // };

  // submit = async (ev) => {
  //   ev.preventDefault();
  //   const price = parseInt(this.props.doctor.price, 10);
  //   const cardElement = this.props.elements.getElement("card");
  //   const { paymentMethod } = await this.props.stripe.createPaymentMethod({
  //     type: "card",
  //     card: cardElement,
  //   });
  //   if (paymentMethod === undefined) {
  //     NotificationManager.error("Faild to Checkout", "Faild!", 2000);
  //   } else if (paymentMethod !== undefined) {
  //     const response = await fetch(
  //       "https://healthcarebackend.xyz/api/charge/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           payment_method_id: paymentMethod.id,
  //           amount: price,
  //         }),
  //       }
  //     );
  //     // await handleServerResponse(await response.json())
  //     const data = await response.json();
  //     console.log(data);

  //     if (data.message === "Payment completed") {
  //       this.setState({ complete: true });
  //       NotificationManager.success("Checkout Completed", "Successful!", 2000);
  //     }
  //   }
  // };

  handleChange = (change) => {
    // console.log("[change]", change);
    console.log(change);
    this.setState({ [change.elementType]: change.complete });
    const CardElement = document.getElementById('CardElement')
    CardElement.style.backgroundColor = !this.state.cardNumber && 'white'
    const Expire = document.getElementById('Expire')
    Expire.style.backgroundColor = this.state.cardExpiry && 'white'
    const elementCvc = document.getElementById('elementCvc')
    elementCvc.style.backgroundColor = this.state.cardCvc && 'white'
  };
  handleReady = () => {
    console.log("[ready]");
  };

  handleSubmit = async (ev) => {
    ev.preventDefault();
    const price = parseInt(this.props.location.state.price, 10);
    const currency = this.props.location.state.currency
    const transaction_id = this.props.location.state.transaction_id
    this.setState({color: 'red'})
    const CardElement = document.getElementById('CardElement')
    CardElement.style.backgroundColor = !this.state.cardNumber ? 'rgb(245, 192, 192)' : 'white'
    const Expire = document.getElementById('Expire')
    Expire.style.backgroundColor = !this.state.cardExpiry ? 'rgb(245, 192, 192)' : 'white'
    const elementCvc = document.getElementById('elementCvc')
    elementCvc.style.backgroundColor = !this.state.cardCvc ? 'rgb(245, 192, 192)' : 'white'
    if (
      this.props.stripe &&
      this.state.name &&
      this.state.cardNumber &&
      this.state.cardExpiry &&
      this.state.cardCvc
    ) {
      // if (this.props.location.state.price === "None" || this.props.location.state.price === "0") {
      //   NotificationManager.error(
      //     "Doctor did not set his price",
      //     "Faild",
      //     3000
      //   );
      // }
      //  else {
        this.setState({loading: true})
        const result = await this.props.stripe.createPaymentMethod("card", {});
        console.log(result.paymentMethod);
        // await this.props.stripe.createToken().then((payload) => {
        //   console.log("[token]", payload.token);
        //   this.setState({ token: payload.token });
        // });
        const access_token = "Bearer ".concat(this.state.token);
        const response = await fetch(
          "https://healthcarebackend.xyz/api/payment/charge/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: access_token,
            },
            body: JSON.stringify({
              payment_method_id: result.paymentMethod.id,
              amount: price,
              currency: currency,
              transaction_id: transaction_id 
            }),
          }
        );

        // await this.handleServerResponse(await response.json());
        const data = await response.json();
        console.log(data);
          data && this.setState({loading: false})
        if (data.message === "Payment completed") {
          this.setState({ complete: true });
          NotificationManager.success(
            "Checkout Completed",
            "Successful!",
            2000
          );
        } else {
          NotificationManager.error("Faild to Checkout", "Faild!", 2000);
          console.log("Stripe.js hasn't loaded yet.");
        }
      // }
    }else{
      NotificationManager.error("Empty Fields", "Faild!", 2000);
    }
  };

  handleServerResponse = async (response) => {
    if (response.error) {
      // Show error from server on payment form
    } else if (response.requires_action) {
      // Use Stripe.js to handle the required card action
      const {
        error: errorAction,
        paymentIntent,
      } = await this.props.stripe.handleCardAction(
        response.payment_intent_client_secret
      );

      if (errorAction) {
        // Show error from Stripe.js in payment form
      } else {
        // The card action has been handled
        // The PaymentIntent can be confirmed again on the server
        const serverResponse = await fetch(
          "https://healthcarebackend.xyz/api/pay",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ payment_intent_id: paymentIntent.id }),
          }
        );
        this.handleServerResponse(await serverResponse.json());
      }
    } else {
      // Show success message
      NotificationManager.success("Completed", "Successful!", 2000);
    }
  };

  handleSelect = () => {
    this.setState({ selectedCard: true, selectedPal: false });
  };

  handleSelectPal = () => {
    this.setState({ selectedCard: false, selectedPal: true });
  };

  handleReady = (element) => {
    this.setState({ cardElement: element });
  };

  handleName = (e) =>{
    this.setState({name: e.target.value})
  }

  render() {
    console.log(this.props.location.state);
    console.log(this.props.location.state.price)
    const createOptions = (fontSize, padding, background) => {
      return {
        style: {
          base: {
            fontSize,
            color: "#666666",
            letterSpacing: "0.025em",
            color: "#666666",
            fontSize: "14px",
            fontWeight: 'bold',
            "::placeholder": {
              color: "#666666",
              fontSize: "14px",
              fontWeight: '450',
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
      if (!this.props.location.state.location) {
        return <Redirect to="/dashboard-client" />;
      } else {
        return <Redirect to={this.props.location.state.location} />;
      }
    }
    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <HamburgerDiv />
        <h1 className="mainTitle">Payment</h1>
        <p className="underTitle">Choose payment method below</p>
        <div className="mainCardDiv">
        {  this.state.loading && <img
src={Loading}
className="loading"
alt="loading..."
style={{ width: "150px" }}
/>}
          <div className="payWay">
            <div
              className="cardIcon"
              style={{
                background: this.state.selectedCard ? "white" : "transparent",
              }}
              onClick={this.handleSelect}
            >
              <FaCreditCard className="icon" />
            </div>
            <div
              className="paypalIcon"
              style={{
                background: this.state.selectedPal ? "white" : "transparent",
              }}
              onClick={this.handleSelectPal}
            >
              <FaPaypal className="icon" />
            </div>
          </div>
          {this.state.selectedCard ? (
            <div className="mainBillDiv">
              <div className="billingInfo">
                <h1>Billing Info</h1>
                <label htmlFor="fullName">
                  Full Name
                  <br />
                  <input
                  style={{background: !this.state.name && this.state.color && 'rgb(245, 192, 192)'  }}
                  id="fullName" onChange={this.handleName} placeholder="Full Name" type="text" />
                </label>
                <h1 className="totalPrice">
                  Total:{" "}
                  {this.props.location.state === undefined
                    ? 0
                    : this.props.location.state.price
                    ? this.props.location.state.price
                    : 0}
                   {" "}{this.props.location.state.currency}
                </h1>
              </div>
              <div className="creditCardInfo">
                <h1>Credit Card Info</h1>

                {/* <form>
                <label>
                  CARD NUMBER
                  <CardNumberElement
                    stripeKey="pk_test_EolntZ7skKXUqmWzbnpuo1zy00ZxWVnWf3"
                    token={this.handleToken}
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
              </form> */}
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Card Number
                    <CardNumberElement
                      className="CardElement"
                      id='CardElement'
                      onChange={this.handleChange}
                 
                    
                      onReady={this.handleReady}
                      {...createOptions(this.props.fontSize)}
                    />
                  </label>
                  <label>
                    Expiration Date
                    <CardExpiryElement
                      className="CardElement"
                      id='Expire'
                      onChange={this.handleChange}

                      onReady={this.handleReady}
                      {...createOptions(this.props.fontSize)}
                    />
                  </label>
                  <label>
                    CVC
                    <CardCVCElement
                      className="CardElement cvc"
                      id="elementCvc"
                      onChange={this.handleChange}

                      onReady={this.handleReady}
                      {...createOptions(this.props.fontSize)}
                    />
                  </label>
                  <button className="btn-checkout"> Submit </button>
                </form>
              </div>
            </div>
          ) : this.state.selectedPal ? (
            <div>
              <PaypalButton
                amount={
                  this.props.location.state
                    ? this.props.location.state.price
                    : 0
                }
              />
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const doctor = state.getIn(["doctorReducer", "doctor"]);
  console.log(doctor);

  return {
    doctor,
  };
};

export default compose(connect(mapStateToProps), injectStripe)(CheckoutForm);
