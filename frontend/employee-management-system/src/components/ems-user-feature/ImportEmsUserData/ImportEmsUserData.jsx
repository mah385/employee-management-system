// import styles from "./ImportEmsUserData.module.css";
/*-------------------------------------------------------------------*/
import EmsAppFileUploadUtil from "../../util/EmsAppFileUploadUtil/EmsAppFileUploadUtil.jsx";

/*-------------------------------------------------------------------*/

const ImportEmsUserData = () => {
  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center gap-4">
      <EmsAppFileUploadUtil
        fileInputAccept=".csv"
        fileInputLabel="Upload Data using CSV File"
      />
      <EmsAppFileUploadUtil
        fileInputAccept=".xlsx"
        fileInputLabel="Upload Data using EXCEL File"
      />
    </div>
  );
};

export default ImportEmsUserData;
