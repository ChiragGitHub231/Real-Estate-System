import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // This function keeps track of information of user
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  useEffect(() => {
    // Reset the error message when the component is mounted
    dispatch(signInFailure(null));
  }, [dispatch]);

  // This function submits the form
  const handleSubmit = async (e) => {
    // Prevent the refreshing when we submit the form
    e.preventDefault();

    try {
      dispatch(signInStart());


      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Convert response to JSON
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      if (
        formData.email == "admin777@gmail.com" &&
        formData.password == "admin777"
      ) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-2 py-10 sm:px-6 sm:py-16 lg:px-28 lg:py-16">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign in
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&#x27;t have an account?
              <a
                href="/sign-up"
                title=""
                className="font-semibold text-black ml-1 transition-all duration-200 hover:underline"
              >
                Create a free account
              </a>
            </p>
            <form onSubmit={handleSubmit} method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
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
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("Please Enter Password")
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                    />
                  </div>
                </div>
                <div>
                  <button
                    // disabled={loading}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 disabled:opacity-80"
                  >
                    {/* {loading ? "Loading..." : "Sign In"} */}
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            <OAuth />

            <Link to={"/"}>
              <span className="text-blue-700">Go to Home</span>
            </Link>
            {error && (
              <>
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3"
                  role="alert"
                >
                  <strong className="font-bold">Error!</strong>
                  <span className="block sm:inline">
                    {" "}
                    Invalid Username or Password
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="h-full w-full">
          <img
            className="mx-auto h-4/5 w-4/5 mt-10 pt-10  rounded-md object-cover"
            src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
