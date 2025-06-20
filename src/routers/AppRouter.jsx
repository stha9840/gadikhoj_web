import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
 import { useForm } from "react-hook-form";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";// optional
import Dashboard from "../pages/admin/Dashboard";
import HomePage from "../pages/HomePage";
import UserTable from "../components/admin/UserTable"; // adjust path if needed
import VehicleDetailsTable from "../components/admin/VehicleDetailsTable";
import CreateVehicleForm from "../pages/admin/CreateVehicleForm";
import MainLayout from "../layouts/admin/MainLayout";
import User from "../components/admin/User";
import CarInventory from "../components/admin/CarInventory";


const AppRouter = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/admin/*" element={< MainLayout/>} >
        <Route index element={<Dashboard/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="users" element={<UserTable />} />
        <Route path="vehicles" element={<VehicleDetailsTable />} />
        <Route path="vehicles/create" element={<CreateVehicleForm />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path = "/home" element = {<HomePage/>}></Route>
    </Routes>
  );
};

export default AppRouter;
