import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Logo,
  NavLinks,
  SearchBar,
  ThemeToggle,
  AuthButtons,
  MobileMenu,
  MenuToggle,
} from "./index.js";
import { useSelector } from "react-redux";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("theme") === "dark" ? true : false
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      localStorage.setItem("theme", "dark");
      root.classList.remove("light", "dark");
      root.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      root.classList.remove("light", "dark");
      root.classList.add("light");
    }
  }, [darkMode]);

  const fetchedPosts = useSelector((state) => state.post.allPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchedPosts([]);
      return;
    }

    const searchResult = fetchedPosts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchedPosts(searchResult);
  }, [searchQuery, fetchedPosts]);

  return (
    <motion.header
      className="sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 bg-white/95
      border-gray-200 dark:bg-gray-900/95 dark:border-gray-700"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <NavLinks />
          <div className="flex items-center space-x-4">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchedPosts={searchedPosts}
              setSearchedPosts={setSearchedPosts}
              fetchedPosts={fetchedPosts}
            />

            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <AuthButtons isLoggedIn={isLoggedIn} currentUser={currentUser} />
            <MenuToggle isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} />}
      </AnimatePresence>
    </motion.header>
  );
}
