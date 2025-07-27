import React, { useState, useEffect, useRef } from "react";
import {
  useUserProfile,
  useUpdateUserProfile,
  useDeleteUserProfile,
} from "../hooks/useProfilePage";
import DeleteProfileModal from "../components/profile/DeleteProfileModal";
import LogoutModal from "../components/profile/LogoutModal";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaCamera,
  FaSignOutAlt,
  FaTrashAlt,
  FaSave,
  FaTimes,
  FaCalendarAlt,
} from "react-icons/fa";

import ProfileDetails from "../components/profile/ProfileDetails"; // import here

const UserProfilePage = () => {
  const { data: user, isLoading, error } = useUserProfile();
  const {
    mutate: updateProfile,
    isPending,
    error: updateError,
  } = useUpdateUserProfile();
  const { mutate: deleteProfile, isPending: isDeleting } =
    useDeleteUserProfile();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Store createdAt date from user data
  const [createdAt, setCreatedAt] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
      });
      setProfilePic(user.profilePic || null);
      setCoverPhoto(user.coverPhoto || null);

      if (user.createdAt) {
        setCreatedAt(new Date(user.createdAt));
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setCoverPhoto(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const handleDelete = () => {
    deleteProfile(undefined, {
      onSuccess: () => {
        setModalOpen(false);
        navigate("/login");
      },
    });
  };

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutConfirmed = () => {
    setIsLoggingOut(true);
    localStorage.clear();
    queryClient.clear();
    setIsLoggingOut(false);
    setLogoutModalOpen(false);
    navigate("/login");
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-center text-gray-500 text-lg animate-pulse">
          Loading profile...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-md mx-auto p-6 bg-red-100 text-red-700 rounded-lg shadow-md text-center">
          Error loading profile: {error.message}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={openLogoutModal}
                className="flex items-center gap-2 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md font-semibold transition-transform transform hover:scale-105"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Profile Hero */}
        <div className="relative h-64 rounded-2xl shadow-lg overflow-hidden group mb-8">
          <img
            src={coverPhoto || "https://picsum.photos/1200/400"}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={() => coverInputRef.current.click()}
            className="absolute top-4 right-4 bg-white/80 text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            title="Change Cover Photo"
          >
            <FaCamera size={20} />
          </button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={coverInputRef}
            onChange={handleCoverPhotoChange}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 -mt-32 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="relative group">
                  <img
                    src={profilePic || "https://i.pravatar.cc/300"}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button
                    onClick={() => profileInputRef.current.click()}
                    className="absolute bottom-2 right-2 bg-blue-600 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-700"
                    title="Change Profile Picture"
                  >
                    <FaEdit />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={profileInputRef}
                    onChange={handleProfilePicChange}
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mt-4">
                  {formData.username}
                </h2>
                <p className="text-gray-500">@{formData.username}</p>
                <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                  {formData.bio || "No bio provided."}
                </p>

                {/* ACCOUNT CREATED DATE */}
                {createdAt && (
                  <div className="mt-4 flex items-center gap-2 text-gray-500 text-sm">
                    <FaCalendarAlt />
                    <span>
                      Account created:{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(createdAt)}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-8 border-t border-gray-200 pt-6 space-y-4">
                <div className="flex items-center gap-4 text-gray-600">
                  <FaEnvelope className="text-blue-500" size={20} />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <FaPhone className="text-blue-500" size={20} />
                  <span>{formData.phone || "Not available"}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Account Actions
              </h3>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow font-semibold transition-transform transform hover:scale-105"
              >
                <FaTrashAlt />
                Delete Account
              </button>
            </div>
          </div>

          {/* Right Column - Profile Details or Edit Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Profile Details
              </h2>
              {isEditing ? (
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  title="Cancel Edit"
                >
                  <FaTimes size={24} />
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="Edit Profile"
                >
                  <FaEdit size={24} />
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </div>

                {updateError && (
                  <p className="text-red-600">{updateError.message}</p>
                )}

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    disabled={isPending}
                    className="py-2 px-6 rounded-md border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="py-2 px-6 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center gap-2"
                  >
                    <FaSave />
                    {isPending ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            ) : (
              // Here is where we replaced the inline JSX with <ProfileDetails />
              <ProfileDetails
                username={formData.username}
                email={formData.email}
                phone={formData.phone}
                bio={formData.bio}
                createdAt={createdAt}
              />
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteProfileModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onLogout={handleLogoutConfirmed}
        isLoggingOut={isLoggingOut}
      />
    </div>
  );
};

export default UserProfilePage;
