// src/hooks/useSavedVehicles.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSavedVehiclesService,
  addSavedVehicleService,
  removeSavedVehicleService,
} from "../services/savedVehicleService";
import { toast } from "react-toastify";

// 🔹 Get all saved vehicles for current user
export const useSavedVehicles = () => {
  const query = useQuery({
    queryKey: ["saved_vehicles"],
    queryFn: getSavedVehiclesService,
  });

  const vehicles = query.data?.data || [];

  return {
    ...query,
    savedVehicles: vehicles,
  };
};

// 🔹 Add vehicle to saved list
export const useAddSavedVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add_saved_vehicle"],
    mutationFn: addSavedVehicleService,
    onSuccess: () => {
      toast.success("Vehicle added to favorites");
      queryClient.invalidateQueries(["saved_vehicles"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to add vehicle");
    },
  });
};

// 🔹 Remove vehicle from saved list
export const useRemoveSavedVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["remove_saved_vehicle"],
    mutationFn: removeSavedVehicleService,
    onSuccess: () => {
      toast.success("Vehicle removed from favorites");
      queryClient.invalidateQueries(["saved_vehicles"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to remove vehicle");
    },
  });
};
