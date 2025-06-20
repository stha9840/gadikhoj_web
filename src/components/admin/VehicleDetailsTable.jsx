import React, { useState } from "react";
import { useAdminVehicles, useDeleteVehicle } from "../../hooks/admin/useAdminVehicle"; // Adjust path
import DeleteModal from "../../components/auth/DeleteModal"; // Adjust path

export default function VehicleDetailsTable() {
  const { vehicles, isLoading, isError, error } = useAdminVehicles();
  const deleteMutation = useDeleteVehicle();

  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    deleteMutation.mutate(deleteId, {
      onSuccess: () => setDeleteId(null),
    });
  };

  if (isLoading) return <p>Loading vehicles...</p>;
  if (isError) return <p>Error loading vehicles: {error.message}</p>;
  if (vehicles.length === 0) return <p>No vehicles found.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Vehicle List</h2>

      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Vehicle"
        description="Are you sure you want to delete this vehicle? This action cannot be undone."
      />

      <table
        className="min-w-full border-collapse border border-gray-300"
        cellPadding="8"
        cellSpacing="0"
      >
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300">Vehicle Name</th>
            <th className="border border-gray-300">Type</th>
            <th className="border border-gray-300">Fuel Capacity (L)</th>
            <th className="border border-gray-300">Load Capacity (Kg)</th>
            <th className="border border-gray-300">Passenger Capacity</th>
            <th className="border border-gray-300">Price per Trip</th>
            <th className="border border-gray-300">Image</th>
            <th className="border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id} className="hover:bg-gray-50">
              <td className="border border-gray-300">{vehicle.vehicleName}</td>
              <td className="border border-gray-300">{vehicle.vehicleType}</td>
              <td className="border border-gray-300">{vehicle.fuelCapacityLitres}</td>
              <td className="border border-gray-300">{vehicle.loadCapacityKg}</td>
              <td className="border border-gray-300">{vehicle.passengerCapacity}</td>
              <td className="border border-gray-300">{vehicle.pricePerTrip}</td>
              <td className="border border-gray-300 text-center">
                {vehicle.filepath ? (
                  <img
                    src={`/${vehicle.filepath}`}
                    alt={vehicle.vehicleName}
                    className="inline-block w-20 h-12 object-cover"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="border border-gray-300 text-center">
                <button
                  onClick={() => setDeleteId(vehicle._id)}
                  disabled={deleteMutation.isLoading && deleteId === vehicle._id}
                  className="text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  {deleteMutation.isLoading && deleteId === vehicle._id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
