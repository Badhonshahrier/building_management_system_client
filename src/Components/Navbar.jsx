import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import NavImg from "../assets/Screenshot_35-removebg-preview.png";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You have been successfully Logout",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold text-blue-600 underline" : "font-bold"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/apartment"
          className={({ isActive }) =>
            isActive ? "font-bold text-blue-600 underline text-md" : "text-md font-bold"
          }
        >
          Apartment
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-gray-300 sticky top-0 z-50 w-full">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <img className="h-13 w-13 object-cover" src={NavImg} alt="" />
          <span className="ml-1 text-xl italic font-bold">BuildingManager</span>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar cursor-pointer">
                <div className="w-10 rounded-full ring ring-info ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL} alt="User" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="text-center font-semibold">
                  {user.displayName}
                </li>
                <li>
                  <Link to="/dashboard/myprofile">
                    <button
                      className="font-bold mb-6"
                      onClick={() => {
                        const drawerToggle =
                          document.getElementById("my-drawer");
                        if (drawerToggle) {
                          drawerToggle.checked = true;
                        }
                      }}
                    >
                      Dashboard
                    </button>
                  </Link>
                </li>
                <li>
                  <button className="btn bg-green-400" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 text-white text-lg px-10 from-green-500 to-emerald-600 font-bold rounded-xl">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
