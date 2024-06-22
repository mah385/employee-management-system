import axiosInstance from "../axios-instance.js";

/*-------------------------------------------------------------------*/

const EMS_USER_API_PREFIX = "/ems-user";
const ADD_NEW_EMS_USER = `${EMS_USER_API_PREFIX}/add-new-ems-user`;
const UPDATE_EMS_USER = `${EMS_USER_API_PREFIX}/update-ems-user`;
const GET_ALL_EMS_USER = `${EMS_USER_API_PREFIX}/get-all-ems-user`;
const DELETE_EMS_USER_BY_ID = `${EMS_USER_API_PREFIX}/delete-ems-user-by-id`;

export const addNewEmsUser = async (newEmsUser) => {
  return await axiosInstance.post(ADD_NEW_EMS_USER, newEmsUser);
};

export const updateEmsUser = async (updatedEmsUser) => {
  return await axiosInstance.put(UPDATE_EMS_USER, updatedEmsUser);
};

export const getAllEmsUser = async () => {
  return await axiosInstance.get(GET_ALL_EMS_USER);
};

export const deleteEmsUserById = async (id) => {
  return await axiosInstance.delete(DELETE_EMS_USER_BY_ID, {
    params: {
      id: id,
    },
  });
};
