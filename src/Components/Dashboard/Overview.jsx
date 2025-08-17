import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { GrOverview } from "react-icons/gr";
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
  Legend,
} from "recharts";
import { AuthContext } from "../../Provider/AuthProvider";

const Overview = () => {
  const { user } = use(AuthContext);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [unavail,setUnavail]=useState([])
  console.log(rooms);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:3000/agreements", {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => setUnavail(res.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:3000/apartInfo")
      .then((res) => setRooms(res.data))
      .catch((error) => console.log(error));
  }, [user.accessToken]);

  const totalUsers = users.length;
  const totalMembers = users.filter((u) => u.role === "member").length;
  const totalRooms = rooms.length;
  const unavailableRooms = unavail.filter(
    (r) => r.room_status === "unavailable"
  ).length;
  const availableRooms = totalRooms - unavailableRooms;

  const roomData = [
    { name: "Available", value: availableRooms },
    { name: "Unavailable", value: unavailableRooms },
  ];

  const userData = [
    { role: "Users", count: totalUsers - totalMembers },
    { role: "Members", count: totalMembers },
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Site Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-5 bg-white rounded-xl shadow text-center">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold">{totalUsers}</h2>
        </div>
        <div className="p-5 bg-white rounded-xl shadow text-center">
          <p className="text-gray-500">Apartments</p>
          <h2 className="text-2xl font-bold">{totalRooms}</h2>
        </div>
        <div className="p-5 bg-white rounded-xl shadow text-center">
          <p className="text-gray-500">Members</p>
          <h2 className="text-2xl font-bold">{totalMembers}</h2>
        </div>
        <div className="p-5 bg-white rounded-xl shadow text-center">
          <p className="text-gray-500">Unavailable Rooms</p>
          <h2 className="text-2xl font-bold">{unavailableRooms}</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Room Availability</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roomData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {roomData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Users vs Members</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="role" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
