import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaPhone,
  FaShare,
} from "react-icons/fa";
import Map from "../components/Map";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          return;
        }

        setListing(data);
        setError(false);
      } catch (error) {
        setError(true);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <>
      <main>
        {error && (
          <>
            <p className="text-center mt-52 text-3xl">
              Something Went Wrong...
            </p>

            <p className="text-center mt-5 ">
              <a
                className="cursor-pointer hover:underline text-slate-700"
                href="/"
              >
                Go To Home Page
              </a>
            </p>
          </>
        )}

        {listing && !error && (
          <>
            <Swiper navigation>
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-96"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
              <FaShare
                className="text-slate-500"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            {copied && (
              <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
                Link copied!
              </p>
            )}

            <div className="flex flex-col sm:flex-row max-w-4xl mx-auto p-3 my-7 gap-12">
              <div className="flex flex-col flex-1 p-3 gap-2">
                <p className="text-2xl font-semibold">
                  {listing.name} - ₹{" "}
                  {listing.offer
                    ? listing.discountPrice.toLocaleString("en-IN")
                    : listing.regularPrice.toLocaleString("en-IN")}
                  {listing.type === "rent" && " / month"}
                </p>

                <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
                  <FaMapMarkerAlt className="text-green-700" />
                  {listing.address}
                </p>

                {currentUser && (
                  <p className="flex items-center mt-4 gap-2 text-slate-600  text-sm">
                    <FaPhone className="text-green-700" />
                    {listing.contactno}
                  </p>
                )}

                <div className="flex gap-4 mt-4">
                  <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    {listing.type === "rent" ? "For Rent" : "For Sell"}
                  </p>
                  {listing.offer && (
                    <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                      ₹{+listing.regularPrice - +listing.discountPrice} OFF
                    </p>
                  )}
                </div>

                <p className="text-slate-800 mt-4">
                  <span className="font-semibold text-black">
                    Description -{" "}
                  </span>
                  {listing.description}
                </p>

                <ul className="text-green-900 font-semibold text-sm flex flex-wrap mt-3 items-center gap-4 sm:gap-6">
                  <li className="flex items-center gap-1 whitespace-nowrap ">
                    <FaBed className="text-lg" />
                    {listing.bedrooms > 1
                      ? `${listing.bedrooms} beds `
                      : `${listing.bedrooms} bed `}
                  </li>

                  <li className="flex items-center gap-1 whitespace-nowrap ">
                    <FaBath className="text-lg" />
                    {listing.bathrooms > 1
                      ? `${listing.bathrooms} baths `
                      : `${listing.bathrooms} bath `}
                  </li>

                  <li className="flex items-center gap-1 whitespace-nowrap ">
                    <FaParking className="text-lg" />
                    {listing.parking ? "Parking spot" : "No Parking"}
                  </li>

                  <li className="flex items-center gap-1 whitespace-nowrap ">
                    <FaChair className="text-lg" />
                    {listing.furnished ? "Furnished" : "Unfurnished"}
                  </li>
                </ul>

                {currentUser && listing.userRef !== currentUser._id && !contact && (
                  <button 
                    type="button" 
                    className="bg-slate-700 text-white rounded-lg p-2 mt-4 hover:opacity-95"
                    onClick={() => setContact(true)}
                  >
                    Contact Landlord
                  </button>
                )}

                {contact && <Contact listing={listing} />}
              </div>

              <div className="flex flex-col flex-1 gap-6">
                <Map />
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
