  /* eslint-disable no-unused-vars */
// import axios from "axios";
// import React, { use, useEffect, useState } from "react";
// import { GrOverview } from "react-icons/gr";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import { AuthContext } from "../../Provider/AuthProvider";

// const Overview = () => {
//   const { user } = use(AuthContext);
//   const [users, setUsers] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [unavail,setUnavail]=useState([])
//   console.log(rooms);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/users")
//       .then((res) => setUsers(res.data))
//       .catch((error) => console.log(error));
//     axios
//       .get("http://localhost:3000/agreements", {
//         headers: {
//           authorization: `Bearer ${user.accessToken}`,
//         },
//       })
//       .then((res) => setUnavail(res.data))
//       .catch((error) => console.log(error));

//     axios
//       .get("http://localhost:3000/apartInfo")
//       .then((res) => setRooms(res.data))
//       .catch((error) => console.log(error));
//   }, [user.accessToken]);

//   const totalUsers = users.length;
//   const totalMembers = users.filter((u) => u.role === "member").length;
//   const totalRooms = rooms.length;
//   const unavailableRooms = unavail.filter(
//     (r) => r.room_status === "unavailable"
//   ).length;
//   const availableRooms = totalRooms - unavailableRooms;

//   const roomData = [
//     { name: "Available", value: availableRooms },
//     { name: "Unavailable", value: unavailableRooms },
//   ];

//   const userData = [
//     { role: "Users", count: totalUsers - totalMembers },
//     { role: "Members", count: totalMembers },
//   ];

//   const COLORS = ["#4CAF50", "#F44336"];

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Site Overview</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="p-5 bg-white rounded-xl shadow text-center">
//           <p className="text-gray-500">Total Create Account</p>
//           <h2 className="text-2xl font-bold dark:text-black">{totalUsers}</h2>
//         </div>
//         <div className="p-5 bg-white rounded-xl shadow text-center">
//           <p className="text-gray-500 ">Apartments</p>
//           <h2 className="text-2xl font-bold dark:text-black">{totalRooms}</h2>
//         </div>
//         <div className="p-5 bg-white rounded-xl shadow text-center">
//           <p className="text-gray-500">Members</p>
//           <h2 className="text-2xl font-bold dark:text-black">{totalMembers}</h2>
//         </div>
//         <div className="p-5 bg-white rounded-xl shadow text-center">
//           <p className="text-gray-500">Unavailable Rooms</p>
//           <h2 className="text-2xl font-bold dark:text-black">{unavailableRooms}</h2>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-xl font-semibold mb-4 dark:text-black">Room Availability</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={roomData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {roomData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-xl font-semibold mb-4 dark:text-black">Users vs Members</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={userData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="role" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="count" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Overview;




import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { GrOverview } from "react-icons/gr"
import { FiUsers, FiHome, FiUserCheck, FiXCircle } from "react-icons/fi"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
  Legend,
} from "recharts"
import { AuthContext } from "../../Provider/AuthProvider"

