import axios from "axios";
import React, { useEffect, useState } from "react";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/addcoupons"
      )
      .then((res) => setCoupons(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleCoupons = (e) => {
    e.preventDefault();
    const form = e.target;
    const code = form.code.value;
    const percentage = form.percentage.value;
    const description = form.description.value;

    const newCoupon = {
      code,
      discountPercentage: parseFloat(percentage),
      description,
      createdBy: "Admin",
      status: "active",
    };

    axios
      .post(
        "http://localhost:3000/addcoupons",
        newCoupon
      )
      .then((res) => {
        if (res.data.insertedId || res.data.acknowledged) {
          axios
            .get(
              "http://localhost:3000/addcoupons"
            )
            .then((res) => setCoupons(res.data));
          form.reset();
          document.getElementById("my_modal_3").close();
        }
      })
      .catch((error) => console.log(error));
  };

  const handleStatusToggle = (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    axios
      .patch(
        `http://localhost:3000/addcoupons/${id}`,
        {
          status: newStatus,
        }
      )
      .then(() => {
        setCoupons((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
        );
      })
      .catch((error) => console.error("Failed to update status", error));
  };

  return (
    <div className="p-6 overflow-x-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4 text-center">All Coupons</h2>
        <button
          className="btn btn-accent"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Add Coupons
        </button>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleCoupons} className="space-y-3">
            <div>
              <label className="label">Coupon Code</label>
              <input
                type="text"
                name="code"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">Discount Percentage</label>
              <input
                type="number"
                name="percentage"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
                required
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <table className="table w-full border mt-6">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th>#</th>
            <th>Coupon Code</th>
            <th>Discount (%)</th>
            <th>Description</th>
            <th>Created By</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => (
            <tr key={coupon._id} className="hover">
              <td>{index + 1}</td>
              <td className="font-medium">{coupon.code}</td>
              <td>{coupon.discountPercentage}%</td>
              <td>{coupon.description}</td>
              <td>{coupon.createdBy}</td>
              <td>
                <label className="cursor-pointer flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={coupon.status === "active"}
                    onChange={() =>
                      handleStatusToggle(coupon._id, coupon.status)
                    }
                  />
                  <span
                    className={`text-sm font-medium ${
                      coupon.status === "active"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {coupon.status}
                  </span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCoupons;
