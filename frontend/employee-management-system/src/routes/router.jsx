import { createBrowserRouter } from "react-router-dom";
/*-------------------------------------------------------------------*/
import App from "../App.jsx";
import EmsErrorPage from "./EmsErrorPage/EmsErrorPage.jsx";
import ImportEmsUserData from "../components/EmsUserCrudFeature/ImportEmsUser/ImportEmsUserData.jsx";
import AddNewEmsUser from "../components/EmsUserCrudFeature/AddNewEmsUser/AddNewEmsUser.jsx";
import UpdateEmsUser from "../components/EmsUserCrudFeature/UpdateEmsUser/UpdateEmsUser.jsx";
import DisplayEmsUser from "../components/EmsUserCrudFeature/DisplayEmsUser/DisplayEmsUser.jsx";
/*-------------------------------------------------------------------*/
import * as EmsUrlConstant from "./EmsUrlConstant.js";
/*-------------------------------------------------------------------*/

const router = createBrowserRouter([
  {
    path: EmsUrlConstant.EMS_ROOT_PATH,
    element: <App />,
    errorElement: <EmsErrorPage />,
    children: [
      {
        path: EmsUrlConstant.IMPORT_EMS_USER_DATA_PATH,
        element: <ImportEmsUserData />,
      },
      {
        path: EmsUrlConstant.ADD_NEW_EMS_USER_PATH,
        element: <AddNewEmsUser />,
      },
      {
        path: EmsUrlConstant.UPDATE_EMS_USER_PATH,
        element: <UpdateEmsUser />,
      },
      {
        path: EmsUrlConstant.DISPLAY_EMS_USER_PATH,
        element: <DisplayEmsUser />,
      },
    ],
  },
]);

export default router;
