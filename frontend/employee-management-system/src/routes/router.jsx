import { createBrowserRouter } from "react-router-dom";
/*-------------------------------------------------------------------*/
import App from "../App.jsx";
import EmsErrorPage from "./EmsErrorPage/EmsErrorPage.jsx";
import AddNewEmsUser from "../components/EmsUserCrudFeature/AddNewEmsUser/AddNewEmsUser.jsx";
import DisplayEmsUser from "../components/EmsUserCrudFeature/DisplayEmsUser/DisplayEmsUser.jsx";
import UpdateEmsUser from "../components/EmsUserCrudFeature/UpdateEmsUser/UpdateEmsUser.jsx";
/*-------------------------------------------------------------------*/
import {
  ADD_NEW_EMS_USER,
  DISPLAY_EMS_USER,
  UPDATE_EMS_USER,
} from "./EmsUrlConstant.js";

/*-------------------------------------------------------------------*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <EmsErrorPage />,
    children: [
      {
        path: ADD_NEW_EMS_USER,
        element: <AddNewEmsUser />,
      },
      {
        path: DISPLAY_EMS_USER,
        element: <DisplayEmsUser />,
      },
      {
        path: UPDATE_EMS_USER,
        element: <UpdateEmsUser />,
      },
    ],
  },
]);

export default router;
