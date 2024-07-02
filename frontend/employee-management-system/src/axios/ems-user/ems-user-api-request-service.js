import empAppAxiosInstance from "../emp-app-axios-instance.js";

/*-------------------------------------------------------------------*/

const EMS_USER_API_PREFIX = "/ems-user";

export const importEmsUserData = async (
  emsUserDataMultipartFile,
) => {
  let formData = new FormData();
  formData.append("emsUserDataMultipartFile", emsUserDataMultipartFile);
  return await empAppAxiosInstance.post(
    `${EMS_USER_API_PREFIX}/import-ems-user-data`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const addNewEmsUser = async (newEmsUser) => {
  return await empAppAxiosInstance.post(
    `${EMS_USER_API_PREFIX}/add-new-ems-user`,
    newEmsUser,
  );
};

export const updateEmsUser = async (updatedEmsUser) => {
  return await empAppAxiosInstance.put(
    `${EMS_USER_API_PREFIX}/update-ems-user`,
    updatedEmsUser,
  );
};

export const getAllEmsUser = async () => {
  return await empAppAxiosInstance.get(
    `${EMS_USER_API_PREFIX}/get-all-ems-user`,
  );
};

export const deleteEmsUserById = async (id) => {
  return await empAppAxiosInstance.delete(
    `${EMS_USER_API_PREFIX}/delete-ems-user-by-id`,
    {
      params: {
        id: id,
      },
    },
  );
};

export const getDropdownOfEmsUserGender = async () => {
  return await empAppAxiosInstance.get(
    `${EMS_USER_API_PREFIX}/get-dropdown-of-ems-user-gender`,
  );
};
