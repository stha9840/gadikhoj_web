import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const ProfileDetails = ({ username, email, phone, bio, createdAt }) => {
  // Format createdAt date nicely if present
  const formattedDate = createdAt
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(createdAt))
    : null;

  return (
    <div className="text-gray-700 space-y-4">
      <p>
        <strong>Username:</strong> {username}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Phone:</strong> {phone || "Not available"}
      </p>
      <p>
        <strong>Bio:</strong> {bio || "No bio provided."}
      </p>
      {/* {formattedDate && (
        <p className="flex items-center gap-2 text-gray-500">
          <FaCalendarAlt />
          <span>Account created: {formattedDate}</span>
        </p>
      )} */}
    </div>
  );
};

export default ProfileDetails;
