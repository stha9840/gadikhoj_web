import React, { useState, useEffect } from "react";
import {
  FaWeightHanging,
  FaGasPump,
  FaUserFriends,
} from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useAdminVehicles } from "../../src/hooks/admin/useAdminVehicle";
import BookingModal from "../../src/components/auth/Booking/BookingModal";
import {
  useAddSavedVehicle,
  useRemoveSavedVehicle,
  useSavedVehicles,
} from "../../src/hooks/useSaveVehicle";

import AOS from "aos";
import "aos/dist/aos.css";

export default function UserVehicleTable() {
  const { vehicles, isLoading, isError, error } = useAdminVehicles();
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const { savedVehicles = [] } = useSavedVehicles();
  const { mutate: addToSaved } = useAddSavedVehicle();
  const { mutate: removeFromSaved } = useRemoveSavedVehicle();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const isVehicleSaved = (id) =>
    savedVehicles.some((v) => v.vehicleId._id === id);

  const toggleSaveVehicle = (vehicleId) => {
    if (isVehicleSaved(vehicleId)) {
      removeFromSaved(vehicleId);
    } else {
      addToSaved(vehicleId);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            Available Vehicles
          </span>
        </div>

        <BookingModal
          showModal={!!selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          vehicle={selectedVehicle}
        />

        {isLoading ? (
          <p className="text-center text-gray-500">Loading vehicles...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Error: {error.message}</p>
        ) : vehicles.length === 0 ? (
          <div className="text-center mt-10 text-gray-500">
            <p className="text-xl">No vehicles available 🚫</p>
            <p className="text-sm mt-1">Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {vehicles.map((vehicle) => {
              const isSaved = isVehicleSaved(vehicle._id);

              return (
                <div
                  key={vehicle._id}
                  data-aos="fade-up"
                  className="relative rounded-xl border border-black-200 bg-white overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {/* Save Icon */}
                  <button
                    onClick={() => toggleSaveVehicle(vehicle._id)}
                    className="absolute top-3 right-3 z-10 p-1 bg-transparent focus:outline-none active:outline-none focus:ring-0 active:ring-0"
                    title={isSaved ? "Unsave" : "Save"}
                    style={{ border: "none" }}
                  >
                    {isSaved ? (
                      <FaHeart className="text-black text-xl" />
                    ) : (
                      <FaRegHeart className="text-bla-400 text-xl" />
                    )}
                  </button>

                  {/* Vehicle Image */}
                  <div className="h-40 flex items-center justify-center border-b">
                    <img
                      src={
                        vehicle.filepath
                          ? `http://localhost:5000/uploads/${vehicle.filepath}`
                          : "/placeholder.jpg"
                      }
                      alt={vehicle.vehicleName}
                      className="max-h-full max-w-[90%] object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-base">
                        {vehicle.vehicleName}
                      </h3>
                      <p className="text-xs text-[#64748b]">
                        {vehicle.vehicleType || "Unknown Type"}
                      </p>

                      {/* Vehicle Specs */}
                      <div className="flex gap-4 mt-4 text-sm text-[#64748b]">
                        <div className="flex items-center gap-1">
                          <FaGasPump style={{ color: "#90A3BF" }} />
                          {vehicle.fuelCapacityLitres}L
                        </div>
                        <div className="flex items-center gap-1">
                          <FaWeightHanging style={{ color: "#90A3BF" }} />
                          {vehicle.loadCapacityKg}kg
                        </div>
                        <div className="flex items-center gap-1">
                          <FaUserFriends style={{ color: "#90A3BF" }} />
                          {vehicle.passengerCapacity} People
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Price + Rent Now */}
                    <div className="flex justify-between items-center mt-6 border-t pt-3">
                      <div className="text-[#0f766e] font-semibold text-base">
                        ${vehicle.pricePerTrip.toFixed(2)}
                        <span className="text-gray-500 text-xs"> /day</span>
                      </div>

                      <button
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-1.5 rounded-md"
                      >
                        Rent Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
