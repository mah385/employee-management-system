import { toast } from "react-toastify";
/*-------------------------------------------------------------------*/
import * as EmsUserApiRequestService from "./ems-user-api-request-service.js";

/*-------------------------------------------------------------------*/

export const importEmsUserDataResponseService = async (
  emsUserDataMultipartFile,
) => {
  try {
    const t0 = performance.now();
    const response =
      await EmsUserApiRequestService.importEmsUserDataRequestService(
        emsUserDataMultipartFile,
      );
    const t1 = performance.now();
    console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data;
  }
};

export const addNewEmsUserResponseService = async (newEmsUser) => {
  try {
    const response =
      await EmsUserApiRequestService.addNewEmsUserRequestService(newEmsUser);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data;
  }
};

export const updateEmsUserResponseService = async (updatedEmsUser) => {
  try {
    const response =
      await EmsUserApiRequestService.updateEmsUserRequestService(
        updatedEmsUser,
      );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data;
  }
};

export const getAllEmsUserResponseService = async () => {
  try {
    const response =
      await EmsUserApiRequestService.getAllEmsUserRequestService();
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data;
  }
};

export const deleteEmsUserByIdResponseService = async (id) => {
  try {
    const response =
      await EmsUserApiRequestService.deleteEmsUserByIdRequestService(id);
    toast.success(response.data.message);
    return response.data.payload;
  } catch (error) {
    // HANDLE ERROR...
  }
};

export const getDropdownOfEmsUserGenderResponseService = async () => {
  try {
    const response =
      await EmsUserApiRequestService.getDropdownOfEmsUserGenderRequestService();
    // toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data;
  }
};
