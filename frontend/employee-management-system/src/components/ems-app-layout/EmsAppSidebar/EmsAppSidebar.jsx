// import styles from "./EmsAppSidebar.module.css";
/*-------------------------------------------------------------------*/
import {NavLink} from "react-router-dom";
/*-------------------------------------------------------------------*/
import * as EmpAppPathConstant from "../../../constants/emp-app-path-constant.js";

/*-------------------------------------------------------------------*/

const EmsAppSidebar = () => {
  return (
    <aside className="app-sidebar border-end border-bottom border-black">
      <div className="list-group m-1">
        <NavLink
          className="list-group-item list-group-item-action"
          to={EmpAppPathConstant.PATH_IMPORT_EMS_USER_DATA}
        >
          Import EMS User Data
        </NavLink>
        <NavLink
          className="list-group-item list-group-item-action"
          to={EmpAppPathConstant.PATH_ADD_NEW_EMS_USER}
        >
          Add New EMS User
        </NavLink>
        <NavLink
          className="list-group-item list-group-item-action"
          to={EmpAppPathConstant.PATH_DISPLAY_EMS_USER}
        >
          Display EMS User
        </NavLink>
      </div>
    </aside>
  );
};

export default EmsAppSidebar;
