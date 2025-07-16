import React from "react";
import { Link } from "react-router-dom"; // Optional: use only if posts have detail pages

export default function SearchedResult({ $id, title, content }) {
  return (
    <Link
      to={`/post/${$id}`} // Optional: change path according to your route
      className="block px-4 py-3 border-b border-gray-200 dark:border-gray-700 
      hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
        {title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
        {content}
      </p>
    </Link>
  );
}
