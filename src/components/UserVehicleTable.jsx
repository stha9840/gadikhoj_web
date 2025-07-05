import React, { useState } from "react";
import {
  FaWeightHanging,
  FaGasPump,
  FaUserFriends,
} from "react-icons/fa";
import { FaMoneyBillWave, FaHeart } from "react-icons/fa6";
import { useAdminVehicles } from "../../src/hooks/admin/useAdminVehicle";
import BookingModal from "../../src/components/auth/Booking/BookingModal";
import { useAddSavedVehicle } from "../../src/hooks/useSaveVehicle";

export default function UserVehicleTable() {
  const { vehicles, isLoading, isError, error } = useAdminVehicles();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const { mutate: addToSaved } = useAddSavedVehicle();

  const handleSaveVehicle = (vehicleId) => {
    addToSaved(vehicleId);
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-600">
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
            {vehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200 overflow-hidden flex flex-col max-w-xs mx-auto"
              >
                <div className="h-52 flex items-center justify-center bg-white border-b">
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

                <div className="p-4 flex-grow">
                  <h3 className="font-semibold text-gray-800 text-base">
                    {vehicle.vehicleName}
                  </h3>
                  <p className="text-xs text-gray-500">2024</p>

                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaWeightHanging className="text-blue-500" />
                      {vehicle.loadCapacityKg} kg
                    </div>
                    <div className="flex items-center gap-1">
                      <FaGasPump className="text-green-500" />
                      {vehicle.fuelCapacityLitres} L
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUserFriends className="text-indigo-500" />
                      {vehicle.passengerCapacity}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 border-t pt-3">
                    <div className="text-primary font-bold text-base text-green-600">
                      NPR {vehicle.pricePerTrip}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-3 py-1.5 rounded-lg"
                      >
                        Rent Now
                      </button>
                      <button
                        onClick={() => handleSaveVehicle(vehicle._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-2 py-1.5 rounded-lg flex items-center"
                        title="Add to Favorites"
                      >
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
