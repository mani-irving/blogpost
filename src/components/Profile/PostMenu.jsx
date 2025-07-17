import React from "react";

export default function PostMenu({ handleDelete }) {
  return (
    <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md z-20">
      <button className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Delete
      </button>
    </div>
  );
}
