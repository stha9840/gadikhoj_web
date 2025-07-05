import React, { useState } from "react";
import {
  FaWeightHanging,
  FaGasPump,
  FaUserFriends,
} from "react-icons/fa";
import { FaTrash, FaCalendarCheck } from "react-icons/fa"; // Booking icon
import { useSavedVehicles, useRemoveSavedVehicle } from "../hooks/useSaveVehicle";
import BookingModal from "../components/auth/Booking/BookingModal"; // Make sure path is correct

export default function SavedVehicle() {
  const { savedVehicles, isLoading, isError, error } = useSavedVehicles();
  const { mutate: removeVehicle } = useRemoveSavedVehicle();
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleRemove = (vehicleId) => {
    if (window.confirm("Remove this vehicle from your favorites?")) {
      removeVehicle(vehicleId);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaCalendarCheck className="text-indigo-600" />
        Your Saved Vehicles
      </h2>

      <BookingModal
        showModal={!!selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        vehicle={selectedVehicle}
      />

      {isLoading ? (
        <p className="text-center text-gray-500">Loading saved vehicles...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Error: {error.message}</p>
      ) : savedVehicles.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">
          <p className="text-xl">You have no saved vehicles yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedVehicles.map(({ vehicleId }) => (
            <div
              key={vehicleId._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200 overflow-hidden flex flex-col max-w-xs mx-auto"
            >
              <div className="h-52 flex items-center justify-center bg-white border-b">
                <img
                  src={
                    vehicleId.filepath
                      ? `http://localhost:5000/uploads/${vehicleId.filepath}`
                      : "/placeholder.jpg"
                  }
                  alt={vehicleId.vehicleName}
                  className="max-h-full max-w-[90%] object-contain"
                />
              </div>

              <div className="p-4 flex-grow">
                <h3 className="font-semibold text-gray-800 text-base">
                  {vehicleId.vehicleName}
                </h3>
                <p className="text-xs text-gray-500">2024</p>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FaWeightHanging className="text-blue-500" />
                    {vehicleId.loadCapacityKg} kg
                  </div>
                  <div className="flex items-center gap-1">
                    <FaGasPump className="text-green-500" />
                    {vehicleId.fuelCapacityLitres} L
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUserFriends className="text-indigo-500" />
                    {vehicleId.passengerCapacity}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 border-t pt-3">
                  <div className="text-primary font-bold text-base text-green-600">
                    NPR {vehicleId.pricePerTrip}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedVehicle(vehicleId)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg flex items-center gap-1"
                      title="Book Vehicle"
                    >
                      <FaCalendarCheck /> Book
                    </button>

                    <button
                      onClick={() => handleRemove(vehicleId._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded-lg flex items-center gap-1"
                      title="Remove from Favorites"
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
