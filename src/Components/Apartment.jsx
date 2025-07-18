import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaSearch, FaBuilding, FaRegMoneyBillAlt } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { GiStairs, GiModernCity } from "react-icons/gi";

const Apartment = () => {
  const { user } = useContext(AuthContext);
  const [apartInfo, setApartInfo] = useState([]);
  const [searchRent, setSearchRent] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    axios
      .get("http://localhost:3000/apartinfo")
      .then((res) => setApartInfo(res.data))
      .catch((error) => console.error(error));
  }, []);

  const filteredApartments = apartInfo.filter((apt) =>
    searchRent ? apt.rent <= parseInt(searchRent) : true
  );

  const numberOfPages = Math.ceil(filteredApartments.length / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const displayedApartments = filteredApartments.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handleAgreement = (apartment) => {
    const agreementData = {
      userName: user.displayName,
      userEmail: user.email,
      floor: apartment.floor,
      block: apartment.block,
      apartmentNo: apartment.apartmentNo,
      rent: apartment.rent,
      status: "pending",
    };

    axios
      .post("http://localhost:3000/agreement", agreementData)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="mt-10">
      {/* Search Box */}
      <div className="flex justify-center items-center gap-2 mb-6 px-4">
        <input
          type="number"
          value={searchRent}
          onChange={(e) => setSearchRent(e.target.value)}
          placeholder="Search apartment by rent..."
          className="input input-bordered w-full max-w-md"
        />
        <button className="btn bg-green-600 hover:bg-green-700 text-white">
          <FaSearch className="mr-1" /> Search
        </button>
      </div>

      {/* Apartment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-6 px-6 py-4">
        {displayedApartments.map((apt, index) => (
          <div
            key={index}
            className="border border-gray-200 p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 bg-white"
          >
            <img
              src={apt.image}
              alt="Apartment"
              className="w-full h-52 object-cover rounded-lg mb-4"
            />
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
              <FaRegMoneyBillAlt /> Rent: <span className="text-green-700 font-bold">৳{apt.rent}</span>
            </p>
            <button
              onClick={() => handleAgreement(apt)}
              className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
            >
              Apply for Agreement
            </button>
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
              currentPage === page ? "bg-amber-500" : "bg-gray-400 hover:bg-gray-600"
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
