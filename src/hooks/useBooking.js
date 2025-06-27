import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllBookingService,
  getMyBookingsService,
  createBookingService,
  cancelBookingService,
} from "../services/bookingService";
import { toast } from "react-toastify";


// 🔹 For admin: get all bookings
export const useAdminBookings = () => {
  const query = useQuery({
    queryKey: ["admin_bookings"],
    queryFn: getAllBookingService,
  });

  const bookings = query.data || [];

  return {
    ...query,
    bookings,
  };
};


// 🔹 For user: get their own bookings
export const useUserBookings = () => {
  const query = useQuery({
    queryKey: ["user_bookings"],
    queryFn: getMyBookingsService,
  });

  const bookings = query.data || [];

  return {
    ...query,
    bookings,
  };
};


// 🔹 Create a booking
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create_booking"],
    mutationFn: createBookingService,
    onSuccess: () => {
      toast.success("Booking created successfully");
      queryClient.invalidateQueries(["user_bookings"]);
    },
    onError: (err) => {
      toast.error(err.message || "Booking failed");
    },
  });
};


// 🔹 Cancel a booking
export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cancel_booking"],
    mutationFn: cancelBookingService,
    onSuccess: () => {
      toast.success("Booking cancelled");
      queryClient.invalidateQueries(["user_bookings", "admin_bookings"]);
    },
    onError: (err) => {
      toast.error(err.message || "Cancellation failed");
    },
  });
};
