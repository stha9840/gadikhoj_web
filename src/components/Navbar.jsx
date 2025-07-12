import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
import logo from "../assets/logo.png";

const navItems = [
  { name: "Home", path: "/home" },
  { name: "My Bookings", path: "/mybooking" },
  { name: "Saved Vehicles", path: "/savedvehicle" },
  { name: "About Us", path: "/about" },
  { name: "Profile", path: "/profile" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/home" className="flex items-center">
          <img src={logo} alt="Car Rental Logo" className="h-8 w-auto" />
        </NavLink>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-10 text-sm font-medium">
          {navItems.map(({ name, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-500 hover:text-blue-600 transition"
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Search bar */}
        <div className="hidden md:flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search vehicles"
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
          <button className="bg-blue-600 text-white text-sm rounded-md px-4 py-1.5 hover:bg-blue-700 transition">
            Search
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-4">
          <ul className="flex flex-col space-y-3 text-sm font-medium">
            {navItems.map(({ name, path }) => (
              <li key={name}>
                <NavLink
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-500 hover:text-blue-600 transition"
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search vehicles"
              className="flex-grow border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <button className="bg-blue-600 text-white rounded-md px-4 py-1.5 text-sm hover:bg-blue-700 transition">
              Search
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
