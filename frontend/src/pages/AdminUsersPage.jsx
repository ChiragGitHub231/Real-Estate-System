import React from 'react'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await fetch("/api/admin/getusers");
            const data = await res.json();
            setUsers(data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchUsers();
    }, []);

    const handleUserDelete = async (userId) => {
        try {
          const res = await fetch(`/api/admin/users/delete/${userId}`, {
            method: "DELETE",
          });
          const data = await res.json();
    
          if (data.success === false) {
            console.log(data.message);
            return;
          }
    
          // Get all listing except one which has listingId
          setUsers((prev) =>
            prev.filter((user) => user._id !== userId)
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
    {users && users.length > 0 && (
        <div className="px-6">
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-700">
              Users List
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {
              <table className="w-full">
                <thead className="bg-gray-300 border-gray-300">
                  <tr className="">
                    <th className="p-2 text-sm font-semibold tracking-wide text-left">Id</th>
                    <th className="p-2 text-sm font-semibold tracking-wide text-left">Name</th>
                    <th className="p-2 text-sm font-semibold tracking-wide text-left">Email</th>
                    <th className="p-2 text-sm font-semibold tracking-wide text-left">Send Mail</th>
                    <th className="p-2 text-sm font-semibold tracking-wide text-left">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className={index % 2 == 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="p-2 hover:underline"><Link to={`/users/${user._id}`}>{user._id}</Link></td>
                      <td className="p-2">{user.username}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2 cursor-pointer" onClick={() => handleSendMail(user.email)}>Send Mail</td>
                      <td className="p-2 text-red-600 cursor-pointer" onClick={() => handleUserDelete(user._id)}>Delete</td>
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
