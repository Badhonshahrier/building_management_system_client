import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  const [role, setRole] = useState(null);
  const [agreementInfo, setAgreementInfo] = useState(null);
  const [stats, setStats] = useState({
    rooms: 0,
    available: 0,
    unavailable: 0,
    users: 0,
    members: 0,
  });

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://building-management-server-omega-drab.vercel.app/users/role/${user.email}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => setRole(res.data.role))
        .catch((err) => console.error(err));
      axios
        .get("https://building-management-server-omega-drab.vercel.app/agreements", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          const found = res.data.find(
            (req) => req.userEmail === user.email && req.status === "checked"
          );
          setAgreementInfo(found);
        })
        .catch((err) => console.error(err));
      axios
        .all([
          axios.get("https://building-management-server-omega-drab.vercel.app/apartinfo"),
          axios.get("https://building-management-server-omega-drab.vercel.app/users"),
        ])
        .then(
          axios.spread((roomsRes, usersRes) => {
            const total = roomsRes.data.length;
            const unavailable = roomsRes.data.filter(
              (room) => room.status === "unavailable"
            ).length;
            const available = total - unavailable;

            const users = usersRes.data;
            const memberCount = users.filter((u) => u.role === "member").length;
            const userCount = users.filter((u) => u.role === "user").length;

            setStats({
              rooms: total,
              available: Math.round((available / total) * 100) || 0,
              unavailable: Math.round((unavailable / total) * 100) || 0,
              users: userCount,
              members: memberCount,
            });
          })
        )
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-24 h-24 object-cover rounded-full mb-4"
        />
        <h3 className="text-lg font-semibold">Name : {user?.displayName}</h3>
        <p className="text-gray-600">Email : {user?.email}</p>
        <p className="text-sm text-blue-500 mt-1 font-bold">
          Role : {role || "N/A"}
        </p>
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <p>
          <span className="font-semibold">Agreement Accept Date:</span>
          {role === "member" && agreementInfo?.date
            ? new Date(agreementInfo.date).toISOString()
            : "None"}
        </p>
        <p>
          <span className="font-semibold">Floor:</span>
          {role === "member" ? agreementInfo?.floor : "None"}
        </p>
        <p>
          <span className="font-semibold">Block:</span>
          {role === "member" ? agreementInfo?.block : "None"}
        </p>
        <p>
          <span className="font-semibold">Room No:</span>
          {role === "member" ? agreementInfo?.apartmentNo : "None"}
        </p>

        {role === "admin" && (
          <>
            <p>
              <span className="font-semibold">Total Rooms:</span> {stats.rooms}
            </p>
            <p>
              <span className="font-semibold">Available Rooms (%):</span>
              {stats.available}%
            </p>
            <p>
              <span className="font-semibold">Unavailable Rooms (%):</span>
              {stats.unavailable}%
            </p>
            <p>
              <span className="font-semibold">Total Users:</span>
              {stats.users}
            </p>
            <p>
              <span className="font-semibold">Total Members:</span>
              {stats.members}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
