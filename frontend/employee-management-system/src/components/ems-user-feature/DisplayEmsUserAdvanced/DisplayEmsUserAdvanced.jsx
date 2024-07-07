import styles from "./DisplayEmsUserAdvanced.module.css";
/*--------------------------------------------------------------------------------------------------------------------*/
import { useEffect, useState } from "react";
/*--------------------------------------------------------------------------------------------------------------------*/
// import { useNavigate } from "react-router-dom";
/*--------------------------------------------------------------------------------------------------------------------*/
import { LiaSortSolid } from "react-icons/lia";
import { MdOutlineClose } from "react-icons/md";
import { TbFilter, TbFilterFilled } from "react-icons/tb";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
/*--------------------------------------------------------------------------------------------------------------------*/
import EmsAppLoader from "../../util/EmsAppLoader/EmsAppLoader.jsx";
import EmsAppDataNotFound from "../../util/EmsAppDataNotFound/EmsAppDataNotFound.jsx";
/*--------------------------------------------------------------------------------------------------------------------*/
import {
  ASC_STRING,
  DESC_STRING,
} from "../../../constants/emp-app-constant.js";
// import * as EmpAppPathConstant from "../../../constants/emp-app-path-constant.js";
/*--------------------------------------------------------------------------------------------------------------------*/
import * as EmsUserApiRequestHandlerService from "../../../axios/ems-user/ems-user-api-request-handler-service.js";

/*--------------------------------------------------------------------------------------------------------------------*/

