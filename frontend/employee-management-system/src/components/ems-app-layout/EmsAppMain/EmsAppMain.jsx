// import styles from "./EmsAppMain.module.css";
/*-------------------------------------------------------------------*/
import {Outlet} from "react-router-dom";

/*-------------------------------------------------------------------*/

const EmsAppMain = () => {
  return (
    <main className="app-main border-start border-bottom">
      <Outlet />
    </main>
  );
};

export default EmsAppMain;
