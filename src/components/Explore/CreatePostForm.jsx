import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Globe, Lock, Send } from "lucide-react";
import postService from "../../appwrite/postService";
import { useSelector } from "react-redux";

export default function CreatePostForm() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "public",
    },
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const title = watch("title");
  const status = watch("status");

  useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
      setValue("slug", slug);
    }
  }, [title, setValue]);

  const toggleStatus = () => {
    setValue("status", status === "public" ? "private" : "public");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setStatusMessage("");

    try {
      let imageId = null;
      console.log(data.featuredImage);
      if (data.featuredImage) {
        const uploadedImage = await postService.uploadFeaturedImage(
          data.featuredImage
        );
        if (uploadedImage) {
          imageId = uploadedImage.$id;
        }
      }

      const postData = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        userId: currentUser.$id,
        userName: currentUser.name,
        status: data.status,
        ...(imageId && { featuredImage: imageId }), // only add if image exists
      };

      await postService.createPost(postData);

      setStatusMessage("✅ Post created successfully!");
      reset();
      setSelectedImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
      setStatusMessage("❌ Oops! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    isLoggedIn && (
      <div className="max-w-full p-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Title */}
          <div className="space-y-2">
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="What's on your mind?"
              className="w-full text-2xl font-semibold placeholder-gray-400 bg-transparent 
            border-none outline-none resize-none text-gray-900 dark:text-white"
              autoFocus
            />
            {errors.title && (
              <p className="text-sm text-red-500 ml-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

          {/* Content */}
          <div className="space-y-2">
            <textarea
              {...register("content", { required: "Content is required" })}
              rows={6}
              placeholder="Share your thoughts..."
              className="w-full placeholder-gray-400 bg-transparent border-none outline-none 
            resize-none text-gray-700 dark:text-gray-300 leading-relaxed"
            />
            {errors.content && (
              <p className="text-sm text-red-500 ml-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Hidden Inputs */}
          <input type="hidden" {...register("slug")} />
          <input type="hidden" {...register("status")} />
          <input type="hidden" {...register("featuredImage")} />

          {/* Bottom Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              {/* Image Upload */}
              <div className="relative group">
                <label
                  className="flex items-center justify-center w-10 h-10 rounded-full 
              bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
              cursor-pointer transition-all duration-200 hover:scale-110"
                >
                  <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setValue("featuredImage", file);
                        setSelectedImage(file);
                      }
                    }}
                  />
                </label>

                {/* Tooltip */}
                <div
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 
              bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 
              group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
              before:content-[''] before:absolute before:top-full before:left-1/2 
              before:transform before:-translate-x-1/2 before:border-4 
              before:border-transparent before:border-t-gray-900"
                >
                  Add image
                </div>
              </div>

              {/* Image Preview */}
              {selectedImage && (
                <div className="max-w-[6rem] max-h-[6rem] rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="preview"
                    className="w-full h-full object-cover border border-gray-300 dark:border-gray-600"
                  />
                </div>
              )}

              {/* Status Toggle */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={toggleStatus}
                  className="flex items-center justify-center w-10 h-10 rounded-full 
                bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
                transition-all duration-200 hover:scale-110"
                >
                  {status === "private" ? (
                    <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />
                  ) : (
                    <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />
                  )}
                </button>

                <div
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 
              bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 
              group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
              before:content-[''] before:absolute before:top-full before:left-1/2 
              before:transform before:-translate-x-1/2 before:border-4 
              before:border-transparent before:border-t-gray-900 capitalize"
                >
                  {status}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 
            text-white rounded-full font-medium transition-all duration-200 
            hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50"
            >
              <span>{loading ? "Posting..." : "Post"}</span>
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <p
              className={`text-sm font-medium mt-2 ${
                statusMessage.startsWith("✅")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    )
  );
}
