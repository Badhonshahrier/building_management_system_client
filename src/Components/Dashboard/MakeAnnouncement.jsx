import axios from "axios";
import React, { useEffect, useState } from "react";

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
        alert("Announcement posted!");
        form.reset();
      }
    })
    .catch(err => console.error(err));
  };
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Make Announcement</h2>
      <form onSubmit={handleAnnouncement} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            required
          >

          </textarea>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Post Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
