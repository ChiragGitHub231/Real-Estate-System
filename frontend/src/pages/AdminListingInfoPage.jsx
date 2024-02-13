import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";

export default function AdminListingInfoPage() {
  SwiperCore.use([Navigation]);
  const { id } = useParams();
  console.log(id);

  const [listing, setListing] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListingInfo = async () => {
      try {
        const res = await fetch(`/api/admin/listings/${id}`);
        const data = await res.json();
        setListing(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListingInfo();
  }, []);
  console.log(listing);

  const handleListingInfoDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/admin/listings/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      navigate("/listings");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg border mt-10 ml-80 mr-80">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Listing Details</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Id</dt>
              {listing.map((u) => (
                <dd
                  className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                  key={u._id}
                >
                  {u._id}
                </dd>
              ))}
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">User Id</dt>
              {listing.map((u) => (
                <dd
                  className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                  key={u._id}
                >
                  <Link className="hover:underline" to={`/users/${u.userRef}`}>{u.userRef}</Link>
                </dd>
              ))}
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              {listing.map((u) => (
                <dd
                  className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                  key={u._id}
                >
                  {u.name}
                </dd>
              ))}
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              {listing.map((u) => (
                <dd
                  className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                  key={u._id}
                >
                  {u.description}
                </dd>
              ))}
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Contact No</dt>
              {listing.map((u) => (
                <dd
                  className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                  key={u._id}
                >
                  {u.contactno}
                </dd>
              ))}
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Regular Price</dt>
              {listing.map((u) => (
                <dd
                  className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                  key={u._id}
                >
                  {u.regularPrice}
                </dd>
              ))}
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Discount Price</dt>
              {listing.map((u) => (
                <dd
                  className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                  key={u._id}
                >
                  {u.discountPrice}
                </dd>
              ))}
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              {listing.map((u) => (
                <dd
                  className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                  key={u._id}
                >
                  {u.address}
                </dd>
              ))}
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Type</dt>
              {listing.map((u) => (
                <dd
                  className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                  key={u._id}
                >
                  {u.type}
                </dd>
              ))}
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Images</dt>
              <dd>
                <Swiper navigation>
                  {listing.map((u) =>
                    u.imageUrls.map((imageUrl, index) => (
                      <SwiperSlide key={index}>
                        <div
                          style={{
                            background: `url(${imageUrl}) center no-repeat`,
                            backgroundSize: "cover",
                            height: 300,
                            width: 680,
                          }}
                          className="h-[500px]"
                        />
                      </SwiperSlide>
                    ))
                  )}
                </Swiper>
              </dd>
            </div>
            {listing.map((u) => (
              <div
                className="py-4 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-40 sm:px-6"
                key={u._id}
              >
                <>
                  <button
                    className="text-red-600"
                    onClick={() => handleListingInfoDelete(u._id)}
                  >
                    Delete
                  </button>
                  <button className="text-blue-500">
                    <Link to={"/listings"}>Go Back</Link>
                  </button>
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
