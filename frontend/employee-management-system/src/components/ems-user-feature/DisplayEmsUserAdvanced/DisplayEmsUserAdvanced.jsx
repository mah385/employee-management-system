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
/*import {
  ASC_STRING,
  DESC_STRING,
} from "../../../constants/emp-app-constant.js";*/
// import * as EmpAppPathConstant from "../../../constants/emp-app-path-constant.js";
/*--------------------------------------------------------------------------------------------------------------------*/
import * as EmsUserApiRequestHandlerService from "../../../axios/ems-user/ems-user-api-request-handler-service.js";

/*--------------------------------------------------------------------------------------------------------------------*/

const getSearchFieldNameByFieldName = (fieldName) => {
  let searchFieldName = "";
  if ("firstName" === fieldName) {
    searchFieldName = "searchFirstName";
  } else if ("lastName" === fieldName) {
    searchFieldName = "searchLastName";
  } else if ("emsUserGender" === fieldName) {
    searchFieldName = "searchEmsUserGender";
  } else if ("email" === fieldName) {
    searchFieldName = "searchEmail";
  } else if ("dateOfBirth" === fieldName) {
    searchFieldName = "searchDateOfBirth";
  } else if ("dateOfJoin" === fieldName) {
    searchFieldName = "searchDateOfJoin";
  } else if ("salary" === fieldName) {
    searchFieldName = "searchSalary";
  } else if ("hikePercentage" === fieldName) {
    searchFieldName = "searchHikePercentage";
  } else if ("zipCode" === fieldName) {
    searchFieldName = "searchZipCode";
  } else if ("mobileNumber" === fieldName) {
    searchFieldName = "searchMobileNumber";
  }
  return searchFieldName;
};

