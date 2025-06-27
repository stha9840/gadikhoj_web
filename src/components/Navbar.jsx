import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/home" },
  { name: "My Bookings", path: "/mybooking" },
  { name: "Saved Vehicles", path: "/saved" },
  { name: "About Us", path: "/about" },
  { name: "Profile", path: "/profile" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold text-blue-600">CarRental</div>

        <ul className="flex gap-6 font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-500 transition"
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
            className="px-3 py-1 border rounded outline-none"
          />
          <button className="bg-blue-500 text-white px-4 py-1 rounded">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
}

