// src/layout/UserLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
      <Navbar />
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <Outlet />
      </div>
    </>
  );
}
