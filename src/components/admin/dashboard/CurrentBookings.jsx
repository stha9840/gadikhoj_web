// src/components/dashboard/CurrentBookings.jsx
import React from 'react';
import { FaCalendarCheck } from 'react-icons/fa';

const CurrentBookings = () => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
    <div className="text-3xl text-indigo-600"><FaCalendarCheck /></div>
    <div className="text-sm font-medium">Current Bookings</div>
  </div>
);

export default CurrentBookings;
