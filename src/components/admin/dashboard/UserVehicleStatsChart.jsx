import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

import { useAdminUser } from "../../../hooks/admin/useAdminUser";  // <-- use this instead of useUserCount
import { useAdminVehicles } from "../../../hooks/admin/useAdminVehicle";

const UserVehicleStatsChart = () => {
  // Fetch users with a large limit to get all users at once (adjust as needed)
  const { data: userData, isLoading: userLoading, isError: userError } = useAdminUser(1, 1000);
  const { vehicles = [], isLoading: vehicleLoading, isError: vehicleError } = useAdminVehicles();

  const isLoading = userLoading || vehicleLoading;
  const isError = userError || vehicleError;

  // Count users from fetched user array length
  const totalUsers = userData?.data?.length || 0;

  const chartData = [
    { name: "Users", count: totalUsers },
    { name: "Vehicles", count: vehicles.length || 0 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">Users vs Vehicles</h2>

      {isLoading ? (
        <div className="text-center py-16 text-gray-500">Loading chart...</div>
      ) : isError ? (
        <div className="text-center py-16 text-red-500">Failed to load chart data.</div>
      ) : (
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap={60}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#f3f4f6", borderColor: "#e5e7eb" }}
                labelStyle={{ color: "#4f46e5", fontWeight: "bold" }}
              />
              <Bar dataKey="count" fill="url(#colorUv)" radius={[8, 8, 0, 0]}>
                <LabelList dataKey="count" position="top" className="text-xs" />
              </Bar>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#A5B4FC" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default UserVehicleStatsChart;
