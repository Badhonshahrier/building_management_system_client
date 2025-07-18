import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const location = useLocation();

  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [finalAmount, setFinalAmount] = useState(null);

  useEffect(() => {
    const rentFromState = location.state?.rent;
    setFinalAmount(rentFromState);

    if (rentFromState) {
      axios
        .post("http://localhost:3000/create-payment-intent", {
          price: rentFromState,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => console.error(err));
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: methodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (methodError) {
      setError(methodError.message);
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: "Test User",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      setError("");
      console.log("✅ Payment successful!", paymentIntent);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="border-white p-2 rounded" />
        {finalAmount && (
          <p className="text-green-600 font-semibold text-lg">
            Total Payable: ৳ {finalAmount}
          </p>
        )}
        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={!stripe}
        >
          Pay Now
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
