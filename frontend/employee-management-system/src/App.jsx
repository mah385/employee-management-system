import "./App.css";
/*-------------------------------------------------------------------*/
import { NavLink, Outlet } from "react-router-dom";
/*-------------------------------------------------------------------*/
import { ToastContainer } from "react-toastify";
/*-------------------------------------------------------------------*/
import * as EmsUrlConstant from "./constants/emp-app-path-constant.js";

/*-------------------------------------------------------------------*/

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <div className="grid-container">
        <header className="app-header">
          <h1>Header</h1>
        </header>
        <aside className="app-navbar">
          <div className="list-group m-1">
            <NavLink
              className="list-group-item list-group-item-action"
              to={EmsUrlConstant.IMPORT_EMS_USER_DATA_PATH}
            >
              Import EMS User Data
            </NavLink>
            <NavLink
              className="list-group-item list-group-item-action"
              to={EmsUrlConstant.ADD_NEW_EMS_USER_PATH}
            >
              Add New EMS User
            </NavLink>
            <NavLink
              className="list-group-item list-group-item-action"
              to={EmsUrlConstant.DISPLAY_EMS_USER_PATH}
            >
              Display EMS User
            </NavLink>
          </div>
        </aside>
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
