import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginUser } from "../../hooks/useLoginUser";
import { Link } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../assets/logo.png";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, data, error, isPending } = useLoginUser();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className="w-full max-w-sm">
      <img src={Logo} alt="Gadi Khoj Logo" className="w-40 mb-6" />
      <h2 className="text-3xl font-bold mb-8">Login to get started</h2>

      <form onSubmit={formik.handleSubmit}>
        {/* -------- Email Field -------- */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="demo@gmail.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full border rounded-lg p-3 pl-10 focus:outline-none ${
                formik.touched.email && formik.errors.email ? "border-red-500" : ""
              }`}
            />
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* -------- Password Field -------- */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="demopassword123"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full border rounded-lg p-3 pl-10 pr-10 focus:outline-none ${
                formik.touched.password && formik.errors.password ? "border-red-500" : ""
              }`}
            />
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
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
          )}
        </div>

        {/* -------- Login Button -------- */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mb-6 transition duration-300 focus:outline-none"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* -------- Sign Up Link -------- */}
      <p className="text-sm text-gray-700 mb-6">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-semibold hover:underline"
        >
          Create account
        </Link>
      </p>

      {/* Divider */}
      <div className="text-center text-sm text-gray-400 mb-6">or</div>

      {/* -------- Google Sign-In -------- */}
      <button className="w-full border border-gray-300 py-3 flex items-center justify-center gap-3 rounded-lg hover:bg-gray-100 transition duration-300">
        <FcGoogle className="text-2xl" /> Sign up with Google
      </button>

      {/* -------- Optional: Backend error/success messages -------- */}
      {error && <p className="text-center text-sm text-red-600 mt-4">{error.message}</p>}
      {data && <p className="text-center text-sm text-green-600 mt-4">{data.message}</p>}
    </div>
  );
};

export default LoginForm;
