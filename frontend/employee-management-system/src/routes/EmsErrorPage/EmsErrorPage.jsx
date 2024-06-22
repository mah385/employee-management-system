import styles from "./EmsErrorPage.module.css";
/*-------------------------------------------------------------------*/
import { useNavigate, useRouteError } from "react-router-dom";

/*-------------------------------------------------------------------*/

const EmsErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  const handleGoBackButton = () => {
    navigate(-1);
  };

  return (
    <div
      className={`${styles.emsErrorPage} vh-100 d-flex flex-column justify-content-center align-items-center`}
    >
      <p className={`${styles.errorHeading}`}>Oops!</p>
      <p className={`${styles.errorInfo}`}>
        {error.status} - {error.statusText}
      </p>
      <p className={`${styles.errorInfoReason}`}>Reason - [{error.data}]</p>
      <button
        type="button"
        className="border border-2 border-black btn btn-lg btn-outline-dark"
        onClick={handleGoBackButton}
      >
        Go Back
      </button>
    </div>
  );
};

export default EmsErrorPage;
