import React from "react";
import ReactDOM from "react-dom/client";
/*-------------------------------------------------------------------*/
import { RouterProvider } from "react-router-dom";
/*-------------------------------------------------------------------*/
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
/*-------------------------------------------------------------------*/
import "react-toastify/dist/ReactToastify.css";
/*-------------------------------------------------------------------*/
import "./index.css";
/*-------------------------------------------------------------------*/
import emsAppBrowserRouter from "./browser-router/ems-app-browser-router.jsx";
/*-------------------------------------------------------------------*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={emsAppBrowserRouter} />
  </React.StrictMode>,
);
