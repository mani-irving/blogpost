import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MobileMenu({ setIsMenuOpen }) {
  const navigate = useNavigate();
  const menuRef = useRef();

  const links = [
    { label: "Home", path: "/" },
    { label: "Explore", path: "/explore" },
    { label: "Categories", path: "/category" },
    { label: "About", path: "/about" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      className="md:hidden border-t bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      ref={menuRef}
    >
      <nav className="p-4 space-y-2">
        {links.map(({ label, path }) => (
          <motion.button
            key={label}
            className="block w-full text-left py-2 px-3 rounded-lg transition-colors
             text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            whileHover={{ x: 5 }}
            onClick={() => {
              setIsMenuOpen(false);
              navigate(path); // ✅ Add this!
            }}
          >
            {label}
          </motion.button>
        ))}
      </nav>
    </motion.div>
  );
}
