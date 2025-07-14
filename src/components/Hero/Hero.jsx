import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  return (
    <motion.section
      className="py-40 bg-gradient-to-br from-blue-50 via-white to-purple-50 
      dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Share Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ideas
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover amazing stories, insights, and ideas from writers around
            the world. Join our community of passionate creators.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/explore")}
            >
              Explore Posts
            </motion.button>
            <motion.button
              className="px-8 py-3 rounded-lg font-medium border-2 transition-all 
              duration-200 hover:shadow-lg border-gray-300 text-gray-700 hover:bg-gray-50 
              dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                isLoggedIn ? navigate("/explore") : navigate("/login")
              }
            >
              Start Writing
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
