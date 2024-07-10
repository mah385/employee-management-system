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
  const onClickHandleSearch = async () => {
    console.log(JSON.stringify(allSearchAndSortFieldForEmsUser, null, 2));
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
          <button
            type="button"
            className="border border-2 border-success btn btn-outline-success"
            onClick={onClickHandleSearch}
          >
            Search
          </button>
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
                            .searchLastName
                        }
                        onChange={(e) =>
                          onChangeHandleSearchFieldStateByFieldName(e)
                        }
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
                <th>
                  <div className="d-flex justify-content-center align-items-center gap-1">
                    <label>Gender</label>
                    <div
                      className={`${styles.cursorPointer}`}
                      onClick={() =>
                        onClickHandleToggleShowFilterInputByFieldName(
                          "emsUserGender",
                        )
                      }
                    >
                      <span>
                        {allSearchAndSortFieldForEmsUser["emsUserGender"]
                          .showFilterInput ? (
                          <TbFilterFilled size={20} />
                        ) : (
                          <TbFilter size={20} />
                        )}
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        onClickHandleToggleSortFlagByFieldName("emsUserGender")
                      }
                      className={`${styles.cursorPointer}`}
                    >
                      {!allSearchAndSortFieldForEmsUser["emsUserGender"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["emsUserGender"]
                          .showDescendingSort && <LiaSortSolid size={20} />}
                      {allSearchAndSortFieldForEmsUser["emsUserGender"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["emsUserGender"]
                          .showDescendingSort && <TiArrowSortedUp size={20} />}
                      {!allSearchAndSortFieldForEmsUser["emsUserGender"]
                        .showAscendingSort &&
                        allSearchAndSortFieldForEmsUser["emsUserGender"]
                          .showDescendingSort && (
                          <TiArrowSortedDown size={20} />
                        )}
                    </div>
                  </div>
                  {allSearchAndSortFieldForEmsUser["emsUserGender"]
                    .showFilterInput && (
                    <div className="d-flex justify-content-center align-items-center gap-1">
                      <input
                        type="text"
                        name="emsUserGender"
                        placeholder="Search Gender"
                        value={
                          allSearchAndSortFieldForEmsUser["emsUserGender"]
                            .searchEmsUserGender
                        }
                        onChange={(e) =>
                          onChangeHandleSearchFieldStateByFieldName(e)
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onClickHandleToggleShowFilterInputByFieldName(
                            "emsUserGender",
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
                    <label>Email</label>
                    <div
                      className={`${styles.cursorPointer}`}
                      onClick={() =>
                        onClickHandleToggleShowFilterInputByFieldName("email")
                      }
                    >
                      <span>
                        {allSearchAndSortFieldForEmsUser["email"]
                          .showFilterInput ? (
                          <TbFilterFilled size={20} />
                        ) : (
                          <TbFilter size={20} />
                        )}
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        onClickHandleToggleSortFlagByFieldName("email")
                      }
                      className={`${styles.cursorPointer}`}
                    >
                      {!allSearchAndSortFieldForEmsUser["email"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["email"]
                          .showDescendingSort && <LiaSortSolid size={20} />}
                      {allSearchAndSortFieldForEmsUser["email"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["email"]
                          .showDescendingSort && <TiArrowSortedUp size={20} />}
                      {!allSearchAndSortFieldForEmsUser["email"]
                        .showAscendingSort &&
                        allSearchAndSortFieldForEmsUser["email"]
                          .showDescendingSort && (
                          <TiArrowSortedDown size={20} />
                        )}
                    </div>
                  </div>
                  {allSearchAndSortFieldForEmsUser["email"].showFilterInput && (
                    <div className="d-flex justify-content-center align-items-center gap-1">
                      <input
                        type="text"
                        name="email"
                        placeholder="Search Email"
                        value={
                          allSearchAndSortFieldForEmsUser["email"].searchEmail
                        }
                        onChange={(e) =>
                          onChangeHandleSearchFieldStateByFieldName(e)
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onClickHandleToggleShowFilterInputByFieldName("email")
                        }
                      >
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
                      onClick={() =>
                        onClickHandleToggleShowFilterInputByFieldName(
                          "dateOfBirth",
                        )
                      }
                    >
                      <span>
                        {allSearchAndSortFieldForEmsUser["dateOfBirth"]
                          .showFilterInput ? (
                          <TbFilterFilled size={20} />
                        ) : (
                          <TbFilter size={20} />
                        )}
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        onClickHandleToggleSortFlagByFieldName("dateOfBirth")
                      }
                      className={`${styles.cursorPointer}`}
                    >
                      {!allSearchAndSortFieldForEmsUser["dateOfBirth"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["dateOfBirth"]
                          .showDescendingSort && <LiaSortSolid size={20} />}
                      {allSearchAndSortFieldForEmsUser["dateOfBirth"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["dateOfBirth"]
                          .showDescendingSort && <TiArrowSortedUp size={20} />}
                      {!allSearchAndSortFieldForEmsUser["dateOfBirth"]
                        .showAscendingSort &&
                        allSearchAndSortFieldForEmsUser["dateOfBirth"]
                          .showDescendingSort && (
                          <TiArrowSortedDown size={20} />
                        )}
                    </div>
                  </div>
                  {allSearchAndSortFieldForEmsUser["dateOfBirth"]
                    .showFilterInput && (
                    <div className="d-flex justify-content-center align-items-center gap-1">
                      <input
                        type="text"
                        name="dateOfBirth"
                        placeholder="Search Date Of Birth [yyyy-MM-dd]"
                        value={
                          allSearchAndSortFieldForEmsUser["dateOfBirth"]
                            .searchDateOfBirth
                        }
                        onChange={(e) =>
                          onChangeHandleSearchFieldStateByFieldName(e)
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onClickHandleToggleShowFilterInputByFieldName(
                            "dateOfBirth",
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
                    <label>Date Of Join</label>
                    <div
                      className={`${styles.cursorPointer}`}
                      onClick={() =>
                        onClickHandleToggleShowFilterInputByFieldName(
                          "dateOfJoin",
                        )
                      }
                    >
                      <span>
                        {allSearchAndSortFieldForEmsUser["dateOfJoin"]
                          .showFilterInput ? (
                          <TbFilterFilled size={20} />
                        ) : (
                          <TbFilter size={20} />
                        )}
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        onClickHandleToggleSortFlagByFieldName("dateOfJoin")
                      }
                      className={`${styles.cursorPointer}`}
                    >
                      {!allSearchAndSortFieldForEmsUser["dateOfJoin"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["dateOfJoin"]
                          .showDescendingSort && <LiaSortSolid size={20} />}
                      {allSearchAndSortFieldForEmsUser["dateOfJoin"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["dateOfJoin"]
                          .showDescendingSort && <TiArrowSortedUp size={20} />}
                      {!allSearchAndSortFieldForEmsUser["dateOfJoin"]
                        .showAscendingSort &&
                        allSearchAndSortFieldForEmsUser["dateOfJoin"]
                          .showDescendingSort && (
                          <TiArrowSortedDown size={20} />
                        )}
                    </div>
                  </div>
                  {allSearchAndSortFieldForEmsUser["dateOfJoin"]
                    .showFilterInput && (
                    <div className="d-flex justify-content-center align-items-center gap-1">
                      <input
                        type="text"
                        name="dateOfJoin"
                        placeholder="Search Date Of Join [yyyy-MM-dd]"
                        value={
                          allSearchAndSortFieldForEmsUser["dateOfJoin"]
                            .searchDateOfJoin
                        }
                        onChange={(e) =>
                          onChangeHandleSearchFieldStateByFieldName(e)
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onClickHandleToggleShowFilterInputByFieldName(
                            "dateOfJoin",
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
                    <label>Salary</label>
                    <div
                      className={`${styles.cursorPointer}`}
                      onClick={() =>
                        onClickHandleToggleShowFilterInputByFieldName("salary")
                      }
                    >
                      <span>
                        {allSearchAndSortFieldForEmsUser["salary"]
                          .showFilterInput ? (
                          <TbFilterFilled size={20} />
                        ) : (
                          <TbFilter size={20} />
                        )}
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        onClickHandleToggleSortFlagByFieldName("salary")
                      }
                      className={`${styles.cursorPointer}`}
                    >
                      {!allSearchAndSortFieldForEmsUser["salary"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["salary"]
                          .showDescendingSort && <LiaSortSolid size={20} />}
                      {allSearchAndSortFieldForEmsUser["salary"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["salary"]
                          .showDescendingSort && <TiArrowSortedUp size={20} />}
                      {!allSearchAndSortFieldForEmsUser["salary"]
                        .showAscendingSort &&
                        allSearchAndSortFieldForEmsUser["salary"]
                          .showDescendingSort && (
                          <TiArrowSortedDown size={20} />
                        )}
                    </div>
                  </div>
                  {allSearchAndSortFieldForEmsUser["salary"]
                    .showFilterInput && (
                    <div className="d-flex justify-content-center align-items-center gap-1">
                      <input
                        type="number"
                        name="salary"
                        placeholder="Search Salary"
                        value={
                          allSearchAndSortFieldForEmsUser["salary"].searchSalary
                        }
                        onChange={(e) =>
                          onChangeHandleSearchFieldStateByFieldName(e)
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onClickHandleToggleShowFilterInputByFieldName(
                            "salary",
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
                    <label>Hike Percentage</label>
                    <div
                      className={`${styles.cursorPointer}`}
                      onClick={() =>
                        onClickHandleToggleShowFilterInputByFieldName(
                          "hikePercentage",
                        )
                      }
                    >
                      <span>
                        {allSearchAndSortFieldForEmsUser["hikePercentage"]
                          .showFilterInput ? (
                          <TbFilterFilled size={20} />
                        ) : (
                          <TbFilter size={20} />
                        )}
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        onClickHandleToggleSortFlagByFieldName("hikePercentage")
                      }
                      className={`${styles.cursorPointer}`}
                    >
                      {!allSearchAndSortFieldForEmsUser["hikePercentage"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["hikePercentage"]
                          .showDescendingSort && <LiaSortSolid size={20} />}
                      {allSearchAndSortFieldForEmsUser["hikePercentage"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["hikePercentage"]
                          .showDescendingSort && <TiArrowSortedUp size={20} />}
                      {!allSearchAndSortFieldForEmsUser["hikePercentage"]
                        .showAscendingSort &&
                        allSearchAndSortFieldForEmsUser["hikePercentage"]
                          .showDescendingSort && (
                          <TiArrowSortedDown size={20} />
                        )}
                    </div>
                  </div>
                  {allSearchAndSortFieldForEmsUser["hikePercentage"]
                    .showFilterInput && (
                    <div className="d-flex justify-content-center align-items-center gap-1">
                      <input
                        type="number"
                        name="hikePercentage"
                        placeholder="Search Hike Percentage"
                        value={
                          allSearchAndSortFieldForEmsUser["hikePercentage"]
                            .searchHikePercentage
                        }
                        onChange={(e) =>
                          onChangeHandleSearchFieldStateByFieldName(e)
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onClickHandleToggleShowFilterInputByFieldName(
                            "hikePercentage",
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
                    <label>Zip Code</label>
                    <div
                      className={`${styles.cursorPointer}`}
                      onClick={() =>
                        onClickHandleToggleShowFilterInputByFieldName("zipCode")
                      }
                    >
                      <span>
                        {allSearchAndSortFieldForEmsUser["zipCode"]
                          .showFilterInput ? (
                          <TbFilterFilled size={20} />
                        ) : (
                          <TbFilter size={20} />
                        )}
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        onClickHandleToggleSortFlagByFieldName("zipCode")
                      }
                      className={`${styles.cursorPointer}`}
                    >
                      {!allSearchAndSortFieldForEmsUser["zipCode"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["zipCode"]
                          .showDescendingSort && <LiaSortSolid size={20} />}
                      {allSearchAndSortFieldForEmsUser["zipCode"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["zipCode"]
                          .showDescendingSort && <TiArrowSortedUp size={20} />}
                      {!allSearchAndSortFieldForEmsUser["zipCode"]
                        .showAscendingSort &&
                        allSearchAndSortFieldForEmsUser["zipCode"]
                          .showDescendingSort && (
                          <TiArrowSortedDown size={20} />
                        )}
                    </div>
                  </div>
                  {allSearchAndSortFieldForEmsUser["zipCode"]
                    .showFilterInput && (
                    <div className="d-flex justify-content-center align-items-center gap-1">
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="Search Zip Code"
                        value={
                          allSearchAndSortFieldForEmsUser["zipCode"]
                            .searchZipCode
                        }
                        onChange={(e) =>
                          onChangeHandleSearchFieldStateByFieldName(e)
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onClickHandleToggleShowFilterInputByFieldName(
                            "zipCode",
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
                    <label>Mobile Number</label>
                    <div
                      className={`${styles.cursorPointer}`}
                      onClick={() =>
                        onClickHandleToggleShowFilterInputByFieldName(
                          "mobileNumber",
                        )
                      }
                    >
                      <span>
                        {allSearchAndSortFieldForEmsUser["mobileNumber"]
                          .showFilterInput ? (
                          <TbFilterFilled size={20} />
                        ) : (
                          <TbFilter size={20} />
                        )}
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        onClickHandleToggleSortFlagByFieldName("mobileNumber")
                      }
                      className={`${styles.cursorPointer}`}
                    >
                      {!allSearchAndSortFieldForEmsUser["mobileNumber"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["mobileNumber"]
                          .showDescendingSort && <LiaSortSolid size={20} />}
                      {allSearchAndSortFieldForEmsUser["mobileNumber"]
                        .showAscendingSort &&
                        !allSearchAndSortFieldForEmsUser["mobileNumber"]
                          .showDescendingSort && <TiArrowSortedUp size={20} />}
                      {!allSearchAndSortFieldForEmsUser["mobileNumber"]
                        .showAscendingSort &&
                        allSearchAndSortFieldForEmsUser["mobileNumber"]
                          .showDescendingSort && (
                          <TiArrowSortedDown size={20} />
                        )}
                    </div>
                  </div>
                  {allSearchAndSortFieldForEmsUser["mobileNumber"]
                    .showFilterInput && (
                    <div className="d-flex justify-content-center align-items-center gap-1">
                      <input
                        type="text"
                        name="mobileNumber"
                        placeholder="Search Mobile Number"
                        value={
                          allSearchAndSortFieldForEmsUser["mobileNumber"]
                            .searchMobileNumber
                        }
                        onChange={(e) =>
                          onChangeHandleSearchFieldStateByFieldName(e)
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onClickHandleToggleShowFilterInputByFieldName(
                            "mobileNumber",
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
                    <td>{emsUser.emsUserGender}</td>
                    <td>{emsUser.email}</td>
                    <td>{emsUser.dateOfBirth}</td>
                    <td>{emsUser.dateOfJoin}</td>
                    <td className="text-end">{emsUser.salary.toFixed(2)}</td>
                    <td className="text-end">
                      {emsUser.hikePercentage.toFixed(2)}
                    </td>
                    <td>{emsUser.zipCode}</td>
                    <td>{emsUser.mobileNumber}</td>
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
