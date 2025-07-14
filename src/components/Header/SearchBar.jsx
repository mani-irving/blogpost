import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react"; // adjust if you're using a different icon library

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <motion.div
      className="relative hidden lg:block"
      whileHover={{ scale: 1.02 }}
    >
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 
        w-4 h-4 text-gray-500 dark:text-gray-400 "
      />
      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 w-64 rounded-lg border transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-blue-500
        bg-white border-gray-300 text-gray-900 placeholder-gray-500
        dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
      />
    </motion.div>
  );
}
