import React from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function MenuToggle({ isMenuOpen, setIsMenuOpen }) {
  return (
    <motion.button
      className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </motion.button>
  );
}
