import styles from "./AddNewEmsUser.module.css";
/*-------------------------------------------------------------------*/
import { useState } from "react";
/*-------------------------------------------------------------------*/
import MyFormInput from "../../MyForm/MyFormInput/MyFormInput.jsx";
import MyFormSelect from "../../MyForm/MyFormSelect/MyFormSelect.jsx";
/*-------------------------------------------------------------------*/
import { addNewEmsUserUsingAxios } from "../../../axios/ems_user/ems-user-data.js";
import { useNavigate } from "react-router-dom";
import { DISPLAY_EMS_USER } from "../../../routes/EmsUrlConstant.js";

/*-------------------------------------------------------------------*/

const AddNewEmsUser = () => {
  const navigate = useNavigate();

  const initNewEmsUser = () => {
    return {
      id: "",
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

  const handleFormSubmitToAddNewEmsUser = async (e) => {
    e.preventDefault();
    const responseData = await addNewEmsUserUsingAxios(newEmsUser);
    if (responseData.statusCode === 201) {
      handleClearButton();
      navigate(DISPLAY_EMS_USER);
    }
  };

  const handleOnChange = (e) => {
    setNewEmsUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClearButton = () => {
    setNewEmsUser(initNewEmsUser());
  };

  return (
    <form
      onSubmit={(e) => handleFormSubmitToAddNewEmsUser(e)}
      className={`${styles.myFormContainer} h-100 d-flex flex-column justify-content-center align-items-center`}
    >
      <div className="d-flex flex-column">
        <MyFormInput
          type="text"
          name="firstName"
          label="First Name"
          value={newEmsUser.firstName}
          onChange={(e) => handleOnChange(e)}
          required
        />
        <MyFormInput
          type="text"
          name="lastName"
          label="Last Name"
          value={newEmsUser.lastName}
          onChange={(e) => handleOnChange(e)}
        />
        <MyFormSelect
          options={["MALE", "FEMALE"]}
          name="emsUserGender"
          label="Gender"
          value={newEmsUser.emsUserGender}
          onChange={(e) => handleOnChange(e)}
          required
        />
        <MyFormInput
          type="email"
          name="email"
          label="Email"
          value={newEmsUser.email}
          onChange={(e) => handleOnChange(e)}
        />
        <MyFormInput
          type="date"
          name="dateOfBirth"
          label="Date Of Birth"
          value={newEmsUser.dateOfBirth}
          onChange={(e) => handleOnChange(e)}
        />
        <MyFormInput
          type="date"
          name="dateOfJoin"
          label="Date Of Join"
          value={newEmsUser.dateOfJoin}
          onChange={(e) => handleOnChange(e)}
        />
        <MyFormInput
          type="number"
          name="salary"
          label="Salary"
          value={newEmsUser.salary}
          onChange={(e) => handleOnChange(e)}
        />
        <MyFormInput
          type="number"
          name="hikePercentage"
          label="Hike Percentage"
          value={newEmsUser.hikePercentage}
          onChange={(e) => handleOnChange(e)}
        />
        <MyFormInput
          type="text"
          name="zipCode"
          label="Zip Code"
          value={newEmsUser.zipCode}
          onChange={(e) => handleOnChange(e)}
        />
        <MyFormInput
          type="text"
          name="mobileNumber"
          label="Mobile Number"
          value={newEmsUser.mobileNumber}
          onChange={(e) => handleOnChange(e)}
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
          onClick={handleClearButton}
        >
          Clear All
        </button>
      </div>
    </form>
  );
};

export default AddNewEmsUser;
