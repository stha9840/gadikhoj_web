import axios from "../api";

//  Get all bookings (admin)
export const getAllBookingApi = (params) => axios.get("/bookings", { params });

//  Get bookings of the logged-in user
export const getMyBookingsApi = () => axios.get("/bookings/my");

// Create a booking
export const createBookingApi = (data) => axios.post("/bookings", data);

//  Cancel a booking
export const cancelBookingApi = (id) => axios.patch(`/bookings/${id}/cancel`);
