import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider"; // adjust if needed
import { FaMoneyBillWave, FaReceipt, FaPercent, FaCalendarAlt, FaTicketAlt, FaListOl } from "react-icons/fa";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://building-management-server-omega-drab.vercel.app/paymenthistory?email=${user.email}`)
        .then((res) => setPayments(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        <FaReceipt className="inline mr-2" /> Payment History
      </h2>

      {payments.length > 0 ? (
        <div className="overflow-x-auto rounded-xl shadow-lg border">
          <table className="table w-full text-sm md:text-base">
            <thead className="bg-blue-100 text-blue-800 font-semibold text-left">
              <tr>
                <th><FaListOl className="inline mr-1" />#</th>
                <th><FaCalendarAlt className="inline mr-1" />Month</th>
                <th><FaReceipt className="inline mr-1" />Transaction ID</th>
                <th><FaMoneyBillWave className="inline mr-1" />Amount</th>
                <th><FaPercent className="inline mr-1" />Discount</th>
                <th><FaTicketAlt className="inline mr-1" />Coupon</th>
                <th><FaCalendarAlt className="inline mr-1" />Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td className="font-medium">{payment.month}</td>
                  <td className="text-blue-600 font-mono">{payment.transactionId}</td>
                  <td>৳ {payment.rent}</td>
                  <td>{payment.discountPercentage || 0}%</td>
                  <td>{payment.couponCode || "None"}</td>
                  <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No payment history found.</p>
      )}
    </div>
  );
};

export default PaymentHistory;
