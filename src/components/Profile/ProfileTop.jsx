import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProfileTop({
  userIdFetchedFromParams,
  followersCount,
  followingsCount,
}) {
  const allPosts = useSelector((state) => state.post.allPosts);
  const fetchingUserFromAllPosts = allPosts.filter(
    (post) => post.userId === userIdFetchedFromParams
  );
  const totalPostCount = fetchingUserFromAllPosts.length;
  const userName = fetchingUserFromAllPosts[0]?.userName;

  return (
    <div className="text-black dark:text-white flex flex-col items-center  border-b border-blue-800 dark:border-blue-200">
      {/* Cover Image */}
      <div className="relative w-full max-w-4xl">
        <img
          src="https://i.pinimg.com/736x/9a/69/01/9a69016a96d74dd39704253757f2914f.jpg"
          alt="cover-image"
          className="w-full h-20 sm:h-30 md:h-40 lg:h-60 object-cover rounded-b-lg shadow-sm"
        />

        {/* Profile Image */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-50px] z-10">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNiF96dKTOvN0Ai2EJU-EPXQl6vTQCXB209g&s"
            alt="profile"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
          />
        </div>
      </div>

      {/* Add spacing after profile image so it's not cut off */}
      <div className="mt-16" />

      {/* Optional: User Info */}
      <div className="text-center mt-2">
        <h2 className="text-xl font-semibold">{userName}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Web Developer | Tech Enthusiast
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex flex-wrap justify-center gap-10 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-blue-700 dark:text-blue-400 font-medium">
            Followers:
          </span>
          <h3 className="font-semibold">{followersCount}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-700 dark:text-blue-400 font-medium">
            Following:
          </span>
          <h3 className="font-semibold">{followingsCount}</h3>
        </div>
      </div>

      <div className="mb-6" />
    </div>
  );
}

{
  /* <h1 className="text-blue dark:text-amber-50">UserName is:{userName}</h1>
      <p>Total Posts. {totalPostCount}</p> */
}
