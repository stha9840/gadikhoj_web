import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../assets/logo.png";
import Illustration from "../assets/illustration.png";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Left Side (unchanged) */}
      <div
        className="w-1/2 flex items-center justify-center pr-10"
        style={{ paddingLeft: 0, height: "100vh" }}
      >
        <div
          className="bg-[#e6f0ff] w-full h-full rounded-r-[222px] flex flex-col justify-center items-center p-10 text-center"
          style={{ boxSizing: "border-box" }}
        >
          <h1 className="text-4xl font-bold text-blue-900 mb-8 leading-tight">
            Join <br /> <span className="text-blue-600">GadiKhoj</span>
          </h1>
          <img
            src={Illustration}
            alt="Illustration"
            className="max-w-[70%] h-auto"
          />
        </div>
      </div>

      {/* Right Side (Sign Up Form) */}
      <div className="w-1/2 flex items-center justify-end pr-20">
        <div className="w-full max-w-sm">
          <img src={Logo} alt="Gadi Khoj Logo" className="w-40 mb-6" />

          <h2 className="text-3xl font-bold mb-6">Sign up to get started</h2>

          {/* Username Field */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Your username"
                className="w-full border rounded-lg p-3 pl-10 focus:outline-none text-sm"
              />
              <FaUser className="absolute left-3 top-3.5 text-gray-400 text-sm" />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="demo@gmail.com"
                className="w-full border rounded-lg p-3 pl-10 focus:outline-none text-sm"
              />
              <FaEnvelope className="absolute left-3 top-3.5 text-gray-400 text-sm" />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-gray-400 text-sm" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border rounded-lg p-3 pl-10 pr-10 focus:outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 bg-transparent p-0 border-none shadow-none focus:outline-none"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 6 characters
            </p>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-gray-400 text-sm" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full border rounded-lg p-3 pl-10 pr-10 focus:outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 bg-transparent p-0 border-none shadow-none focus:outline-none"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={16} />
                ) : (
                  <FaEye size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Create Account Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mb-6 transition duration-300 focus:outline-none text-sm"
            onClick={() => navigate("/login")}
          >
            Create Account
          </button>

          {/* Sign In Link */}
          <p className="text-sm text-gray-700 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
