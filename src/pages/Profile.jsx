import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileLayout from "../components/Profile/ProfileLayout";
import ProfileTop from "../components/Profile/ProfileTop";
import ProfilePostsButton from "../components/Profile/ProfilePostsButton";
import ProfilePostCard from "../components/Profile/ProfilePostCard";
import { useSelector } from "react-redux";
import postService from "../appwrite/postService";
import { Query } from "appwrite";

export default function Profile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("All");
  const [openMenuId, setOpenMenuId] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const allPosts = useSelector((state) => state.post.allPosts);
  const profileVisitedUserPosts = allPosts?.filter(
    (post) => post.userId === id
  );
  const [followersCount, setFollowersCount] = useState(0);
  const [followingsCount, setFollowingsCount] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const allFollowers = await postService.getAllConnections([
          Query.equal("following", id),
        ]);
        if (allFollowers) {
          setFollowersCount(allFollowers.total);
        }
        const allFollowings = await postService.getAllConnections([
          Query.equal("follower", id),
        ]);
        if (allFollowings) {
          setFollowingsCount(allFollowings.total);
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <ProfileLayout>
      <ProfileTop
        userIdFetchedFromParams={id}
        followersCount={followersCount}
        followingsCount={followingsCount}
      />
      <ProfilePostsButton
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        profileVisitingUsersId={id}
      />
      {activeTab === "All" &&
        profileVisitedUserPosts.map(
          ({
            $id,
            title,
            content,
            userId,
            userName,
            featuredImage,
            $updatedAt,
          }) => (
            <ProfilePostCard
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
              isLoggedIn={isLoggedIn}
              currentUserId={currentUser?.$id}
            />
          )
        )}
    </ProfileLayout>
  );
}
