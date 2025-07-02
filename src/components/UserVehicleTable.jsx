import React, { useState } from "react";
import {
  FaWeightHanging,
  FaGasPump,
  FaUserFriends,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useAdminVehicles } from "../../src/hooks/admin/useAdminVehicle";
import BookingModal from "../../src/components/auth/Booking/BookingModal"; // Adjust the path if needed

export default function UserVehicleTable() {
  const { vehicles, isLoading, isError, error } = useAdminVehicles();
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Small label on top left */}
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-600">
            Available Vehicles
          </span>
        </div>

        {/* Booking Modal */}
        <BookingModal
          showModal={!!selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          vehicle={selectedVehicle}
        />

        {/* Content */}
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
            {vehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200 overflow-hidden flex flex-col hover:scale-[1.02] duration-200 max-w-xs"
              >
                <div className="relative">
                  <img
                    src={
                      vehicle.filepath
                        ? `http://localhost:5000/uploads/${vehicle.filepath}`
                        : "/placeholder.jpg"
                    }
                    alt={vehicle.vehicleName}
                    className="w-full h-32 object-cover"
                  />
                </div>

                <div className="p-3 flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-md text-gray-800 truncate">
                      {vehicle.vehicleName}
                    </h3>
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">
                      {vehicle.vehicleType}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaWeightHanging className="text-indigo-500" />{" "}
                      {vehicle.loadCapacityKg} kg
                    </div>
                    <div className="flex items-center gap-1">
                      <FaGasPump className="text-indigo-500" />{" "}
                      {vehicle.fuelCapacityLitres} L
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUserFriends className="text-indigo-500" />{" "}
                      {vehicle.passengerCapacity}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaMoneyBillWave className="text-indigo-500" /> NPR{" "}
                      {vehicle.pricePerTrip}
                    </div>
                  </div>
                </div>

                <div className="p-3 pt-0">
                  <button
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 text-white font-medium py-2 rounded-lg transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
