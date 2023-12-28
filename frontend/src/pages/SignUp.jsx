import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // This function keeps track of information of user
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  // This function submits the form
  const handleSubmit = async (e) => {
    // Prevent the refreshing when we submit the form
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Convert response to JSON
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="p-5 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg"
            id="username"
            onChange={handleChange}
            required
            onInvalid={e => e.target.setCustomValidity('Username is Required')}
            onInput={e => e.target.setCustomValidity('')}
          />

          <input
            type="text"
            placeholder="Contact No"
            className="border p-3 rounded-lg"
            id="contactno"
            onChange={handleChange}
            required
            onInvalid={e => e.target.setCustomValidity('Contact No is Required')}
            onInput={e => e.target.setCustomValidity('')}
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
            required
            onInvalid={e => e.target.setCustomValidity('Email is Required')}
            onInput={e => e.target.setCustomValidity('')}
          />
  
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
            required
            onInvalid={e => e.target.setCustomValidity('Password is Required')}
            onInput={e => e.target.setCustomValidity('')}
          />

          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        <div className="flex gap-2 mt-5">
          <p>
            Have an account?{" "}
            <Link to={"/sign-in"}>
              <span className="text-blue-700">Sign In</span>
            </Link>
          </p>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </>
  );
}
