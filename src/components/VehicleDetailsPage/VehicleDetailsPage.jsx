import React from "react";
import { useParams, Link } from "react-router-dom";
import { useVehicleDetails } from "../../hooks/useVehicleDetailsPage";
import {
  FaWeightHanging,
  FaGasPump,
  FaUserFriends,
} from "react-icons/fa";

export default function VehicleDetailPage() {
  const { id } = useParams();
  const { vehicle, relatedVehicles, loading, error } = useVehicleDetails(id);

  if (loading) return <p className="text-center mt-10">Loading vehicle details...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  if (!vehicle) return <p className="text-center mt-10">Vehicle not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Vehicle Info */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-1">
          <img
            src={
              vehicle.filepath
                ? `http://localhost:5000/uploads/${vehicle.filepath}`
                : "/placeholder.jpg"
            }
            alt={vehicle.vehicleName}
            className="w-full h-96 object-contain border rounded-lg"
          />
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{vehicle.vehicleName}</h1>
          <p className="text-gray-700">{vehicle.description || "No description available."}</p>

          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Type:</strong> {vehicle.vehicleType || "N/A"}</p>
            <p className="flex items-center gap-1">
              <FaGasPump /> {vehicle.fuelCapacityLitres} L Fuel Capacity
            </p>
            <p className="flex items-center gap-1">
              <FaWeightHanging /> {vehicle.loadCapacityKg} kg Load Capacity
            </p>
            <p className="flex items-center gap-1">
              <FaUserFriends /> {vehicle.passengerCapacity} Passengers
            </p>
          </div>

          <div className="pt-4">
            <span className="text-2xl font-semibold text-teal-700">
              Rs{vehicle.pricePerTrip.toFixed(2)}
            </span>
            <span className="text-gray-500"> / day</span>
          </div>

          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-40">
            Rent Now
          </button>
        </div>
      </div>

      {/* Related Vehicles */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Related Vehicles</h2>
        {relatedVehicles.length === 0 ? (
          <p className="text-gray-500">No related vehicles found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedVehicles.map((v) => (
              <Link
                to={`/vehicles/${v._id}`}
                key={v._id}
                className="border rounded-lg p-4 hover:shadow-lg transition"
              >
                <img
                  src={
                    v.filepath
                      ? `http://localhost:5000/uploads/${v.filepath}`
                      : "/placeholder.jpg"
                  }
                  alt={v.vehicleName}
                  className="h-40 w-full object-contain mb-2"
                />
                <h3 className="font-semibold text-lg">{v.vehicleName}</h3>
                <p className="text-sm text-gray-500">{v.vehicleType || "Unknown Type"}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
