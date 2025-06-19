import React from "react";
import { MdLocationOn, MdCalendarToday, MdDirectionsCar } from "react-icons/md";

export default function BrandsSection() {
  return (
    <section className="w-full py-16 px-4 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-black mb-4">
        How it works
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-12">
        Vehicle rental is different from taxi services — you’re in control of the car, schedule, and route.
      </p>

      {/* Steps container */}
      <div className="relative flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
        {/* Dotted line */}
        <div className="absolute top-10 md:top-1/2 w-full h-1 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,30 C150,0 350,60 500,30"
              stroke="#D1D5DB"
              strokeWidth="2"
              strokeDasharray="6,6"
              fill="none"
            />
          </svg>
        </div>

        {/* Step 1 */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-4 w-full md:w-1/3">
          <div className="bg-gradient-to-b from-blue-500 to-blue-600 p-4 rounded-full shadow-lg">
            <MdLocationOn className="text-white text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-black">Choose Location</h3>
          <p className="text-gray-600 text-sm">
            Select your pick-up location with ease.
          </p>
        </div>

        {/* Step 2 */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-4 w-full md:w-1/3 mt-12 md:mt-0">
          <div className="bg-gradient-to-b from-blue-500 to-blue-600 p-4 rounded-full shadow-lg">
            <MdCalendarToday className="text-white text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-black">Pick-Up Date</h3>
          <p className="text-gray-600 text-sm">
            Choose the date and time that suits your schedule.
          </p>
        </div>

        {/* Step 3 */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-4 w-full md:w-1/3 mt-12 md:mt-0">
          <div className="bg-gradient-to-b from-blue-500 to-blue-600 p-4 rounded-full shadow-lg">
            <MdDirectionsCar className="text-white text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-black">Book Your Car</h3>
          <p className="text-gray-600 text-sm">
            Confirm your booking in just a few clicks.
          </p>
        </div>
      </div>
    </section>
  );
}
