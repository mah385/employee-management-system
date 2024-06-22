import styles from "./UpdateEmsUser.module.css";
/*-------------------------------------------------------------------*/
import { useState } from "react";
/*-------------------------------------------------------------------*/
import { useLocation, useNavigate } from "react-router-dom";
/*-------------------------------------------------------------------*/
import MyFormInput from "../../MyForm/MyFormInput/MyFormInput.jsx";
import MyFormSelect from "../../MyForm/MyFormSelect/MyFormSelect.jsx";
/*-------------------------------------------------------------------*/
import { updateEmsUserUsingAxios } from "../../../axios/ems_user/ems-user-data.js";
/*-------------------------------------------------------------------*/
import { DISPLAY_EMS_USER } from "../../../routes/EmsUrlConstant.js";

/*-------------------------------------------------------------------*/

const UpdateEmsUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [updatedEmsUser, setUpdatedEmsUser] = useState(
    location.state.emsUserToBeUpdated,
  );

  const handleFormSubmitToUpdateEmsUser = async (e) => {
    e.preventDefault();
    const responseData = await updateEmsUserUsingAxios(updatedEmsUser);
    if (responseData.statusCode === 200) {
      navigate(DISPLAY_EMS_USER);
    }
  };

  const handleOnChange = (e) => {
    setUpdatedEmsUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancelButton = () => {
    setUpdatedEmsUser({});
    navigate(DISPLAY_EMS_USER);
  };

  return (
    <form
      onSubmit={(e) => handleFormSubmitToUpdateEmsUser(e)}
      className={`${styles.myFormContainer} h-100 d-flex flex-column justify-content-center align-items-center`}
    >
      <h3>Edit User</h3>
      <div className="d-flex flex-column">
        <MyFormInput
          type="text"
          name="firstName"
          label="First Name"
          value={updatedEmsUser.firstName}
          onChange={(e) => handleOnChange(e)}
          required
        />
        <MyFormInput
          type="text"
          name="lastName"
          label="Last Name"
          value={updatedEmsUser.lastName}
          onChange={(e) => handleOnChange(e)}
        />
        <MyFormSelect
          options={["MALE", "FEMALE"]}
          name="emsUserGender"
          label="Gender"
          value={updatedEmsUser.emsUserGender}
          onChange={(e) => handleOnChange(e)}
          required
        />
        <MyFormInput
          type="email"
          name="email"
          label="Email"
          value={updatedEmsUser.email}
          disabled={true}
        />
        <MyFormInput
          type="date"
          name="dateOfBirth"
          label="Date Of Birth"
          value={updatedEmsUser.dateOfBirth}
          onChange={(e) => handleOnChange(e)}
        />
        <MyFormInput
          type="date"
          name="dateOfJoin"
          label="Date Of Join"
          value={updatedEmsUser.dateOfJoin}
          onChange={(e) => handleOnChange(e)}
        />
        <MyFormInput
          type="number"
          name="salary"
          label="Salary"
          value={updatedEmsUser.salary}
          onChange={(e) => handleOnChange(e)}
        />
        <MyFormInput
          type="number"
          name="hikePercentage"
          label="Hike Percentage"
          value={updatedEmsUser.hikePercentage}
          onChange={(e) => handleOnChange(e)}
        />
        <MyFormInput
          type="text"
          name="zipCode"
          label="Zip Code"
          value={updatedEmsUser.zipCode}
          onChange={(e) => handleOnChange(e)}
        />
        <MyFormInput
          type="text"
          name="mobileNumber"
          label="Mobile Number"
          value={updatedEmsUser.mobileNumber}
          onChange={(e) => handleOnChange(e)}
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
          onClick={handleCancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateEmsUser;
