// src/layouts/MainLayout.jsx
import React from 'react';
import Sidebar from '../../layouts/admin/Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <main className="flex-1 min-w-0 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
