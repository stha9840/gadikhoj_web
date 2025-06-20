import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";// optional
import Dashboard from "../pages/admin/Dashboard";
import HomePage from "../pages/HomePage";
import UserTable from "../components/admin/UserTable"; // adjust path if needed
import VehicleDetailsTable from "../components/admin/VehicelDetailsTable";


const AppRouter = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
       <Route path = "/home" element = {<HomePage/>}></Route>
      <Route path = "/dashboard" element = {<Dashboard/>}></Route>
      <Route path="/dashboard/users" element={<UserTable />} />
      <Route path="/dashboard/vehicles" element={<VehicleDetailsTable />} />


      {/* Optional: catch all unmatched routes */}
      
    </Routes>
  );
};

export default AppRouter;
