import React from "react";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Confirmation",
  description = "Are you sure you want to delete this item?",
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 mx-4 transform transition-transform duration-300 hover:scale-[1.03]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 shadow-md transition"
            autoFocus
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
