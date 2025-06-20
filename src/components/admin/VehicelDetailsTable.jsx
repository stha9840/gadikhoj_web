import React from "react";
import { useAdminVehicles } from "../../hooks/admin/useAdminVehicle"; // Adjust path as needed

export default function VehicleDetailsTable() {
  const { vehicles, isLoading, isError, error } = useAdminVehicles();

  if (isLoading) {
    return <p>Loading vehicles...</p>;
  }

  if (isError) {
    return <p>Error loading vehicles: {error.message}</p>;
  }

  if (vehicles.length === 0) {
    return <p>No vehicles found.</p>;
  }

  return (
    <div>
      <h2>Vehicle List</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Vehicle Name</th>
            <th>Type</th>
            <th>Fuel Capacity (L)</th>
            <th>Load Capacity (Kg)</th>
            <th>Passenger Capacity</th>
            <th>Price per Trip</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.vehicleName}</td>
              <td>{vehicle.vehicleType}</td>
              <td>{vehicle.fuelCapacityLitres}</td>
              <td>{vehicle.loadCapacityKg}</td>
              <td>{vehicle.passengerCapacity}</td>
              <td>{vehicle.pricePerTrip}</td>
              <td>
                {vehicle.filepath ? (
                  <img
                    src={`/${vehicle.filepath}`} // Adjust base URL if needed
                    alt={vehicle.vehicleName}
                    style={{ width: 80, height: 50, objectFit: "cover" }}
                  />
                ) : (
                  "No Image"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
