import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="border-t bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-500 dark:bg-blue-600">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                BlogPost
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-md text-gray-600 dark:text-gray-400">
              A modern platform for sharing ideas, stories, and insights. Join
              our community of writers and readers from around the world.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="border-t  mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2025 BlogPost. All rights reserved. Manikant.
              </p>
              <div className="flex space-x-4 mt-4 sm:mt-0">
                {["Twitter", "LinkedIn", "GitHub"].map((platform) => (
                  <motion.button
                    key={platform}
                    className="text-sm transition-colors hover:text-blue-600 text-gray-600 dark:text-gray-400"
                    whileHover={{ y: -2 }}
                  >
                    {platform}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
