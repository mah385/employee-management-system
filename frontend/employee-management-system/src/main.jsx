import React from "react";
import ReactDOM from "react-dom/client";
/*-------------------------------------------------------------------*/
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
/*-------------------------------------------------------------------*/
import "react-toastify/dist/ReactToastify.css";
/*-------------------------------------------------------------------*/
import "./index.css";
/*-------------------------------------------------------------------*/
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
/*-------------------------------------------------------------------*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
