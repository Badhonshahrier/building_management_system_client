import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTicketAlt, FaInfoCircle, FaCopy, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [copiedCode, setCopiedCode] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/addcoupons")
      .then((res) => setCoupons(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);

    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: `Coupon code "${code}" copied to clipboard.`,
      timer: 1500,
      showConfirmButton: false,
    });

    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <>
      {/* Title */}
      <motion.h1
        className="text-4xl font-bold text-center pt-20 text-gray-600 italic "
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Available Coupons
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-center w-4/6 mx-auto py-4 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Get exclusive discounts for rent payments, maintenance services, and
        community facilities. Use the codes below and save more!
      </motion.p>

      {/* Main Section */}
      <div className="p-6 bg-gray-200 rounded-2xl max-w-7xl mx-auto shadow-lg">
        {coupons.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-16 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
     
              className="w-32 mb-4 opacity-70"
            />
            <p className="text-lg">No coupons available right now.</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {coupons.map((coupon) => (
              <motion.div
                key={coupon._id}
                className="relative rounded-xl overflow-hidden p-[2px] bg-gray-200 animate-gradient shadow-lg"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {/* Inner Card */}
                <div className="bg-white rounded-xl p-5 relative h-full">
                  {/* Animated Discount Badge */}
                  <motion.div
                    className="absolute top-3 right-3 bg-green-600 text-white text-sm px-3 py-1 rounded-full font-semibold shadow-md"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {coupon.discountPercentage}% OFF
                  </motion.div>

                  {/* Coupon Code with Copy */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-emerald-700 flex items-center gap-2">
                      <FaTicketAlt className="text-emerald-600" /> {coupon.code}
                    </h2>

                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className="text-gray-500 hover:text-emerald-600 transition"
                    >
                      {copiedCode === coupon.code ? (
                        <FaCheckCircle className="text-emerald-500 text-lg" />
                      ) : (
                        <FaCopy className="text-lg" />
                      )}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="mt-2 text-gray-700 flex items-start gap-2">
                    <FaInfoCircle className="mt-1 text-emerald-500" />{" "}
                    {coupon.description}
                  </p>

                  {/* Footer Info */}
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Created By: </span>
                      {coupon.createdBy}
                    </p>

                    {coupon.expiryDate && (
                      <motion.p
                        className="text-red-500 font-medium"
                        animate={{
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                        }}
                      >
                        Expires on: {new Date(coupon.expiryDate).toDateString()}
                      </motion.p>
                    )}

                    <div
                      className={`inline-block text-sm px-3 py-1 rounded-full font-semibold ${
                        coupon.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {coupon.status}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Coupon;
