import React, { useState } from "react";
import { useAdminBookings, useCancelBooking } from "../hooks/useBooking";
import { FaTimesCircle } from "react-icons/fa";
import BookingDetailsModal from "../components/auth/BookingDetailsModal";

const BookingTable = () => {
  const { bookings, isLoading, isError, error } = useAdminBookings();
  const cancelBookingMutation = useCancelBooking();
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBookingMutation.mutate(id);
    }
  };

  if (isLoading) return <p>Loading bookings...</p>;
  if (isError) return <p>Error loading bookings: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">
                Booking ID: {booking._id}
              </h3>
              <p><strong>User:</strong> {booking.userId?.email}</p>
              <p><strong>Vehicle:</strong> {booking.vehicleId?.vehicleName}</p>
              <p><strong>Start:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
              <p><strong>End:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong>
                <span className={`ml-1 font-semibold ${
                  booking.status === "cancelled"
                    ? "text-red-600"
                    : booking.status === "completed"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}>
                  {booking.status}
                </span>
              </p>
              <p><strong>Total Price:</strong> Rs. {booking.totalPrice}</p>

              <div className="mt-4 flex justify-between items-center">
                {booking.status !== "cancelled" ? (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    disabled={cancelBookingMutation.isLoading}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <FaTimesCircle /> Cancel
                  </button>
                ) : (
                  <span className="text-gray-400">Cancelled</span>
                )}

                <button
                  onClick={() => setSelectedBooking(booking)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Use Modal Component */}
      <BookingDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
};

export default BookingTable;
