import {
  addNewEmsUser,
  updateEmsUser,
  deleteEmsUserById,
  getAllEmsUser,
} from "./ems-user-api-service.js";
/*-------------------------------------------------------------------*/
import { toast } from "react-toastify";

/*-------------------------------------------------------------------*/

export const addNewEmsUserUsingAxios = async (newEmsUser) => {
  try {
    const response = await addNewEmsUser(newEmsUser);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data;
  }
};

export const updateEmsUserUsingAxios = async (updatedEmsUser) => {
  try {
    const response = await updateEmsUser(updatedEmsUser);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data;
  }
};

export const getAllEmsUserUsingAxios = async () => {
  try {
    const response = await getAllEmsUser();
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data;
  }
};

export const deleteEmsUserByIdUsingAxios = async (id) => {
  try {
    const response = await deleteEmsUserById(id);
    toast.success(response.data.message);
    return response.data.payload;
  } catch (error) {
    // HANDLE ERROR...
  }
};
