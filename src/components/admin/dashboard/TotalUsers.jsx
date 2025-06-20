// src/components/dashboard/TotalUsers.jsx
import React from 'react';
import { FaUser } from 'react-icons/fa';

const TotalUsers = () => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
    <div className="text-3xl text-indigo-600"><FaUser /></div>
    <div className="text-sm font-medium">Total Users</div>
  </div>
);

export default TotalUsers;
