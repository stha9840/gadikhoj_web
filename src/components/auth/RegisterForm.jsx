import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { toast } from "react-toastify"; // Import toast
import { userRegisterUserTan } from '../../hooks/useRegisterUserTan'; // Import your custom hook

const RegisterForm = () => {
  // State for password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for form fields (from your previous logic)
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");

  // Destructure values from your TanStack Query hook
  const { mutate, data, error, isPending, isSuccess, isError } = userRegisterUserTan();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validation checks (from your previous logic)
    if (!email || !username || !pass || !confirmPass || !firstName || !lastname) {
      if (!email) toast.error("Email is empty");
      if (!username) toast.error("Username is empty");
      if (!pass) toast.error("Password is empty");
      if (!confirmPass) toast.error("Confirm password is empty");
      if (!firstName) toast.error("First name is empty");
      if (!lastname) toast.error("Last name is empty");
      return; // Stop submission if any field is empty
    }

    if (!email.includes("@")) {
      toast.error("Email must include @ (e.g., example@email.com)");
      return; // Stop submission if email format is invalid
    }

    if (pass !== confirmPass) {
      toast.error("Passwords do not match");
      return; // Stop submission if passwords don't match
    }

    // Prepare form data for API call
    const formData = {
      email,
      username,
      password: pass,
      firstName,
      lastName: lastname,
    };

    // Call the mutate function from TanStack Query hook
    mutate(formData);
  };

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit}> {/* Bind handleSubmit to form's onSubmit */}
      {/* Username Field */}
      <div className="mb-3">
        <label htmlFor="username" className="block text-sm font-medium mb-1">
          Username <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="username"
            type="text"
            placeholder="Your username"
            className="w-full border rounded-lg p-3 pl-10 focus:outline-none text-sm"
            value={username} // Bind value to state
            onChange={(e) => setUsername(e.target.value)} // Update state on change
          />
          <FaUser className="absolute left-3 top-3.5 text-gray-400 text-sm" />
        </div>
      </div>

      {/* Email Field */}
      <div className="mb-3">
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder="demo@gmail.com"
            className="w-full border rounded-lg p-3 pl-10 focus:outline-none text-sm"
            value={email} // Bind value to state
            onChange={(e) => setEmail(e.target.value)} // Update state on change
          />
          <FaEnvelope className="absolute left-3 top-3.5 text-gray-400 text-sm" />
        </div>
      </div>

      {/* First Name Field */}
      <div className="mb-3">
        <label htmlFor="firstName" className="block text-sm font-medium mb-1">
          First Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="firstName"
            type="text"
            placeholder="Your first name"
            className="w-full border rounded-lg p-3 pl-10 focus:outline-none text-sm"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {/* You might want a different icon here, or no icon */}
          <FaUser className="absolute left-3 top-3.5 text-gray-400 text-sm" />
        </div>
      </div>

      {/* Last Name Field */}
      <div className="mb-3">
        <label htmlFor="lastName" className="block text-sm font-medium mb-1">
          Last Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="lastName"
            type="text"
            placeholder="Your last name"
            className="w-full border rounded-lg p-3 pl-10 focus:outline-none text-sm"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          {/* You might want a different icon here, or no icon */}
          <FaUser className="absolute left-3 top-3.5 text-gray-400 text-sm" />
        </div>
      </div>

      {/* Password Field */}
      <div className="mb-3">
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
            value={pass} // Bind value to state
            onChange={(e) => setPass(e.target.value)} // Update state on change
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
            value={confirmPass} // Bind value to state
            onChange={(e) => setConfirmPass(e.target.value)} // Update state on change
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
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mb-6 transition duration-300 focus:outline-none text-sm"
        disabled={isPending} // Disable button while pending
      >
        {isPending ? "Registering..." : "Create Account"}
      </button>

      {/* Feedback messages */}
      {isSuccess && <p className="text-green-600 text-sm text-center">Registration successful: {data.message}</p>}
      {isError && <p className="text-red-500 text-sm text-center">Registration failed: {error.message}</p>}
    </form>
  );
};

export default RegisterForm;