import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AdminUserInfoPage() {
  const { id } = useParams();
  console.log(id);

  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`/api/admin/users/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, []);
  console.log(user);

  const handleUserInfoDelete = async (userId) => {
    try {
        const res = await fetch(`/api/admin/users/delete/${userId}`, {
          method: "DELETE",
        });
        const data = await res.json();
  
        if (data.success === false) {
          console.log(data.message);
          return;
        }

        navigate('/users');
      } catch (error) {
        console.log(error.message);
      }
  }

  const handleSendMail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg border mt-20 ml-80 mr-80">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">
            User Details
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Id</dt>
              {user.map((u) => (
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" key={u._id}>
                    {u._id}
                </dd>
              ))}
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              {user.map((u) => (
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" key={u._id}>
                    {u.email}
                </dd>
              ))}
            </div>
            {user.map((u) => (
            <div className="py-4 sm:py-4 sm:grid sm:grid-cols-4 sm:gap-24 sm:px-6" key={u._id}>
                <>
                    <button className="text-red-600" onClick={() => handleUserInfoDelete(u._id)}>Delete</button>
                    <button className="p-2 cursor-pointer" onClick={() => handleSendMail(user.email)}>Send Mail</button>
                    <button className="text-blue-500"><Link to={'/users'}>Go Back</Link></button>
                    <button><Link to={`/`}>Go Home</Link></button>
                </>
            </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}
