import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51ReqVcI0N7JLD0W3gAWsjw30TrBffC7cqhBd17JbNWuRXGeBDYqah2vOec9xwNZcMnoa3JXU0c4cMC4hCGsmCxMO00DzMCAnip");
const RentPayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm></CheckoutForm>
    </Elements>
  );
};

export default RentPayment;
