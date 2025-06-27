import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // install `lucide-react` if needed

const navItems = [
  { name: "Home", path: "/home" },
  { name: "My Bookings", path: "/mybooking" },
  { name: "Saved Vehicles", path: "/saved" },
  { name: "About Us", path: "/about" },
  { name: "Profile", path: "/profile" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">CarRental</div>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 font-medium">
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

        {/* Search bar */}
        <div className="hidden md:flex items-center gap-2">
          <input
            type="text"
            placeholder="Search vehicles"
            className="px-3 py-1 border rounded outline-none"
          />
          <button className="bg-blue-500 text-white px-4 py-1 rounded">
            Search
          </button>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-3 font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
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

          <div className="mt-4 flex flex-col gap-2">
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
      )}
    </nav>
  );
}
