// import styles from "./ImportEmsUserData.module.css";
/*-------------------------------------------------------------------*/
import EmsAppFileUpload from "./EmsAppFileUpload.jsx";

/*-------------------------------------------------------------------*/

const ImportEmsUserData = () => {
  return (
    <div
      className={`h-100 d-flex flex-column justify-content-center align-items-center gap-4`}
    >
      <EmsAppFileUpload
        fileInputAccept=".csv"
        fileInputLabel="Upload Data using CSV File"
      />
      <EmsAppFileUpload
        fileInputAccept=".xlsx"
        fileInputLabel="Upload Data using EXCEL File"
      />
    </div>
  );
};

export default ImportEmsUserData;
