import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSpeaker, FiCalendar } from "react-icons/fi";

const Announcement = () => {
  const [announce, setAnnounce] = useState([]);

  useEffect(() => {
    axios
      .get("https://building-management-server-omega-drab.vercel.app/announce")
      .then((res) => setAnnounce(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="py-10 px-4 w-11/12 mx-auto">
      <h2 className="font-bold mb-6 text-center flex items-center justify-center gap-2 pt-26 text-4xl text-gray-600 italic">
        <FiSpeaker className="text-blue-700 text-4xl" /> Latest Announcements
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announce.length > 0 ? (
          announce.map((ann) => (
            <div
              key={ann._id}
              className="bg-white shadow-lg rounded-xl p-6 border border-blue-100 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <FiSpeaker className="text-blue-500" />
                {ann.title}
              </h3>
              <p className="text-gray-700 mb-4">{ann.announcement}</p>
              <p className="text-sm text-gray-500 text-right flex items-center justify-end gap-1">
                <FiCalendar />
                {ann.date
                  ? new Date(ann.date).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No announcements yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Announcement;
