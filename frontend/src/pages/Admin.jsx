import React, { useEffect } from "react";
import Card from "../components/Card";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [reports, setReports] = useState([]);
  const [userQueries, setUserQueries] = useState([]);

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

    const fetchListings = async () => {
      try {
        const res = await fetch("/api/admin/getlistings");
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();

    const fetchUserReports = async () => {
      try {
        const res = await fetch("/api/report/get-reports");
        const data = await res.json();
        setReports(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserReports();

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

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/admin/listings/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      // Get all listing except one which has listingId
      setListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReportDelete = async (reportId) => {
    try {
      const res = await fetch(`/api/report/delete/${reportId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      // Get all listing except one which has listingId
      setReports((prev) =>
        prev.filter((report) => report._id !== reportId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

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
      <div>
        <div className="flex gap-6 mt-6 ml-32">
          <Card title="No. of Users" value={users.length} />
          <Card title="No. of Listings" value={listings.length} />
          <Card title="No. of Reports" value={reports.length} />
          <Card title="No. of Queries" value={userQueries.length} />
        </div>

        <div className="max-w-6xl mx-auto flex flex-col gap-8 my-10">
          {users && users.length > 0 && (
            <div className="">
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

          {listings && listings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-700">
                  Listings List
                </h2>
              </div>

              <div className="flex flex-wrap gap-4">
                {
                  <table className="w-full">
                    <thead className="bg-gray-300 border-gray-300">
                      <tr className="">
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Id</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Name</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">User Id</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Contact No</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listings.map((listing, index) => (
                        <tr
                          key={listing._id}
                          className={index % 2 == 0 ? "bg-white" : "bg-gray-100"}
                        >
                          <td className="p-2 hover:underline"><Link to={`/listings/${listing._id}`}>{listing._id}</Link></td>
                          <td className="p-2">{listing.name}</td>
                          <td className="p-2 hover:underline"><Link to={`/users/${listing.userRef}`}>{listing.userRef}</Link></td>
                          <td className="p-2">{listing.contactno}</td>
                          <td className="p-2 text-red-600 cursor-pointer" onClick={() => handleListingDelete(listing._id)}>Delete</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                }
              </div>
            </div>
          )}

          {reports && reports.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-700">
                  Reports Lists
                </h2>
              </div>

              <div className="flex flex-wrap gap-4">
                {
                  <table className="w-full">
                    <thead className="bg-gray-300 border-gray-300">
                      <tr className="">
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Id</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">User Id</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Listing Id</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Description</th>
                        <th className="p-2 text-sm font-semibold tracking-wide text-left">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report, index) => (
                        <tr
                          key={report._id}
                          className={index % 2 == 0 ? "bg-white" : "bg-gray-100"}
                        >
                          <td className="p-2">{report._id}</td>
                          <td className="p-2 hover:underline"><Link to={`/users/${report.listingownerid}`}>{report.listingownerid}</Link></td>
                          <td className="p-2 hover:underline"><Link to={`/listings/${report.listingid}`}>{report.listingid}</Link></td>
                          <td className="p-2">{report.description}</td>
                          <td className="p-2 text-red-600 cursor-pointer" onClick={() => handleReportDelete(report._id)}>Delete</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                }
              </div>
            </div>
          )}

          {userQueries && userQueries.length > 0 && (
            <div className="">
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
        </div>
      </div>
    </>
  );
}
