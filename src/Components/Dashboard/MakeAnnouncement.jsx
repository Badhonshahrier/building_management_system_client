import React from 'react';

const MakeAnnouncement = () => {
    return (
         <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Make Announcement</h2>
      <form className="space-y-4">
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
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Post Announcement
        </button>
      </form>
    </div>
    );
};

export default MakeAnnouncement;