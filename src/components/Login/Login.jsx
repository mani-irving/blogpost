import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "../../store/authSlice";
import authService from "../../appwrite/authService";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // if (isLoggedIn) return <Navigate to="/explore" replace />;
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
               bg-gray-100 text-gray-900
               dark:bg-gray-900 dark:text-white"
    >
      <motion.div
        className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to your account
        </h2>
        {error && (
          <p className="text-sm mt-4 text-center text-red-700 pb-1">{error}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(login)}>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register("password", { required: true })}
          />
          <Button type="submit">Submit</Button>
        </form>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
