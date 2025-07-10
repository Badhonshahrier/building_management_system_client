import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Apartment = () => {
  const [apartInfo, setApartInfo] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/apartinfo')
      .then(res => {
        setApartInfo(res.data)
      })
      .catch(error => {
        console.error("Apartment data fetch error:", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-10">
      {apartInfo.map((apt, index) => (
        <div key={index} className="border p-4 rounded-xl shadow hover:shadow-lg transition-all duration-300">
          <img src={apt.image} alt="Apartment" className="w-full h-48 object-cover rounded-lg mb-4" />
          <h2 className="text-xl font-bold mb-2">Apartment No: {apt.apartmentNo}</h2>
          <p>Floor: {apt.floor}</p>
          <p>Block: {apt.block}</p>
          <p>Rent: ৳{apt.rent}</p>
          <button className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
            Apply for Agreement
          </button>
        </div>
      ))}
    </div>
  );
};

export default Apartment;
