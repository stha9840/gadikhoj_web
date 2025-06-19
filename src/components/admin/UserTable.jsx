import React, { useState } from 'react';
import { useAdminUser, useDeleteOneUser, useUpdateOneUser } from '../../hooks/admin/useAdminUser';

export default function UserTable() {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isPending, error } = useAdminUser(page, limit);
  const deleteMutation = useDeleteOneUser();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  const totalUsers = data?.total || 0;
  const totalPages = Math.ceil(totalUsers / limit);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          alert('User deleted successfully');
        },
        onError: (err) => {
          alert('Failed to delete user: ' + (err.message || 'Unknown error'));
        }
      });
    }
  };

  return (
    <div>
      <h2>User Table</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  onClick={() => handleDelete(user._id)}
                  disabled={deleteMutation.isLoading}
                >
                  {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: 10 }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span style={{ margin: '0 10px' }}>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
