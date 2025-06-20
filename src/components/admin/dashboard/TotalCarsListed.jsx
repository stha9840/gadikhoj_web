// src/components/dashboard/TotalCarsListed.jsx
import React from 'react';
import { FaCar } from 'react-icons/fa';

const TotalCarsListed = () => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
    <div className="text-3xl text-indigo-600"><FaCar /></div>
    <div className="text-sm font-medium">Total Cars Listed</div>
  </div>
);

export default TotalCarsListed;
