import styles from "./DisplayEmsUserAdvancedOptimized.module.css";
import { useState } from "react";
import { TbFilter, TbFilterFilled } from "react-icons/tb";
import { MdOutlineClose } from "react-icons/md";
import { LiaSortSolid } from "react-icons/lia";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const getSearchFieldNameByFieldName = (fieldName) => {
  let searchFieldName = "";
  if ("firstName" === fieldName) {
    searchFieldName = "searchFirstName";
  } else if ("lastName" === fieldName) {
    searchFieldName = "searchLastName";
  } else if ("emsUserGender" === fieldName) {
    searchFieldName = "searchEmsUserGender";
  }
  return searchFieldName;
};

let renderCountOfDisplayEmsUserAdvancedOptimized = 0;
const DisplayEmsUserAdvancedOptimized = () => {
  console.log("renderCountOfDisplayEmsUserAdvancedOptimized: " + renderCountOfDisplayEmsUserAdvancedOptimized++);
  /*------------------------------------------------------------------------------*/
  const [allSearchAndSortFieldForEmsUser, setAllSearchAndSortFieldForEmsUser] = useState({
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
  });
  /*------------------------------------------------------------------------------*/

  /*------------------------------------------------------------------------------*/
  const onChangeHandleSearchFieldStateByFieldName = (e) => {
    const searchAndSortFieldForEmsUserTemp = {
      ...allSearchAndSortFieldForEmsUser[e.target.name],
    };
    searchAndSortFieldForEmsUserTemp[getSearchFieldNameByFieldName(e.target.name)] = e.target.value;
    setAllSearchAndSortFieldForEmsUser((prevState) => ({
      ...prevState,
      [e.target.name]: searchAndSortFieldForEmsUserTemp,
    }));
  };
  /*------------------------------------------------------------------------------*/
  const onClickHandleSortFlagByFieldName = (fieldName) => {
    const tempSearchAndSortFieldForEmsUser = {
      ...allSearchAndSortFieldForEmsUser[fieldName],
    };
    if (!tempSearchAndSortFieldForEmsUser.showAscendingSort && tempSearchAndSortFieldForEmsUser.showDescendingSort) {
      tempSearchAndSortFieldForEmsUser.showAscendingSort = false;
      tempSearchAndSortFieldForEmsUser.showDescendingSort = false;
    } else {
      const tempShowAscendingSortFlag = tempSearchAndSortFieldForEmsUser.showAscendingSort;
      tempSearchAndSortFieldForEmsUser.showAscendingSort = !tempShowAscendingSortFlag;
      tempSearchAndSortFieldForEmsUser.showDescendingSort = tempShowAscendingSortFlag;
    }
    setAllSearchAndSortFieldForEmsUser((prevState) => ({
      ...prevState,
      [fieldName]: tempSearchAndSortFieldForEmsUser,
    }));
  };
  /*------------------------------------------------------------------------------*/
  const onClickHandleToggleShowFilterInputByFieldName = (fieldName) => {
    const tempSearchAndSortFieldForEmsUser = {
      ...allSearchAndSortFieldForEmsUser[fieldName],
    };
    tempSearchAndSortFieldForEmsUser.showFilterInput = !tempSearchAndSortFieldForEmsUser.showFilterInput;
    tempSearchAndSortFieldForEmsUser[getSearchFieldNameByFieldName(fieldName)] = "";
    setAllSearchAndSortFieldForEmsUser((prevState) => ({
      ...prevState,
      [fieldName]: tempSearchAndSortFieldForEmsUser,
    }));
  };
  /*------------------------------------------------------------------------------*/
  return (
    <div>
      <div>{new Date().toString()}</div>
      <div>
        allSearchAndSortFieldForEmsUser.firstName=
        {JSON.stringify(allSearchAndSortFieldForEmsUser["firstName"])}
      </div>
      <div>
        allSearchAndSortFieldForEmsUser.lastName=
        {JSON.stringify(allSearchAndSortFieldForEmsUser["lastName"])}
      </div>
      {/*<table className="w-100 table-bordered text-center">*/}
      <table className="table-bordered text-center">
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
                    {allSearchAndSortFieldForEmsUser["firstName"].showFilterInput ? (
                      <TbFilterFilled size={20} />
                    ) : (
                      <TbFilter size={20} />
                    )}
                  </span>
                </div>
                <div
                  onClick={() => onClickHandleSortFlagByFieldName("firstName")}
                  className={`${styles.cursorPointer}`}
                >
                  {!allSearchAndSortFieldForEmsUser["firstName"].showAscendingSort &&
                    !allSearchAndSortFieldForEmsUser["firstName"].showDescendingSort && <LiaSortSolid size={20} />}
                  {allSearchAndSortFieldForEmsUser["firstName"].showAscendingSort &&
                    !allSearchAndSortFieldForEmsUser["firstName"].showDescendingSort && <TiArrowSortedUp size={20} />}
                  {!allSearchAndSortFieldForEmsUser["firstName"].showAscendingSort &&
                    allSearchAndSortFieldForEmsUser["firstName"].showDescendingSort && <TiArrowSortedDown size={20} />}
                </div>
              </div>
              {allSearchAndSortFieldForEmsUser["firstName"].showFilterInput && (
                <div className="d-flex justify-content-center align-items-center gap-1">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Search First Name"
                    value={allSearchAndSortFieldForEmsUser["firstName"].searchFirstName}
                    onChange={(e) => onChangeHandleSearchFieldStateByFieldName(e)}
                    required
                  />
                  <button type="button" onClick={() => onClickHandleToggleShowFilterInputByFieldName("firstName")}>
                    <MdOutlineClose />
                  </button>
                </div>
              )}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default DisplayEmsUserAdvancedOptimized;
