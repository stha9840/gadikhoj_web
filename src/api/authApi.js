import axios from './Api';

export const registerUserApi = (data) => axios.post("/register0", data)
export const loginUserApi = (data) => axios.post("/login", data)