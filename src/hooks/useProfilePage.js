import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLoggedInUserApi, updateLoggedInUserApi } from "../api/admin/userApi";
import { toast } from "react-toastify";

// Fetch logged-in user profile
const fetchUserProfile = async () => {
  const { data } = await getLoggedInUserApi();
  return data.data; // assuming your API response has { data: {...} }
};

// Update logged-in user profile
const updateUserProfile = async (profileData) => {
  const { data } = await updateLoggedInUserApi(profileData);
  return data.data;
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["loggedInUserProfile"],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["loggedInUserProfile"]);
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    },
  });
};
