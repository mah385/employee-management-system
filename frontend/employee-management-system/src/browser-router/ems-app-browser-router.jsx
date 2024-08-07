import { createBrowserRouter } from "react-router-dom";
/*-------------------------------------------------------------------*/
import App from "../App.jsx";
import EmsAppErrorPage from "../error/EmsAppErrorPage/EmsAppErrorPage.jsx";
import ImportEmsUserData from "../components/ems-user-feature/ImportEmsUserData/ImportEmsUserData.jsx";
import AddNewEmsUser from "../components/ems-user-feature/AddNewEmsUser/AddNewEmsUser.jsx";
import UpdateEmsUser from "../components/ems-user-feature/UpdateEmsUser/UpdateEmsUser.jsx";
import DisplayEmsUserBasic from "../components/ems-user-feature/DisplayEmsUserBasic/DisplayEmsUserBasic.jsx";
import DisplayEmsUserAdvanced from "../components/ems-user-feature/DisplayEmsUserAdvanced/DisplayEmsUserAdvanced.jsx";
/*-------------------------------------------------------------------*/
import * as EmpAppPathConstant from "../constants/emp-app-path-constant.js";

/*-------------------------------------------------------------------*/

const emsAppBrowserRouter = createBrowserRouter([
  {
    path: EmpAppPathConstant.PATH_EMS_ROOT,
    element: <App />,
    errorElement: <EmsAppErrorPage />,
    children: [
      {
        path: EmpAppPathConstant.PATH_IMPORT_EMS_USER_DATA,
        element: <ImportEmsUserData />,
      },
      {
        path: EmpAppPathConstant.PATH_ADD_NEW_EMS_USER,
        element: <AddNewEmsUser />,
      },
      {
        path: EmpAppPathConstant.PATH_UPDATE_EMS_USER,
        element: <UpdateEmsUser />,
      },
      {
        path: EmpAppPathConstant.PATH_DISPLAY_EMS_USER_BASIC,
        element: <DisplayEmsUserBasic />,
      },
      {
        path: EmpAppPathConstant.PATH_DISPLAY_EMS_USER_ADVANCED,
        element: <DisplayEmsUserAdvanced />,
      },
    ],
  },
]);

export default emsAppBrowserRouter;
