import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import SearchedResult from "./SearchedResult";

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  searchedPosts,
  setSearchedPosts,
  fetchedPosts,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef();

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce search input (500ms)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!searchQuery.trim()) {
        setSearchedPosts([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      const result = fetchedPosts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchedPosts(result);
      setLoading(false);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, fetchedPosts]);

  return (
    <motion.div
      ref={searchRef}
      className="relative hidden lg:block"
      whileHover={{ scale: 1.02 }}
    >
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        className="pl-10 pr-4 py-2 w-64 rounded-lg border transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-blue-500
        bg-white border-gray-300 text-gray-900 placeholder-gray-500
        dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
      />

      {isFocused && (
        <div className="absolute z-20 w-full bg-white dark:bg-gray-900 mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-700">
          {loading ? (
            <p className="p-3 text-center text-gray-500 dark:text-gray-400">
              Loading...
            </p>
          ) : searchedPosts?.length > 0 ? (
            searchedPosts.map((post) => (
              <SearchedResult key={post.$id} {...post} />
            ))
          ) : searchQuery ? (
            <p className="p-3 text-center text-gray-500 dark:text-gray-400">
              No results found.
            </p>
          ) : null}
        </div>
      )}
    </motion.div>
  );
}
