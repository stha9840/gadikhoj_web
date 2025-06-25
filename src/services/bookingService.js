import {
  getAllBookingApi,
  getMyBookingsApi,
  createBookingApi,
  cancelBookingApi,
} from "../api/bookingApi";

// Get all bookings (admin)
export const getAllBookingService = async () => {
  try {
    const response = await getAllBookingApi();
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch bookings" };
  }
};

// Get logged-in user's bookings
export const getMyBookingsService = async () => {
  try {
    const response = await getMyBookingsApi();
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch your bookings" };
  }
};

// Create a new booking
export const createBookingService = async (data) => {
  try {
    const response = await createBookingApi(data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to create booking" };
  }
};

// Cancel a booking
export const cancelBookingService = async (id) => {
  try {
    const response = await cancelBookingApi(id);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to cancel booking" };
  }
};
