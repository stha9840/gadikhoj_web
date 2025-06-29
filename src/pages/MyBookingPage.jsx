import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../api/Api";
import CancelBookingModal from "../components/auth/CancelBookingModal";
import UndoCancelModal from "../components/auth/UndoCancelModal";  // import it
import UpdateBookingModal from "../components/auth/UpdateBookingModal";

const fetchUserBookings = async () => {
  const { data } = await axios.get("/bookings/my");
  return data;
};

export default function MyBookingPage() {
  const queryClient = useQueryClient();
  const [cancelModalBookingId, setCancelModalBookingId] = useState(null);
  const [undoModalBookingId, setUndoModalBookingId] = useState(null); // New state for Undo modal
  const [editingBooking, setEditingBooking] = useState(null);

  const {
    data: bookings,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user_bookings"],
    queryFn: fetchUserBookings,
  });

  const openEditModal = (booking) => setEditingBooking(booking);
  const closeEditModal = () => setEditingBooking(null);

  if (isLoading)
    return (
      <p className="text-center mt-6 text-gray-500">Loading your bookings...</p>
    );
  if (isError)
    return (
      <p className="text-center mt-6 text-red-500">Error: {error.message}</p>
    );
  if (!bookings.length)
    return (
      <p className="text-center mt-6 text-gray-500 text-lg">
        You have no bookings yet.
      </p>
    );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">My Bookings</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200 overflow-hidden flex flex-col hover:scale-[1.02] duration-200 max-w-xs"
            >
              <img
                src={
                  booking.vehicleId?.filepath
                    ? `/${booking.vehicleId.filepath}`
                    : "/placeholder.jpg"
                }
                alt={booking.vehicleId?.vehicleName || "Vehicle"}
                className="w-full h-32 object-cover"
              />

              <div className="p-4 flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-md text-gray-800 truncate">
                    {booking.vehicleId?.vehicleName || "Unnamed Vehicle"}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      booking.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    {booking.status || "confirmed"}
                  </span>
                </div>

                <div className="text-sm text-gray-700 space-y-1 mb-4">
                  <p>
                    <strong>From:</strong>{" "}
                    {new Date(booking.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>To:</strong>{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Pickup:</strong> {booking.pickupLocation || "N/A"}
                  </p>
                  <p>
                    <strong>Drop:</strong> {booking.dropLocation || "N/A"}
                  </p>
                  <p className="text-green-600 font-semibold">
                    Total: NPR {booking.totalPrice}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 space-y-2">
                {booking.status === "cancelled" ? (
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:opacity-90 transition font-medium"
                    onClick={() => setUndoModalBookingId(booking._id)} // open Undo modal
                  >
                    Undo Cancel
                  </button>
                ) : (
                  <button
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-lg hover:opacity-90 transition font-medium disabled:opacity-50"
                    onClick={() => setCancelModalBookingId(booking._id)}
                  >
                    Cancel Booking
                  </button>
                )}

                <button
                  className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2 rounded-lg hover:opacity-90 transition font-medium"
                  onClick={() => openEditModal(booking)}
                  disabled={booking.status === "cancelled"}
                >
                  Edit Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel booking modal */}
      {cancelModalBookingId && (
        <CancelBookingModal
          bookingId={cancelModalBookingId}
          onClose={() => setCancelModalBookingId(null)}
        />
      )}

      {/* Undo cancel booking modal */}
      {undoModalBookingId && (
        <UndoCancelModal
          bookingId={undoModalBookingId}
          onClose={() => setUndoModalBookingId(null)}
        />
      )}

      {/* Edit booking modal */}
      <UpdateBookingModal
        bookingId={editingBooking?._id}
        showModal={!!editingBooking}
        onClose={closeEditModal}
        onSuccess={() => queryClient.invalidateQueries(["user_bookings"])}
      />
    </div>
  );
}
