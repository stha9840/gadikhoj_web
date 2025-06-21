import React from 'react';
import TotalCarsListed from '../../components/admin/dashboard/TotalCarsListed';
import TotalUsers from '../../components/admin/dashboard/TotalUsers';
import CurrentBookings from '../../components/admin/dashboard/CurrentBookings';
import NotificationsCard from '../../components/admin/dashboard/NotificationsCard';
import RevenueSummary from '../../components/admin/dashboard/RevenueSummary';

const Dashboard = () => {
  return (
    <div className="w-full max-w-full">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <TotalCarsListed />
        <TotalUsers />
        <CurrentBookings />
        <NotificationsCard />
      </div>
      <RevenueSummary />
    </div>
  );
};

export default Dashboard;
