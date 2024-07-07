import * as EmsUserApiRequestService from "./ems-user-api-request-service.js";
/*-------------------------------------------------------------------*/
import {
  handleErrorResponseUtil,
  handleSuccessResponseUtil,
} from "../emp-app-axios-util.js";

/*-------------------------------------------------------------------*/

export const handleRequestToImportEmsUserData = async (
  emsUserDataMultipartFile,
) => {
  try {
    return handleSuccessResponseUtil(
      true,
      await EmsUserApiRequestService.requestToImportEmsUserData(
        emsUserDataMultipartFile,
      ),
    );
  } catch (error) {
    return handleErrorResponseUtil(true, error);
  }
};

export const handleRequestToAddNewEmsUser = async (newEmsUser) => {
  try {
    return handleSuccessResponseUtil(
      true,
      await EmsUserApiRequestService.requestToAddNewEmsUser(newEmsUser),
    );
  } catch (error) {
    return handleErrorResponseUtil(true, error);
  }
};

export const handleRequestToUpdateEmsUser = async (updatedEmsUser) => {
  try {
    return handleSuccessResponseUtil(
      true,
      await EmsUserApiRequestService.requestToUpdateEmsUser(updatedEmsUser),
    );
  } catch (error) {
    return handleErrorResponseUtil(true, error);
  }
};

export const handleRequestToGetAllEmsUser = async () => {
  try {
    return handleSuccessResponseUtil(
      false,
      await EmsUserApiRequestService.requestToGetAllEmsUser(),
    );
  } catch (error) {
    return handleErrorResponseUtil(true, error);
  }
};

export const handleRequestToGetAllEmsUserWithPaginationAndSearchAndSort =
  async (
    emsUserRequestBeanWithPaginationAndSearchAndSort = {
      searchFirstName: null,
      searchLastName: null,
      searchEmsUserGender: null,
      searchEmail: null,
      searchDateOfBirth: null,
      searchDateOfJoin: null,
      searchSalary: null,
      searchHikePercentage: null,
      searchZipCode: null,
      searchMobileNumber: null,
      sortDirectionForFirstName: null,
      sortDirectionForLastName: null,
      sortDirectionForEmsUserGender: null,
      sortDirectionForEmail: null,
      sortDirectionForDateOfBirth: null,
      sortDirectionForDateOfJoin: null,
      sortDirectionForSalary: null,
      sortDirectionForHikePercentage: null,
      sortDirectionForZipCode: null,
      pageNumber: 1,
      pageSize: 15,
    },
  ) => {
    try {
      return handleSuccessResponseUtil(
        false,
        await EmsUserApiRequestService.requestToGetAllEmsUserWithPaginationAndSearchAndSort(
          emsUserRequestBeanWithPaginationAndSearchAndSort,
        ),
      );
    } catch (error) {
      return handleErrorResponseUtil(true, error);
    }
  };

export const handleRequestToDeleteEmsUserById = async (id) => {
  try {
    return handleSuccessResponseUtil(
      true,
      await EmsUserApiRequestService.requestToDeleteEmsUserById(id),
    );
  } catch (error) {
    return handleErrorResponseUtil(true, error);
  }
};

export const handleRequestToGetDropdownOfEmsUserGender = async () => {
  try {
    return handleSuccessResponseUtil(
      false,
      await EmsUserApiRequestService.requestToGetDropdownOfEmsUserGender(),
    );
  } catch (error) {
    return handleErrorResponseUtil(true, error);
  }
};
