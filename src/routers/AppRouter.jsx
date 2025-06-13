import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";// optional
import Dashboard from "../pages/Dashboard";

const AppRouter = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path = "/dashboard" element = {<Dashboard/>}></Route>

      {/* Optional: catch all unmatched routes */}
      
    </Routes>
  );
};

export default AppRouter;
