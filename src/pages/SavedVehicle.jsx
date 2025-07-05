// src/pages/SavedVehicle.jsx
import React from "react";
import { useSavedVehicles, useRemoveSavedVehicle } from "../hooks/useSavedVehicles";
import { FaTrash, FaCar } from "react-icons/fa";

export default function SavedVehicle() {
  const { savedVehicles, isLoading, isError, error } = useSavedVehicles();
  const { mutate: removeVehicle } = useRemoveSavedVehicle();

  const handleRemove = (vehicleId) => {
    if (window.confirm("Remove this vehicle from your favorites?")) {
      removeVehicle(vehicleId);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaCar className="text-indigo-600" />
        Your Saved Vehicles
      </h2>

      {isLoading ? (
        <p className="text-gray-500">Loading saved vehicles...</p>
      ) : isError ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : savedVehicles.length === 0 ? (
        <p className="text-gray-500">You have no saved vehicles yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {savedVehicles.map((v) => (
            <div
              key={v._id}
              className="bg-white shadow rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={v.vehicleId?.filepath ? `/${v.vehicleId.filepath}` : "/placeholder.jpg"}
                alt={v.vehicleId?.vehicleName}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex-grow">
                <h3 className="font-bold text-lg text-gray-800">
                  {v.vehicleId?.vehicleName}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Type: {v.vehicleId?.vehicleType}
                </p>
                <p className="text-sm text-gray-600">
                  Price: NPR {v.vehicleId?.pricePerTrip}
                </p>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={() => handleRemove(v.vehicleId._id)}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center gap-2"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
