import React, { use, useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import {
  FaUserCog,
  FaUsers,
  FaBullhorn,
  FaFileContract,
  FaTags,
} from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const Dashboard = () => {
  const { user } = use(AuthContext);
  const [role, setRole] = useState("");
  useEffect(() => {
  if (user?.email) {
    fetch(`http://localhost:3000/users/role/${user.email}`)
      .then((res) => res.json())
      .then((data) => setRole(data.role))
      .catch((error) => console.log(error));
  }
}, [user?.email]);
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        defaultChecked
      />
      <div className="drawer-content p-4">
        <Outlet />
      </div>
      <div className="drawer-side">
        <ul className="menu p-4 w-full h-full space-y-2 bg-base-200 font-medium">
          {role === "user" && (
            <>
              <li>
                <Link to="/dashboard/myprofile">My Profile</Link>
              </li>
              <li>
                <Link to="/dashboard/announcements">Announcements</Link>
              </li>
            </>
          )}
          {role === "member" && (
            <>
              <li>
                <Link to="/dashboard/myprofile">My Profile</Link>
              </li>
              <li>
                <Link to="/dashboard/make-payment">Make Payment</Link>
              </li>
              <li>
                <Link to="/dashboard/payment-history">Payment History</Link>
              </li>
              <li>
                <Link to="/dashboard/announcements">Announcements</Link>
              </li>
            </>
          )}
          {role === "admin" && (
            <>
              <li>
                <Link to="/dashboard/admin-profile">Admin Profile</Link>
              </li>
              <li>
                <Link to="/dashboard/managemembers">Manage Members</Link>
              </li>
              <li>
                <Link to="/dashboard/make-announcement">Make Announcement</Link>
              </li>
              <li>
                <Link to="/dashboard/agreement-requests">
                  Agreement Requests
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-coupons">Manage Coupons</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
