import styles from "./DisplayEmsUserBasic.module.css";
/*--------------------------------------------------------------------------------------------------------------------*/
import { useEffect, useState } from "react";
/*--------------------------------------------------------------------------------------------------------------------*/
import { useNavigate } from "react-router-dom";
/*--------------------------------------------------------------------------------------------------------------------*/
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
/*--------------------------------------------------------------------------------------------------------------------*/
import EmsAppLoader from "../../util/EmsAppLoader/EmsAppLoader.jsx";
import EmsAppDataNotFound from "../../util/EmsAppDataNotFound/EmsAppDataNotFound.jsx";
/*--------------------------------------------------------------------------------------------------------------------*/
import * as EmpAppPathConstant from "../../../constants/emp-app-path-constant.js";
/*--------------------------------------------------------------------------------------------------------------------*/
import * as EmsUserApiRequestHandlerService from "../../../axios/ems-user/ems-user-api-request-handler-service.js";

/*--------------------------------------------------------------------------------------------------------------------*/

let renderCountOfDisplayEmsUserBasic = 0;
const DisplayEmsUserBasic = () => {
  console.log("renderCountOfDisplayEmsUserBasic: " + renderCountOfDisplayEmsUserBasic++);

  const navigate = useNavigate();

  const [emsUserList, setEmsUserList] = useState([]);
  const [useEffectTrigger, setUseEffectTrigger] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const callApiToGetAllEmsUser = async () => {
      return await EmsUserApiRequestHandlerService.handleRequestToGetAllEmsUser();
    };
    callApiToGetAllEmsUser()
      .then((successOrErrorResponseData) => {
        if (isMounted && successOrErrorResponseData.statusCode === 200 && successOrErrorResponseData.payload != null) {
          setEmsUserList(successOrErrorResponseData.payload);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      //CLEAN UP OF DisplayEmsUserBasic COMPONENT ON UNMOUNT
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
    setIsLoading(true);
    const callApiToDeleteEmsUserById = async () => {
      return await EmsUserApiRequestHandlerService.handleRequestToDeleteEmsUserById(id);
    };
    callApiToDeleteEmsUserById()
      .then((successOrErrorResponseData) => {
        if (successOrErrorResponseData.statusCode === 200) {
          setUseEffectTrigger(new Date());
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? (
        <EmsAppLoader />
      ) : emsUserList.length === 0 ? (
        <EmsAppDataNotFound />
      ) : (
        <table className={`${styles.displayEmsUserTable} w-100 table-bordered text-center`}>
          <thead className={`${styles.displayEmsUserTableHeading} sticky-top bg-warning`}>
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
                  <td className="text-end">{emsUser.hikePercentage.toFixed(2)}</td>
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

export default DisplayEmsUserBasic;
