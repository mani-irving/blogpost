import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Explore from "./pages/Explore";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";
import { allPost } from "./store/postSlice";
import postService from "./appwrite/postService";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedInLocally = localStorage.getItem("isLoggedInLocally");
    const currentUserLocally = JSON.parse(
      localStorage.getItem("currentUserLocally")
    );
    if (isLoggedInLocally === "true") {
      dispatch(login(currentUserLocally));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allFetchedPosts = await postService.getAllPosts();
        if (allFetchedPosts) {
          dispatch(allPost(allFetchedPosts.documents));
          localStorage.setItem(
            "posts",
            JSON.stringify(allFetchedPosts.documents)
          );
        }
      } catch (error) {
        console.log("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
