// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaCar, FaUser, FaBell, FaCalendarCheck, FaChartLine, FaCog, FaInbox, FaMoneyBillWave, FaBook } from 'react-icons/fa';

const SidebarItem = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-2 p-3 rounded-lg cursor-pointer 
      ${isActive ? 'bg-indigo-600 text-white' : 'text-white hover:bg-indigo-600'}`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

const Sidebar = () => (
  <aside className="w-64 bg-indigo-900 p-4 space-y-6 text-white">
    <h2 className="text-xl font-bold">MAIN</h2>
    <SidebarItem icon={<FaChartLine />} label="Dashboard" to="/admin/dashboard" />
    <SidebarItem icon={<FaUser />} label="User" to="/admin/user" />
    <SidebarItem icon={<FaCar />} label="Car Inventory" to="/admin/vehicles" />
    <SidebarItem icon={<FaBook />} label="Booking" />
    <h2 className="text-xl font-bold mt-8">OTHER</h2>
    <SidebarItem icon={<FaMoneyBillWave />} label="Payments and Transactions"/>
    <SidebarItem icon={<FaInbox />} label="Messages" to="" />
    <SidebarItem icon={<FaChartLine />} label="Analytics & Reports" to="" />
    <h2 className="text-xl font-bold mt-8">SETTING</h2>
    <SidebarItem icon={<FaCog />} label="Settings" to="" />
  </aside>
);

export default Sidebar;
