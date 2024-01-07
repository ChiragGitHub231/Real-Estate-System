import React from "react";
import { Link } from "react-router-dom";

// Fa stands for Font awesome. It takes icons from font awesome website.
import { FaSearch } from "react-icons/fa";

import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user)

  return (
    <header className="bg-slate-200 shadow-md">
      {/* Name & Search bar are next to each other using flex
        Adding space between components using justify-between 
        align vertically center using items-center*/}
      <div className="flex justify-between items-center max-w-screen-2xl p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Property </span>
            <span className="text-slate-700">Pulse</span>
          </h1>
        </Link>

        {/* Align Input Box and Icon Next to each other using flex 
            center vertically using items-center */}
        <form className="bg-slate-100 p-2 rounded-lg flex items-center ml-32">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-56"
          />
          <FaSearch className="text-slate-600" />
        </form>

        {/* navbar options */}
        <ul className="flex gap-4 p-2">
          <Link to='/'>
            <li className="hidden sm:inline text-slate-700 hover:no-underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className="hidden sm:inline text-slate-700 hover:no-underline cursor-pointer">
              About
            </li>
          </Link>
          <Link to='/contact-us'>
            <li className="hidden sm:inline text-slate-700 hover:no-underline cursor-pointer">
              Contact Us
            </li>
          </Link>
          <Link to='/privacy'>
            <li className="hidden sm:inline text-slate-700 hover:no-underline cursor-pointer">
              Privacy
            </li>
          </Link>

          <Link to='/profile'>
            {currentUser ? (
              <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
            ) : (
              <li className="text-slate-700 hover:no-underline cursor-pointer">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
