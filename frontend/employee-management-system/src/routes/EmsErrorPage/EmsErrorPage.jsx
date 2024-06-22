import styles from "./EmsErrorPage.module.css";
/*-------------------------------------------------------------------*/
import { useRouteError } from "react-router-dom";

/*-------------------------------------------------------------------*/

const EmsErrorPage = () => {
  const error = useRouteError();
  return (
    <div
      className={`${styles.emsErrorPage} vh-100 d-flex flex-column justify-content-center align-items-center`}
    >
      <p className={`${styles.errorHeading}`}>Oops!</p>
      <p className={`${styles.errorInfo}`}>
        {error.status} - {error.statusText}
      </p>
      <p className={`${styles.errorInfoReason}`}>Reason - [{error.data}]</p>
    </div>
  );
};

export default EmsErrorPage;
