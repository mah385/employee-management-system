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
    path: EmpAppPathConstant.EMS_ROOT_PATH,
    element: <App />,
    errorElement: <EmsAppErrorPage />,
    children: [
      {
        path: EmpAppPathConstant.IMPORT_EMS_USER_DATA_PATH,
        element: <ImportEmsUserData />,
      },
      {
        path: EmpAppPathConstant.ADD_NEW_EMS_USER_PATH,
        element: <AddNewEmsUser />,
      },
      {
        path: EmpAppPathConstant.UPDATE_EMS_USER_PATH,
        element: <UpdateEmsUser />,
      },
      {
        path: EmpAppPathConstant.DISPLAY_EMS_USER_PATH,
        element: <DisplayEmsUser />,
      },
    ],
  },
]);

export default emsAppBrowserRouter;
