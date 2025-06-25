// src/components/dashboard/RevenueSummary.jsx
import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const dayData = [
  { name: 'Mon', revenue: 1200 },
  { name: 'Tue', revenue: 1800 },
  { name: 'Wed', revenue: 1500 },
  { name: 'Thu', revenue: 2000 },
  { name: 'Fri', revenue: 2200 },
  { name: 'Sat', revenue: 1700 },
  { name: 'Sun', revenue: 1900 },
];

const weekData = [
  { name: 'Week 1', revenue: 8000 },
  { name: 'Week 2', revenue: 9500 },
  { name: 'Week 3', revenue: 10000 },
  { name: 'Week 4', revenue: 11000 },
];

const monthData = [
  { name: 'Jan', revenue: 40000 },
  { name: 'Feb', revenue: 38000 },
  { name: 'Mar', revenue: 42000 },
  { name: 'Apr', revenue: 46000 },
  { name: 'May', revenue: 50000 },
  { name: 'Jun', revenue: 53000 },
];

const RevenueSummary = () => {
  const [selectedRange, setSelectedRange] = useState('week');

  const getChartData = () => {
    switch (selectedRange) {
      case 'day':
        return dayData;
      case 'month':
        return monthData;
      case 'week':
      default:
        return weekData;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Revenue Summary</h2>
        <div className="space-x-2">
          <button
            onClick={() => setSelectedRange('week')}
            className={`px-3 py-1 rounded ${selectedRange === 'week' ? 'bg-lime-400 text-black' : 'bg-black text-white'}`}
          >
            Week
          </button>
          <button
            onClick={() => setSelectedRange('day')}
            className={`px-3 py-1 rounded ${selectedRange === 'day' ? 'bg-lime-400 text-black' : 'bg-black text-white'}`}
          >
            Day
          </button>
          <button
            onClick={() => setSelectedRange('month')}
            className={`px-3 py-1 rounded ${selectedRange === 'month' ? 'bg-lime-400 text-black' : 'bg-black text-white'}`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={getChartData()} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueSummary;
