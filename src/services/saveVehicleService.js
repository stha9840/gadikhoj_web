    // src/services/savedVehicleService.js
    import axios from "../api/saveVehicleApi";

    // 🔹 Get all saved vehicles of current user
    export const getSavedVehiclesService = () => {
    return axios.get("/saved-vehicles");
    };

    // 🔹 Add a vehicle to favorites
    export const addSavedVehicleService = (vehicleId) => {
    return axios.post("/saved-vehicles", { vehicleId });
    };

    // 🔹 Remove a vehicle from favorites
    export const removeSavedVehicleService = (vehicleId) => {
    return axios.delete(`/saved-vehicles/${vehicleId}`);
    };
