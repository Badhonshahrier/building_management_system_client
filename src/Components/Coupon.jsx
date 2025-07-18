import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPercentage, FaTicketAlt, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/addcoupons")
      .then((res) => setCoupons(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center my-20 text-gray-600">
         Available Coupons
      </h1>

      {coupons.length === 0 ? (
        <p className="text-center text-gray-500">No coupons available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-white border shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300 relative"
            >
              <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full font-semibold">
                {coupon.discountPercentage}% OFF
              </div>
              <h2 className="text-xl font-bold text-emerald-700 flex items-center gap-2">
                <FaTicketAlt /> {coupon.code}
              </h2>
              <p className="mt-2 text-gray-700 flex items-start gap-2">
                <FaInfoCircle className="mt-1" /> {coupon.description}
              </p>
              <div className="mt-4 space-y-1 text-sm text-gray-600">
               
                <p>
                  <span className="font-medium">Created By:</span>
                  {coupon.createdBy}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Coupon;
