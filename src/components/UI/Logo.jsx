import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();
  return (
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/")}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-500 dark:bg-blue-600">
        <span className="text-white font-bold text-sm">B</span>
      </div>
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        BlogPost
      </span>
    </motion.div>
  );
}
