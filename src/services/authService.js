import { registerUser as registerUserApi } from "../api/authApi";

export const registerUser = async (formData) => {
    try {
        const response = await registerUserApi(formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Registration failed" };
    }
};