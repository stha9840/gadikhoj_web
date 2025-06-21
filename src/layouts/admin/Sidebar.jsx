import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaChartLine, FaUser, FaCar, FaBook, FaMoneyBillWave, FaInbox, FaCog
} from 'react-icons/fa';

const SidebarItem = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 text-sm font-medium ${
        isActive ? 'bg-indigo-600 text-white shadow' : 'text-indigo-100 hover:bg-indigo-700'
      }`
    }
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

const Sidebar = () => (
  <aside className="w-64 h-full bg-indigo-900 p-5 flex flex-col gap-8 shrink-0">
    <div>
      <h2 className="text-gray-300 text-sm font-semibold mb-2 px-2">MAIN</h2>
      <div className="flex flex-col gap-2">
        <SidebarItem icon={<FaChartLine />} label="Dashboard" to="/admin/dashboard" />
        <SidebarItem icon={<FaUser />} label="Users" to="/admin/users" />
        <SidebarItem icon={<FaCar />} label="Vehicles" to="/admin/vehicles" />
        <SidebarItem icon={<FaBook />} label="Bookings" to="/admin/bookings" />
      </div>
    </div>

    <div>
      <h2 className="text-gray-300 text-sm font-semibold mb-2 px-2">OTHER</h2>
      <div className="flex flex-col gap-2">
        <SidebarItem icon={<FaMoneyBillWave />} label="Payments" to="/admin/payments" />
        <SidebarItem icon={<FaInbox />} label="Messages" to="/admin/messages" />
        <SidebarItem icon={<FaChartLine />} label="Reports" to="/admin/reports" />
      </div>
    </div>

    <div className="mt-auto">
      <h2 className="text-gray-300 text-sm font-semibold mb-2 px-2">SETTINGS</h2>
      <SidebarItem icon={<FaCog />} label="Settings" to="/admin/settings" />
    </div>
  </aside>
);

export default Sidebar;
