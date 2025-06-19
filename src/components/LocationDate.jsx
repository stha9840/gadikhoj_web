import React from "react";
import { MdLocationOn, MdCalendarToday } from "react-icons/md";

export default function LocationDate() {
  return (
    <div className="absolute bottom-42 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white shadow-lg rounded-full flex flex-col sm:flex-row items-center px-6 py-4 gap-4 sm:gap-6 w-[90%] max-w-3xl z-20">
      {/* Location */}
      <div className="flex items-center gap-2 w-full">
        <MdLocationOn className="text-blue-600 text-xl" />
        <div className="flex flex-col text-sm text-gray-500">
          <span className="font-semibold text-gray-700">Location</span>
          <input
            type="text"
            placeholder="Find your location"
            className="outline-none bg-transparent placeholder:text-sm"
          />
        </div>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 w-full">
        <MdCalendarToday className="text-blue-600 text-xl" />
        <div className="flex flex-col text-sm text-gray-500">
          <span className="font-semibold text-gray-700">Select Date</span>
          <input
            type="date"
            className="outline-none bg-transparent text-sm"
          />
        </div>
      </div>

      {/* Button */}
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-9 py-2 rounded-full text-sm font-medium">
        Search
      </button>
    </div>
  );
}
