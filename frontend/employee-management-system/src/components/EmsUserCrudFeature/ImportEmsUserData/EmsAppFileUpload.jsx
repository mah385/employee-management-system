import styles from "./ImportEmsUserData.module.css";
/*-------------------------------------------------------------------*/
import { useState } from "react";
/*-------------------------------------------------------------------*/
import { useNavigate } from "react-router-dom";
/*-------------------------------------------------------------------*/
import PropTypes from "prop-types";
/*-------------------------------------------------------------------*/
import MyFormInput from "../../MyForm/MyFormInput/MyFormInput.jsx";
/*-------------------------------------------------------------------*/
import * as EmsUserApiResponseService from "../../../axios/ems-user/ems-user-api-response-service.js";
/*-------------------------------------------------------------------*/
import * as EmpAppPathConstant from "../../../constants/emp-app-path-constant.js";

/*-------------------------------------------------------------------*/

const EmsAppFileUpload = (props) => {
  console.log(
    "EmsAppFileUpload (props.fileInputAccept): " + props.fileInputAccept,
  );
  const navigate = useNavigate();
  const [uploadFileInfo, setUploadFileInfo] = useState({
    selectedFile: undefined,
    isFileSelected: false,
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
      navigate(EmpAppPathConstant.PATH_DISPLAY_EMS_USER);
    }
  };

  const onChangeHandleState = (e) => {
    setUploadFileInfo((prevState) => ({
      ...prevState,
      selectedFile: e.target.files[0],
      isFileSelected: true,
    }));
  };

  const onClickHandleRemoveFile = () => {
    setUploadFileInfo((prevState) => ({
      ...prevState,
      selectedFile: undefined,
      isFileSelected: false,
    }));
  };

  return (
    <form
      onSubmit={(e) => onSubmitHandleFormToUploadFile(e)}
      className={`${styles.myFormContainer} d-flex flex-column justify-content-center align-items-center gap-2`}
    >
      <div>
        <MyFormInput
          inputlabelwidthtype="XXXL"
          type="file"
          name="importDataFile"
          label={props.fileInputLabel}
          accept={props.fileInputAccept}
          onChange={(e) => onChangeHandleState(e)}
          required
        />
      </div>
      <div className="d-flex gap-5">
        <button
          type="submit"
          className="border border-2 border-success btn btn-outline-success"
          disabled={!uploadFileInfo.isFileSelected}
        >
          Upload File
        </button>
        <button
          type="button"
          className="border border-2 border-danger btn btn-outline-danger"
          onClick={onClickHandleRemoveFile}
          disabled={!uploadFileInfo.isFileSelected}
        >
          Remove File
        </button>
      </div>
      <div>
        <h1 className="display-6">
          {uploadFileInfo.isFileUploading && "Uploading File... Please Wait."}
        </h1>
      </div>
    </form>
  );
};

export default EmsAppFileUpload;

EmsAppFileUpload.propTypes = {
  fileInputLabel: PropTypes.string,
  fileInputAccept: PropTypes.string,
};
