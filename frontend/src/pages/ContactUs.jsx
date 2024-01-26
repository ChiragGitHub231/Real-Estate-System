import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    }); 
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    // Prevent the refreshing when we submit the form
    e.preventDefault();

    try {
      const res = await fetch("/api/user/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Convert response to JSON
      const data = await res.json();

      if (data.success === false) {
        return;
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-serif leading-tight text-grey sm:text-3xl mt-10">
        Contact Us
      </h1>

      <form onSubmit={handleSubmit} method="POST" className="mt-8 ml-96 mr-96">
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="" className="text-base font-medium text-gray-900">
                Email Address
              </label>
            </div>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Email Address"
                id="email"
                onChange={handleChange}
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity("Please Enter Email")
                }
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="" className="text-base font-medium text-gray-900">
                Title
              </label>
            </div>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Title"
                id="title"
                onChange={handleChange}
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity("Please Enter Title")
                }
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="" className="text-base font-medium text-gray-900">
                Description
              </label>
            </div>
            <div className="mt-2">
              <textarea
                placeholder="Description..."
                id="description"
                className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                rows={4}
                cols={80}
                onChange={handleChange}
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity("Please Enter Description")
                }
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>
          </div>

          <div>
            <button className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 disabled:opacity-80">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