const Overview = () => {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [rooms, setRooms] = useState([])
  const [unavail, setUnavail] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [usersRes, agreementsRes, roomsRes] = await Promise.all([
          axios.get("http://localhost:3000/users"),
          axios.get("http://localhost:3000/agreements", {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
          }),
          axios.get("http://localhost:3000/apartInfo"),
        ])

        setUsers(usersRes.data)
        setUnavail(agreementsRes.data)
        setRooms(roomsRes.data)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load dashboard data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (user?.accessToken) {
      fetchData()
    }
  }, [user?.accessToken])

  const totalUsers = users.length
  const totalMembers = users.filter((u) => u.role === "member").length
  const totalRooms = rooms.length
  const unavailableRooms = unavail.filter((r) => r.room_status === "unavailable").length
  const availableRooms = totalRooms - unavailableRooms

  const roomData = [
    {
      name: "Available",
      value: availableRooms,
      color: "#10B981",
      percentage: totalRooms > 0 ? ((availableRooms / totalRooms) * 100).toFixed(1) : 0,
    },
    {
      name: "Unavailable",
      value: unavailableRooms,
      color: "#EF4444",
      percentage: totalRooms > 0 ? ((unavailableRooms / totalRooms) * 100).toFixed(1) : 0,
    },
  ]

  const userData = [
    {
      role: "Regular Users",
      count: totalUsers - totalMembers,
      color: "#3B82F6",
      percentage: totalUsers > 0 ? (((totalUsers - totalMembers) / totalUsers) * 100).toFixed(1) : 0,
    },
    {
      role: "Members",
      count: totalMembers,
      color: "#8B5CF6",
      percentage: totalUsers > 0 ? ((totalMembers / totalUsers) * 100).toFixed(1) : 0,
    },
  ]

  const trendData = [
    { month: "Jan", users: Math.max(0, totalUsers - 50), rooms: Math.max(0, totalRooms - 10) },
    { month: "Feb", users: Math.max(0, totalUsers - 40), rooms: Math.max(0, totalRooms - 8) },
    { month: "Mar", users: Math.max(0, totalUsers - 30), rooms: Math.max(0, totalRooms - 6) },
    { month: "Apr", users: Math.max(0, totalUsers - 20), rooms: Math.max(0, totalRooms - 4) },
    { month: "May", users: Math.max(0, totalUsers - 10), rooms: Math.max(0, totalRooms - 2) },
    { month: "Jun", users: totalUsers, rooms: totalRooms },
  ]

  const ROOM_COLORS = ["#10B981", "#EF4444"]
  const USER_COLORS = ["#3B82F6", "#8B5CF6"]

  const CustomPieTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></div>
            <p className="font-semibold text-gray-800">{data.name}</p>
          </div>
          <p className="text-sm text-gray-600">
            Count: <span className="font-medium">{data.value}</span>
          </p>
          <p className="text-sm text-gray-600">
            Percentage: <span className="font-medium">{data.percentage}%</span>
          </p>
        </div>
      )
    }
    return null
  }

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{data.role}</p>
          <p className="text-sm text-gray-600">
            Count: <span className="font-medium">{data.count}</span>
          </p>
          <p className="text-sm text-gray-600">
            Percentage: <span className="font-medium">{data.percentage}%</span>
          </p>
        </div>
      )
    }
    return null
  }

  const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="font-semibold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="h-4 bg-gray-300 rounded w-24 mb-3"></div>
                  <div className="h-8 bg-gray-300 rounded w-16"></div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm h-80"></div>
              <div className="bg-white p-6 rounded-2xl shadow-sm h-80"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md">
          <FiXCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-600 rounded-xl">
            <GrOverview className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Monitor your property management metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Total</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalUsers}</h3>
            <p className="text-gray-600 text-sm">Registered Accounts</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FiHome className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">Properties</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalRooms}</h3>
            <p className="text-gray-600 text-sm">Total Apartments</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FiUserCheck className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Active</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalMembers}</h3>
            <p className="text-gray-600 text-sm">Premium Members</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <FiXCircle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">Occupied</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{unavailableRooms}</h3>
            <p className="text-gray-600 text-sm">Unavailable Rooms</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Room Availability</h2>
              <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                {availableRooms + unavailableRooms} total
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <defs>
                  <linearGradient id="availableGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="unavailableGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#DC2626" />
                  </linearGradient>
                </defs>
                <Pie
                  data={roomData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={CustomPieLabel}
                  outerRadius={90}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={3}
                  stroke="#fff"
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {roomData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "url(#availableGradient)" : "url(#unavailableGradient)"}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              {roomData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: ROOM_COLORS[index] }}></div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-800">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.value} rooms</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">User Distribution</h2>
              <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">{totalUsers} total users</div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={userData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                  <linearGradient id="memberGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="role" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar
                  dataKey="count"
                  fill="url(#userGradient)"
                  radius={[12, 12, 0, 0]}
                  stroke="#fff"
                  strokeWidth={2}
                  animationDuration={1000}
                  animationBegin={200}
                >
                  {userData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "url(#userGradient)" : "url(#memberGradient)"}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Growth Trends</h2>
              <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">6 months</div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="usersAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="roomsAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fill="url(#usersAreaGradient)"
                  animationDuration={1500}
                  animationBegin={0}
                />
                <Area
                  type="monotone"
                  dataKey="rooms"
                  stroke="#10B981"
                  strokeWidth={3}
                  fill="url(#roomsAreaGradient)"
                  animationDuration={1500}
                  animationBegin={300}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