let renderCountOfDisplayEmsUserAdvanced = 0;
const DisplayEmsUserAdvanced = () => {
  console.log(
    "renderCountOfDisplayEmsUserAdvanced: " +
      renderCountOfDisplayEmsUserAdvanced++,
  );

  const [emsUserList, setEmsUserList] = useState([]);
  // const [useEffectTrigger, setUseEffectTrigger] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  const [emsUserRequestBeanWithSearch, setEmsUserRequestBeanWithSearch] =
    useState({
      searchFirstName: "",
      searchLastName: "",
      searchEmsUserGender: "",
      searchEmail: "",
      searchDateOfBirth: "",
      searchDateOfJoin: "",
      searchSalary: "",
      searchHikePercentage: "",
      searchZipCode: "",
      searchMobileNumber: "",
    });

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const callApiToGetAllEmsUserWithPaginationAndSearchAndSort = async () => {
      return await EmsUserApiRequestHandlerService.handleRequestToGetAllEmsUserWithPaginationAndSearchAndSort();
    };
    callApiToGetAllEmsUserWithPaginationAndSearchAndSort()
      .then((successOrErrorResponseData) => {
        if (
          isMounted &&
          successOrErrorResponseData.statusCode === 200 &&
          successOrErrorResponseData.payload.getEmsUserResponseBeanList != null
        ) {
          setEmsUserList(
            successOrErrorResponseData.payload.getEmsUserResponseBeanList,
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      //CLEAN UP OF DisplayEmsUserAdvanced COMPONENT ON UNMOUNT
      isMounted = false;
      setEmsUserList([]);
    };
  }, []);
  /*------------------------------------------------------------------------------*/
  const [optionForFirstName, setOptionForFirstName] = useState({
    showFilterInputForFirstName: false,
    showAscendingSortForFirstName: false,
    showDescendingSortForFirstName: false,
  });
  const onClickHandleShowFilterInputForFirstName = () => {
    setEmsUserRequestBeanWithSearch((prevState) => ({
      ...prevState,
      searchFirstName: "",
    }));
    setOptionForFirstName((prevState) => ({
      ...prevState,
      showFilterInputForFirstName: !prevState.showFilterInputForFirstName,
    }));
  };
  const onClickHandleShowSortForFirstName = () => {
    if (
      !optionForFirstName.showAscendingSortForFirstName &&
      optionForFirstName.showDescendingSortForFirstName
    ) {
      setOptionForFirstName((prevState) => ({
        ...prevState,
        showAscendingSortForFirstName: false,
        showDescendingSortForFirstName: false,
      }));
    } else {
      setOptionForFirstName((prevState) => ({
        ...prevState,
        showAscendingSortForFirstName: !prevState.showAscendingSortForFirstName,
        showDescendingSortForFirstName: prevState.showAscendingSortForFirstName,
      }));
    }
  };
  /*------------------------------------------------------------------------------*/
  const [optionForLastName, setOptionForLastName] = useState({
    showFilterInputForLastName: false,
    showAscendingSortForLastName: false,
    showDescendingSortForLastName: false,
  });
  const onClickHandleShowFilterInputForLastName = () => {
    setOptionForLastName((prevState) => ({
      ...prevState,
      showFilterInputForLastName: !prevState.showFilterInputForLastName,
    }));
  };
  const onClickHandleShowSortForLastName = () => {
    if (
      !optionForLastName.showAscendingSortForLastName &&
      optionForLastName.showDescendingSortForLastName
    ) {
      setOptionForLastName((prevState) => ({
        ...prevState,
        showAscendingSortForLastName: false,
        showDescendingSortForLastName: false,
      }));
    } else {
      setOptionForLastName((prevState) => ({
        ...prevState,
        showAscendingSortForLastName: !prevState.showAscendingSortForLastName,
        showDescendingSortForLastName: prevState.showAscendingSortForLastName,
      }));
    }
  };
  /*------------------------------------------------------------------------------*/
  const onChangeHandleState = (e) => {
    setEmsUserRequestBeanWithSearch((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  /*------------------------------------------------------------------------------*/
  const onClickHandleSearch = async () => {
    Object.keys(emsUserRequestBeanWithSearch).forEach((item) => {
      emsUserRequestBeanWithSearch[item] =
        emsUserRequestBeanWithSearch[item] === ""
          ? null
          : emsUserRequestBeanWithSearch[item];
    });

    const emsUserRequestBeanWithPaginationAndSearchAndSort = {
      ...emsUserRequestBeanWithSearch,
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
      pageSize: 10,
    };

    if (
      optionForFirstName.showAscendingSortForFirstName &&
      !optionForFirstName.showDescendingSortForFirstName
    ) {
      emsUserRequestBeanWithPaginationAndSearchAndSort.sortDirectionForFirstName =
        ASC_STRING;
    } else if (
      !optionForFirstName.showAscendingSortForFirstName &&
      optionForFirstName.showDescendingSortForFirstName
    ) {
      emsUserRequestBeanWithPaginationAndSearchAndSort.sortDirectionForFirstName =
        DESC_STRING;
    }

    if (
      optionForLastName.showAscendingSortForLastName &&
      !optionForLastName.showDescendingSortForLastName
    ) {
      emsUserRequestBeanWithPaginationAndSearchAndSort.sortDirectionForLastName =
        ASC_STRING;
    } else if (
      !optionForLastName.showAscendingSortForLastName &&
      optionForLastName.showDescendingSortForLastName
    ) {
      emsUserRequestBeanWithPaginationAndSearchAndSort.sortDirectionForLastName =
        DESC_STRING;
    }
    console.log(
      "emsUserRequestBeanWithPaginationAndSearchAndSort: " +
        JSON.stringify(emsUserRequestBeanWithPaginationAndSearchAndSort),
    );
    setIsLoading(true);
    const callApiToGetAllEmsUserWithPaginationAndSearchAndSort = async () => {
      return await EmsUserApiRequestHandlerService.handleRequestToGetAllEmsUserWithPaginationAndSearchAndSort(
        emsUserRequestBeanWithPaginationAndSearchAndSort,
      );
    };
    callApiToGetAllEmsUserWithPaginationAndSearchAndSort()
      .then((successOrErrorResponseData) => {
        if (
          successOrErrorResponseData.statusCode === 200 &&
          successOrErrorResponseData.payload.getEmsUserResponseBeanList != null
        ) {
          setEmsUserList(
            successOrErrorResponseData.payload.getEmsUserResponseBeanList,
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  /*------------------------------------------------------------------------------*/
  // const onClickHandleFilterForFirstName = () => {};

  return (
    <>
      {isLoading ? (
        <EmsAppLoader />
      ) : emsUserList.length === 0 ? (
        <EmsAppDataNotFound />
      ) : (
        <div>
          <div>
            <button
              type="button"
              onClick={() => onClickHandleSearch()}
              className="border border-2 border-success btn btn-sm btn-outline-success"
            >
              Start Search
            </button>
          </div>
          <div>
            <table className="w-100 table-bordered text-center">
              <thead
                className={`${styles.displayEmsUserTableHeading} sticky-top bg-warning`}
              >
                <tr>
                  <th>
                    <label>Sl. No.</label>
                  </th>
                  <th>
                    <div className="d-flex justify-content-center align-items-center gap-1">
                      <div>First Name</div>
                      <div
                        onClick={() =>
                          onClickHandleShowFilterInputForFirstName()
                        }
                        className={`${styles.cursorPointer}`}
                      >
                        <span>
                          {optionForFirstName.showFilterInputForFirstName ? (
                            <TbFilterFilled />
                          ) : (
                            <TbFilter />
                          )}
                        </span>
                      </div>
                      <div
                        onClick={() => onClickHandleShowSortForFirstName()}
                        className={`${styles.cursorPointer}`}
                      >
                        {!optionForFirstName.showAscendingSortForFirstName &&
                          !optionForFirstName.showDescendingSortForFirstName && (
                            <LiaSortSolid />
                          )}
                        {optionForFirstName.showAscendingSortForFirstName &&
                          !optionForFirstName.showDescendingSortForFirstName && (
                            <TiArrowSortedUp />
                          )}
                        {!optionForFirstName.showAscendingSortForFirstName &&
                          optionForFirstName.showDescendingSortForFirstName && (
                            <TiArrowSortedDown />
                          )}
                      </div>
                    </div>
                    {optionForFirstName.showFilterInputForFirstName && (
                      <div className="d-flex justify-content-center align-items-center gap-1">
                        <input
                          type="text"
                          name="searchFirstName"
                          label="First Name"
                          value={emsUserRequestBeanWithSearch.searchFirstName}
                          onChange={(e) => onChangeHandleState(e)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            onClickHandleShowFilterInputForFirstName()
                          }
                        >
                          <MdOutlineClose />
                        </button>
                      </div>
                    )}
                  </th>
                  <th>
                    <div className="d-flex justify-content-center align-items-center gap-1">
                      <div>Last Name</div>
                      <div
                        onClick={() =>
                          onClickHandleShowFilterInputForLastName()
                        }
                        className={`${styles.cursorPointer}`}
                      >
                        <span>
                          {optionForLastName.showFilterInputForLastName ? (
                            <TbFilterFilled />
                          ) : (
                            <TbFilter />
                          )}
                        </span>
                      </div>
                      <div
                        onClick={() => onClickHandleShowSortForLastName()}
                        className={`${styles.cursorPointer}`}
                      >
                        {!optionForLastName.showAscendingSortForLastName &&
                          !optionForLastName.showDescendingSortForLastName && (
                            <LiaSortSolid />
                          )}
                        {optionForLastName.showAscendingSortForLastName &&
                          !optionForLastName.showDescendingSortForLastName && (
                            <TiArrowSortedUp />
                          )}
                        {!optionForLastName.showAscendingSortForLastName &&
                          optionForLastName.showDescendingSortForLastName && (
                            <TiArrowSortedDown />
                          )}
                      </div>
                    </div>
                    {optionForLastName.showFilterInputForLastName && (
                      <div className="d-flex justify-content-center align-items-center gap-1">
                        <input
                          type="text"
                          name="searchLastName"
                          label="Last Name"
                          value={emsUserRequestBeanWithSearch.searchLastName}
                          onChange={(e) => onChangeHandleState(e)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            onClickHandleShowFilterInputForLastName()
                          }
                        >
                          <MdOutlineClose />
                        </button>
                      </div>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {emsUserList.map((emsUser, index) => {
                  return (
                    <tr key={emsUser.id}>
                      <td>{index + 1}</td>
                      <td>{emsUser.firstName}</td>
                      <td>{emsUser.lastName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayEmsUserAdvanced;
