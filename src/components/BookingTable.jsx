import React from "react";
import { useAdminBookings, useCancelBooking } from "../hooks/useBooking";
import { FaTimesCircle } from "react-icons/fa";

const BookingTable = () => {
  const { bookings, isLoading, isError, error } = useAdminBookings();
  const cancelBookingMutation = useCancelBooking();

  if (isLoading) return <p>Loading bookings...</p>;
  if (isError) return <p>Error loading bookings: {error.message}</p>;

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBookingMutation.mutate(id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Booking ID</th>
            <th className="border border-gray-300 px-4 py-2">User Email</th>
            <th className="border border-gray-300 px-4 py-2">Vehicle</th>
            <th className="border border-gray-300 px-4 py-2">Start Date</th>
            <th className="border border-gray-300 px-4 py-2">End Date</th>
            <th className="border border-gray-300 px-4 py-2">Pickup</th>
            <th className="border border-gray-300 px-4 py-2">Drop</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Total Price</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center p-4">
                No bookings found.
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{booking._id}</td>
                <td className="border border-gray-300 px-4 py-2">{booking.userId?.email || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{booking.vehicleId?.vehicleName || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(booking.startDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(booking.endDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">{booking.pickupLocation}</td>
                <td className="border border-gray-300 px-4 py-2">{booking.dropLocation}</td>
                <td className={`border border-gray-300 px-4 py-2 font-semibold ${
                  booking.status === "cancelled" ? "text-red-600" :
                  booking.status === "completed" ? "text-green-600" : "text-blue-600"
                }`}>
                  {booking.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">Rs. {booking.totalPrice}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {booking.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      disabled={cancelBookingMutation.isLoading}
                      title="Cancel Booking"
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTimesCircle size={20} />
                    </button>
                  )}
                  {booking.status === "cancelled" && <span className="text-gray-400">Cancelled</span>}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
