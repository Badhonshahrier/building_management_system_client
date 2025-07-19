import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MakePayment = () => {
  const { user } = useContext(AuthContext);
  const [agreement, setAgreement] = useState(null);
  const [month, setMonth] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get("https://building-management-server-omega-drab.vercel.app/agreements", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          const myAgreement = res.data.find(
            (item) =>
              item.userEmail === user?.email && item.status === "checked"
          );
          setAgreement(myAgreement);
        })
        .catch((error) => console.log(error));
    }
  }, [user?.email]);

  const handleApplyCoupon = () => {
    if (!couponCode) return;

    axios
      .get("https://building-management-server-omega-drab.vercel.app/addcoupons")
      .then((res) => {
        const matched = res.data.find(
          (c) =>
            c.code.toLowerCase() === couponCode.toLowerCase() &&
            c.status === "active"
        );
        if (matched) {
          setDiscount(matched.discountPercentage);
          Swal.fire(
            "Coupon Applied",
            `You got ${matched.discountPercentage}% off!`,
            "success"
          );
        } else {
          setDiscount(0);
          Swal.fire("Invalid Coupon", "No coupon matched", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Failed to apply coupon", "error");
      });
  };

  const discountedRent = agreement
    ? agreement.rent - (agreement.rent * discount) / 100
    : 0;

  const handleStripeRedirect = () => {
    if (!agreement || !month) {
      return Swal.fire("Error", "Please fill in all required fields", "error");
    }

    navigate(`/dashboard/payment/${agreement._id}`, {
      state: {
        rent: discountedRent,
        agreement,
        discount,
        couponCode,
        month,
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Make Rent Payment</h2>

      {agreement ? (
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Member Email</label>
            <input
              type="email"
              readOnly
              value={agreement?.userEmail}
              className="input input-bordered w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Floor</label>
              <input
                type="text"
                readOnly
                value={agreement?.floor}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="font-semibold">Block</label>
              <input
                type="text"
                readOnly
                value={agreement?.block}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Room No</label>
              <input
                type="text"
                readOnly
                value={agreement?.apartmentNo}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="font-semibold">Rent (৳)</label>
              <input
                type="text"
                readOnly
                value={agreement?.rent}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold">Coupon Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter coupon code"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="btn btn-accent"
              >
                Apply
              </button>
            </div>
          </div>

          <div>
            <label className="font-semibold">Total Payable Rent</label>
            <input
              type="text"
              readOnly
              value={`৳ ${
                discount > 0 ? discountedRent.toFixed(2) : agreement.rent
              }`}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="font-semibold">Month</label>
            <input
              type="text"
              required
              placeholder="e.g., July 2025"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <button
            onClick={handleStripeRedirect}
            className="btn btn-primary mt-4 w-full"
          >
            Pay Now
          </button>
        </div>
      ) : (
        <p className="text-center text-red-600">No active agreement found.</p>
      )}
    </div>
  );
};

export default MakePayment;
