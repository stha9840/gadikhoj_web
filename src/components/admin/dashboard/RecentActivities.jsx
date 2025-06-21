import React from "react";
import { useAdminVehicles } from "../../../hooks/admin/useAdminVehicle";
import { useAdminUser } from "../../../hooks/admin/useAdminUser";

const RecentActivity = () => {
  const { vehicles } = useAdminVehicles();
  const { data: usersData } = useAdminUser(1, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Latest Users */}
      <div className="bg-gradient-to-br from-white via-indigo-50 to-indigo-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-indigo-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-indigo-900 uppercase tracking-wider select-none">
            Latest Users
          </h2>
          <span className="text-xs font-medium text-indigo-500 tracking-wide select-none">
            Last 5
          </span>
        </div>

        {/* Username label */}
        <div className="mb-3 px-3 py-1 rounded-md bg-indigo-200 inline-block text-indigo-800 font-semibold text-xs uppercase tracking-wide select-none">
          Username
        </div>

        <ul className="divide-y divide-indigo-300 text-indigo-900 text-sm font-medium leading-relaxed">
          {usersData?.data?.slice(0, 5).map((user) => (
            <li
              key={user._id}
              className="py-2 px-3 rounded-md hover:bg-indigo-100 transition-colors cursor-default select-text"
            >
              {user.username}
            </li>
          ))}

          {!usersData?.data?.length && (
            <li className="text-xs italic text-indigo-400 py-2 px-3 select-none">
              No users found
            </li>
          )}
        </ul>
      </div>

      {/* Latest Vehicles */}
      <div className="bg-gradient-to-br from-white via-indigo-50 to-indigo-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-indigo-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-indigo-900 uppercase tracking-wider select-none">
            Latest Vehicles
          </h2>
          <span className="text-xs font-medium text-indigo-500 tracking-wide select-none">
            Last 5
          </span>
        </div>

        {/* Header Row */}
        <div className="flex justify-between items-center mb-3 px-3 py-1 rounded-md bg-indigo-200 text-indigo-800 font-semibold text-xs uppercase tracking-wide select-none">
          <span>Vehicle Name</span>
          <span>Rate per Trip</span>
        </div>

        <ul className="divide-y divide-indigo-300 text-indigo-900 text-sm font-medium leading-relaxed">
          {vehicles?.slice(0, 5).map((v) => (
            <li
              key={v._id}
              className="flex justify-between items-center py-2 px-3 rounded-md hover:bg-indigo-100 transition-colors cursor-default select-text"
            >
              <span>{v.vehicleName}</span>
              <span className="text-indigo-700 text-xs font-semibold">
                Rs. {v.pricePerTrip}
              </span>
            </li>
          ))}

          {!vehicles?.length && (
            <li className="text-xs italic text-indigo-400 py-2 px-3 select-none">
              No vehicles found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivity;
