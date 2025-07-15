import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NavLinks() {
  const navigate = useNavigate();

  const links = [
    { label: "Home", path: "/" },
    { label: "Explore", path: "/explore" },
    { label: "Categories", path: "/category" },
    { label: "About", path: "/about" },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {links.map(({ label, path }) => (
        <motion.button
          key={label}
          className="font-medium transition-colors hover:text-blue-600 text-gray-600 dark:text-gray-300"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          onClick={() => {
            navigate(path);
          }}
        >
          {label}
        </motion.button>
      ))}
    </nav>
  );
}