let renderCountOfDisplayEmsUserAdvanced = 0;
const DisplayEmsUserAdvanced = () => {
  console.log(
    "renderCountOfDisplayEmsUserAdvanced: " +
      renderCountOfDisplayEmsUserAdvanced++,
  );
  /*--------------------------------------------------------------------------------------------------------*/
  const [emsUserList, setEmsUserList] = useState([]);
  // const [useEffectTrigger, setUseEffectTrigger] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  /*--------------------------------------------------------------------------------------------------------*/
  const [allSearchAndSortFieldForEmsUser, setAllSearchAndSortFieldForEmsUser] =
    useState({
      firstName: {
        showFilterInput: false,
        showAscendingSort: false,
        showDescendingSort: false,
        searchFirstName: "",
      },
      lastName: {
        showFilterInput: false,
        showAscendingSort: false,
        showDescendingSort: false,
        searchLastName: "",
      },
      emsUserGender: {
        showFilterInput: false,
        showAscendingSort: false,
        showDescendingSort: false,
        searchEmsUserGender: "",
      },
      email: {
        showFilterInput: false,
        showAscendingSort: false,
        showDescendingSort: false,
        searchEmail: "",
      },
      dateOfBirth: {
        showFilterInput: false,
        showAscendingSort: false,
        showDescendingSort: false,
        searchDateOfBirth: "",
      },
      dateOfJoin: {
        showFilterInput: false,
        showAscendingSort: false,
        showDescendingSort: false,
        searchDateOfJoin: "",
      },
      salary: {
        showFilterInput: false,
        showAscendingSort: false,
        showDescendingSort: false,
        searchSalary: "",
      },
      hikePercentage: {
        showFilterInput: false,
        showAscendingSort: false,
        showDescendingSort: false,
        searchHikePercentage: "",
      },
      zipCode: {
        showFilterInput: false,
        showAscendingSort: false,
        showDescendingSort: false,
        searchZipCode: "",
      },
      mobileNumber: {
        showFilterInput: false,
        showAscendingSort: false,
        showDescendingSort: false,
        searchMobileNumber: "",
      },
    });
  /*--------------------------------------------------------------------------------------------------------*/
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
  /*--------------------------------------------------------------------------------------------------------*/
  const onClickHandleToggleShowFilterInputByFieldName = (fieldName) => {
    const tempSearchAndSortFieldForEmsUser = {
      ...allSearchAndSortFieldForEmsUser[fieldName],
    };
    tempSearchAndSortFieldForEmsUser.showFilterInput =
      !tempSearchAndSortFieldForEmsUser.showFilterInput;
    tempSearchAndSortFieldForEmsUser[getSearchFieldNameByFieldName(fieldName)] =
      "";
    setAllSearchAndSortFieldForEmsUser((prevState) => ({
      ...prevState,
      [fieldName]: tempSearchAndSortFieldForEmsUser,
    }));
  };
  /*--------------------------------------------------------------------------------------------------------*/
  const onClickHandleToggleSortFlagByFieldName = (fieldName) => {
    const tempSearchAndSortFieldForEmsUser = {
      ...allSearchAndSortFieldForEmsUser[fieldName],
    };
    if (
      !tempSearchAndSortFieldForEmsUser.showAscendingSort &&
      tempSearchAndSortFieldForEmsUser.showDescendingSort
    ) {
      tempSearchAndSortFieldForEmsUser.showAscendingSort = false;
      tempSearchAndSortFieldForEmsUser.showDescendingSort = false;
    } else {
      const tempShowAscendingSortFlag =
        tempSearchAndSortFieldForEmsUser.showAscendingSort;
      tempSearchAndSortFieldForEmsUser.showAscendingSort =
        !tempShowAscendingSortFlag;
      tempSearchAndSortFieldForEmsUser.showDescendingSort =
        tempShowAscendingSortFlag;
    }
    setAllSearchAndSortFieldForEmsUser((prevState) => ({
      ...prevState,
      [fieldName]: tempSearchAndSortFieldForEmsUser,
    }));
  };
  /*--------------------------------------------------------------------------------------------------------*/
  const onChangeHandleSearchFieldStateByFieldName = (e) => {
    const tempSearchAndSortFieldForEmsUser = {
      ...allSearchAndSortFieldForEmsUser[e.target.name],
    };
    tempSearchAndSortFieldForEmsUser[
      getSearchFieldNameByFieldName(e.target.name)
    ] = e.target.value;
    setAllSearchAndSortFieldForEmsUser((prevState) => ({
      ...prevState,
      [e.target.name]: tempSearchAndSortFieldForEmsUser,
    }));
  };
  /*--------------------------------------------------------------------------------------------------------*/

  return (
    <>
      {isLoading ? (
        <EmsAppLoader />
      ) : emsUserList.length === 0 ? (
        <EmsAppDataNotFound />
      ) : (
        <>
          <div>{new Date().toString()}</div>
          <div>
            {JSON.stringify(allSearchAndSortFieldForEmsUser["firstName"])}
          </div>
          <div>
            {JSON.stringify(allSearchAndSortFieldForEmsUser["lastName"])}
          </div>
          <div>
            {JSON.stringify(allSearchAndSortFieldForEmsUser["emsUserGender"])}
          </div>
          <div>{JSON.stringify(allSearchAndSortFieldForEmsUser["email"])}</div>
          <div>
            {JSON.stringify(allSearchAndSortFieldForEmsUser["dateOfBirth"])}
          </div>
          <div>
            {JSON.stringify(allSearchAndSortFieldForEmsUser["dateOfJoin"])}
          </div>
          <div>{JSON.stringify(allSearchAndSortFieldForEmsUser["salary"])}</div>
          <div>
            {JSON.stringify(allSearchAndSortFieldForEmsUser["hikePercentage"])}
          </div>
          <div>
            {JSON.stringify(allSearchAndSortFieldForEmsUser["zipCode"])}
          </div>
          <div>
            {JSON.stringify(allSearchAndSortFieldForEmsUser["mobileNumber"])}
          </div>
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
                    <label>First Name</label>
                    <div
                      className={`${styles.cursorPointer}`}
                      onClick={() =>
                        onClickHandleToggleShowFilterInputByFieldName(
                          "firstName",
                        )
                      }
                    >
                      <span>
                        {allSearchAndSortFieldForEmsUser["firstName"]
                          .showFilterInput ? (
                          <TbFilterFilled size={20} />
                        ) : (
                          <TbFilter size={20} />
                        )}
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        onClickHandleToggleSortFlagByFieldName("firstName")
                      }
                      className={`${styles.cursorPointer}`}
                    >
                      {!allSearchAndSortFieldForEmsUser["firstName"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["firstName"]
                          .showDescendingSort && <LiaSortSolid size={20} />}
                      {allSearchAndSortFieldForEmsUser["firstName"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["firstName"]
                          .showDescendingSort && <TiArrowSortedUp size={20} />}
                      {!allSearchAndSortFieldForEmsUser["firstName"]
                        .showAscendingSort &&
                        allSearchAndSortFieldForEmsUser["firstName"]
                          .showDescendingSort && (
                          <TiArrowSortedDown size={20} />
                        )}
                    </div>
                  </div>
                  {allSearchAndSortFieldForEmsUser["firstName"]
                    .showFilterInput && (
                    <div className="d-flex justify-content-center align-items-center gap-1">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Search First Name"
                        value={
                          allSearchAndSortFieldForEmsUser["firstName"]
                            .searchFirstName
                        }
                        onChange={(e) =>
                          onChangeHandleSearchFieldStateByFieldName(e)
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onClickHandleToggleShowFilterInputByFieldName(
                            "firstName",
                          )
                        }
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
                      onClick={() =>
                        onClickHandleToggleShowFilterInputByFieldName(
                          "lastName",
                        )
                      }
                    >
                      <span>
                        {allSearchAndSortFieldForEmsUser["lastName"]
                          .showFilterInput ? (
                          <TbFilterFilled size={20} />
                        ) : (
                          <TbFilter size={20} />
                        )}
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        onClickHandleToggleSortFlagByFieldName("lastName")
                      }
                      className={`${styles.cursorPointer}`}
                    >
                      {!allSearchAndSortFieldForEmsUser["lastName"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["lastName"]
                          .showDescendingSort && <LiaSortSolid size={20} />}
                      {allSearchAndSortFieldForEmsUser["lastName"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["lastName"]
                          .showDescendingSort && <TiArrowSortedUp size={20} />}
                      {!allSearchAndSortFieldForEmsUser["lastName"]
                        .showAscendingSort &&
                        allSearchAndSortFieldForEmsUser["lastName"]
                          .showDescendingSort && (
                          <TiArrowSortedDown size={20} />
                        )}
                    </div>
                  </div>
                  {allSearchAndSortFieldForEmsUser["lastName"]
                    .showFilterInput && (
                    <div className="d-flex justify-content-center align-items-center gap-1">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Search Last Name"
                        value={
                          allSearchAndSortFieldForEmsUser["lastName"]
                            .searchFirstName
                        }
                        onChange={(e) =>
                          onChangeHandleSearchFieldStateByFieldName(e)
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onClickHandleToggleShowFilterInputByFieldName(
                            "lastName",
                          )
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
        </>
      )}
    </>
  );
};
export default DisplayEmsUserAdvanced;
