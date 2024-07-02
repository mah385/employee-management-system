import { toast } from "react-toastify";
/*-------------------------------------------------------------------*/
import * as EmsUserApiRequestService from "./ems-user-api-request-service.js";

/*-------------------------------------------------------------------*/

export const handleImportEmsUserData = async (emsUserDataMultipartFile) => {
  try {
    const t0 = performance.now();
    const response = await EmsUserApiRequestService.importEmsUserData(
      emsUserDataMultipartFile,
    );
    const t1 = performance.now();
    toast.success(
      `Call to handleImportEmsUserData took ${t1 - t0} milliseconds.`,
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data;
  }
};

export const handleAddNewEmsUser = async (newEmsUser) => {
  try {
    const response = await EmsUserApiRequestService.addNewEmsUser(newEmsUser);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data;
  }
};

export const handleUpdateEmsUser = async (updatedEmsUser) => {
  try {
    const response =
      await EmsUserApiRequestService.updateEmsUser(updatedEmsUser);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data;
  }
};

export const handleGetAllEmsUser = async () => {
  try {
    const t0 = performance.now();
    const response = await EmsUserApiRequestService.getAllEmsUser();
    const t1 = performance.now();
    toast.success(`Call to handleGetAllEmsUser took ${t1 - t0} milliseconds.`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data;
  }
};

export const handleDeleteEmsUserById = async (id) => {
  try {
    const response = await EmsUserApiRequestService.deleteEmsUserById(id);
    toast.success(response.data.message);
    return response.data.payload;
  } catch (error) {
    // HANDLE ERROR...
  }
};

export const handleGetDropdownOfEmsUserGender = async () => {
  try {
    const response =
      await EmsUserApiRequestService.getDropdownOfEmsUserGender();
    // toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data;
  }
};
