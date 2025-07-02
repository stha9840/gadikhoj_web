import React from "react";
import {
  FaUser,
  FaCar,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaDollarSign,
} from "react-icons/fa";

const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const statusColors = {
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-green-100 text-green-700",
    pending: "bg-blue-100 text-blue-700",
  };

  const statusClass = statusColors[booking.status] || statusColors.pending;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl relative mx-4 my-10 animate-fadeIn border border-gray-200 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors text-xl font-extrabold focus:outline-none"
        >
          &times;
        </button>

        <h2 className="text-2xl font-extrabold mb-6 text-gray-900 flex items-center gap-2">
          <FaCar className="text-indigo-600" /> Booking Details
        </h2>

        <div className="bg-indigo-50 rounded-lg p-4 shadow-inner">
          {/* User Info */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-indigo-700 border-b border-indigo-300 pb-1">
              <FaUser /> User Info
            </h3>
            <p className="mb-1 text-gray-800">
              <strong>Name:</strong> {booking.userId?.name || "N/A"}
            </p>
            <p className="mb-1 flex items-center gap-1 text-gray-700 text-sm">
              <FaEnvelope className="text-indigo-400" />
              {booking.userId?.email || "N/A"}
            </p>
            <p className="mb-1 flex items-center gap-1 text-gray-700 text-sm">
              <FaPhone className="text-indigo-400" />
              {booking.userId?.phone || "N/A"}
            </p>
          </section>

          {/* Vehicle Info */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-indigo-700 border-b border-indigo-300 pb-1">
              <FaCar /> Vehicle Info
            </h3>
            <p className="mb-1 text-gray-800 text-sm">
              <strong>Name:</strong> {booking.vehicleId?.vehicleName || "N/A"}
            </p>
            <p className="mb-1 text-gray-700 text-sm">
              <strong>Type:</strong> {booking.vehicleId?.vehicleType || "N/A"}
            </p>
            <p className="mb-1 text-gray-700 text-sm">
              <strong>Price/Trip:</strong>{" "}
              {booking.vehicleId ? `Rs. ${booking.vehicleId.pricePerTrip}` : "N/A"}
            </p>
            {booking.vehicleId?.image && (
              <img
                src={booking.vehicleId.image}
                alt={booking.vehicleId.vehicleName || "Vehicle Image"}
                className="mt-3 rounded-md h-28 w-full object-cover shadow-md border border-indigo-200"
              />
            )}
          </section>

          {/* Booking Info */}
          <section>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-indigo-700 border-b border-indigo-300 pb-1">
              <FaCalendarAlt /> Booking Info
            </h3>
            <p className="mb-1 text-sm">
              <strong>Status:</strong>{" "}
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${statusClass}`}
              >
                {booking.status || "N/A"}
              </span>
            </p>
            <p className="mb-1 flex items-center gap-1 text-gray-800 text-sm">
              <FaCalendarAlt className="text-indigo-400" />
              <strong>Start:</strong> {formatDate(booking.startDate)}
            </p>
            <p className="mb-1 flex items-center gap-1 text-gray-800 text-sm">
              <FaCalendarAlt className="text-indigo-400" />
              <strong>End:</strong> {formatDate(booking.endDate)}
            </p>
            <p className="mb-1 flex items-center gap-1 text-gray-800 text-sm">
              <FaMapMarkerAlt className="text-indigo-400" />
              <strong>Pickup:</strong> {booking.pickupLocation || "N/A"}
            </p>
            <p className="mb-1 flex items-center gap-1 text-gray-800 text-sm">
              <FaMapMarkerAlt className="text-indigo-400" />
              <strong>Drop:</strong> {booking.dropLocation || "N/A"}
            </p>
            <p className="mt-3 text-lg font-bold text-indigo-900 flex items-center gap-1">
              <FaDollarSign /> Rs. {booking.totalPrice || "N/A"}
            </p>
          </section>
        </div>
      </div>

      {/* FadeIn animation */}
      <style>{`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(20px);}
          to {opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default BookingDetailsModal;
