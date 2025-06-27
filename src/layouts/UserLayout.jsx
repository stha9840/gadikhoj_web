// src/layout/UserLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
      <Navbar />
      <div className="pt-20"> {/* Just add top padding for navbar height */}
        <Outlet />
      </div>
    </>
  );
}

