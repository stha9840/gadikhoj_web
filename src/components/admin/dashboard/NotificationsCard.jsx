// src/components/dashboard/NotificationsCard.jsx
import React from 'react';
import { FaBell } from 'react-icons/fa';

const NotificationsCard = () => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
    <div className="text-3xl text-indigo-600"><FaBell /></div>
    <div className="text-sm font-medium">Notifications</div>
  </div>
);

export default NotificationsCard;
