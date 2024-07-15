import styles from "./DisplayEmsUserAdvanced.module.css";
/*--------------------------------------------------------------------------------------------------------------------*/
import { useEffect, useState } from "react";
/*--------------------------------------------------------------------------------------------------------------------*/
// import { useNavigate } from "react-router-dom";
/*--------------------------------------------------------------------------------------------------------------------*/
import { Pagination } from "antd";
import { LiaSortSolid } from "react-icons/lia";
import { MdOutlineClose } from "react-icons/md";
import { TbFilter, TbFilterFilled } from "react-icons/tb";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
/*--------------------------------------------------------------------------------------------------------------------*/
import EmsAppLoader from "../../util/EmsAppLoader/EmsAppLoader.jsx";
import EmsAppDataNotFound from "../../util/EmsAppDataNotFound/EmsAppDataNotFound.jsx";
/*--------------------------------------------------------------------------------------------------------------------*/
import { ASC_STRING, DESC_STRING } from "../../../constants/emp-app-constant.js";
// import * as EmpAppPathConstant from "../../../constants/emp-app-path-constant.js";
/*--------------------------------------------------------------------------------------------------------------------*/
import * as EmsUserApiRequestHandlerService from "../../../axios/ems-user/ems-user-api-request-handler-service.js";

/*--------------------------------------------------------------------------------------------------------------------*/

