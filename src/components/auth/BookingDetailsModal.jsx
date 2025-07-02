import React from "react";

const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-2xl relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">User Info</h3>
            <p><strong>Name:</strong> {booking.userId?.username || "N/A"}</p>
            <p><strong>Email:</strong> {booking.userId?.email}</p>
            {/* <p><strong>Phone:</strong> {booking.userId?.phone || "N/A"}</p> */}
          </div>

          {/* Vehicle Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Vehicle Info</h3>
            <p><strong>Name:</strong> {booking.vehicleId?.vehicleName}</p>
            <p><strong>Type:</strong> {booking.vehicleId?.vehicleType}</p>
            <p><strong>Price/Trip:</strong> Rs. {booking.vehicleId?.pricePerTrip}</p>
            {booking.vehicleId?.image && (
              <img
                src={booking.vehicleId.image}
                alt="Vehicle"
                className="mt-2 rounded-lg h-32 object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
