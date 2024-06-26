import styles from "./AddNewEmsUser.module.css";
/*-------------------------------------------------------------------*/
import { useEffect, useState } from "react";
/*-------------------------------------------------------------------*/
import { useNavigate } from "react-router-dom";
/*-------------------------------------------------------------------*/
import MyFormInput from "../../MyForm/MyFormInput/MyFormInput.jsx";
import MyFormSelect from "../../MyForm/MyFormSelect/MyFormSelect.jsx";
/*-------------------------------------------------------------------*/
import * as EmsUserData from "../../../axios/ems_user/ems-user-data.js";
/*-------------------------------------------------------------------*/
import * as EmsUrlConstant from "../../../routes/EmsUrlConstant.js";

/*-------------------------------------------------------------------*/

const AddNewEmsUser = () => {
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
    const getDropdownOfEmsUserGender = async () => {
      const responseData =
        await EmsUserData.getDropdownOfEmsUserGenderUsingAxios();
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

  const onSubmitHandleFormToAddNewEmsUser = async (e) => {
    e.preventDefault();
    const responseData = await EmsUserData.addNewEmsUserUsingAxios(newEmsUser);
    if (responseData.statusCode === 201) {
      onClickHandleClearAll();
      navigate(EmsUrlConstant.DISPLAY_EMS_USER_PATH);
    }
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
        <MyFormInput
          inputlabelwidthtype="MD"
          type="text"
          name="firstName"
          label="First Name"
          value={newEmsUser.firstName}
          onChange={(e) => onChangeHandleState(e)}
          required
        />
        <MyFormInput
          inputlabelwidthtype="MD"
          type="text"
          name="lastName"
          label="Last Name"
          value={newEmsUser.lastName}
          onChange={(e) => onChangeHandleState(e)}
        />
        <MyFormSelect
          inputlabelwidthtype="MD"
          options={dropdownOfEmsUserGender}
          name="emsUserGender"
          label="Gender"
          value={newEmsUser.emsUserGender}
          onChange={(e) => onChangeHandleState(e)}
          required
        />
        <MyFormInput
          inputlabelwidthtype="MD"
          type="email"
          name="email"
          label="Email"
          value={newEmsUser.email}
          onChange={(e) => onChangeHandleState(e)}
        />
        <MyFormInput
          inputlabelwidthtype="MD"
          type="date"
          name="dateOfBirth"
          label="Date Of Birth"
          value={newEmsUser.dateOfBirth}
          onChange={(e) => onChangeHandleState(e)}
        />
        <MyFormInput
          inputlabelwidthtype="MD"
          type="date"
          name="dateOfJoin"
          label="Date Of Join"
          value={newEmsUser.dateOfJoin}
          onChange={(e) => onChangeHandleState(e)}
        />
        <MyFormInput
          inputlabelwidthtype="MD"
          type="number"
          name="salary"
          label="Salary"
          value={newEmsUser.salary}
          onChange={(e) => onChangeHandleState(e)}
        />
        <MyFormInput
          inputlabelwidthtype="MD"
          type="number"
          name="hikePercentage"
          label="Hike Percentage"
          value={newEmsUser.hikePercentage}
          onChange={(e) => onChangeHandleState(e)}
        />
        <MyFormInput
          inputlabelwidthtype="MD"
          type="text"
          name="zipCode"
          label="Zip Code"
          value={newEmsUser.zipCode}
          onChange={(e) => onChangeHandleState(e)}
        />
        <MyFormInput
          inputlabelwidthtype="MD"
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
