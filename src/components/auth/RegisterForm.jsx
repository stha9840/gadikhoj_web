import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { userRegisterUserTan } from "../../hooks/useRegisterUserTan";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [username, setUsername] = useState("");

  const { mutate, data, error, isPending, isSuccess, isError } = userRegisterUserTan();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !username || !pass || !confirmPass) {
      if (!email) toast.error("Email is empty");
      if (!username) toast.error("Username is empty");
      if (!pass) toast.error("Password is empty");
      if (!confirmPass) toast.error("Confirm password is empty");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Email must include @ (e.g., example@email.com)");
      return;
    }

    if (pass !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = {
      email,
      username,
      password: pass,
    };

    mutate(formData);
  };

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      {/* Username Field */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium mb-1">
          Username <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="username"
            type="text"
            placeholder="Your username"
            className="w-full border rounded-lg p-3 pl-10 focus:outline-none text-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="absolute left-3 top-3.5 text-gray-400 text-sm" />
        </div>
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder="demo@gmail.com"
            className="w-full border rounded-lg p-3 pl-10 focus:outline-none text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="absolute left-3 top-3.5 text-gray-400 text-sm" />
        </div>
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <FaLock className="absolute left-3 top-3.5 text-gray-400 text-sm" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border rounded-lg p-3 pl-10 pr-10 focus:outline-none text-sm"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
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
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <FaLock className="absolute left-3 top-3.5 text-gray-400 text-sm" />
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full border rounded-lg p-3 pl-10 pr-10 focus:outline-none text-sm"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3.5 bg-transparent p-0 border-none shadow-none focus:outline-none"
          >
            {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 focus:outline-none text-sm"
        disabled={isPending}
      >
        {isPending ? "Registering..." : "Create Account"}
      </button>

      {isSuccess && <p className="text-green-600 text-sm text-center mt-3">{data.message}</p>}
      {isError && <p className="text-red-500 text-sm text-center mt-3">{error.message}</p>}
    </form>
  );
};

export default RegisterForm;
