import axios from "../Api"

export const getAllUserApi = (params) => axios.get("/admin/user/", { params })
export const createOneUserApi = (data) => axios.post("/admin/user/create", data)
export const updateOneUserApi = (id, data) => axios.put(`/admin/user/${id}`, data)
export const deleteOneUserApi = (id) => axios.delete(`/admin/user/${id}`)
export const getOneUserApi = (id) => axios.get("/admin/user/" + id)
export const getUserCountApi = () => axios.get("/admin/user/count")
// Fetch logged-in user profile
export const getLoggedInUserApi = () => axios.get("/auth/me");
export const updateLoggedInUserApi = (data) => axios.put("/auth/update", data);


