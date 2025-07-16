import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

export default function ProfileLayout({ children }) {
  return (
    <motion.section
      className="bg-gradient-to-br from-blue-50 via-white to-purple-50 
              dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="max-w-2xl mx-auto min-h-screen border-r border-l 
        border-gray-200 dark:border-gray-700"
      >
        {children}
      </div>
    </motion.section>
  );
}
