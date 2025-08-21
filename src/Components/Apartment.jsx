import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaSearch, FaRegMoneyBillAlt } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { GiStairs, GiModernCity } from "react-icons/gi";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router";

const Apartment = () => {
  const { user } = useContext(AuthContext);
  const [apartInfo, setApartInfo] = useState([]);
  const [searchRent, setSearchRent] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    axios
      .get("http://localhost:3000/apartinfo")
      .then((res) => setApartInfo(res.data))
      .catch((error) => console.error(error));
  }, []);

  // Filter by rent (search)
  let filteredApartments = apartInfo.filter((apt) =>
    searchRent ? apt.rent <= parseInt(searchRent) : true
  );

  // Sort by rent (ascending or descending)
  if (sortOrder === "asc") {
    filteredApartments = [...filteredApartments].sort(
      (a, b) => a.rent - b.rent
    );
  } else if (sortOrder === "desc") {
    filteredApartments = [...filteredApartments].sort(
      (a, b) => b.rent - a.rent
    );
  }

  // Pagination
  const numberOfPages = Math.ceil(filteredApartments.length / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const displayedApartments = filteredApartments.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handleAgreement = (apartment) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to apply for an agreement.",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }
    const agreementData = {
      userName: user.displayName,
      userEmail: user.email,
      floor: apartment.floor,
      block: apartment.block,
      apartmentNo: apartment.apartmentNo,
      rent: apartment.rent,
      requested_date: new Date().toISOString(),
      room_status: "unavailable",
      status: "pending",
    };
    console.log(agreementData);
    axios
      .post("http://localhost:3000/agreement", agreementData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then(() =>
        Swal.fire(
          "Success",
          "We have received your agreement request!",
          "success"
        )
      )
      .catch((error) => console.log(error));
  };

  return (
    <div className="pt-10 bg-base-200">
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-6 px-4">
        <input
          type="number"
          value={searchRent}
          onChange={(e) => setSearchRent(e.target.value)}
          placeholder="Search apartment by rent..."
          className="input input-bordered w-full max-w-md"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setSortOrder("asc")}
            className={`btn ${
              sortOrder === "asc"
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded transition-all py-2 px-4 text-white"
                : "btn-outline"
            }`}
          >
            Price Asc
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            className={`btn ${
              sortOrder === "desc"
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded transition-all py-2 px-4 text-white"
                : "btn-outline"
            }`}
          >
            Price Desc
          </button>
        </div>
      </div>

      {/* Apartment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-6 px-6 py-4">
        {displayedApartments.map((apt, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 bg-white h-full flex flex-col"
          >
            <img
              src={apt.image}
              alt="Apartment"
              className="w-full h-52 object-cover rounded-t-lg"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-1 text-green-700">
                <MdApartment /> Apt No: {apt.apartmentNo}
              </h2>
              <p className="flex items-center gap-2 text-gray-600">
                <GiStairs /> Floor: {apt.floor}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <GiModernCity /> Block: {apt.block}
              </p>
              <p className="flex items-center gap-2 text-gray-700 font-semibold mt-2">
                <FaRegMoneyBillAlt /> Rent:{" "}
                <span className="text-green-700 font-bold">৳{apt.rent}</span>
              </p>
              <div className="flex pt-4 justify-between items-center">
                <button
                  onClick={() => handleAgreement(apt)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
                >
              Agreement
                </button>
                <NavLink to={`/details/${apt._id}`}>
                  <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-5 rounded transition-all duration-300 ">
                    See more
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="text-center space-x-2 my-6">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn px-4 py-2 text-white font-semibold ${
              currentPage === page
                ? "bg-amber-500"
                : "bg-gray-400 hover:bg-gray-600"
            } rounded`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Apartment;
