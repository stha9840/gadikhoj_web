import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import Logo from "../assets/logo.png";
import Illustration from "../assets/illustration.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* -------- Left Side (Illustration + Welcome Text) -------- */}
      <div
        className="w-1/2 flex items-center justify-center pr-10"
        style={{ paddingLeft: 0, height: "100vh" }}
      >
        <div
          className="bg-[#e6f0ff] w-full h-full rounded-r-[222px] flex flex-col justify-center items-center p-10 text-center"
          style={{ boxSizing: "border-box" }}
        >
          {/* Welcome Text */}
          <h1 className="text-4xl font-bold text-blue-900 mb-8 leading-tight">
            Welcome to <br /> <span className="text-blue-600">GadiKhoj</span>
          </h1>

          {/* Illustration Image */}
          <img
            src={Illustration}
            alt="Illustration"
            className="max-w-[70%] h-auto"
          />
        </div>
      </div>

      {/* -------- Right Side (Login Form) -------- */}
      <div className="w-1/2 flex items-center justify-end pr-20">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <img src={Logo} alt="Gadi Khoj Logo" className="w-40 mb-6" />

          {/* Heading */}
          <h2 className="text-3xl font-bold mb-8">Login to get started</h2>

          {/* -------- Email Field -------- */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="demo@gmail.com"
                className="w-full border rounded-lg p-3 pl-10 focus:outline-none"
              />
              <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* -------- Password Field -------- */}
<div className="mb-6">
  <label className="block text-sm font-medium mb-2">
    Password <span className="text-red-500 ">*</span>
  </label>
  <div className="relative">
    {/* Left-side lock icon */}
    <FaLock className="absolute left-3 top-3.5 text-gray-400" />

    {/* Input field with padding for icons */}
    <input
      type={showPassword ? "text" : "password"}
      placeholder="demopassword123"
      className="w-full border rounded-lg p-3 pl-10 pr-10 focus:outline-none"
    />

    {/* Right-side eye toggle icon */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-3.5 bg-transparent p-0 border-none shadow-none focus:outline-none"
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>
  <p className="text-xs text-gray-500 mt-1">
    Password must be at least 6 characters
  </p>
</div>


          {/* -------- Login Button -------- */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mb-6 transition duration-300 focus:outline-none">
            Login
          </button>

          {/* -------- Sign Up Link -------- */}
          <p className="text-sm text-gray-700 mb-6">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Create account
            </a>
          </p>

          {/* Divider */}
          <div className="text-center text-sm text-gray-400 mb-6">or</div>

          {/* -------- Google Sign-In -------- */}
          <button className="w-full border border-gray-300 py-3 flex items-center justify-center gap-3 rounded-lg hover:bg-gray-100 transition duration-300">
            <FcGoogle className="text-2xl" /> Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
