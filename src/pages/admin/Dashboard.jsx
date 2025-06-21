import React from 'react';
import TotalCarsListed from '../../components/admin/dashboard/TotalCarsListed';
import TotalUsers from '../../components/admin/dashboard/TotalUsers';
import CurrentBookings from '../../components/admin/dashboard/CurrentBookings';
import NotificationsCard from '../../components/admin/dashboard/NotificationsCard';
import RevenueSummary from '../../components/admin/dashboard/RevenueSummary';
import UserVehicleStatsChart from '../../components/admin/dashboard/UserVehicleStatsChart';
import RecentActivity from '../../components/admin/dashboard/RecentActivities';

const Dashboard = () => {
  return (
    <div className="w-full max-w-full space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <TotalCarsListed />
        <TotalUsers />
        <CurrentBookings />
        <NotificationsCard />
      </div>

      <RevenueSummary />
      <UserVehicleStatsChart />
      <RecentActivity />
    </div>
  );
};

export default Dashboard;
