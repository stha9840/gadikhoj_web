import { 
  getAllUserApi, 
  createOneUserApi, 
  updateOneUserApi, 
  deleteOneUserApi,
  getOneUserApi
} from "../../api/admin/userApi";

// Fetch all users
export const getAllUserService = async (params) => {
  try {
    const response = await getAllUserApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "User Fetch Fail" };
  }
};

// Create a new user
export const createUserService = async (data) => {
  try {
    const response = await createOneUserApi(data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "User Creation Failed" };
  }
};

// Update a user by ID
export const updateUserService = async (id, data) => {
  try {
    const response = await updateOneUserApi(id, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "User Update Failed" };
  }
};

// Delete a user by ID
export const deleteUserService = async (id) => {
  try {
    const response = await deleteOneUserApi(id);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "User Deletion Failed" };
  }
};
export const getOneUserService = async (id) => {
    try{
        const response = await getOneUserApi(id)
        return response.data
    }catch(err){
        throw err.response?.data || { message: 'Failed to load'}
    }
} 
export const getUserCountService = async () => {
  const response = await getUserCountApi();
  return response.data;  // { success: true, total: 123 }
};
