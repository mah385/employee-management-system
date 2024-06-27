import styles from "./ImportEmsUserData.module.css";
/*-------------------------------------------------------------------*/
import { useState } from "react";
/*-------------------------------------------------------------------*/
import { useNavigate } from "react-router-dom";
/*-------------------------------------------------------------------*/
import MyFormInput from "../../MyForm/MyFormInput/MyFormInput.jsx";
/*-------------------------------------------------------------------*/
import * as EmsUserApiResponseService from "../../../axios/ems-user/ems-user-api-response-service.js";
/*-------------------------------------------------------------------*/
import * as EmsUrlConstant from "../../../routes/EmsUrlConstant.js";

/*-------------------------------------------------------------------*/

const uploadFileType = {
  csv: ".csv",
  xlsx: ".xlsx",
};

const ImportEmsUserData = () => {
  console.log("ImportEmsUserData");
  const navigate = useNavigate();
  const [uploadFileInfo, setUploadFileInfo] = useState({
    selectedFile: undefined,
    isCsvFileSelected: false,
    isExcelFileSelected: false,
    isFileUploading: false,
  });

  const toggleFileUploadingStatus = () => {
    setUploadFileInfo((prevState) => ({
      ...prevState,
      isFileUploading: !prevState.isFileUploading,
    }));
  };

  const onSubmitHandleFormToUploadFile = async (e) => {
    e.preventDefault();
    toggleFileUploadingStatus();
    const responseData =
      await EmsUserApiResponseService.importEmsUserDataResponseService(
        uploadFileInfo.selectedFile,
      );
    toggleFileUploadingStatus();
    onClickHandleRemoveFile();
    if (responseData.statusCode === 200) {
      navigate(EmsUrlConstant.DISPLAY_EMS_USER_PATH);
    }
  };

  const onChangeHandleState = (e) => {
    let fileName = e.target.files[0].name;
    let fileNameExtension = fileName
      .substring(fileName.lastIndexOf("."))
      .toLowerCase();

    setUploadFileInfo((prevState) => ({
      ...prevState,
      selectedFile: e.target.files[0],
      isCsvFileSelected:
        "importEmsUserDataUsingCsvFile" === e.target.name &&
        uploadFileType.csv === fileNameExtension,
      isExcelFileSelected:
        "importEmsUserDataUsingExcelFile" === e.target.name &&
        uploadFileType.xlsx === fileNameExtension,
    }));
  };

  const onClickHandleRemoveFile = () => {
    setUploadFileInfo((prevState) => ({
      ...prevState,
      selectedFile: undefined,
      isCsvFileSelected: false,
      isExcelFileSelected: false,
    }));
  };

  return (
    <form
      onSubmit={(e) => onSubmitHandleFormToUploadFile(e)}
      className={`${styles.myFormContainer} h-100 d-flex flex-column justify-content-center align-items-center gap-4`}
    >
      {!uploadFileInfo.isExcelFileSelected && (
        <div>
          <MyFormInput
            inputlabelwidthtype="XXXL"
            type="file"
            name="importEmsUserDataUsingCsvFile"
            label="Upload Data using CSV File"
            accept={uploadFileType.csv}
            onChange={(e) => onChangeHandleState(e)}
            required
          />
        </div>
      )}

      {!uploadFileInfo.isCsvFileSelected && (
        <div>
          <MyFormInput
            inputlabelwidthtype="XXXL"
            type="file"
            name="importEmsUserDataUsingExcelFile"
            label="Upload Data using EXCEL File"
            accept={uploadFileType.xlsx}
            onChange={(e) => onChangeHandleState(e)}
            required
          />
        </div>
      )}

      <div className="d-flex gap-5">
        <button
          type="submit"
          className="border border-2 border-success btn btn-outline-success"
          disabled={
            (!uploadFileInfo.isCsvFileSelected ||
              uploadFileInfo.isExcelFileSelected) &&
            (uploadFileInfo.isCsvFileSelected ||
              !uploadFileInfo.isExcelFileSelected)
          }
        >
          Upload File
        </button>
        <button
          type="button"
          className="border border-2 border-danger btn btn-outline-danger"
          onClick={onClickHandleRemoveFile}
          disabled={
            (!uploadFileInfo.isCsvFileSelected ||
              uploadFileInfo.isExcelFileSelected) &&
            (uploadFileInfo.isCsvFileSelected ||
              !uploadFileInfo.isExcelFileSelected)
          }
        >
          Remove File
        </button>
      </div>
      <div>
        <h1 className="display-4">
          {uploadFileInfo.isFileUploading && "Uploading File... Please Wait."}
        </h1>
      </div>
    </form>
  );
};

export default ImportEmsUserData;
