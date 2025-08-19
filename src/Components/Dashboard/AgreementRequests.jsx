// import axios from "axios";
// import React, { use, useEffect, useState } from "react";
// import { AuthContext } from "../../Provider/AuthProvider";

// const AgreementRequests = () => {
//   const { user } = use(AuthContext);
//   const [agreeReq, setAgreeReq] = useState([]);
//   useEffect(() => {
//     fetch("http://localhost:3000/agreements", {
//       headers: {
//         authorization: `Bearer ${user.accessToken}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setAgreeReq(data));
//   }, [user.accessToken]);

//   const handleAccept = (id) => {
//     axios
//       .patch(`http://localhost:3000/agreements/accept/${id}`,{}, {
//         headers: {
//           authorization: `Bearer ${user.accessToken}`,
//         },
//       })
//       .then((res) => {
//         const remaining = agreeReq.filter((item) => item._id !== id);
//         setAgreeReq(remaining);
//       })
//       .catch((error) => console.log(error));
//   };

//   const handleReject = (id) => {
//     axios
//       .patch(`http://localhost:3000/agreements/reject/${id}`,{}, {
//         headers: {
//           authorization: `Bearer ${user.accessToken}`,
//         },
//       })
//       .then((res) => {
//         const remaining = agreeReq.filter((item) => item._id !== id);
//         setAgreeReq(remaining);
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div className="p-6 overflow-x-auto">
//       <h2 className="text-2xl font-bold mb-4">Agreement Requests</h2>
//       <table className="table w-full border">
//         <thead className="bg-gray-200 text-gray-700">
//           <tr>
//             <th className="dark:bg-white">#</th>
//             <th className="dark:bg-white">User Name</th>
//             <th className="dark:bg-white">User Email</th>
//             <th className="dark:bg-white">Floor</th>
//             <th className="dark:bg-white">Block</th>
//             <th className="dark:bg-white">Room No</th>
//             <th className="dark:bg-white">Rent</th>
//             <th className="dark:bg-white">Request Date</th>
//             <th className="dark:bg-white">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {agreeReq.map((agree, index) => (
//             <tr key={agree._id} className="hover">
//               <td className="dark:bg-white text-black">{index + 1}</td>
//               <td className="dark:bg-white text-black">{agree.userName}</td>
//               <td className="dark:bg-white text-black">{agree.userEmail}</td>
//               <td className="dark:bg-white text-black">{agree.floor}</td>
//               <td className="dark:bg-white text-black">{agree.block}</td>
//               <td className="dark:bg-white text-black">{agree.apartmentNo}</td>
//               <td className="dark:bg-white text-black">৳{agree.rent}</td>
//               <td className="dark:bg-white text-black">{new Date(agree.requested_date).toLocaleDateString()}</td>
//               <td className="space-x-2 dark:bg-white">
//                 <button
//                   onClick={() => handleAccept(agree._id)}
//                   className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => handleReject(agree._id)}
//                   className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
//                 >
//                   Reject
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AgreementRequests;




import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Provider/AuthProvider"
import { User, Home, Calendar, DollarSign, CheckCircle, XCircle } from "lucide-react"

const AgreementRequests = () => {
  const { user } = useContext(AuthContext)
  const [agreeReq, setAgreeReq] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [processingId, setProcessingId] = useState(null)
  const [showConfirm, setShowConfirm] = useState(null)

  useEffect(() => {
    const fetchAgreements = async () => {
      if (!user.accessToken) {
        setError("Please log in to view agreement requests")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await fetch("http://localhost:3000/agreements", {
          headers: { authorization: `Bearer ${user.accessToken}` },
        })

        if (!response.ok) throw new Error("Failed to fetch agreements")

        const data = await response.json()
        setAgreeReq(data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAgreements()
  }, [user.accessToken])

  const refetchAgreements = async () => {
    if (!user.accessToken) return
    try {
      setLoading(true)
      const response = await fetch("http://localhost:3000/agreements", {
        headers: { authorization: `Bearer ${user.accessToken}` },
      })
      const data = await response.json()
      setAgreeReq(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (id, action) => {
    if (!user.accessToken) return
    try {
      setProcessingId(id)
      await axios.patch(
        `http://localhost:3000/agreements/${action}/${id}`,
        {},
        { headers: { authorization: `Bearer ${user.accessToken}` } }
      )
      setAgreeReq((prev) => prev.filter((item) => item._id !== id))
      setShowConfirm(null)
    } catch (err) {
      console.error(err)
      setError(`Failed to ${action} agreement.`)
    } finally {
      setProcessingId(null)
    }
  }

  const ConfirmDialog = ({ request, action, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 flex items-center justify-center mb-4">
            {action === "accept" ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : (
              <XCircle className="w-12 h-12 text-red-600" />
            )}
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {action === "accept" ? "Accept Agreement" : "Reject Agreement"}
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to {action} the agreement from{" "}
            <span className="font-medium">{request.userName}</span> for Room {request.apartmentNo}?
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-2 rounded-lg text-white ${
                action === "accept" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {action === "accept" ? "Accept" : "Reject"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  if (loading) return <div className="p-6 text-center text-gray-500">Loading agreements...</div>
  if (error)
    return (
      <div className="p-6 text-center text-red-600">
        <p>{error}</p>
        <button onClick={refetchAgreements} className="mt-2 px-4 py-2 bg-red-600 text-white rounded">
          Try Again
        </button>
      </div>
    )

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Agreement Requests</h2>

      {agreeReq.length === 0 ? (
        <p className="text-gray-600">No pending agreement requests.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-1"><User className="w-4 h-4" /> Tenant</div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-1"><Home className="w-4 h-4" /> Property</div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> Rent</div>
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Request Date</div>
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {agreeReq.map((agree) => (
                <tr key={agree._id} className="hover:bg-gray-100 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-gray-900 font-semibold">{agree.userName}</div>
                    <div className="text-gray-500 text-sm">{agree.userEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Floor {agree.floor}, Block {agree.block}, Room {agree.apartmentNo}
                  </td>
                  <td className="px-6 py-4 text-sm text-green-700 font-semibold">৳{agree.rent}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(agree.requested_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-2">
                    <button
                      onClick={() => setShowConfirm({ request: agree, action: "accept" })}
                      disabled={processingId === agree._id}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg"
                    >
                      {processingId === agree._id ? <span className="animate-spin w-3 h-3 border border-white border-t-transparent rounded-full" /> : <CheckCircle className="w-3 h-3" />}
                      Accept
                    </button>
                    <button
                      onClick={() => setShowConfirm({ request: agree, action: "reject" })}
                      disabled={processingId === agree._id}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg"
                    >
                      {processingId === agree._id ? <span className="animate-spin w-3 h-3 border border-white border-t-transparent rounded-full" /> : <XCircle className="w-3 h-3" />}
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showConfirm && (
        <ConfirmDialog
          request={showConfirm.request}
          action={showConfirm.action}
          onConfirm={() => handleAction(showConfirm.request._id, showConfirm.action)}
          onCancel={() => setShowConfirm(null)}
        />
      )}
    </div>
  )
}

export default AgreementRequests
