// src/components/dashboard/RevenueSummary.jsx
import React from 'react';

const RevenueSummary = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Revenue Summary</h2>
      <div className="space-x-2">
        <button className="bg-lime-400 text-black px-3 py-1 rounded">Week</button>
        <button className="bg-black text-white px-3 py-1 rounded">Day</button>
        <button className="bg-black text-white px-3 py-1 rounded">Month</button>
      </div>
    </div>
    <div className="w-full h-48 bg-gradient-to-b from-indigo-200 to-white rounded-lg flex items-center justify-center text-indigo-700 font-medium">
      Chart Placeholder
    </div>
  </div>
);

export default RevenueSummary;
