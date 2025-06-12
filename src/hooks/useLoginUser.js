import { toast } from "react-toastify";
import { loginUserService } from "../services/authService";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export const useLoginUser = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ Initialize navigate

  return useMutation({
    mutationFn: loginUserService,
    mutationKey: ['login-key'],
    onSuccess: (data) => {
      login(data?.data, data?.token);
      toast.success(data?.message || "Login Success");
      navigate("/dashboard"); // ✅ Navigate after success
    },
    onError: (err) => {
      toast.error(err?.message || "Login Failed");
      console.log(err);
    }
  });
};
