import React from "react";
import { Heart } from "lucide-react";

export default function PostActions({ liked, likeCount, handleLike }) {
  return (
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
  );
}
