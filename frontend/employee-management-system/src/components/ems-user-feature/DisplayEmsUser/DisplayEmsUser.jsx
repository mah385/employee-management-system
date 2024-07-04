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
import * as EmpAppPathConstant from "../../../constants/emp-app-path-constant.js";
/*-------------------------------------------------------------------*/
import * as EmsUserApiRequestHandlerService from "../../../axios/ems-user/ems-user-api-request-handler-service.js";

/*-------------------------------------------------------------------*/

let renderCountOfDisplayEmsUser = 0;
const DisplayEmsUser = () => {
  console.log("renderCountOfDisplayEmsUser: " + renderCountOfDisplayEmsUser++);

  const navigate = useNavigate();

  const [emsUserList, setEmsUserList] = useState([]);
  const [useEffectTrigger, setUseEffectTrigger] = useState(new Date());

  useEffect(() => {
    let isMounted = true;

    const callApiToGetAllEmsUser = async () => {
      return await EmsUserApiRequestHandlerService.handleRequestToGetAllEmsUser();
    };
    callApiToGetAllEmsUser().then((successOrErrorResponseData) => {
      if (
        isMounted &&
        successOrErrorResponseData.statusCode === 200 &&
        successOrErrorResponseData.payload != null
      ) {
        setEmsUserList(successOrErrorResponseData.payload);
      }
    });

    return () => {
      //CLEAN UP OF DisplayEmsUser COMPONENT ON UNMOUNT
      isMounted = false;
      setEmsUserList([]);
    };
  }, [useEffectTrigger]);

  const onClickHandleUpdateEmsUser = (emsUserToBeUpdated) => {
    navigate(EmpAppPathConstant.PATH_UPDATE_EMS_USER, {
      state: { emsUserToBeUpdated: emsUserToBeUpdated },
    });
  };

  const onClickHandleDeleteEmsUserById = async (id) => {
    const callApiToDeleteEmsUserById = async () => {
      return await EmsUserApiRequestHandlerService.handleRequestToDeleteEmsUserById(
        id,
      );
    };
    callApiToDeleteEmsUserById().then((successOrErrorResponseData) => {
      if (successOrErrorResponseData.statusCode === 200) {
        setUseEffectTrigger(new Date());
      }
    });
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
                  <td
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => onClickHandleUpdateEmsUser(emsUser)}
                  >
                    <span>
                      <MdOutlineEdit />
                    </span>
                  </td>
                  <td
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => onClickHandleDeleteEmsUserById(emsUser.id)}
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
