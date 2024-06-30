import { createBrowserRouter } from "react-router-dom";
/*-------------------------------------------------------------------*/
import App from "../App.jsx";
import EmsAppErrorPage from "../error/EmsAppErrorPage/EmsAppErrorPage.jsx";
import ImportEmsUserData from "../components/EmsUserCrudFeature/ImportEmsUserData/ImportEmsUserData.jsx";
import AddNewEmsUser from "../components/EmsUserCrudFeature/AddNewEmsUser/AddNewEmsUser.jsx";
import UpdateEmsUser from "../components/EmsUserCrudFeature/UpdateEmsUser/UpdateEmsUser.jsx";
import DisplayEmsUser from "../components/EmsUserCrudFeature/DisplayEmsUser/DisplayEmsUser.jsx";
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
        path: EmpAppPathConstant.PATH_DISPLAY_EMS_USER,
        element: <DisplayEmsUser />,
      },
    ],
  },
]);

export default emsAppBrowserRouter;
