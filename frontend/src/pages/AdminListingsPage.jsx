import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminListingsPage() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
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
    }, []);

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

  return (
    <>
        {listings && listings.length > 0 && (
            <div className="px-6">
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
    </>
  )
}
