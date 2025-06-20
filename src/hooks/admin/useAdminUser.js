import { keepPreviousData,useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

//useQuery -> Get request state
import { useState } from "react";
import { getAllUserService, createUserService, updateUserService, deleteUserService } from "../../services/admin/userService";

export const useAdminUser = (page = 1, limit = 5) => {
  const query = useQuery({
    queryKey: ["admin_user", page, limit],
    queryFn: () => getAllUserService({ page, limit }),
    keepPreviousData: true,
  });

  return { ...query };
};
  export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["admin_create_user"],
    mutationFn: createUserService,
    onSuccess: () => {
      queryClient.invalidateQueries("admin_user");
    }
  });
};

export const useUpdateOneUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => updateUserService(id, data),
    mutationKey: ["admin_user_update"],
    onSuccess: () => {
      toast.success("Updated")
      queryClient.invalidateQueries(
        ["admin_user", "admin_user_details"]
      )
    },
    onError: (err) => {
      toast.error(err.message || " Update Failed")
    }

  })
}
export const useGetOneUser = (id) => {
  return useQuery({
    queryKey: ["admin_user_details", id],
    queryFn: async () => {
      const response = await axios.get(`/api/admin/user/${id}`);
      return response.data;
    },
    enabled: !!id, // prevents query from running without an ID
  });
};
export const useDeleteOneUser = () =>{
  const queryClient = useQueryClient()
  return useMutation(
    {
      mutationFn: deleteUserService,
      mutationKey : ["admin_user_delete"],
      onSuccess: () =>{
        toast.success("Delete")
        queryClient.invalidateQueries(["admin_user"])
      },
      onError: (err) =>{
        toast.error(err.message || "Delete failed")
      }
    }
  )
}



