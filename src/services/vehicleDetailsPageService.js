import { getVehicleByIdApi, getRelatedVehiclesApi } from "../api/vehiclesDetailsPageApi";

export const getVehicleByIdService = async (id) => {
  try {
    const response = await getVehicleByIdApi(id);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to load vehicle" };
  }
};

export const getRelatedVehiclesService = async (id) => {
  try {
    const response = await getRelatedVehiclesApi(id);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to load related vehicles" };
  }
};
export const searchVehiclesService = async (query) => {
  try {
    const response = await searchVehiclesApi(query);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Search failed" };
  }
};

