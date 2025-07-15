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
import authService from "./appwrite/authService";
import PrivateRoutes from "./privateRoute/PrivateRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const authChecker = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
        }
      } catch (error) {
        console.log("Error checking auth:", error.message);
      }
    };

    authChecker();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allFetchedPosts = await postService.getAllPosts();
        if (allFetchedPosts) {
          dispatch(allPost(allFetchedPosts.documents));
        }
      } catch (error) {
        console.log("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="about" element={<About />} />
        <Route
          path="login"
          element={
            <PrivateRoutes>
              <Login />
            </PrivateRoutes>
          }
        />
        <Route
          path="register"
          element={
            <PrivateRoutes>
              <Register />
            </PrivateRoutes>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
