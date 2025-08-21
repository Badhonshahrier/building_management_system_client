import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
  const handleAnnouncement = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const announcement = form.description.value;
    console.log({ title, announcement });

    const newAnnouncement = { title, announcement, date: new Date() }

    axios.post("http://localhost:3000/announcement",newAnnouncement)
    .then(res => {
      if (res.data.insertedId) {
        Swal.fire("Successfully announcement posted");
        form.reset();
      }
    })
    .catch(err => console.error(err));
  };
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow my-10">
      <h2 className="text-2xl font-bold mb-4 dark:text-black">Make Announcement</h2>
      <form onSubmit={handleAnnouncement} className="space-y-4">
        <div>
          <label className="block font-medium dark:text-black">Title</label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full "
            required
          />
        </div>
        <div>
          <label className="block font-medium dark:text-black">Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            required
          >

          </textarea>
        </div>
        <button type="submit" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 rounded-lg w-full">
          Post Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
