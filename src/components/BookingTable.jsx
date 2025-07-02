import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useAdminBookings, useCancelBooking } from "../hooks/useBooking";
import BookingDetailsModal from "./auth/Booking/BookingDetailsModal";
import BookingDeleteModal from "./auth/Booking/BookingDeleteModal"; 

const BACKEND_URL = "http://localhost:5000";

const ActionsDropdown = ({ onView, onCancel, onEdit, onDelete, disabledCancel }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Actions menu"
        type="button"
      >
        <FaEllipsisV size={18} />
      </button>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <button
              onClick={() => {
                onView();
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              type="button"
            >
              View Details
            </button>
            <button
              onClick={() => {
                onCancel();
                setOpen(false);
              }}
              disabled={disabledCancel}
              className={`block w-full text-left px-4 py-2 ${
                disabledCancel
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-red-600 hover:bg-red-100 hover:text-red-800"
              }`}
              type="button"
            >
              Cancel Booking
            </button>
            <button
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-green-600 hover:bg-green-100 hover:text-green-800"
              type="button"
            >
              Edit Booking
            </button>
            <button
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-red-700 hover:bg-red-200 hover:text-red-900"
              type="button"
            >
              Delete Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const BookingTable = () => {
  const { bookings, isLoading, isError, error } = useAdminBookings();
  const cancelBookingMutation = useCancelBooking();
  const [selectedBooking, setSelectedBooking] = useState(null);

 // New state for delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBookingMutation.mutate(id);
    }
  };

  const handleEdit = (id) => {
    alert(`Edit booking ${id} clicked!`);
  };

  // ✅ Show modal instead of confirm
  const handleDelete = (booking) => {
    setBookingToDelete(booking);
    setDeleteModalOpen(true);
  };

  if (isLoading) return <p>Loading bookings...</p>;
  if (isError) return <p>Error loading bookings: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="relative bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition flex"
              style={{ minHeight: "140px", maxWidth: "700px", margin: "auto" }}
            >
              {/* Vehicle image on left */}
              {booking.vehicleId?.image ? (
                <img
                  src={`${BACKEND_URL}/uploads/${booking.vehicleId.image}`}
                  alt={booking.vehicleId.vehicleName || "Vehicle"}
                  className="w-28 h-28 rounded-lg object-cover mr-6 flex-shrink-0"
                />
              ) : (
                <div className="w-28 h-28 rounded-lg bg-gray-200 mr-6 flex-shrink-0 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <div className="flex-1 relative">
                <div className="absolute top-0 right-0">
                  <ActionsDropdown
                    onView={() => setSelectedBooking(booking)}
                    onCancel={() => handleCancel(booking._id)}
                    onEdit={() => handleEdit(booking._id)}
                    onDelete={() => handleDelete(booking)} 
                    disabledCancel={
                      cancelBookingMutation.isLoading ||
                      booking.status === "cancelled"
                    }
                  />
                </div>

                {/* Booking info */}
                <div className="space-y-3">
                  <div className="pb-2 border-b border-gray-200"></div>
                  <div className="grid grid-cols-3 gap-x-6 text-sm text-gray-700">
                    <div>
                      <p>
                        <span className="font-medium text-gray-900">User:</span>{" "}
                        {booking.userId?.email || "N/A"}
                      </p>
                      <p className="mt-1">
                        <span className="font-medium text-gray-900">Vehicle:</span>{" "}
                        {booking.vehicleId?.vehicleName || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p>
                        <span className="font-medium text-gray-900">Start:</span>{" "}
                        {new Date(booking.startDate).toLocaleDateString()}
                      </p>
                      <p className="mt-1">
                        <span className="font-medium text-gray-900">End:</span>{" "}
                        {new Date(booking.endDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex flex-col justify-between">
                      <p className="font-semibold text-gray-900">
                        Total Price: Rs. {booking.totalPrice || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        <span
                          className={`ml-1 font-semibold ${
                            booking.status === "cancelled"
                              ? "text-red-600"
                              : booking.status === "completed"
                              ? "text-green-600"
                              : "text-blue-600"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />

      {/* ✅ Delete Modal */}
      {deleteModalOpen && bookingToDelete && (
        <BookingDeleteModal
          bookingId={bookingToDelete._id}
          onClose={() => {
            setDeleteModalOpen(false);
            setBookingToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default BookingTable;
