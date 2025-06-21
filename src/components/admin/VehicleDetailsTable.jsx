import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
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

  if (isLoading) return <p>Loading vehicles...</p>;
  if (isError) return <p>Error loading vehicles: {error.message}</p>;
  if (vehicles.length === 0) return <p>No vehicles found.</p>;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Vehicle List</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <FaPlus /> Add Vehicle
        </button>
      </div>

      {/* Create Modal */}
      <CreateVehicleModal
        showModal={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {/* Update Modal */}
      <UpdateVehicleModal
        showModal={!!updateId}
        vehicleId={updateId}
        onClose={() => setUpdateId(null)}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Vehicle"
        description="Are you sure you want to delete this vehicle? This action cannot be undone."
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md w-full overflow-hidden">
        <table className="w-full text-left text-sm table-auto">
          <thead className="bg-indigo-50 text-indigo-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 border-b border-indigo-100">Vehicle Name</th>
              <th className="px-6 py-3 border-b border-indigo-100">Type</th>
              <th className="px-6 py-3 border-b border-indigo-100">Fuel Capacity (L)</th>
              <th className="px-6 py-3 border-b border-indigo-100">Load Capacity (Kg)</th>
              <th className="px-6 py-3 border-b border-indigo-100">Passenger Capacity</th>
              <th className="px-6 py-3 border-b border-indigo-100">Price per Trip</th>
              <th className="px-6 py-3 border-b border-indigo-100">Image</th>
              <th className="px-6 py-3 border-b border-indigo-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr
                key={vehicle._id}
                className="group transition-all hover:scale-[1.01] hover:shadow-md duration-200 ease-in-out"
              >
                <td className="px-6 py-4 border-b border-indigo-100">{vehicle.vehicleName}</td>
                <td className="px-6 py-4 border-b border-indigo-100">{vehicle.vehicleType}</td>
                <td className="px-6 py-4 border-b border-indigo-100">{vehicle.fuelCapacityLitres}</td>
                <td className="px-6 py-4 border-b border-indigo-100">{vehicle.loadCapacityKg}</td>
                <td className="px-6 py-4 border-b border-indigo-100">{vehicle.passengerCapacity}</td>
                <td className="px-6 py-4 border-b border-indigo-100">{vehicle.pricePerTrip}</td>
                <td className="px-6 py-4 border-b border-indigo-100 text-center">
                  {vehicle.filepath ? (
                    <img
                      src={`/${vehicle.filepath}`}
                      alt={vehicle.vehicleName}
                      className="inline-block w-20 h-12 object-cover rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-6 py-4 border-b border-indigo-100">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2 justify-center">
                    <button
                      onClick={() => setDeleteId(vehicle._id)}
                      disabled={deleteMutation.isLoading && deleteId === vehicle._id}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 text-xs"
                    >
                      <FaTrash />
                      {deleteMutation.isLoading && deleteId === vehicle._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                    <button
                      onClick={() => setUpdateId(vehicle._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex items-center gap-1 text-xs"
                    >
                      <FaEdit /> Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
