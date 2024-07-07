import empAppAxiosInstance from "../emp-app-axios-instance.js";

/*-------------------------------------------------------------------*/

const EMS_USER_API_PREFIX = "/ems-user";

const IMPORT_EMS_USER_DATA = `${EMS_USER_API_PREFIX}/import-ems-user-data`;
const ADD_NEW_EMS_USER = `${EMS_USER_API_PREFIX}/add-new-ems-user`;
const UPDATE_EMS_USER = `${EMS_USER_API_PREFIX}/update-ems-user`;
const GET_ALL_EMS_USER = `${EMS_USER_API_PREFIX}/get-all-ems-user`;
const GET_ALL_EMS_USER_WITH_PAGINATION_AND_SEARCH_AND_SORT = `${EMS_USER_API_PREFIX}/get-all-ems-user-with-pagination-and-search-and-sort`;
const DELETE_EMS_USER_BY_ID = `${EMS_USER_API_PREFIX}/delete-ems-user-by-id`;
const GET_DROPDOWN_OF_EMS_USER_GENDER = `${EMS_USER_API_PREFIX}/get-dropdown-of-ems-user-gender`;

export const requestToImportEmsUserData = async (emsUserDataMultipartFile) => {
  let formData = new FormData();
  formData.append("emsUserDataMultipartFile", emsUserDataMultipartFile);
  return await empAppAxiosInstance.post(IMPORT_EMS_USER_DATA, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const requestToAddNewEmsUser = async (newEmsUser) => {
  return await empAppAxiosInstance.post(ADD_NEW_EMS_USER, newEmsUser);
};

export const requestToUpdateEmsUser = async (updatedEmsUser) => {
  return await empAppAxiosInstance.put(UPDATE_EMS_USER, updatedEmsUser);
};

export const requestToGetAllEmsUser = async () => {
  return await empAppAxiosInstance.get(GET_ALL_EMS_USER);
};

export const requestToGetAllEmsUserWithPaginationAndSearchAndSort = async (
  emsUserRequestBeanWithPaginationAndSearchAndSort,
) => {
  return await empAppAxiosInstance.post(
    GET_ALL_EMS_USER_WITH_PAGINATION_AND_SEARCH_AND_SORT,
    emsUserRequestBeanWithPaginationAndSearchAndSort,
  );
};

export const requestToDeleteEmsUserById = async (id) => {
  return await empAppAxiosInstance.delete(DELETE_EMS_USER_BY_ID, {
    params: {
      id: id,
    },
  });
};

export const requestToGetDropdownOfEmsUserGender = async () => {
  return await empAppAxiosInstance.get(GET_DROPDOWN_OF_EMS_USER_GENDER);
};
