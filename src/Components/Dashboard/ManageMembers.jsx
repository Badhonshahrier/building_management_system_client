import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { User, Trash2 } from "lucide-react";

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/users"
      );
      const membersOnly = res.data.filter((member) => member.role === "member");
      setMembers(membersOnly);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleRemoveRole = async (id) => {
    try {
      setProcessingId(id);
      const res = await axios.patch(
        `http://localhost:3000/users/role-user/${id}`,
        {},
        { headers: { authorization: `Bearer ${user.accessToken}` } }
      );
      if (res.data.modifiedCount > 0) {
        fetchMembers();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading)
    return <p className="p-6 text-center text-gray-500">Loading members...</p>;

  return (
    <div className="w-full p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Members</h2>
      {members.length === 0 ? (
        <p className="text-gray-600">No members found.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-x-auto md:overflow-x-visible max-h-[600px]">
       
          <table className="w-full  min-w-[600px]">
         
            <thead className="bg-gray-300 rounded-t-4xl">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider flex items-center gap-1">
                  <User className="w-4 h-4" /> Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {members.map((member, idx) => (
                <tr
                  key={member._id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-700">{idx + 1}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{member.email}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleRemoveRole(member._id)}
                      disabled={processingId === member._id}
                      className="flex items-center justify-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg"
                    >
                      {processingId === member._id ? (
                        <span className="animate-spin w-4 h-4 border border-white border-t-transparent rounded-full" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
