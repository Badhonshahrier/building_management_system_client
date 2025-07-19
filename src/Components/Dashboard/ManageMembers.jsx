import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const { user } = use(AuthContext);
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        const existingMember = res.data.filter(
          (member) => member.role === "member"
        );
        setMembers(existingMember);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleRemoveRole = (id) => {
    axios
      .patch(
        `http://localhost:3000/users/role-user/${id}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          axios
            .get(
              "http://localhost:3000/users"
            )
            .then((res) => {
              const membersOnly = res.data.filter((u) => u.role === "member");
              setMembers(membersOnly);
            });
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="overflow-x-auto w-full p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Members</h2>
      <table className="table w-full border">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th>#</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((user, index) => (
            <tr key={user._id} className="hover">
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => handleRemoveRole(user._id)}
                  className="btn btn-sm bg-red-500 hover:bg-red-700 text-white"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMembers;
