import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaWeightHanging,
  FaGasPump,
  FaUserFriends,
  FaMoneyBillWave,
  FaCar,
} from "react-icons/fa";
import {
  useAdminVehicles,
  useDeleteVehicle,
} from "../../hooks/admin/useAdminVehicle";
import DeleteModal from "../../components/auth/DeleteModal";
import CreateVehicleModal from "../../components/auth/CreateVehicleModal";
import UpdateVehicleModal from "../../components/auth/UpdateVehicleModal";

export default function VehicleDetailsTable() {
  const { vehicles, isLoading, isError, error } = useAdminVehicles();
  const deleteMutation = useDeleteVehicle();

  const [deleteId, setDeleteId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const handleDelete = () => {
    deleteMutation.mutate(deleteId, {
      onSuccess: () => setDeleteId(null),
      onError: (err) =>
        alert("Failed to delete vehicle: " + (err.message || "Unknown error")),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-extrabold text-indigo-800 flex items-center justify-center gap-3">
            <FaCar className="text-indigo-600" />
            <Typewriter
              words={["Vehicle Management"]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h1>
          <p className="text-gray-600 mt-1 text-sm">
            An elegant overview and control center for your transport vehicles.
          </p>
        </div>

        {/* Action bar */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            All Registered Vehicles
          </h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white px-4 py-2.5 rounded-lg shadow-lg transition"
          >
            <FaPlus /> Add Vehicle
          </button>
        </div>

        {/* Modals */}
        <CreateVehicleModal
          showModal={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
        <UpdateVehicleModal
          showModal={!!updateId}
          vehicleId={updateId}
          onClose={() => setUpdateId(null)}
        />
        <DeleteModal
          isOpen={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
          title="Delete Vehicle"
          description="Are you sure you want to delete this vehicle? This action cannot be undone."
        />

        {/* Content */}
        {isLoading ? (
          <p className="text-center text-gray-500">Loading vehicles...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Error: {error.message}</p>
        ) : vehicles.length === 0 ? (
          <div className="text-center mt-10 text-gray-500">
            <p className="text-xl">No vehicles available 🚫</p>
            <p className="text-sm mt-1">Add a vehicle to get started.</p>
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
                        ? `/${vehicle.filepath}`
                        : "/placeholder.jpg"
                    }
                    alt={vehicle.vehicleName}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => setUpdateId(vehicle._id)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-full shadow-md"
                      title="Edit"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteId(vehicle._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md"
                      title="Delete"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
