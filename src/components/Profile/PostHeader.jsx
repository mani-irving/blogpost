import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, CircleUserRound } from "lucide-react";
import PostMenu from "./PostMenu";

export default function PostHeader({
  $id,
  userId,
  userName,
  updatedAt,
  currentUserId,
  isFollowing,
  isProcessing,
  handleFollow,
  handleDelete,
  openMenuId,
  setOpenMenuId,
}) {
  const isMenuOpen = openMenuId === $id;
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
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

      {currentUserId !== userId ? (
        <button
          disabled={isProcessing}
          onClick={handleFollow}
          className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
            isFollowing ? "bg-gray-300 text-gray-800" : "bg-blue-500 text-white"
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
      ) : (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpenMenuId(isMenuOpen ? null : $id)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
          {isMenuOpen && <PostMenu handleDelete={handleDelete} />}
        </div>
      )}
    </div>
  );
}
