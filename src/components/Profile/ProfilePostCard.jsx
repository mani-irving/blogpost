import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"; // would see
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Heart, MoreHorizontal, CircleUserRound } from "lucide-react";
import postService from "../../appwrite/postService";
import { removePost } from "../../store/postSlice";
import { addConnection, removeConnection } from "../../store/connectionsSlice";

export default function ProfilePostCard({
  $id,
  title,
  content,
  userId,
  userName,
  featuredImage,
  updatedAt,
  openMenuId,
  setOpenMenuId,
  isLoggedIn,
  currentUserId,
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(2);
  const [error, setError] = useState("");
  const isMenuOpen = openMenuId === $id;
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const menuRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allConnections = useSelector(
    (state) => state.connection.allConnections
  );

  const isFollowing = allConnections?.some((c) => c.following === userId);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFollow = async () => {
    if (!isLoggedIn) return setError("Login to follow users.");
    if (isProcessing) return;
    setIsProcessing(true);
    const obj = { follower: currentUserId, following: userId };
    const existingConnection = allConnections.find(
      (connection) =>
        connection.following === userId && connection.follower === currentUserId
    );

    try {
      if (existingConnection) {
        await postService.deleteConnection(existingConnection.$id);

        dispatch(removeConnection({ following: userId }));
      } else {
        const createdConnection = await postService.createConnections(obj);

        dispatch(addConnection(createdConnection));
      }
    } catch (error) {
      console.log("Connection error:", error.message);
      setError("Something went wrong. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (featuredImage) {
      const url = postService.filePreview(featuredImage);
      setImagePreviewUrl(url);
    }
  }, [featuredImage]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  useEffect(() => {
    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLike = () => {
    if (!isLoggedIn) return setError("Login to like the post.");
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleDelete = async () => {
    dispatch(removePost($id));
    try {
      await postService.deletePost($id);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200 cursor-pointer">
      <div className="px-4 py-3">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <CircleUserRound className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <button
                onClick={() => navigate(`/user/${userId}`)}
                className="text-sm font-bold text-left text-blue-600 hover:underline"
              >
                {userName}
              </button>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
              </span>
            </div>
          </div>

          {/* connections Button */}
          {currentUserId !== userId && (
            <button
              disabled={isProcessing}
              onClick={handleFollow}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                isFollowing
                  ? "bg-gray-300 text-gray-800"
                  : "bg-blue-500 text-white"
              } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isProcessing
                ? isFollowing
                  ? "Unfollowing..."
                  : "Following..."
                : isFollowing
                ? "Following"
                : "Follow"}
            </button>
          )}

          {currentUserId === userId && (
            <div className="relative">
              <button
                onClick={() => setOpenMenuId(isMenuOpen ? null : $id)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
              {isMenuOpen && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md z-20"
                >
                  <button className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mb-3">
          <h3 className="text-gray-900 dark:text-white text-md font-semibold mb-2">
            {title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
            {content}
          </p>
          {imagePreviewUrl && (
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <img
                src={imagePreviewUrl}
                alt="Post visual"
                className="w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Like Button Only */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors group ${
              liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
            }`}
          >
            <div className="p-2 rounded-full group-hover:bg-red-100 dark:group-hover:bg-red-900 transition-colors">
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            </div>
            <span className="text-sm">{likeCount}</span>
          </button>
        </div>

        {error && (
          <p className="text-sm font-medium mt-3 text-center text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
