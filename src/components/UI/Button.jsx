import React from "react";

export default function Button({ children, type = "submit", ...props }) {
  return (
    <button
      type={type}
      className="w-full py-2 px-4 rounded-lg font-semibold transition duration-200
    bg-blue-500 text-white hover:bg-blue-600
    dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
      {...props}
    >
      {children}
    </button>
  );
}
