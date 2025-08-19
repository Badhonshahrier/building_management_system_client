import axios from "axios";
import React, { useEffect, useState } from "react";
import { PlusCircle, CheckCircle, XCircle } from "lucide-react";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/addcoupons");
      setCoupons(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCoupons = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newCoupon = {
      code: form.code.value,
      discountPercentage: parseFloat(form.percentage.value),
      description: form.description.value,
      createdBy: "Admin",
      status: "active",
    };

    try {
      const res = await axios.post("http://localhost:3000/addcoupons", newCoupon);
      if (res.data.insertedId || res.data.acknowledged) {
        fetchCoupons();
        form.reset();
        document.getElementById("coupon_modal").close();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      setProcessingId(id);
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await axios.patch(`http://localhost:3000/addcoupons/${id}`, { status: newStatus });
      setCoupons((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <p className="p-6 text-center text-gray-500">Loading coupons...</p>;

  return (
    <div className="p-6 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">All Coupons</h2>
        <button
          onClick={() => document.getElementById("coupon_modal").showModal()}
          className="flex items-center gap-2 btn btn-accent"
        >
          <PlusCircle className="w-5 h-5" /> Add Coupon
        </button>
      </div>

      {/* Add Coupon Modal */}
      <dialog id="coupon_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <form onSubmit={handleCoupons} className="space-y-3">
            <div>
              <label className="label">Coupon Code</label>
              <input type="text" name="code" className="input input-bordered w-full" required />
            </div>
            <div>
              <label className="label">Discount Percentage</label>
              <input type="number" name="percentage" className="input input-bordered w-full" required />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea name="description" className="textarea textarea-bordered w-full" required />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Coupons Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Discount (%)</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Created By</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {coupons.map((coupon, idx) => (
              <tr key={coupon._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-700">{idx + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{coupon.code}</td>
                <td className="px-6 py-4 text-gray-700">{coupon.discountPercentage}%</td>
                <td className="px-6 py-4 text-gray-700">{coupon.description}</td>
                <td className="px-6 py-4 text-gray-700">{coupon.createdBy}</td>
                <td className="px-6 py-4 text-center">
  <button
    onClick={() => handleStatusToggle(coupon._id, coupon.status)}
    disabled={processingId === coupon._id}
    className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none ${
      coupon.status === "active" ? "bg-green-500" : "bg-red-500"
    }`}
  >
    <span
      className={`inline-block w-7 h-7 bg-white rounded-full transform transition-transform duration-300 ${
        coupon.status === "active" ? "translate-x-8" : "translate-x-0"
      }`}
    >
      {coupon.status === "active" ? (
        <CheckCircle className="w-4 h-4 text-green-500 absolute top-1.5 left-1.5" />
      ) : (
        <XCircle className="w-4 h-4 text-red-500 absolute top-1.5 left-1.5" />
      )}
    </span>
  </button>
  <span className="ml-2 text-sm font-medium">
    {processingId === coupon._id ? "Processing..." : coupon.status}
  </span>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupons;
