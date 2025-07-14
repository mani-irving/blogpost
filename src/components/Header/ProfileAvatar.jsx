import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function ProfileAvatar({ onClick }) {
  return (
    <motion.div
      className="w-8 h-8 rounded-full bg-gradient-to-r
        from-blue-500 to-purple-600 flex items-center justify-center cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <User className="w-4 h-4 text-white" />
    </motion.div>
  );
}
