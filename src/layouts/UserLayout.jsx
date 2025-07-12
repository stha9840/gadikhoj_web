// src/layout/UserLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // <-- add this
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-[80vh]"> {/* Leave room above footer */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