let renderCountOfDisplayEmsUserAdvanced = 0;
const DisplayEmsUserAdvanced = () => {
  console.log("renderCountOfDisplayEmsUserAdvanced: " + renderCountOfDisplayEmsUserAdvanced++);

  /*================================================================================================================================================*/

  const [emsUserRequestBeanWithPaginationAndSortAndSearch, setEmsUserRequestBeanWithPaginationAndSortAndSearch] =
    useState({
      firstName: {
        sortOrderTimestamp: "",
        showAscendingSort: false,
        showDescendingSort: false,
        showFilterInput: false,
        searchValue: "",
      },
      lastName: {
        sortOrderTimestamp: "",
        showAscendingSort: false,
        showDescendingSort: false,
        showFilterInput: false,
        searchValue: "",
      },
      emsUserGender: {
        sortOrderTimestamp: "",
        showAscendingSort: false,
        showDescendingSort: false,
        showFilterInput: false,
        searchValue: "",
      },
      email: {
        sortOrderTimestamp: "",
        showAscendingSort: false,
        showDescendingSort: false,
        showFilterInput: false,
        searchValue: "",
      },
      dateOfBirth: {
        sortOrderTimestamp: "",
        showAscendingSort: false,
        showDescendingSort: false,
        showFilterInput: false,
        searchValue: "",
      },
      dateOfJoin: {
        sortOrderTimestamp: "",
        showAscendingSort: false,
        showDescendingSort: false,
        showFilterInput: false,
        searchValue: "",
      },
      salary: {
        sortOrderTimestamp: "",
        showAscendingSort: false,
        showDescendingSort: false,
        showFilterInput: false,
        searchValue: "",
      },
      hikePercentage: {
        sortOrderTimestamp: "",
        showAscendingSort: false,
        showDescendingSort: false,
        showFilterInput: false,
        searchValue: "",
      },
      zipCode: {
        sortOrderTimestamp: "",
        showAscendingSort: false,
        showDescendingSort: false,
        showFilterInput: false,
        searchValue: "",
      },
      mobileNumber: {
        showFilterInput: false,
        searchValue: "",
      },
    });

  const [isLoading, setIsLoading] = useState(true);

  const [emsUserResponseBeanWithPagination, setEmsUserResponseBeanWithPagination] = useState({
    emsAppPaginationMetadataBean: {
      pageNumber: 0,
      pageSize: 0,
      totalPages: 0,
      totalElements: 0,
    },
    getEmsUserResponseBeanList: [],
  });

  /*================================================================================================================================================*/

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const callApiToGetAllEmsUserWithPaginationAndSortAndSearch = async () => {
      return await EmsUserApiRequestHandlerService.handleRequestToGetAllEmsUserWithPaginationAndSortAndSearch(
        {
          pageNumber: 1,
          pageSize: 10,
        },
        [],
        {},
      );
    };
    callApiToGetAllEmsUserWithPaginationAndSortAndSearch()
      .then((successOrErrorResponseData) => {
        if (
          isMounted &&
          successOrErrorResponseData.statusCode === 200 &&
          successOrErrorResponseData.payload.getEmsUserResponseBeanList != null
        ) {
          setEmsUserResponseBeanWithPagination((prevState) => ({
            ...prevState,
            emsAppPaginationMetadataBean: successOrErrorResponseData.payload.emsAppPaginationMetadataBean,
            getEmsUserResponseBeanList: successOrErrorResponseData.payload.getEmsUserResponseBeanList,
          }));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      //CLEAN UP OF DisplayEmsUserAdvanced COMPONENT ON UNMOUNT
      isMounted = false;
      setEmsUserResponseBeanWithPagination((prevState) => ({
        ...prevState,
        emsAppPaginationMetadataBean: {},
        getEmsUserResponseBeanList: [],
      }));
    };
  }, []);

  /*================================================================================================================================================*/

  const onClickHandleToggleShowFilterInputByFieldName = (fieldName) => {
    const tempEmsUserRequestBeanWithPaginationAndSortAndSearch = {
      ...emsUserRequestBeanWithPaginationAndSortAndSearch[fieldName],
    };
    tempEmsUserRequestBeanWithPaginationAndSortAndSearch.showFilterInput =
      !tempEmsUserRequestBeanWithPaginationAndSortAndSearch.showFilterInput;
    tempEmsUserRequestBeanWithPaginationAndSortAndSearch.searchValue = "";
    setEmsUserRequestBeanWithPaginationAndSortAndSearch((prevState) => ({
      ...prevState,
      [fieldName]: tempEmsUserRequestBeanWithPaginationAndSortAndSearch,
    }));
  };

  /*================================================================================================================================================*/

  const onClickHandleToggleSortFlagByFieldName = (fieldName) => {
    const tempEmsUserRequestBeanWithPaginationAndSortAndSearch = {
      ...emsUserRequestBeanWithPaginationAndSortAndSearch[fieldName],
    };
    if (
      !tempEmsUserRequestBeanWithPaginationAndSortAndSearch.showAscendingSort &&
      tempEmsUserRequestBeanWithPaginationAndSortAndSearch.showDescendingSort
    ) {
      tempEmsUserRequestBeanWithPaginationAndSortAndSearch.sortOrderTimestamp = "";
      tempEmsUserRequestBeanWithPaginationAndSortAndSearch.showAscendingSort = false;
      tempEmsUserRequestBeanWithPaginationAndSortAndSearch.showDescendingSort = false;
    } else {
      tempEmsUserRequestBeanWithPaginationAndSortAndSearch.sortOrderTimestamp = new Date();
      const tempShowAscendingSortFlag = tempEmsUserRequestBeanWithPaginationAndSortAndSearch.showAscendingSort;
      tempEmsUserRequestBeanWithPaginationAndSortAndSearch.showAscendingSort = !tempShowAscendingSortFlag;
      tempEmsUserRequestBeanWithPaginationAndSortAndSearch.showDescendingSort = tempShowAscendingSortFlag;
    }
    setEmsUserRequestBeanWithPaginationAndSortAndSearch((prevState) => ({
      ...prevState,
      [fieldName]: tempEmsUserRequestBeanWithPaginationAndSortAndSearch,
    }));
  };

  /*================================================================================================================================================*/

  const onChangeHandleSearchFieldStateByFieldName = (e) => {
    const tempEmsUserRequestBeanWithPaginationAndSortAndSearch = {
      ...emsUserRequestBeanWithPaginationAndSortAndSearch[e.target.name],
    };
    tempEmsUserRequestBeanWithPaginationAndSortAndSearch.searchValue = e.target.value;
    setEmsUserRequestBeanWithPaginationAndSortAndSearch((prevState) => ({
      ...prevState,
      [e.target.name]: tempEmsUserRequestBeanWithPaginationAndSortAndSearch,
    }));
  };

  /*================================================================================================================================================*/

  const onChangePagination = async (pageNumber, pageSize) => {
    const tempEmsAppPaginationMetadataBean = emsUserResponseBeanWithPagination.emsAppPaginationMetadataBean;
    tempEmsAppPaginationMetadataBean.pageNumber = pageNumber;
    tempEmsAppPaginationMetadataBean.pageSize = pageSize;

    setEmsUserResponseBeanWithPagination((prevState) => ({
      ...prevState,
      emsAppPaginationMetadataBean: tempEmsAppPaginationMetadataBean,
    }));

    const emsAppSortMetadataBeanList = [];
    const emsUserRequestBeanWithSearch = Object.create({});

    prepareEmsAppSortMetadataBeanListAndEmsUserRequestBeanWithSearch(
      emsAppSortMetadataBeanList,
      emsUserRequestBeanWithSearch,
    );

    setIsLoading(true);
    const callApiToGetAllEmsUserWithPaginationAndSortAndSearch = async () => {
      return await EmsUserApiRequestHandlerService.handleRequestToGetAllEmsUserWithPaginationAndSortAndSearch(
        emsUserResponseBeanWithPagination.emsAppPaginationMetadataBean,
        emsAppSortMetadataBeanList,
        emsUserRequestBeanWithSearch,
      );
    };
    callApiToGetAllEmsUserWithPaginationAndSortAndSearch()
      .then((successOrErrorResponseData) => {
        if (
          successOrErrorResponseData.statusCode === 200 &&
          successOrErrorResponseData.payload.getEmsUserResponseBeanList != null
        ) {
          setEmsUserResponseBeanWithPagination((prevState) => ({
            ...prevState,
            emsAppPaginationMetadataBean: successOrErrorResponseData.payload.emsAppPaginationMetadataBean,
            getEmsUserResponseBeanList: successOrErrorResponseData.payload.getEmsUserResponseBeanList,
          }));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /*================================================================================================================================================*/

  const prepareEmsAppSortMetadataBeanListAndEmsUserRequestBeanWithSearch = (
    emsAppSortMetadataBeanList,
    emsUserRequestBeanWithSearch,
  ) => {
    Object.keys(emsUserRequestBeanWithPaginationAndSortAndSearch).forEach((item) => {
      const fieldNameCapitalized = item.charAt(0).toUpperCase().concat(item.slice(1));

      if (emsUserRequestBeanWithPaginationAndSortAndSearch[item].searchValue !== "") {
        emsUserRequestBeanWithSearch[`searchValueFor${fieldNameCapitalized}`] =
          emsUserRequestBeanWithPaginationAndSortAndSearch[item].searchValue;
      }

      const emsAppSortMetadataBean = Object.create({});

      if (
        emsUserRequestBeanWithPaginationAndSortAndSearch[item].showAscendingSort &&
        !emsUserRequestBeanWithPaginationAndSortAndSearch[item].showDescendingSort
      ) {
        emsAppSortMetadataBean.sortDirectionInputFieldName = item;
        emsAppSortMetadataBean.sortDirection = ASC_STRING;
        emsAppSortMetadataBean.sortOrderTimestamp =
          emsUserRequestBeanWithPaginationAndSortAndSearch[item].sortOrderTimestamp;
        emsAppSortMetadataBeanList.push(emsAppSortMetadataBean);
      } else if (
        !emsUserRequestBeanWithPaginationAndSortAndSearch[item].showAscendingSort &&
        emsUserRequestBeanWithPaginationAndSortAndSearch[item].showDescendingSort
      ) {
        emsAppSortMetadataBean.sortDirectionInputFieldName = item;
        emsAppSortMetadataBean.sortDirection = DESC_STRING;
        emsAppSortMetadataBean.sortOrderTimestamp =
          emsUserRequestBeanWithPaginationAndSortAndSearch[item].sortOrderTimestamp;
        emsAppSortMetadataBeanList.push(emsAppSortMetadataBean);
      }
    });
  };

  /*================================================================================================================================================*/

  return (
    <>
      {isLoading ? (
        <EmsAppLoader />
      ) : emsUserResponseBeanWithPagination.getEmsUserResponseBeanList.length === 0 ? (
        <EmsAppDataNotFound />
      ) : (
        <>
          <div className="h-100">
            {Object.keys(emsUserRequestBeanWithPaginationAndSortAndSearch).map((item) => {
              return (
                <div key={item}>
                  {JSON.stringify(emsUserRequestBeanWithPaginationAndSortAndSearch[item]) + " --- " + item}
                </div>
              );
            })}
            <div>{JSON.stringify(emsUserResponseBeanWithPagination.emsAppPaginationMetadataBean)}</div>
            <div className="d-flex flex-column justify-content-start align-items-center">
              <table className="w-100 table-bordered text-center">
                <thead className={`${styles.displayEmsUserTableHeading} sticky-top bg-warning`}>
                  <tr>
                    <th>
                      <label>Sl. No.</label>
                    </th>
                    <th>
                      <div className="d-flex justify-content-center align-items-center gap-1">
                        <label>First Name</label>
                        <div
                          className={`${styles.cursorPointer}`}
                          onClick={() => onClickHandleToggleShowFilterInputByFieldName("firstName")}
                        >
                          <span>
                            {emsUserRequestBeanWithPaginationAndSortAndSearch["firstName"].showFilterInput ? (
                              <TbFilterFilled size={20} />
                            ) : (
                              <TbFilter size={20} />
                            )}
                          </span>
                        </div>
                        <div
                          onClick={() => onClickHandleToggleSortFlagByFieldName("firstName")}
                          className={`${styles.cursorPointer}`}
                        >
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["firstName"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["firstName"].showDescendingSort && (
                              <LiaSortSolid size={20} />
                            )}
                          {emsUserRequestBeanWithPaginationAndSortAndSearch["firstName"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["firstName"].showDescendingSort && (
                              <TiArrowSortedUp size={20} />
                            )}
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["firstName"].showAscendingSort &&
                            emsUserRequestBeanWithPaginationAndSortAndSearch["firstName"].showDescendingSort && (
                              <TiArrowSortedDown size={20} />
                            )}
                        </div>
                      </div>
                      {emsUserRequestBeanWithPaginationAndSortAndSearch["firstName"].showFilterInput && (
                        <div className="d-flex justify-content-center align-items-center gap-1">
                          <input
                            type="text"
                            name="firstName"
                            placeholder="Search First Name"
                            value={emsUserRequestBeanWithPaginationAndSortAndSearch["firstName"].searchValue}
                            onChange={(e) => onChangeHandleSearchFieldStateByFieldName(e)}
                          />
                          <button
                            type="button"
                            onClick={() => onClickHandleToggleShowFilterInputByFieldName("firstName")}
                          >
                            <MdOutlineClose />
                          </button>
                        </div>
                      )}
                    </th>
                    <th>
                      <div className="d-flex justify-content-center align-items-center gap-1">
                        <label>Last Name</label>
                        <div
                          className={`${styles.cursorPointer}`}
                          onClick={() => onClickHandleToggleShowFilterInputByFieldName("lastName")}
                        >
                          <span>
                            {emsUserRequestBeanWithPaginationAndSortAndSearch["lastName"].showFilterInput ? (
                              <TbFilterFilled size={20} />
                            ) : (
                              <TbFilter size={20} />
                            )}
                          </span>
                        </div>
                        <div
                          onClick={() => onClickHandleToggleSortFlagByFieldName("lastName")}
                          className={`${styles.cursorPointer}`}
                        >
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["lastName"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["lastName"].showDescendingSort && (
                              <LiaSortSolid size={20} />
                            )}
                          {emsUserRequestBeanWithPaginationAndSortAndSearch["lastName"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["lastName"].showDescendingSort && (
                              <TiArrowSortedUp size={20} />
                            )}
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["lastName"].showAscendingSort &&
                            emsUserRequestBeanWithPaginationAndSortAndSearch["lastName"].showDescendingSort && (
                              <TiArrowSortedDown size={20} />
                            )}
                        </div>
                      </div>
                      {emsUserRequestBeanWithPaginationAndSortAndSearch["lastName"].showFilterInput && (
                        <div className="d-flex justify-content-center align-items-center gap-1">
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Search Last Name"
                            value={emsUserRequestBeanWithPaginationAndSortAndSearch["lastName"].searchValue}
                            onChange={(e) => onChangeHandleSearchFieldStateByFieldName(e)}
                          />
                          <button
                            type="button"
                            onClick={() => onClickHandleToggleShowFilterInputByFieldName("lastName")}
                          >
                            <MdOutlineClose />
                          </button>
                        </div>
                      )}
                    </th>
                    <th>
                      <div className="d-flex justify-content-center align-items-center gap-1">
                        <label>Gender</label>
                        <div
                          className={`${styles.cursorPointer}`}
                          onClick={() => onClickHandleToggleShowFilterInputByFieldName("emsUserGender")}
                        >
                          <span>
                            {emsUserRequestBeanWithPaginationAndSortAndSearch["emsUserGender"].showFilterInput ? (
                              <TbFilterFilled size={20} />
                            ) : (
                              <TbFilter size={20} />
                            )}
                          </span>
                        </div>
                        <div
                          onClick={() => onClickHandleToggleSortFlagByFieldName("emsUserGender")}
                          className={`${styles.cursorPointer}`}
                        >
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["emsUserGender"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["emsUserGender"].showDescendingSort && (
                              <LiaSortSolid size={20} />
                            )}
                          {emsUserRequestBeanWithPaginationAndSortAndSearch["emsUserGender"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["emsUserGender"].showDescendingSort && (
                              <TiArrowSortedUp size={20} />
                            )}
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["emsUserGender"].showAscendingSort &&
                            emsUserRequestBeanWithPaginationAndSortAndSearch["emsUserGender"].showDescendingSort && (
                              <TiArrowSortedDown size={20} />
                            )}
                        </div>
                      </div>
                      {emsUserRequestBeanWithPaginationAndSortAndSearch["emsUserGender"].showFilterInput && (
                        <div className="d-flex justify-content-center align-items-center gap-1">
                          <input
                            type="text"
                            name="emsUserGender"
                            placeholder="Search Gender"
                            value={emsUserRequestBeanWithPaginationAndSortAndSearch["emsUserGender"].searchValue}
                            onChange={(e) => onChangeHandleSearchFieldStateByFieldName(e)}
                          />
                          <button
                            type="button"
                            onClick={() => onClickHandleToggleShowFilterInputByFieldName("emsUserGender")}
                          >
                            <MdOutlineClose />
                          </button>
                        </div>
                      )}
                    </th>
                    <th>
                      <div className="d-flex justify-content-center align-items-center gap-1">
                        <label>Email</label>
                        <div
                          className={`${styles.cursorPointer}`}
                          onClick={() => onClickHandleToggleShowFilterInputByFieldName("email")}
                        >
                          <span>
                            {emsUserRequestBeanWithPaginationAndSortAndSearch["email"].showFilterInput ? (
                              <TbFilterFilled size={20} />
                            ) : (
                              <TbFilter size={20} />
                            )}
                          </span>
                        </div>
                        <div
                          onClick={() => onClickHandleToggleSortFlagByFieldName("email")}
                          className={`${styles.cursorPointer}`}
                        >
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["email"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["email"].showDescendingSort && (
                              <LiaSortSolid size={20} />
                            )}
                          {emsUserRequestBeanWithPaginationAndSortAndSearch["email"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["email"].showDescendingSort && (
                              <TiArrowSortedUp size={20} />
                            )}
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["email"].showAscendingSort &&
                            emsUserRequestBeanWithPaginationAndSortAndSearch["email"].showDescendingSort && (
                              <TiArrowSortedDown size={20} />
                            )}
                        </div>
                      </div>
                      {emsUserRequestBeanWithPaginationAndSortAndSearch["email"].showFilterInput && (
                        <div className="d-flex justify-content-center align-items-center gap-1">
                          <input
                            type="text"
                            name="email"
                            placeholder="Search Email"
                            value={emsUserRequestBeanWithPaginationAndSortAndSearch["email"].searchValue}
                            onChange={(e) => onChangeHandleSearchFieldStateByFieldName(e)}
                          />
                          <button type="button" onClick={() => onClickHandleToggleShowFilterInputByFieldName("email")}>
                            <MdOutlineClose />
                          </button>
                        </div>
                      )}
                    </th>
                    <th>
                      <div className="d-flex justify-content-center align-items-center gap-1">
                        <label>Date Of Birth</label>
                        <div
                          className={`${styles.cursorPointer}`}
                          onClick={() => onClickHandleToggleShowFilterInputByFieldName("dateOfBirth")}
                        >
                          <span>
                            {emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfBirth"].showFilterInput ? (
                              <TbFilterFilled size={20} />
                            ) : (
                              <TbFilter size={20} />
                            )}
                          </span>
                        </div>
                        <div
                          onClick={() => onClickHandleToggleSortFlagByFieldName("dateOfBirth")}
                          className={`${styles.cursorPointer}`}
                        >
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfBirth"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfBirth"].showDescendingSort && (
                              <LiaSortSolid size={20} />
                            )}
                          {emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfBirth"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfBirth"].showDescendingSort && (
                              <TiArrowSortedUp size={20} />
                            )}
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfBirth"].showAscendingSort &&
                            emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfBirth"].showDescendingSort && (
                              <TiArrowSortedDown size={20} />
                            )}
                        </div>
                      </div>
                      {emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfBirth"].showFilterInput && (
                        <div className="d-flex justify-content-center align-items-center gap-1">
                          <input
                            type="text"
                            name="dateOfBirth"
                            placeholder="Search Date Of Birth [yyyy-MM-dd]"
                            value={emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfBirth"].searchValue}
                            onChange={(e) => onChangeHandleSearchFieldStateByFieldName(e)}
                          />
                          <button
                            type="button"
                            onClick={() => onClickHandleToggleShowFilterInputByFieldName("dateOfBirth")}
                          >
                            <MdOutlineClose />
                          </button>
                        </div>
                      )}
                    </th>
                    <th>
                      <div className="d-flex justify-content-center align-items-center gap-1">
                        <label>Date Of Join</label>
                        <div
                          className={`${styles.cursorPointer}`}
                          onClick={() => onClickHandleToggleShowFilterInputByFieldName("dateOfJoin")}
                        >
                          <span>
                            {emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfJoin"].showFilterInput ? (
                              <TbFilterFilled size={20} />
                            ) : (
                              <TbFilter size={20} />
                            )}
                          </span>
                        </div>
                        <div
                          onClick={() => onClickHandleToggleSortFlagByFieldName("dateOfJoin")}
                          className={`${styles.cursorPointer}`}
                        >
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfJoin"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfJoin"].showDescendingSort && (
                              <LiaSortSolid size={20} />
                            )}
                          {emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfJoin"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfJoin"].showDescendingSort && (
                              <TiArrowSortedUp size={20} />
                            )}
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfJoin"].showAscendingSort &&
                            emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfJoin"].showDescendingSort && (
                              <TiArrowSortedDown size={20} />
                            )}
                        </div>
                      </div>
                      {emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfJoin"].showFilterInput && (
                        <div className="d-flex justify-content-center align-items-center gap-1">
                          <input
                            type="text"
                            name="dateOfJoin"
                            placeholder="Search Date Of Join [yyyy-MM-dd]"
                            value={emsUserRequestBeanWithPaginationAndSortAndSearch["dateOfJoin"].searchValue}
                            onChange={(e) => onChangeHandleSearchFieldStateByFieldName(e)}
                          />
                          <button
                            type="button"
                            onClick={() => onClickHandleToggleShowFilterInputByFieldName("dateOfJoin")}
                          >
                            <MdOutlineClose />
                          </button>
                        </div>
                      )}
                    </th>
                    <th>
                      <div className="d-flex justify-content-center align-items-center gap-1">
                        <label>Salary</label>
                        <div
                          className={`${styles.cursorPointer}`}
                          onClick={() => onClickHandleToggleShowFilterInputByFieldName("salary")}
                        >
                          <span>
                            {emsUserRequestBeanWithPaginationAndSortAndSearch["salary"].showFilterInput ? (
                              <TbFilterFilled size={20} />
                            ) : (
                              <TbFilter size={20} />
                            )}
                          </span>
                        </div>
                        <div
                          onClick={() => onClickHandleToggleSortFlagByFieldName("salary")}
                          className={`${styles.cursorPointer}`}
                        >
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["salary"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["salary"].showDescendingSort && (
                              <LiaSortSolid size={20} />
                            )}
                          {emsUserRequestBeanWithPaginationAndSortAndSearch["salary"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["salary"].showDescendingSort && (
                              <TiArrowSortedUp size={20} />
                            )}
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["salary"].showAscendingSort &&
                            emsUserRequestBeanWithPaginationAndSortAndSearch["salary"].showDescendingSort && (
                              <TiArrowSortedDown size={20} />
                            )}
                        </div>
                      </div>
                      {emsUserRequestBeanWithPaginationAndSortAndSearch["salary"].showFilterInput && (
                        <div className="d-flex justify-content-center align-items-center gap-1">
                          <input
                            type="number"
                            name="salary"
                            placeholder="Search Salary"
                            value={emsUserRequestBeanWithPaginationAndSortAndSearch["salary"].searchValue}
                            onChange={(e) => onChangeHandleSearchFieldStateByFieldName(e)}
                          />
                          <button type="button" onClick={() => onClickHandleToggleShowFilterInputByFieldName("salary")}>
                            <MdOutlineClose />
                          </button>
                        </div>
                      )}
                    </th>
                    <th>
                      <div className="d-flex justify-content-center align-items-center gap-1">
                        <label>Hike Percentage</label>
                        <div
                          className={`${styles.cursorPointer}`}
                          onClick={() => onClickHandleToggleShowFilterInputByFieldName("hikePercentage")}
                        >
                          <span>
                            {emsUserRequestBeanWithPaginationAndSortAndSearch["hikePercentage"].showFilterInput ? (
                              <TbFilterFilled size={20} />
                            ) : (
                              <TbFilter size={20} />
                            )}
                          </span>
                        </div>
                        <div
                          onClick={() => onClickHandleToggleSortFlagByFieldName("hikePercentage")}
                          className={`${styles.cursorPointer}`}
                        >
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["hikePercentage"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["hikePercentage"].showDescendingSort && (
                              <LiaSortSolid size={20} />
                            )}
                          {emsUserRequestBeanWithPaginationAndSortAndSearch["hikePercentage"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["hikePercentage"].showDescendingSort && (
                              <TiArrowSortedUp size={20} />
                            )}
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["hikePercentage"].showAscendingSort &&
                            emsUserRequestBeanWithPaginationAndSortAndSearch["hikePercentage"].showDescendingSort && (
                              <TiArrowSortedDown size={20} />
                            )}
                        </div>
                      </div>
                      {emsUserRequestBeanWithPaginationAndSortAndSearch["hikePercentage"].showFilterInput && (
                        <div className="d-flex justify-content-center align-items-center gap-1">
                          <input
                            type="number"
                            name="hikePercentage"
                            placeholder="Search Hike Percentage"
                            value={emsUserRequestBeanWithPaginationAndSortAndSearch["hikePercentage"].searchValue}
                            onChange={(e) => onChangeHandleSearchFieldStateByFieldName(e)}
                          />
                          <button
                            type="button"
                            onClick={() => onClickHandleToggleShowFilterInputByFieldName("hikePercentage")}
                          >
                            <MdOutlineClose />
                          </button>
                        </div>
                      )}
                    </th>
                    <th>
                      <div className="d-flex justify-content-center align-items-center gap-1">
                        <label>Zip Code</label>
                        <div
                          className={`${styles.cursorPointer}`}
                          onClick={() => onClickHandleToggleShowFilterInputByFieldName("zipCode")}
                        >
                          <span>
                            {emsUserRequestBeanWithPaginationAndSortAndSearch["zipCode"].showFilterInput ? (
                              <TbFilterFilled size={20} />
                            ) : (
                              <TbFilter size={20} />
                            )}
                          </span>
                        </div>
                        <div
                          onClick={() => onClickHandleToggleSortFlagByFieldName("zipCode")}
                          className={`${styles.cursorPointer}`}
                        >
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["zipCode"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["zipCode"].showDescendingSort && (
                              <LiaSortSolid size={20} />
                            )}
                          {emsUserRequestBeanWithPaginationAndSortAndSearch["zipCode"].showAscendingSort &&
                            !emsUserRequestBeanWithPaginationAndSortAndSearch["zipCode"].showDescendingSort && (
                              <TiArrowSortedUp size={20} />
                            )}
                          {!emsUserRequestBeanWithPaginationAndSortAndSearch["zipCode"].showAscendingSort &&
                            emsUserRequestBeanWithPaginationAndSortAndSearch["zipCode"].showDescendingSort && (
                              <TiArrowSortedDown size={20} />
                            )}
                        </div>
                      </div>
                      {emsUserRequestBeanWithPaginationAndSortAndSearch["zipCode"].showFilterInput && (
                        <div className="d-flex justify-content-center align-items-center gap-1">
                          <input
                            type="text"
                            name="zipCode"
                            placeholder="Search Zip Code"
                            value={emsUserRequestBeanWithPaginationAndSortAndSearch["zipCode"].searchValue}
                            onChange={(e) => onChangeHandleSearchFieldStateByFieldName(e)}
                          />
                          <button
                            type="button"
                            onClick={() => onClickHandleToggleShowFilterInputByFieldName("zipCode")}
                          >
                            <MdOutlineClose />
                          </button>
                        </div>
                      )}
                    </th>
                    <th>
                      <div className="d-flex justify-content-center align-items-center gap-1">
                        <label>Mobile Number</label>
                        <div
                          className={`${styles.cursorPointer}`}
                          onClick={() => onClickHandleToggleShowFilterInputByFieldName("mobileNumber")}
                        >
                          <span>
                            {emsUserRequestBeanWithPaginationAndSortAndSearch["mobileNumber"].showFilterInput ? (
                              <TbFilterFilled size={20} />
                            ) : (
                              <TbFilter size={20} />
                            )}
                          </span>
                        </div>
                      </div>
                      {emsUserRequestBeanWithPaginationAndSortAndSearch["mobileNumber"].showFilterInput && (
                        <div className="d-flex justify-content-center align-items-center gap-1">
                          <input
                            type="text"
                            name="mobileNumber"
                            placeholder="Search Mobile Number"
                            value={emsUserRequestBeanWithPaginationAndSortAndSearch["mobileNumber"].searchValue}
                            onChange={(e) => onChangeHandleSearchFieldStateByFieldName(e)}
                          />
                          <button
                            type="button"
                            onClick={() => onClickHandleToggleShowFilterInputByFieldName("mobileNumber")}
                          >
                            <MdOutlineClose />
                          </button>
                        </div>
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {emsUserResponseBeanWithPagination.getEmsUserResponseBeanList.map((emsUser, index) => {
                    return (
                      <tr key={emsUser.id}>
                        <td>{index + 1}</td>
                        <td>{emsUser.firstName}</td>
                        <td>{emsUser.lastName}</td>
                        <td>{emsUser.emsUserGender}</td>
                        <td>{emsUser.email}</td>
                        <td>{emsUser.dateOfBirth}</td>
                        <td>{emsUser.dateOfJoin}</td>
                        <td className="text-end">{emsUser.salary.toFixed(2)}</td>
                        <td className="text-end">{emsUser.hikePercentage.toFixed(2)}</td>
                        <td>{emsUser.zipCode}</td>
                        <td>{emsUser.mobileNumber}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="d-flex justify-content-center align-items-center">
                {/*<button
                type="button"
                className="btn btn-outline-success"
                onClick={onClickHandleSearch}
              >
                Search
              </button>*/}
                <Pagination
                  current={emsUserResponseBeanWithPagination.emsAppPaginationMetadataBean.pageNumber}
                  defaultCurrent={1}
                  defaultPageSize={10}
                  pageSize={emsUserResponseBeanWithPagination.emsAppPaginationMetadataBean.pageSize}
                  pageSizeOptions={[10, 20, 30, 40, 50]}
                  responsive={true}
                  showQuickJumper
                  size="small"
                  total={emsUserResponseBeanWithPagination.emsAppPaginationMetadataBean.totalElements}
                  onChange={onChangePagination}
                  // onShowSizeChange={}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DisplayEmsUserAdvanced;
