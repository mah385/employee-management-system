import styles from "./EmsAppErrorPage.module.css";
/*-------------------------------------------------------------------*/
import { useNavigate, useRouteError } from "react-router-dom";

/*-------------------------------------------------------------------*/

const EmsAppErrorPage = () => {
  const navigate = useNavigate();
  const routeError = useRouteError();

  const onClickHandleGoBackButton = () => {
    navigate(-1);
  };

  return (
    <div className={`${styles.emsErrorPage} vh-100 d-flex flex-column justify-content-center align-items-center`}>
      <p className={`${styles.errorHeading}`}>Oops!</p>
      <p className={`${styles.errorInfo}`}>
        {routeError.status} - {routeError.statusText}
      </p>
      <p className={`${styles.errorInfoReason}`}>Reason - [{routeError.data}]</p>
      <button
        type="button"
        className="border border-2 border-black btn btn-lg btn-outline-dark"
        onClick={onClickHandleGoBackButton}
      >
        Go Back
      </button>
    </div>
  );
};

export default EmsAppErrorPage;
