import React from 'react';
import {CardElement} from 'react-stripe-elements';

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

const CardSection = () => {
  return (
    <form>
      Card details
      <CardElement className="MyCardSelection" style={style} />
    </form>
  );
};

export default CardSection;