import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CreatePostForm from "../components/Explore/CreatePostForm";
import PostCard from "../components/Explore/PostCard";
import { useSelector, useDispatch } from "react-redux";
import postService from "../appwrite/postService";
import { Query } from "appwrite";
import { setAllConnections } from "../store/connectionsSlice";

export default function Explore() {
  const fetchedPosts = useSelector((state) => state.post.allPosts);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const currentUserId = currentUser?.$id;
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("All");
  const [openMenuId, setOpenMenuId] = useState(null);
  const allConnections = useSelector(
    (state) => state.connection.allConnections
  );

  useEffect(() => {
    async function fetchConnectionsOfUser() {
      try {
        const fetchedConnections = await postService.getAllConnections([
          Query.equal("follower", currentUserId),
        ]);
        if (fetchedConnections) {
          dispatch(setAllConnections(fetchedConnections.documents));
        }
      } catch (error) {
        console.log("Error fetching connections:", error.message);
      }
    }

    if (currentUserId) {
      fetchConnectionsOfUser();
    }
  }, [dispatch, currentUserId]);

  // It would give a time complexity of O(n*m) which would be huge for larger apps
  // const filteredPosts =
  //   activeTab === "Following"
  //     ? fetchedPosts.filter((post) =>
  //         allConnections.some((c) => c.following === post.userId)
  //       )
  //     : fetchedPosts;

  // new approach with time complexity of O(n+m)

  const followingIds = new Set(allConnections.map((c) => c.following));

  const filteredPosts =
    activeTab === "Following"
      ? fetchedPosts.filter((post) => followingIds.has(post.userId))
      : fetchedPosts;

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
        {/* Tab Switcher */}
        <div className="flex justify-around items-center p-4 border-b border-gray-800 dark:border-gray-400">
          <button
            onClick={() => setActiveTab("All")}
            className={`text-sm font-semibold px-4 py-2 rounded-full transition-all
              ${
                activeTab === "All"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
          >
            All Posts
          </button>

          {isLoggedIn && (
            <button
              onClick={() => setActiveTab("Following")}
              className={`text-sm font-semibold px-4 py-2 rounded-full transition-all
                ${
                  activeTab === "Following"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
            >
              Following
            </button>
          )}
        </div>

        {/* Create Post */}
        <CreatePostForm />

        {/* Post Feed */}
        {filteredPosts.length > 0 ? (
          filteredPosts.map(
            ({
              $id,
              title,
              content,
              userId,
              featuredImage,
              userName,
              $updatedAt,
            }) => (
              <PostCard
                key={$id}
                $id={$id}
                title={title}
                content={content}
                userId={userId}
                userName={userName}
                featuredImage={featuredImage}
                updatedAt={$updatedAt}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
              />
            )
          )
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
            No posts to display.
          </p>
        )}
      </div>
    </motion.section>
  );
}
