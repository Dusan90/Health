import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';
import CardSection from '../../components/Client/CardSection';

const style = {
  base: {
    color: "#32325d",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a"
  }
};

class CheckoutForm extends Component{
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    ev.preventDefault();
    let token  = await this.props.stripe.createToken({type: "card"});
    console.log(token)
    let response = await fetch('http://0.0.0.0:8000/api/charge/', {
        method: "POST",
        headers: {"Content-Type": "text/plain"},
        body: token.id
    });
    if (response.ok) console.log("Submit Completed!")
  }

  render() {
    if (this.state.complete) return <h1>Submit Completed</h1>;
    return (
      <div className="checkout">
        <CardSection className="MyCardElement" style={style} />
        <button onClick={this.submit}>Submit</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);