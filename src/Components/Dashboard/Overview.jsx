import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const Overview = ({stats}) => {
    console.log(stats)
    
   return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-5 bg-white rounded-xl shadow text-center">
          <p className="text-gray-500">Users</p>
          <h2 className="text-2xl font-bold">{stats.users}</h2>
        </div>

        <div className="p-5 bg-white rounded-xl shadow text-center">
          <p className="text-gray-500">Apartments</p>
          <h2 className="text-2xl font-bold">{stats.rooms}</h2>
        </div>

        <div className="p-5 bg-white rounded-xl shadow text-center">
          <p className="text-gray-500">Members</p>
          <h2 className="text-2xl font-bold">{stats.members}</h2>
        </div>

        <div className="p-5 bg-white rounded-xl shadow text-center">
          <p className="text-gray-500">Unavailable Rooms (%)</p>
          <h2 className="text-2xl font-bold">{stats.unavailable}%</h2>
        </div>
      </div>
    </div>
  );
};

export default Overview;
