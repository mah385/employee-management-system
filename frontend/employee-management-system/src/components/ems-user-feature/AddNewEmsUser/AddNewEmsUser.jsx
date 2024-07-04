import styles from "./AddNewEmsUser.module.css";
/*-------------------------------------------------------------------*/
import { useEffect, useState } from "react";
/*-------------------------------------------------------------------*/
import { useNavigate } from "react-router-dom";
/*-------------------------------------------------------------------*/
import EmsAppFormInput from "../../ems-app-form/EmsAppFormInput/EmsAppFormInput.jsx";
import EmsAppFormSelect from "../../ems-app-form/EmsAppFormSelect/EmsAppFormSelect.jsx";
/*-------------------------------------------------------------------*/
import * as EmpAppPathConstant from "../../../constants/emp-app-path-constant.js";
/*-------------------------------------------------------------------*/
import * as EmsUserApiRequestHandlerService from "../../../axios/ems-user/ems-user-api-request-handler-service.js";

/*-------------------------------------------------------------------*/

let renderCountOfAddNewEmsUser = 0;
const AddNewEmsUser = () => {
  console.log("renderCountOfAddNewEmsUser: " + renderCountOfAddNewEmsUser++);

  const navigate = useNavigate();

  const initNewEmsUser = () => {
    return {
      firstName: "",
      lastName: "",
      emsUserGender: "",
      email: "",
      dateOfBirth: "",
      dateOfJoin: "",
      salary: "",
      hikePercentage: "",
      zipCode: "",
      mobileNumber: "",
    };
  };

  const [newEmsUser, setNewEmsUser] = useState(initNewEmsUser());
  const [dropdownOfEmsUserGender, setDropdownOfEmsUserGender] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const callApiToGetDropdownOfEmsUserGender = async () => {
      return await EmsUserApiRequestHandlerService.handleRequestToGetDropdownOfEmsUserGender();
    };
    callApiToGetDropdownOfEmsUserGender().then((successResponseData) => {
      if (
        isMounted &&
        successResponseData.statusCode === 200 &&
        successResponseData.payload != null
      ) {
        setDropdownOfEmsUserGender(successResponseData.payload);
      }
    });

    return () => {
      //CLEAN UP OF AddNewEmsUser COMPONENT ON UNMOUNT
      isMounted = false;
      setDropdownOfEmsUserGender([]);
    };
  }, []);

  const onSubmitHandleFormToAddNewEmsUser = async (e) => {
    e.preventDefault();

    const callApiToAddNewEmsUser = async () => {
      return await EmsUserApiRequestHandlerService.handleRequestToAddNewEmsUser(
        newEmsUser,
      );
    };
    callApiToAddNewEmsUser().then((successResponseData) => {
      if (successResponseData.statusCode === 201) {
        onClickHandleClearAll();
        navigate(EmpAppPathConstant.PATH_DISPLAY_EMS_USER);
      }
    });
  };

  const onChangeHandleState = (e) => {
    setNewEmsUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onClickHandleClearAll = () => {
    setNewEmsUser(initNewEmsUser());
  };

  return (
    <form
      onSubmit={(e) => onSubmitHandleFormToAddNewEmsUser(e)}
      className={`${styles.myFormContainer} h-100 d-flex flex-column justify-content-center align-items-center`}
    >
      <div className="d-flex flex-column">
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="text"
          name="firstName"
          label="First Name"
          value={newEmsUser.firstName}
          onChange={(e) => onChangeHandleState(e)}
          required
        />
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="text"
          name="lastName"
          label="Last Name"
          value={newEmsUser.lastName}
          onChange={(e) => onChangeHandleState(e)}
        />
        <EmsAppFormSelect
          inputlabelwidthtype="SM"
          options={dropdownOfEmsUserGender}
          name="emsUserGender"
          label="Gender"
          value={newEmsUser.emsUserGender}
          onChange={(e) => onChangeHandleState(e)}
          required
        />
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="email"
          name="email"
          label="Email"
          value={newEmsUser.email}
          onChange={(e) => onChangeHandleState(e)}
        />
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="date"
          name="dateOfBirth"
          label="Date Of Birth"
          value={newEmsUser.dateOfBirth}
          onChange={(e) => onChangeHandleState(e)}
        />
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="date"
          name="dateOfJoin"
          label="Date Of Join"
          value={newEmsUser.dateOfJoin}
          onChange={(e) => onChangeHandleState(e)}
        />
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="number"
          name="salary"
          label="Salary"
          value={newEmsUser.salary}
          onChange={(e) => onChangeHandleState(e)}
        />
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="number"
          name="hikePercentage"
          label="Hike Percentage"
          value={newEmsUser.hikePercentage}
          onChange={(e) => onChangeHandleState(e)}
        />
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="text"
          name="zipCode"
          label="Zip Code"
          value={newEmsUser.zipCode}
          onChange={(e) => onChangeHandleState(e)}
        />
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="text"
          name="mobileNumber"
          label="Mobile Number"
          value={newEmsUser.mobileNumber}
          onChange={(e) => onChangeHandleState(e)}
        />
      </div>
      <div className="d-flex gap-5 mt-4">
        <button
          type="submit"
          className="border border-2 border-primary btn btn-outline-primary"
        >
          Save
        </button>
        <button
          type="button"
          className="border border-2 border-danger btn btn-outline-danger"
          onClick={onClickHandleClearAll}
        >
          Clear All
        </button>
      </div>
    </form>
  );
};

export default AddNewEmsUser;
