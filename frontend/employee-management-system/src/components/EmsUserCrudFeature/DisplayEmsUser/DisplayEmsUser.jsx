import styles from "./DisplayEmsUser.module.css";
/*-------------------------------------------------------------------*/
import { useEffect, useState } from "react";
/*-------------------------------------------------------------------*/
import { useNavigate } from "react-router-dom";
/*-------------------------------------------------------------------*/
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
/*-------------------------------------------------------------------*/
import MainLayoutResponse from "../../MainLayoutResponse/MainLayoutResponse.jsx";
/*-------------------------------------------------------------------*/
import * as EmsUserApiResponseService from "../../../axios/ems-user/ems-user-api-response-service.js";
/*-------------------------------------------------------------------*/
import * as EmsUrlConstant from "../../../routes/EmsUrlConstant.js";

/*-------------------------------------------------------------------*/

const DisplayEmsUser = () => {
  const navigate = useNavigate();
  console.log("DisplayEmsUser");

  const [emsUserList, setEmsUserList] = useState([]);
  const [useEffectTrigger, setUseEffectTrigger] = useState(new Date());

  useEffect(() => {
    let isMounted = true;
    const getAllEmsUser = async () => {
      const responseData =
        await EmsUserApiResponseService.getAllEmsUserResponseService();
      if (isMounted && responseData.payload != null) {
        setEmsUserList(responseData.payload);
      }
    };

    getAllEmsUser();

    return () => {
      // Clean up on unmount
      isMounted = false;
      setEmsUserList([]);
    };
  }, [useEffectTrigger]);

  const onClickHandleUpdateEmsUser = (emsUserToBeUpdated) => {
    navigate(EmsUrlConstant.UPDATE_EMS_USER_PATH, {
      state: { emsUserToBeUpdated: emsUserToBeUpdated },
    });
  };

  const onClickHandleDeleteEmsUserById = async (id) => {
    await EmsUserApiResponseService.deleteEmsUserByIdResponseService(id);
    setUseEffectTrigger(new Date());
  };

  return (
    <>
      {emsUserList.length === 0 ? (
        <MainLayoutResponse />
      ) : (
        <table
          className={`${styles.displayEmsUserTable} w-100 table-bordered text-center`}
        >
          <thead
            className={`${styles.displayEmsUserTableHeading} sticky-top bg-warning`}
          >
            <tr>
              <th>Sl. No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Date Of Birth</th>
              <th>Date Of Join</th>
              <th>Salary</th>
              <th>Hike Percentage</th>
              <th>Zip Code</th>
              <th>Mobile Number</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {emsUserList.map((emsUserTemp, index) => {
              return (
                <tr key={emsUserTemp.id}>
                  <td>{index + 1}</td>
                  <td>{emsUserTemp.firstName}</td>
                  <td>{emsUserTemp.lastName}</td>
                  <td>{emsUserTemp.emsUserGender}</td>
                  <td>{emsUserTemp.email}</td>
                  <td>{emsUserTemp.dateOfBirth}</td>
                  <td>{emsUserTemp.dateOfJoin}</td>
                  <td>{emsUserTemp.salary.toFixed(2)}</td>
                  <td>{emsUserTemp.hikePercentage.toFixed(2)}</td>
                  <td>{emsUserTemp.zipCode}</td>
                  <td>{emsUserTemp.mobileNumber}</td>
                  <td
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => onClickHandleUpdateEmsUser(emsUserTemp)}
                  >
                    <span>
                      <MdOutlineEdit />
                    </span>
                  </td>
                  <td
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      onClickHandleDeleteEmsUserById(emsUserTemp.id)
                    }
                  >
                    <span>
                      <MdDeleteForever />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default DisplayEmsUser;
