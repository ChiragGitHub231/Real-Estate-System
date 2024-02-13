import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);

    useEffect(() => {
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
    }, []);

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

  return (
    <>
      {reports && reports.length > 0 && (
            <div className="px-6">
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
    </>
  )
}
