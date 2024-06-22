import styles from "./DisplayEmsUser.module.css";
/*-------------------------------------------------------------------*/
import { useEffect, useState } from "react";
/*-------------------------------------------------------------------*/
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
/*-------------------------------------------------------------------*/
import {
  getAllEmsUserUsingAxios,
  deleteEmsUserByIdUsingAxios,
} from "../../../axios/ems_user/ems-user-data.js";
import { useNavigate } from "react-router-dom";
import { UPDATE_EMS_USER } from "../../../routes/EmsUrlConstant.js";

/*-------------------------------------------------------------------*/

const DisplayEmsUser = () => {
  const navigate = useNavigate();

  const [emsUserList, setEmsUserList] = useState([]);
  const [useEffectTrigger, setUseEffectTrigger] = useState(new Date());

  useEffect(() => {
    let isMounted = true;
    const getAllEmsUser = async () => {
      const responseData = await getAllEmsUserUsingAxios();
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
    navigate(UPDATE_EMS_USER, {
      state: { emsUserToBeUpdated: emsUserToBeUpdated },
    });
  };

  const onClickHandleDeleteEmsUserById = async (id) => {
    await deleteEmsUserByIdUsingAxios(id);
    setUseEffectTrigger(new Date());
  };

  return (
    <>
      {emsUserList.length === 0 ? (
        <h1 className="h-100 align-content-center display-1 text-center">
          User Data Not Found.
        </h1>
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
          <tbody className="">
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
                  <td>{emsUserTemp.salary}</td>
                  <td>{emsUserTemp.hikePercentage}</td>
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
