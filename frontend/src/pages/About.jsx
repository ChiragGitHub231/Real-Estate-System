import React from "react";

export default function About() {
  return (
    <>
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 md:pr-8">
          {/* Added md:pr-8 for right padding on larger screens */}
          {/* <h1 className="text-3xl font-bold mb-4">About Us</h1>
           */}
          <div className="mt-4 mb-4 flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-slate-800">About</h1>
            <h1 className="text-2xl font-semibold">
              <span className="text-slate-500">Property</span>
              <span className="text-slate-700">Pulse</span>
            </h1>
          </div>
          <p className="text-gray-700 mb-6">
            PropertyPulse is an online web application which provides services
            like adding property, find and see the details about the property.
            User can add, find the property to the system. Before that it must
            register to the system and then logged in to the system. User can
            also update its profile as well. There is feature of map integration
            as well in that user can see the property address pointed on the map
            to see the area around the property. User can also report the
            property if it finds some issues in property.
          </p>
          <h2 className="text-xl font-bold mb-2">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="bg-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Chirag Bhundiya</h3>
              <p className="text-gray-700">Software Developer</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Mihir Jetpariya</h3>
              <p className="text-gray-700">Software Developer</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mt-6">
          <img
            src="https://imageio.forbes.com/specials-images/imageserve/617aa4df903b049f0fa8f207/Estate-agent-giving-house-keys-to-woman-and-sign-agreement-in-office/960x0.jpg?height=473&width=711&fit=bounds"
            alt="Real Estate System"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </>
  );
}
