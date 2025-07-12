import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const MakePayment = () => {
  const { user } = use(AuthContext);
  const [agreement, setAgreement] = useState(null);
  const [month, setMonth] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/agreements")
      .then((res) => {
        const myAgreement = res.data.find(
          (item) => item.userEmail === user?.email && item.status === "checked"
        );
        setAgreement(myAgreement);
      })
      .catch((error) => console.log(error));
  }, [user?.email]);

  const handlePayment = (e) => {
    e.preventDefault();
    const paymentData = {
      email: agreement.userEmail,
      floor: agreement.floor,
      block: agreement.block,
      apartmentNo: agreement.apartmentNo,
      rent: agreement.rent,
      month,
      paymentDate: new Date().toISOString(),
    };
    console.log(paymentData);

    axios
      .post("http://localhost:3000/payments", paymentData)
      .then(() => {
        Swal.fire("Success", "Rent payment recorded", "success");
        setMonth("");
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong", "error");
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Make Rent Payment</h2>
      <form onSubmit={handlePayment} className="space-y-4">
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
        <button type="submit" className="btn btn-primary w-full mt-4">
          Pay Rent
        </button>
      </form>
    </div>
  );
};

export default MakePayment;
