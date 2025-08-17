import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const events = [
  {
    id: 1,
    title: "Annual Tenant Meeting",
    date: "25th Aug 2025",
    description: "Discussion about building maintenance & future plans.",
  },
  {
    id: 2,
    title: "Fire Drill Reminder",
    date: "1st Sep 2025",
    description: "Mandatory safety drill for all residents at 10 AM.",
  },
  {
    id: 3,
    title: "Community Potluck Dinner",
    date: "15th Sep 2025",
    description: "Bring your favorite dish and enjoy an evening with neighbors.",
  },
  {
    id: 4,
    title: "Gym Maintenance Notice",
    date: "20th Sep 2025",
    description: "Gym will be closed for deep cleaning and equipment check.",
  },
];

const CommunityEvents = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-11/12 md:w-10/12 mx-auto py-10">
      <h2 className="text-4xl font-bold text-center text-gray-600 mb-6 italic">
        Community Events 
      </h2>
      <p className="text-center w-4/6 mx-auto  pb-10 text-gray-800">“Stay connected with your community! Here you’ll find all important building updates, events, and notices — from annual meetings, fire drills, and workshops to fun gatherings like potluck dinners.</p>

      <div className="relative bg-base-100 rounded-lg shadow-md p-8 flex flex-col items-center text-center">
        {/* Event Content */}
        <h3 className="text-2xl font-semibold text-indigo-700">
          {events[current].title}
        </h3>
        <p className="text-gray-500 text-sm mt-2">{events[current].date}</p>
        <p className="mt-4 text-gray-600">{events[current].description}</p>

        {/* Navigation Arrows */}
        <div className="flex justify-between w-full absolute top-1/2 transform -translate-y-1/2 px-4">
          <button
            onClick={prevSlide}
            className="bg-indigo-500 text-white p-2 rounded-full shadow-md hover:bg-indigo-600"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="bg-indigo-500 text-white p-2 rounded-full shadow-md hover:bg-indigo-600"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex gap-2 mt-6">
          {events.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                current === index ? "bg-indigo-600" : "bg-gray-300"
              }`}
              onClick={() => setCurrent(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityEvents;
