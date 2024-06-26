import axiosInstance from "../axios-instance.js";

/*-------------------------------------------------------------------*/

const EMS_USER_API_PREFIX = "/ems-user";

export const importEmsUserDataRequestService = async (
  emsUserDataMultipartFile,
) => {
  let formData = new FormData();
  formData.append("emsUserDataMultipartFile", emsUserDataMultipartFile);
  return await axiosInstance.post(
    `${EMS_USER_API_PREFIX}/import-ems-user-data`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const addNewEmsUserRequestService = async (newEmsUser) => {
  return await axiosInstance.post(
    `${EMS_USER_API_PREFIX}/add-new-ems-user`,
    newEmsUser,
  );
};

export const updateEmsUserRequestService = async (updatedEmsUser) => {
  return await axiosInstance.put(
    `${EMS_USER_API_PREFIX}/update-ems-user`,
    updatedEmsUser,
  );
};

export const getAllEmsUserRequestService = async () => {
  return await axiosInstance.get(`${EMS_USER_API_PREFIX}/get-all-ems-user`);
};

export const deleteEmsUserByIdRequestService = async (id) => {
  return await axiosInstance.delete(
    `${EMS_USER_API_PREFIX}/delete-ems-user-by-id`,
    {
      params: {
        id: id,
      },
    },
  );
};

export const getDropdownOfEmsUserGenderRequestService = async () => {
  return await axiosInstance.get(
    `${EMS_USER_API_PREFIX}/get-dropdown-of-ems-user-gender`,
  );
};
