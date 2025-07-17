import React from "react";

export default function PostContent({ title, content, imagePreviewUrl }) {
  return (
    <div className="mb-3">
      <h3 className="text-gray-900 dark:text-white text-md font-semibold mb-2">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{content}</p>
      {imagePreviewUrl && (
        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex justify-center items-center bg-black">
          <img
            src={imagePreviewUrl}
            alt="Post visual"
            className="w-full max-h-[400px] sm:max-h-[300px] object-contain"
          />
        </div>
      )}
    </div>
  );
}
