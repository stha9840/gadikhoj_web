import React from "react";
import { Typewriter } from "react-simple-typewriter";
import blueCar from "../assets/landing_assests/bluecar.png";

export default function LandingSection() {
  return (
    <section className="w-screen overflow-hidden bg-[#f5f7fa] px- md:px-20 lg:px-2 pb-32 -mt-4">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 relative">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between items-center py-6">
          {/* Left Text */}
          <div className="w-full lg:w-1/2 space-y-2">
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
              <Typewriter
                words={[
                  "Explore 1000+ cars for rent",
                  "Rent a car with ease",
                  "Drive your dreams today",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Choose from a wide range of vehicles and enjoy a smooth,
              stress-free rental experience.
            </p>
          </div>

          {/* Right Image with hover info */}
          <div className="w-full lg:w-1/2 relative mt-2 lg:mt-0 flex justify-center items-center group">
            <div className="absolute top-2 h-[150px] w-[150px] bg-[#eceef9] rounded-2xl z-0 opacity-80" />
            <img
              src={blueCar}
              alt="Car"
              className="relative z-10 w-full max-w-xl max-h-60 object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
              style={{ top: "110px" }}
            />

            {/* Info box that appears on hover, top-right of the image */}
            <div className="absolute top-0 right-0 -translate-y-full translate-x-6 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-white text-gray-800 shadow-xl rounded-xl px-4 py-3 w-72 z-20">
              {/* Arrow */}
              <div className="absolute -bottom-2 left-4 w-3 h-3 bg-white rotate-45 shadow-md"></div>

              <h3 className="text-lg font-semibold">Porsche 911 Carrera</h3>
              <p className="text-sm text-gray-600">Blue · 2023 Model · Automatic</p>
              <p className="mt-1 font-medium text-blue-600">$150/day</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );    
}
