import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CreatePostButton from "./CreatePostButton";
import ProfileAvatar from "./ProfileAvatar";
import ProfileDropdown from "./ProfileDropdown";

export default function AuthButtons({ isLoggedIn, setCurrentView }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoggedIn) {
    return (
      <motion.button
        onClick={() => navigate("/login")}
        className="px-4 py-2 rounded-lg font-medium transition-all duration-200
        bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Sign In
      </motion.button>
    );
  }

  return (
    <div className="relative flex items-center space-x-2" ref={dropdownRef}>
      <CreatePostButton setCurrentView={setCurrentView} />
      <ProfileAvatar onClick={() => setDropdownOpen((prev) => !prev)} />
      {dropdownOpen && <ProfileDropdown />}
    </div>
  );
}
