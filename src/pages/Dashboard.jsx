// Dashboard.jsx
import React from 'react';
import { FaCar, FaUser, FaBell, FaCalendarCheck, FaChartLine, FaCog, FaInbox, FaMoneyBillWave, FaBook } from 'react-icons/fa';

const SidebarItem = ({ icon, label }) => (
  <div className="flex items-center space-x-2 p-3 hover:bg-indigo-600 rounded-lg text-white cursor-pointer">
    {icon}
    <span>{label}</span>
  </div>
);

const Dashboard = () => {
  return (
    <div className="flex h-screen w-screen"> {/* full viewport width and height */}
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 p-4 space-y-6 text-white">
        <h2 className="text-xl font-bold">MAIN</h2>
        <SidebarItem icon={<FaChartLine />} label="Dashboard" />
        <SidebarItem icon={<FaUser />} label="User" />
        <SidebarItem icon={<FaCar />} label="Car Inventory" />
        <SidebarItem icon={<FaBook />} label="Booking" />
        <h2 className="text-xl font-bold mt-8">OTHER</h2>
        <SidebarItem icon={<FaMoneyBillWave />} label="Payments and Transactions" />
        <SidebarItem icon={<FaInbox />} label="Messages" />
        <SidebarItem icon={<FaChartLine />} label="Analytics & Reports" />
        <h2 className="text-xl font-bold mt-8">SETTING</h2>
        <SidebarItem icon={<FaCog />} label="Settings" />
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 bg-gray-100 p-6 overflow-auto">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card icon={<FaCar />} title="Total Cars Listed" />
          <Card icon={<FaUser />} title="Total Users" />
          <Card icon={<FaCalendarCheck />} title="Current Bookings" />
          <Card icon={<FaBell />} title="Notifications" />
        </div>

        {/* Revenue Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Revenue Summary</h2>
            <div className="space-x-2">
              <button className="bg-lime-400 text-black px-3 py-1 rounded">Week</button>
              <button className="bg-black text-white px-3 py-1 rounded">Day</button>
              <button className="bg-black text-white px-3 py-1 rounded">Month</button>
            </div>
          </div>
          {/* Placeholder for chart */}
          <div className="w-full h-48 bg-gradient-to-b from-indigo-200 to-white rounded-lg flex items-center justify-center text-indigo-700 font-medium">
            Chart Placeholder
          </div>
        </div>
      </main>
    </div>
  );
};

const Card = ({ icon, title }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
    <div className="text-3xl text-indigo-600">{icon}</div>
    <div className="text-sm font-medium">{title}</div>
  </div>
);

export default Dashboard;
