import React, { useEffect } from "react";
import { useState } from "react";

export default function AdminQueriesPage() {
    const [userQueries, setUserQueries] = useState([]);

    useEffect(() => {
        const fetchUserQueries = async () => {
            try {
              const res = await fetch("/api/admin/getqueries");
              const data = await res.json();
              setUserQueries(data);
            } catch (error) {
              console.log(error);
            }
          };
      
        fetchUserQueries();
    }, []);

    const handleUserQueryDelete = async (userQueryId) => {
        try {
          const res = await fetch(`/api/admin/queries/delete/${userQueryId}`, {
            method: "DELETE",
          });
          const data = await res.json();
    
          if (data.success === false) {
            console.log(data.message);
            return;
          }
    
          // Get all listing except one which has listingId
          setUserQueries((prev) =>
            prev.filter((userQuery) => userQuery._id !== userQueryId)
          );
        } catch (error) {
          console.log(error.message);
        }
      };

      const handleSendMail = (email) => {
        window.location.href = `mailto:${email}`;
      };

  return (
    <>
        {userQueries && userQueries.length > 0 && (
            <div className="px-6">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-700">
                  User Query List
                </h2>
              </div>

              <div className="flex flex-wrap gap-4">
                {
                  <table className="w-full">
                    <thead className="bg-gray-300 border-gray-300">
                      <tr className="px-4 py-4 pt-4">
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Id</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Email</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Title</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Description</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Send Mail</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userQueries.map((userQuery, index) => (
                        <tr
                          key={userQuery._id}
                          className={index % 2 == 0 ? "bg-white" : "bg-gray-100"}
                        >
                          <td className="p-2">{userQuery._id}</td>
                          <td className="p-2">{userQuery.email}</td>
                          <td className="p-2">{userQuery.title}</td>
                          <td className="p-2">{userQuery.description}</td>
                          <td className="p-2 cursor-pointer" onClick={() => handleSendMail(userQuery.email)}>Send Mail</td>
                          <td className="p-2 text-red-600 cursor-pointer" onClick={() => handleUserQueryDelete(userQuery._id)}>Delete</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                }
              </div>
            </div>
          )}
    </>
  )
}
