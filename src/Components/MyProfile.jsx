// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Provider/AuthProvider";
// import axios from "axios";
// import Overview from "./Dashboard/Overview";

// const MyProfile = () => {
//   const { user } = useContext(AuthContext);

//   const [role, setRole] = useState(null);
//   const [agreementInfo, setAgreementInfo] = useState(null);
//   const [stats, setStats] = useState({
//     rooms: 0,
//     available: 0,
//     unavailable: 0,
//     users: 0,
//     members: 0,
//   });

//   useEffect(() => {
//     if (user?.email) {
//       axios
//         .get(`https://building-management-server-omega-drab.vercel.app/users/role/${user.email}`, {
//           headers: {
//             Authorization: `Bearer ${user.accessToken}`,
//           },
//         })
//         .then((res) => setRole(res.data.role))
//         .catch((err) => console.error(err));
//       axios
//         .get("https://building-management-server-omega-drab.vercel.app/agreements", {
//           headers: {
//             Authorization: `Bearer ${user.accessToken}`,
//           },
//         })
//         .then((res) => {
//           const found = res.data.find(
//             (req) => req.userEmail === user.email && req.status === "checked"
//           );
//           setAgreementInfo(found);
//         })
//         .catch((err) => console.error(err));
//       axios
//         .all([
//           axios.get("https://building-management-server-omega-drab.vercel.app/apartinfo"),
//           axios.get("https://building-management-server-omega-drab.vercel.app/users"),
//         ])
//         .then(
//           axios.spread((roomsRes, usersRes) => {
//             const total = roomsRes.data.length;
//             const unavailable = roomsRes.data.filter(
//               (room) => room.room_status === "unavailable"
//             ).length;
//             const available = total - unavailable;

//             const users = usersRes.data;
//             const memberCount = users.filter((u) => u.role === "member").length;
//             const userCount = users.filter((u) => u.role === "user").length;

//             setStats({
//               rooms: total,
//               available: Math.round((available / total) * 100) || 0,
//               unavailable: Math.round((unavailable / total) * 100) || 0,
//               users: userCount,
//               members: memberCount,
//             });
//           })
//         )
//         .catch((err) => console.error(err));
//     }
//   }, [user?.email,user.accessToken]);

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <div className="flex flex-col items-center">
//         <img
//           src={user?.photoURL}
//           alt="Profile"
//           className="w-24 h-24 object-cover rounded-full mb-4"
//         />
//         <h3 className="text-lg font-semibold dark:text-black">Name : {user?.displayName}</h3>
//         <p className="text-gray-600">Email : {user?.email}</p>
//         <p className="text-sm text-blue-500 mt-1 font-bold">
//           Role : {role || "N/A"}
//         </p>
//       </div>

//       <div className="mt-6 space-y-2 text-sm">
//         {/* <p>
//           <span className="font-semibold">Agreement Accept Date:</span>
//           {role === "member" && agreementInfo?.date
//             ? new Date(agreementInfo.requested_date).toISOString()
//             : "None"}
//         </p> */}
//         <p>
//           <span className="font-semibold dark:text-black">Floor : </span>
//           {role === "member" ? agreementInfo?.floor : "None"}
//         </p>
//         <p>
//           <span className="font-semibold dark:text-black">Block : </span>
//           {role === "member" ? agreementInfo?.block : "None"}
//         </p>
//         <p>
//           <span className="font-semibold dark:text-black">Room No : </span>
//           {role === "member" ? agreementInfo?.apartmentNo : "None"}
//         </p>

//         {role === "admin" && (
//           <>
//             <p>
//               <span className="font-semibold dark:text-black">Total Rooms :</span> {stats.rooms}
//             </p>
//             <p>
//               <span className="font-semibold dark:text-black">Available Rooms (%):</span>
//               {stats.available}%
//             </p>
//             <p>
//               <span className="font-semibold dark:text-black">Unavailable Rooms (%):</span>
//               {stats.unavailable}%
//             </p>
//             <p>
//               <span className="font-semibold dark:text-black">Total Users:</span>
//               {stats.users}
//             </p>
//             <p>
//               <span className="font-semibold dark:text-black">Total Members:</span>
//               {stats.members}
//             </p>
//           </>
//         )}
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
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
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user?.email, user.accessToken]);

  

  const getRoleBadgeColor = (userRole) => {
    switch (userRole) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "member":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-4 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your personal information and account details
          </p>
        </div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="text-center">
                {/* Profile Image */}
                <div className="relative inline-block mb-6">
                 
                  <img
                    src={
                      user?.photoURL ||
                      "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400"
                    }
                    alt="Profile"
                    className="relative w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
                  />
                  <div
                    className={`absolute bottom-2 right-2 w-8 h-8 rounded-full border-3 border-white shadow-lg ${
                      role === "admin"
                        ? "bg-purple-500"
                        : role === "member"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    } flex items-center justify-center`}
                  >
                    {role === "admin" && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {role === "member" && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {role === "user" && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Name and Email */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {user?.displayName || "User Name"}
                </h2>

                <p className="text-gray-600 mb-4 break-all">{user?.email}</p>

                {/* Role Badge */}
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getRoleBadgeColor(
                    role
                  )}`}
                >
                  <span className="w-2 h-2 bg-current rounded-full mr-2 opacity-75"></span>
                  {role
                    ? role.charAt(0).toUpperCase() + role.slice(1)
                    : "Loading..."}
                </div>

                {/* Join Date */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">Member Since</div>
                  <div className="text-gray-700 font-medium">
                    {user?.metadata?.creationTime
                      ? new Date(user.metadata.creationTime).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "Recently joined"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Full Name
                  </label>
                  <div className="text-lg font-semibold text-gray-900">
                    {user?.displayName || "Not provided"}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Email Address
                  </label>
                  <div className="text-lg font-semibold text-gray-900 break-all">
                    {user?.email}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 break-all">
                    
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Account Type
                  </label>
                  <div className="text-lg font-semibold text-gray-900">
                    {role
                      ? role.charAt(0).toUpperCase() + role.slice(1)
                      : "Loading..."}
                  </div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <p className="text-lg font-semibold text-gray-900">+88012345678</p>
                  <div className="text-lg font-semibold text-gray-900">
                   <h3>Rangpur</h3>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Account Status
                  </label>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-lg font-semibold text-green-600">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Residence Information - Only for Members */}
            {role === "member" && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Residence Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {agreementInfo?.floor || "N/A"}
                      </div>
                      <div className="text-sm font-medium text-blue-700 uppercase tracking-wide">
                        Floor
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {agreementInfo?.block || "N/A"}
                      </div>
                      <div className="text-sm font-medium text-purple-700 uppercase tracking-wide">
                        Block
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {agreementInfo?.apartmentNo || "N/A"}
                      </div>
                      <div className="text-sm font-medium text-green-700 uppercase tracking-wide">
                        Apartment
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agreement Date */}
                {agreementInfo?.requested_date && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                          Agreement Date
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          {new Date(
                            agreementInfo.requested_date
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                      <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Confirmed
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;





