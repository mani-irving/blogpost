import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreatePostButton({ setCurrentView }) {
  const navigate = useNavigate();
  return (
    <motion.button
      className="hidden md:flex p-2 rounded-lg transition-all duration-200 bg-blue-500
        text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/explore")}
    >
      <Plus className="w-5 h-5" />
    </motion.button>
  );
}
