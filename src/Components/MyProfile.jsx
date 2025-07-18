// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Provider/AuthProvider";
// import axios from "axios";

// const MyProfile = () => {
//   const { user } = useContext(AuthContext);
//   const [agreementInfo, setAgreementInfo] = useState(null);

//   useEffect(() => {
//     if (user?.email) {
//       axios
//         .get("http://localhost:3000/agreements")
//         .then((res) => {
//           const checkedAgreement = res.data.find(
//             (req) =>req.status === "checked"
//           );
//           setAgreementInfo(checkedAgreement);
//         })
//         .catch((error) => console.log(error));
//     }
//   }, [user?.email]);

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

//       <div className="flex flex-col items-center">
//         <img
//           src={user?.photoURL}
//           alt="Profile"
//           className="w-24 h-24 rounded-full mb-4"
//         />
//         <h3 className="text-lg font-semibold">{user?.displayName}</h3>
//         <p className="text-gray-600">{user?.email}</p>
//       </div>

//       <div className="mt-6 space-y-2">
//         <p>
//           <span className="font-semibold">Agreement Accept Date:</span>
//           {agreementInfo?.date
//             ? new Date(agreementInfo.date).toLocaleDateString()
//             : "None"}
//         </p>
//         <p>
//           <span className="font-semibold">Floor:</span>
//           {agreementInfo?.floor || "None"}
//         </p>
//         <p>
//           <span className="font-semibold">Block:</span>
//           {agreementInfo?.block || "None"}
//         </p>
//         <p>
//           <span className="font-semibold">Room No:</span>
//           {agreementInfo?.apartmentNo || "None"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;

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
      // Get Role
      axios
        .get(`http://localhost:3000/users/role/${user.email}`)
        .then((res) => setRole(res.data.role))
        .catch((err) => console.error(err));

      // If member, get agreement info
      axios
        .get("http://localhost:3000/agreements")
        .then((res) => {
          const found = res.data.find(
            (req) => req.userEmail === user.email && req.status === "checked"
          );
          setAgreementInfo(found);
        })
        .catch((err) => console.error(err));

      // If admin, fetch statistics
      axios
        .all([
          axios.get("http://localhost:3000/apartinfo"),
          axios.get("http://localhost:3000/users"),
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
      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h3 className="text-lg font-semibold">{user?.displayName}</h3>
        <p className="text-gray-600">{user?.email}</p>
        <p className="text-sm text-blue-500 mt-1 capitalize">
          Role: {role || "N/A"}
        </p>
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <p>
          <span className="font-semibold">Agreement Accept Date:</span>
          {role === "member" && agreementInfo?.date
            ? new Date(agreementInfo.date).toLocaleDateString()
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
