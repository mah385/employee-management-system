import "./App.css";
/*-------------------------------------------------------------------*/
import { ToastContainer } from "react-toastify";
/*-------------------------------------------------------------------*/
import { NavLink, Outlet } from "react-router-dom";
/*-------------------------------------------------------------------*/
import { ADD_NEW_EMS_USER, DISPLAY_EMS_USER } from "./routes/EmsUrlConstant.js";

/*-------------------------------------------------------------------*/

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={1500} />
      <div className="grid-container">
        <header className="app-header">
          <h1>Header</h1>
        </header>
        <aside className="app-navbar">
          <div className="list-group m-1">
            <NavLink
              className="list-group-item list-group-item-action"
              to={ADD_NEW_EMS_USER}
            >
              Add New Ems User
            </NavLink>
            <NavLink
              className="list-group-item list-group-item-action"
              to={DISPLAY_EMS_USER}
            >
              Display Ems User
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
