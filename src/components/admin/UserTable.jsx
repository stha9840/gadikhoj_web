import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { useAdminUser, useDeleteOneUser } from '../../hooks/admin/useAdminUser';
import CreateUserModal from '../../components/auth/CreateUserModal'; // ✅ import the modal component
import UpdateUserModal from '../auth/UpdateUserModal';
export default function UserTable() {
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const limit = 5;
  const { data, isPending, error, refetch } = useAdminUser(page, limit);
  const deleteMutation = useDeleteOneUser();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          alert('User deleted successfully');
          refetch();
        },
        onError: (err) => alert('Failed to delete user: ' + (err.message || 'Unknown error')),
      });
    }
  };

  const openUpdateModal = (id) => {
    setSelectedUserId(id);
    setShowUpdateModal(true);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">User Table</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <FaPlus /> Add User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md w-full overflow-hidden">
        <table className="w-full text-left text-sm table-auto">
          <thead className="bg-indigo-50 text-indigo-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((user) => (
              <tr key={user._id} className="group transition-all hover:scale-[1.01] hover:shadow-md duration-200 ease-in-out">
                <td className="px-6 py-4 border-b">{user.username}</td>
                <td className="px-6 py-4 border-b">{user.email}</td>
                <td className="px-6 py-4 border-b capitalize">{user.role}</td>
                <td className="px-6 py-4 border-b">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={deleteMutation.isLoading}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 text-xs"
                    >
                      <FaTrash /> {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
                    </button>
                    <button
                      onClick={() => openUpdateModal(user._id)} // ✅ open update modal
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex items-center gap-1 text-xs"
                    >
                      <FaEdit /> Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {Math.ceil((data?.total || 0) / limit)}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil((data?.total || 0) / limit)))}
          disabled={page === Math.ceil((data?.total || 0) / limit)}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Create User Modal */}
      <CreateUserModal
        showModal={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          refetch();
        }}
      />

      {/* Update User Modal */}
      <UpdateUserModal
        showModal={showUpdateModal}
        userId={selectedUserId}
        onClose={() => {
          setShowUpdateModal(false);
          setSelectedUserId(null);
        }}
        onSuccess={refetch}
      />
    </div>
  );
}