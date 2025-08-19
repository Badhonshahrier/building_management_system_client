import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { GrOverview } from "react-icons/gr";
import {
  FaUser,
  FaBullhorn,
  FaMoneyBill,
  FaHistory,
  FaUsers,
  FaPlus,
  FaFileContract,
  FaTicketAlt,
} from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("");
  useEffect(() => {
    if (user?.email) {
      fetch(`https://building-management-server-omega-drab.vercel.app/users/role/${user.email}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setRole(data.role))
        .catch((error) => console.log(error));
    }
  }, [user?.email, user.accessToken]);

  
  
  return (
    <div className="drawer bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 lg:drawer-open min-h-screen">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        defaultChecked
      />
      <div className="drawer-content p-4">
        <Outlet />
      </div>
      <div className="drawer-side  ml-50 md:ml-0 lg:ml-0 mt-16 md:mt-0 lg:mt-0">
        <ul className="menu  p-4 lg:w-full lg:h-full md:h-full md:ml-136 md:mt-16 lg:ml-0 lg:mt-0 space-y-2 bg-base-300 font-medium">
          {role === "user" && (
            <>
              
              <li>
                <NavLink
                  to="/dashboard/announcement"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-300 rounded px-3 py-2 flex items-center gap-2"
                      : "px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
                  }
                >
                  <FaBullhorn /> Announcements
                </NavLink>
              </li>
              
              <li>
                <NavLink to="/dashboard/overview" className={({ isActive }) =>
                    isActive
                      ? "bg-amber-300 rounded px-3 py-2 flex items-center gap-2"
                      : "px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
                  }><GrOverview /> Over-View</NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myprofile"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-300 rounded px-3 py-2 flex items-center gap-2"
                      : "px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
                  }
                >
                  <FaUser /> My Profile
                </NavLink>
              </li>
            </>
          )}

          {role === "member" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/myprofile"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-300 rounded px-3 py-2 flex items-center gap-2"
                      : "px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
                  }
                >
                  <FaUser /> My Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/makepayment"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-300 rounded px-3 py-2 flex items-center gap-2"
                      : "px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
                  }
                >
                  <FaMoneyBill /> Make Payment
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymenthistory"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-300 rounded px-3 py-2 flex items-center gap-2"
                      : "px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
                  }
                >
                  <FaHistory /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/announcement"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-300 rounded px-3 py-2 flex items-center gap-2"
                      : "px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
                  }
                >
                  <FaBullhorn /> Announcements
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/overview" className={({ isActive }) =>
                    isActive
                      ? "bg-amber-300 rounded px-3 py-2 flex items-center gap-2"
                      : "px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
                  }><GrOverview /> Over-View</NavLink>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
               <li>
                <NavLink to="/dashboard/overview" className={({ isActive }) =>
                    isActive
                      ? "bg-amber-300 rounded px-3 py-2 flex items-center gap-2"
                      : "px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
                  }><GrOverview /> Over-View</NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/managemembers"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-300 rounded px-3 py-2 flex items-center gap-2"
                      : "px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
                  }
                >
                  <FaUsers /> Manage Members
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/makeannouncement"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-300 rounded px-3 py-2 flex items-center gap-2"
                      : "px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
                  }
                >
                  <FaPlus /> Make Announcement
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/agreementrequests"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-300 rounded px-3 py-2 flex items-center gap-2"
                      : "px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
                  }
                >
                  <FaFileContract /> Agreement Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/managecoupons"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-300 rounded px-3 py-2 flex items-center gap-2"
                      : "px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
                  }
                >
                  <FaTicketAlt /> Manage Coupons
                </NavLink>
              </li>
            
              <li>
                <NavLink
                  to="/dashboard/myprofile"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-amber-300 rounded px-3 py-2 flex items-center gap-2"
                      : "px-3 py-2 flex items-center gap-2 hover:bg-gray-100 rounded"
                  }
                >
                  <FaUser /> Admin Profile
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
