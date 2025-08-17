import React from "react";
import { useLoaderData } from "react-router";

const ApartmentDetails = () => {
  const data = useLoaderData();
  console.log(data);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading apartment details...</p>
      </div>
    );
  }

  const {
    apartmentNo,
    floor,
    block,
    rent,
    description,
    size,
    rooms,
    image,
    status,
  } = data;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Image Section */}
      <div className="rounded-xl overflow-hidden shadow-lg mb-6">
        <img
          src={image || "https://via.placeholder.com/800x400"}
          alt={`Apartment ${apartmentNo}`}
          className="w-full h-80 object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-xl shadow p-6 space-y-6">


        {/* Grid Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm text-center">
            <p className="text-gray-500">Floor</p>
            <h2 className="text-xl font-semibold">{floor}</h2>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm text-center">
            <p className="text-gray-500">Block</p>
            <h2 className="text-xl font-semibold">{block}</h2>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm text-center">
            <p className="text-gray-500">Rent</p>
            <h2 className="text-xl font-semibold text-green-600">
              ${rent}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetails;
