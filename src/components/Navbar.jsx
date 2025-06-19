import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/home" },
  { name: "My Bookings", path: "/bookings" },
  { name: "Saved Vehicles", path: "/saved" },
  { name: "About Us", path: "/about" },
  { name: "Profile", path: "/profile" },
];

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-md">
      <div className="text-2xl font-bold">CarRental</div>

      <ul className="flex gap-6 font-medium">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-blue-500 transition"
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search vehicles"
          className="px-3 py-1 border rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded">
          Search
        </button>
      </div>
    </nav>
  );
}
