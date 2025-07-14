import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <motion.button
      onClick={() => setDarkMode((prev) => !prev)}
      className="p-2 rounded-lg transition-all duration-200 hover:bg-opacity-80
       bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-yellow-400"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </motion.button>
  );
}
