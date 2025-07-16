import React from "react";

export default function ProfilePostsButton({
  activeTab,
  setActiveTab,
  isLoggedIn,
  currentUser,
  profileVisitingUsersId,
}) {
  return (
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

      {isLoggedIn && currentUser?.$id === profileVisitingUsersId && (
        <button
          onClick={() => setActiveTab("Private")}
          className={`text-sm font-semibold px-4 py-2 rounded-full transition-all
                ${
                  activeTab === "Private"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
        >
          Following
        </button>
      )}
    </div>
  );
}
