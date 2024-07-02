import styles from "./UpdateEmsUser.module.css";
/*-------------------------------------------------------------------*/
import { useEffect, useState } from "react";
/*-------------------------------------------------------------------*/
import { useLocation, useNavigate } from "react-router-dom";
/*-------------------------------------------------------------------*/
import EmsAppFormInput from "../../ems-app-form/EmsAppFormInput/EmsAppFormInput.jsx";
import EmsAppFormSelect from "../../ems-app-form/EmsAppFormSelect/EmsAppFormSelect.jsx";
/*-------------------------------------------------------------------*/
import * as EmpAppPathConstant from "../../../constants/emp-app-path-constant.js";
/*-------------------------------------------------------------------*/
import * as EmsUserApiRequestHandlerService from "../../../axios/ems-user/ems-user-api-request-handler-service.js";

/*-------------------------------------------------------------------*/

let renderCountOfUpdateEmsUser = 0;
const UpdateEmsUser = () => {
  console.log("renderCountOfUpdateEmsUser: " + renderCountOfUpdateEmsUser++);

  const navigate = useNavigate();
  const location = useLocation();

  const [updatedEmsUser, setUpdatedEmsUser] = useState(
    location.state.emsUserToBeUpdated,
  );
  const [dropdownOfEmsUserGender, setDropdownOfEmsUserGender] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const getDropdownOfEmsUserGender = async () => {
      const responseData =
        await EmsUserApiRequestHandlerService.handleGetDropdownOfEmsUserGender();
      if (isMounted && responseData.payload != null) {
        setDropdownOfEmsUserGender(responseData.payload);
      }
    };

    getDropdownOfEmsUserGender();

    return () => {
      // Clean up on unmount
      isMounted = false;
      setDropdownOfEmsUserGender([]);
    };
  }, []);

  const onSubmitHandleFormToUpdateEmsUser = async (e) => {
    e.preventDefault();
    const responseData =
      await EmsUserApiRequestHandlerService.handleUpdateEmsUser(updatedEmsUser);
    if (responseData.statusCode === 200) {
      navigate(EmpAppPathConstant.PATH_DISPLAY_EMS_USER);
    }
  };

  const onChangeHandleState = (e) => {
    setUpdatedEmsUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onClickHandleCancel = () => {
    setUpdatedEmsUser({});
    navigate(EmpAppPathConstant.PATH_DISPLAY_EMS_USER);
  };

  return (
    <form
      onSubmit={(e) => onSubmitHandleFormToUpdateEmsUser(e)}
      className={`${styles.myFormContainer} h-100 d-flex flex-column justify-content-center align-items-center`}
    >
      <h3>Edit User</h3>
      <div className="d-flex flex-column">
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="text"
          name="firstName"
          label="First Name"
          value={updatedEmsUser.firstName}
          onChange={(e) => onChangeHandleState(e)}
          required
        />
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="text"
          name="lastName"
          label="Last Name"
          value={updatedEmsUser.lastName}
          onChange={(e) => onChangeHandleState(e)}
        />
        <EmsAppFormSelect
          inputlabelwidthtype="SM"
          options={dropdownOfEmsUserGender}
          name="emsUserGender"
          label="Gender"
          value={updatedEmsUser.emsUserGender}
          onChange={(e) => onChangeHandleState(e)}
          required
        />
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="email"
          name="email"
          label="Email"
          value={updatedEmsUser.email}
          disabled={true}
        />
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="date"
          name="dateOfBirth"
          label="Date Of Birth"
          value={updatedEmsUser.dateOfBirth}
          onChange={(e) => onChangeHandleState(e)}
        />
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="date"
          name="dateOfJoin"
          label="Date Of Join"
          value={updatedEmsUser.dateOfJoin}
          onChange={(e) => onChangeHandleState(e)}
        />
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="number"
          name="salary"
          label="Salary"
          value={updatedEmsUser.salary}
          onChange={(e) => onChangeHandleState(e)}
        />
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="number"
          name="hikePercentage"
          label="Hike Percentage"
          value={updatedEmsUser.hikePercentage}
          onChange={(e) => onChangeHandleState(e)}
        />
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="text"
          name="zipCode"
          label="Zip Code"
          value={updatedEmsUser.zipCode}
          onChange={(e) => onChangeHandleState(e)}
        />
        <EmsAppFormInput
          inputlabelwidthtype="SM"
          type="text"
          name="mobileNumber"
          label="Mobile Number"
          value={updatedEmsUser.mobileNumber}
          onChange={(e) => onChangeHandleState(e)}
        />
      </div>
      <div className="d-flex gap-5 mt-4">
        <button
          type="submit"
          className="border border-2 border-primary btn btn-outline-primary"
        >
          Update
        </button>
        <button
          type="button"
          className="border border-2 border-danger btn btn-outline-danger"
          onClick={onClickHandleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateEmsUser;
