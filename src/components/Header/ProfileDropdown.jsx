import React from "react";
import { motion } from "framer-motion";
import { LogOut, BookUser } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { resetConnections } from "../../store/connectionsSlice";
import authService from "../../appwrite/authService";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const success = await authService.logout();
      if (success) {
        dispatch(logout());
        dispatch(resetConnections());
      }
      navigate("/");
    } catch (error) {
      throw error;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-12 right-0 w-60 rounded-xl shadow-lg z-50 border
        bg-white dark:bg-gray-900 dark:border-gray-700 border-gray-200"
    >
      <div className="p-4">
        <p className="text-sm font-semibold text-gray-800 dark:text-white">
          {currentUser?.name || "Anonymous User"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {currentUser?.email || "email@example.com"}
        </p>
      </div>
      <div className="border-t dark:border-gray-700" />

      <button
        onClick={() => navigate(`/user/${currentUser.$id}`)}
        className="w-full text-left px-4 py-3 text-sm font-medium text-blue-500 hover:bg-blue-200 dark:hover:bg-blue-500/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <BookUser className="w-4 h-4" />
          <div className="flex items-center gap-2">Profile</div>
        </div>
      </button>

      <div className="border-t dark:border-gray-700" />

      <button
        onClick={logoutUser}
        className="w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-100 dark:hover:bg-red-500/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </div>
      </button>
    </motion.div>
  );
}
