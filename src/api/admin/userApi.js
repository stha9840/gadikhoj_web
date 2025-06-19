import axios from "../Api"

export const getAllUserApi = (params) => axios.get("/admin/user/", { params })
export const createOneUserApi = (data) => axios.post("/admin/user/", data)
export const updateOneUserApi = (id, data) => axios.put(`/admin/user/${id}`, data)
export const deleteOneUserApi = (id) => axios.delete(`/admin/user/${id}`)
