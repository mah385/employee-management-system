import { toast } from "react-toastify";
/*-------------------------------------------------------------------*/
import {
  addNewEmsUser,
  deleteEmsUserById,
  getAllEmsUser,
  getDropdownOfEmsUserGender,
  importEmsUser,
  updateEmsUser,
} from "./ems-user-api-service.js";

/*-------------------------------------------------------------------*/

export const importEmsUserUsingAxios = async (emsUserMultipartFile) => {
  try {
    const response = await importEmsUser(emsUserMultipartFile);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data;
  }
};

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

export const getDropdownOfEmsUserGenderUsingAxios = async () => {
  try {
    const response = await getDropdownOfEmsUserGender();
    // toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data;
  }
};
