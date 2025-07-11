import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Apartment = () => {
  const { user } = useContext(AuthContext);
  const [apartInfo, setApartInfo] = useState([]);
  const [searchRent, setSearchRent] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const filteredApartments = apartInfo.filter((apt) =>
  searchRent ? apt.rent <= parseInt(searchRent) : true
);

  const numberOfPages = Math.ceil(apartInfo.length / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  const dataToDisplay = filteredApartments;

const displayedApartments = dataToDisplay.slice(
  currentPage * itemsPerPage,
  currentPage * itemsPerPage + itemsPerPage
);

  useEffect(() => {
    axios
      .get("http://localhost:3000/apartinfo")
      .then((res) => {
        setApartInfo(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
      <div className="flex justify-center">
        <input
          type="number"
          name=""
          value={searchRent}
          onChange={(e) => setSearchRent(e.target.value)}
          placeholder="Search apartment by rent..."
          className="input input-bordered w-full max-w-md"
        />
        <button type="submit" className="btn p-5 text-white bg-green-600">
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-6 px-6 py-10">
        {displayedApartments.map((apt, index) => (
          <div
            key={index}
            className="border p-4 rounded-xl shadow hover:shadow-lg transition-all duration-300"
          >
            <img
              src={apt.image}
              alt="Apartment"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2">
              Apartment No: {apt.apartmentNo}
            </h2>
            <p>Floor: {apt.floor}</p>
            <p>Block: {apt.block}</p>
            <p>Rent: ৳{apt.rent}</p>
            <button
              onClick={() => handleAgreement(apt)}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Apply for Agreement
            </button>
          </div>
        ))}
      </div>
      <div className="text-center space-x-2">
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={currentPage == page ? "btn bg-amber-400" : "btn"}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Apartment;
