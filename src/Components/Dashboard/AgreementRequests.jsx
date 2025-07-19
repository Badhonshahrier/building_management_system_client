import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const AgreementRequests = () => {
  const { user } = use(AuthContext);
  const [agreeReq, setAgreeReq] = useState([]);
  useEffect(() => {
    fetch("https://building-management-server-omega-drab.vercel.app/agreements", {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAgreeReq(data));
  }, [user.accessToken]);

  const handleAccept = (id) => {
    axios
      .patch(`https://building-management-server-omega-drab.vercel.app/agreements/accept/${id}`,{}, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        const remaining = agreeReq.filter((item) => item._id !== id);
        setAgreeReq(remaining);
      })
      .catch((error) => console.log(error));
  };

  const handleReject = (id) => {
    axios
      .patch(`https://building-management-server-omega-drab.vercel.app/agreements/reject/${id}`,{}, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        const remaining = agreeReq.filter((item) => item._id !== id);
        setAgreeReq(remaining);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Agreement Requests</h2>
      <table className="table w-full border">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Floor</th>
            <th>Block</th>
            <th>Room No</th>
            <th>Rent</th>
            <th>Request Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {agreeReq.map((agree, index) => (
            <tr key={agree._id} className="hover">
              <td>{index + 1}</td>
              <td>{agree.userName}</td>
              <td>{agree.userEmail}</td>
              <td>{agree.floor}</td>
              <td>{agree.block}</td>
              <td>{agree.apartmentNo}</td>
              <td>৳{agree.rent}</td>
              <td>{new Date(agree.date).toLocaleDateString()}</td>
              <td className="space-x-2">
                <button
                  onClick={() => handleAccept(agree._id)}
                  className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(agree._id)}
                  className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgreementRequests;
