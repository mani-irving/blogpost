import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "../UI/Input";
import Button from "../UI/Button";
import authService from "../../appwrite/authService";
import { login } from "../../store/authSlice";

export default function Register() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const createAccount = async (data) => {
    try {
      setError("");
      const newUser = await authService.createAccount(data);
      if (newUser) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
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
      className="min-h-screen flex items-center 
      justify-center px-4 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white"
    >
      <motion.div
        className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an account
        </h2>
        {error && <p className="text-sm mt-4 text-center">{error}</p>}

        <form className="space-y-4" onClick={handleSubmit(createAccount)}>
          <Input
            label="Name"
            type="text"
            placeholder="John Doe"
            {...register("name", { required: true })}
          />

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

          <Button type="submit">Register</Button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
