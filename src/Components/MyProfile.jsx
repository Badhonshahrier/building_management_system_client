import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [agreementInfo, setAgreementInfo] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get("http://localhost:3000/agreements")
        .then((res) => {
          const checkedAgreement = res.data.find(
            (req) =>req.status === "checked"
          );
          setAgreementInfo(checkedAgreement);
        })
        .catch((error) => console.log(error));
    }
  }, [user?.email]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h3 className="text-lg font-semibold">{user?.displayName}</h3>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      <div className="mt-6 space-y-2">
        <p>
          <span className="font-semibold">Agreement Accept Date:</span>
          {agreementInfo?.date
            ? new Date(agreementInfo.date).toLocaleDateString()
            : "None"}
        </p>
        <p>
          <span className="font-semibold">Floor:</span>{" "}
          {agreementInfo?.floor || "None"}
        </p>
        <p>
          <span className="font-semibold">Block:</span>{" "}
          {agreementInfo?.block || "None"}
        </p>
        <p>
          <span className="font-semibold">Room No:</span>{" "}
          {agreementInfo?.apartmentNo || "None"}
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
