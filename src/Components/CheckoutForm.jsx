import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { rent, agreement, discount, couponCode, month } = location.state || {};
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (rent > 0) {
      axios.post("https://building-management-server-omega-drab.vercel.app/create-payment-intent", { price: rent })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(err => {
          console.error("Error creating payment intent", err);
        });
    }
  }, [rent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: cardError } = await stripe.createPaymentMethod({
      type: "card",
      card
    });

    if (cardError) {
      setError(cardError.message);
      return;
    }

    setError("");
    setProcessing(true);

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email || "unknown",
        },
      },
    });

    if (confirmError) {
      console.error("Payment confirmation error", confirmError);
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentData = {
        email: user.email,
        floor: agreement?.floor,
        block: agreement?.block,
        apartmentNo: agreement?.apartmentNo,
        originalRent: agreement?.rent,
        rent,
        discountPercentage: discount,
        couponCode: discount > 0 ? couponCode : null,
        transactionId: paymentIntent.id,
        paymentDate: new Date().toISOString(),
        month,
      };

      axios.post("https://building-management-server-omega-drab.vercel.app/payments", paymentData)
        .then(() => {
          Swal.fire("Success", "Payment Successful!", "success");
          navigate("/dashboard/paymenthistory");
        })
        .catch(() => {
          Swal.fire("Error", "Payment stored failed", "error");
        });
    }

    setProcessing(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 mt-10 rounded-lg">

      <div className="mb-4 text-center">
        {discount > 0 ? (
          <p className="text-sm text-gray-700">
            <span className="text-lg font-bold">Payable: ৳ {rent?.toFixed(2)}</span>
          </p>
        ) : (
          <p className="text-lg font-semibold">Rent: ৳{rent}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="border p-3 rounded" />
        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
