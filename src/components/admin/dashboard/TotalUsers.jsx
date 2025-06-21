import React from "react";
import { FaUser } from "react-icons/fa";
import { useUserCount } from "../../../hooks/admin/useAdminUser"; 

const TotalUsers = () => {
  const { data, isLoading, isError, error } = useUserCount();

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    console.error("Error loading total users:", error);
    return <div>Error loading total users</div>;
  }

  // Defensive: check data and total exist before rendering
  const totalUsers = data?.total ?? 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
      <div className="text-3xl text-indigo-600">
        <FaUser />
      </div>
      <div>
        <div className="text-sm font-medium">Total Users</div>
        <div className="text-xl font-bold">{totalUsers}</div>
      </div>
    </div>
  );
};

export default TotalUsers;
