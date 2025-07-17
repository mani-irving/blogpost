import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import postService from "../../appwrite/postService";
import { removePost } from "../../store/postSlice";
import { addConnection, removeConnection } from "../../store/connectionsSlice";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";

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
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(2);
  const [error, setError] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const allConnections = useSelector(
    (state) => state.connection.allConnections
  );
  const isFollowing = allConnections?.some((c) => c.following === userId);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFollow = async () => {
    if (!isLoggedIn) return setError("Login to follow users.");
    if (isProcessing) return;
    setIsProcessing(true);

    const existingConnection = allConnections.find(
      (c) => c.following === userId && c.follower === currentUserId
    );

    try {
      if (existingConnection) {
        await postService.deleteConnection(existingConnection.$id);
        dispatch(removeConnection({ following: userId }));
      } else {
        const createdConnection = await postService.createConnections({
          follower: currentUserId,
          following: userId,
        });
        dispatch(addConnection(createdConnection));
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLike = () => {
    if (!isLoggedIn) return setError("Login to like the post.");
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleDelete = async () => {
    dispatch(removePost($id));
    try {
      await postService.deletePost($id);
    } catch (err) {
      setError(err.message);
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

  return (
    <div className="max-w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200 cursor-pointer">
      <div className="px-4 py-3">
        <PostHeader
          $id={$id}
          userId={userId}
          userName={userName}
          updatedAt={updatedAt}
          currentUserId={currentUserId}
          isFollowing={isFollowing}
          isProcessing={isProcessing}
          handleFollow={handleFollow}
          handleDelete={handleDelete}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
        />

        <PostContent
          title={title}
          content={content}
          imagePreviewUrl={imagePreviewUrl}
        />

        <PostActions
          liked={liked}
          likeCount={likeCount}
          handleLike={handleLike}
        />

        {error && (
          <p className="text-sm font-medium mt-3 text-center text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
