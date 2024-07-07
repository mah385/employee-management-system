// import styles from "./EmsAppMain.module.css"; //USE THIS IMPORT WHEN NEEDED
/*--------------------------------------------------------------------------------------------------------------------*/
import { Outlet } from "react-router-dom";

/*--------------------------------------------------------------------------------------------------------------------*/

const EmsAppMain = () => {
  return (
    <main className="app-main border-start border-bottom border-black">
      <Outlet />
    </main>
  );
};

export default EmsAppMain;
