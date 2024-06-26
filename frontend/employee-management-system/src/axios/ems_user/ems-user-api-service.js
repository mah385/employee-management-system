import axiosInstance from "../axios-instance.js";

/*-------------------------------------------------------------------*/

const EMS_USER_API_PREFIX = "/ems-user";

export const importEmsUser = async (emsUserMultipartFile) => {
  let formData = new FormData();
  formData.append("emsUserMultipartFile", emsUserMultipartFile);
  return await axiosInstance.post(
    `${EMS_USER_API_PREFIX}/import-ems-user`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const addNewEmsUser = async (newEmsUser) => {
  return await axiosInstance.post(
    `${EMS_USER_API_PREFIX}/add-new-ems-user`,
    newEmsUser,
  );
};

export const updateEmsUser = async (updatedEmsUser) => {
  return await axiosInstance.put(
    `${EMS_USER_API_PREFIX}/update-ems-user`,
    updatedEmsUser,
  );
};

export const getAllEmsUser = async () => {
  return await axiosInstance.get(`${EMS_USER_API_PREFIX}/get-all-ems-user`);
};

export const deleteEmsUserById = async (id) => {
  return await axiosInstance.delete(
    `${EMS_USER_API_PREFIX}/delete-ems-user-by-id`,
    {
      params: {
        id: id,
      },
    },
  );
};

export const getDropdownOfEmsUserGender = async () => {
  return await axiosInstance.get(
    `${EMS_USER_API_PREFIX}/get-dropdown-of-ems-user-gender`,
  );
};
