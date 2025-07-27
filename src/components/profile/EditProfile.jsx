import React, { useState, useEffect } from "react";

const EditProfile = ({ initialData, onSave, isPending, onCancel }) => {
  const [formData, setFormData] = useState(initialData);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData(initialData);
    // Clear passwords on initialData change
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // New validation: if any password field filled, all must be filled
    if (
      currentPassword.length > 0 ||
      newPassword.length > 0 ||
      confirmPassword.length > 0
    ) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setError("Please fill out all password fields to change your password.");
        return;
      }
    }

    if (newPassword && newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    const payload = {
      ...formData,
      ...(newPassword ? { currentPassword, newPassword } : {}),
    };

    onSave(payload);
  };

  // Function to check if form is changed
  const isFormChanged = () => {
    // Check if any main form field changed
    const formFieldsChanged = Object.keys(initialData).some(
      (key) => formData[key] !== initialData[key]
    );

    // Check if any password field is filled
    const passwordChanged =
      currentPassword.length > 0 || newPassword.length > 0 || confirmPassword.length > 0;

    return formFieldsChanged || passwordChanged;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto mt-10 px-4 md:px-8 space-y-12"
    >
      {/* Header with Cancel button */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Edit Profile</h1>
          {formData?.createdAt && (
            <p className="text-sm text-gray-500 mt-1">
              Joined on{" "}
              {new Date(formData.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-600 hover:text-black px-4 py-2 transition"
          >
            Cancel
          </button>
        </div>
      </header>

      {/* About Section */}
      <section className="space-y-6">
        <h2 className="text-lg font-medium text-gray-800">About</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-black py-2 resize-none"
            />
          </div>
        </div>
      </section>

      {/* Password Section */}
      <section className="space-y-6 border-t pt-10">
        <h2 className="text-lg font-medium text-gray-800">Change Password</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-black py-2"
            />
          </div>
        </div>

        {/* Error message inside Change Password section */}
        {error && (
          <p className="text-red-600 text-sm font-medium mt-2">{error}</p>
        )}
      </section>

      {/* Save Changes Button at bottom */}
      <section className="flex justify-end mt-8">
        <button
          type="submit"
          disabled={isPending || !isFormChanged()}
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </section>
    </form>
  );
};

export default EditProfile;
