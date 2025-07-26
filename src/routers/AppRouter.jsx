import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import Dashboard from "../pages/admin/Dashboard";
import HomePage from "../pages/HomePage";
import MyBookingPage from "../pages/MyBookingPage";
import UserTable from "../components/admin/UserTable";
import VehicleDetailsTable from "../components/admin/VehicleDetailsTable";
import CreateVehicleForm from "../pages/admin/CreateVehicleForm";
import MainLayout from "../layouts/admin/MainLayout";
import UserLayout from "../layouts/UserLayout";
import BookingTable from "../components/BookingTable";
import VehicleDetailPage from "../components/VehicleDetailsPage/VehicleDetailsPage";
import SearchResultsPage from "../components/Search/SearchResultsPage";


import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import SavedVehicle from "../pages/SavedVehicle";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Admin routes */}
      <Route path="/admin/*" element={<AdminRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserTable />} />
          <Route path="vehicles" element={<VehicleDetailsTable />} />
          <Route path="vehicles/create" element={<CreateVehicleForm />} />
          <Route path="bookings" element={<BookingTable />} />
        </Route>
      </Route>

      {/* User routes
      <Route element={<UserRoute />}>
        <Route element={<UserLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/mybooking" element={<MyBookingPage />} />
        </Route>
      </Route> */}
      <Route element={<UserRoute />}>
        <Route element={<UserLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/mybooking" element={<MyBookingPage />} />
          <Route path="/savedvehicle" element={<SavedVehicle />} />
          <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
          <Route path="/search" element={<SearchResultsPage />} /> 
        </Route>
      </Route>


      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
