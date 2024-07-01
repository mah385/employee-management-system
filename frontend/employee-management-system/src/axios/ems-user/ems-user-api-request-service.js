import empAppAxiosInstance from "../emp-app-axios-instance.js";

/*-------------------------------------------------------------------*/

const EMS_USER_API_PREFIX = "/ems-user";

export const importEmsUserDataRequestService = async (
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

export const addNewEmsUserRequestService = async (newEmsUser) => {
  return await empAppAxiosInstance.post(
    `${EMS_USER_API_PREFIX}/add-new-ems-user`,
    newEmsUser,
  );
};

export const updateEmsUserRequestService = async (updatedEmsUser) => {
  return await empAppAxiosInstance.put(
    `${EMS_USER_API_PREFIX}/update-ems-user`,
    updatedEmsUser,
  );
};

export const getAllEmsUserRequestService = async () => {
  return await empAppAxiosInstance.get(
    `${EMS_USER_API_PREFIX}/get-all-ems-user`,
  );
};

export const deleteEmsUserByIdRequestService = async (id) => {
  return await empAppAxiosInstance.delete(
    `${EMS_USER_API_PREFIX}/delete-ems-user-by-id`,
    {
      params: {
        id: id,
      },
    },
  );
};

export const getDropdownOfEmsUserGenderRequestService = async () => {
  return await empAppAxiosInstance.get(
    `${EMS_USER_API_PREFIX}/get-dropdown-of-ems-user-gender`,
  );
};
